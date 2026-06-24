/*
 * ben-mini subscribe Worker
 * Receives { email } from the /subscribe form and adds the person to your
 * Resend audience/segment. Holds the Resend key so it never touches the browser.
 *
 * Deploy (from this folder):
 *   npm i -g wrangler           # once
 *   wrangler login              # once
 *   wrangler secret put RESEND_API_KEY        # paste your full-access key
 *   wrangler secret put RESEND_AUDIENCE_ID    # paste your segment id
 *   wrangler deploy             # prints the Worker URL (goes in subscribe.md)
 */

const ALLOWED_ORIGINS = [
  "https://ben-mini.com",
  "https://www.ben-mini.com",
  "http://localhost:4000", // jekyll serve, for local testing
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(status, obj, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return json(405, { ok: false, error: "Method not allowed" }, headers);

    let email = "", firstName = "";
    try {
      const body = await request.json();
      email = String(body.email || "").trim().toLowerCase();
      firstName = String(body.first_name || "").trim();
    } catch {
      return json(400, { ok: false, error: "Bad request." }, headers);
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json(400, { ok: false, error: "Please enter a valid email address." }, headers);
    }
    if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
      return json(500, { ok: false, error: "Server not configured." }, headers);
    }

    const result = await addContact(env, email, firstName);
    if (result.ok) return json(200, { ok: true, already: !!result.already }, headers);
    return json(result.status || 502, { ok: false, error: result.error || "Couldn't subscribe right now." }, headers);
  },
};

async function addContact(env, email, first_name) {
  const auth = {
    Authorization: "Bearer " + env.RESEND_API_KEY,
    "Content-Type": "application/json",
  };
  const id = env.RESEND_AUDIENCE_ID;

  // Resend upserts silently (re-adding returns 201, not an error), so check for an
  // existing, still-subscribed contact first to report "already subscribed" accurately.
  try {
    const g = await fetch(`https://api.resend.com/audiences/${id}/contacts/${encodeURIComponent(email)}`, { headers: auth });
    if (g.ok) {
      const c = await g.json();
      if (c && c.unsubscribed === false) return { ok: true, already: true };
    }
  } catch {}

  // A segment may be a manual list or a filter, so try each add shape; the bare
  // /contacts create always works and the contact joins by matching. First win returns.
  const attempts = [
    { url: `https://api.resend.com/audiences/${id}/contacts`, body: { email, first_name, unsubscribed: false } },
    { url: `https://api.resend.com/contacts`, body: { email, first_name, unsubscribed: false, segments: [{ id }] } },
    { url: `https://api.resend.com/contacts`, body: { email, first_name, unsubscribed: false } },
  ];

  let last = { status: 502, error: "Couldn't subscribe right now." };
  for (const a of attempts) {
    let res;
    try {
      res = await fetch(a.url, { method: "POST", headers: auth, body: JSON.stringify(a.body) });
    } catch {
      continue;
    }
    if (res.ok) return { ok: true };
    last = { status: res.status, error: friendly(res.status) };
    if (res.status === 401 || res.status === 403) break; // auth is broken, no point retrying
  }
  return { ok: false, ...last };
}

function friendly(status) {
  if (status === 401 || status === 403) return "Server authentication error.";
  if (status === 422) return "That email looks invalid.";
  return "Couldn't subscribe right now. Please try again later.";
}
