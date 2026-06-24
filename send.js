#!/usr/bin/env node
/*
 * send.js — send a ben-mini post as a Resend broadcast.
 *
 * Reads a post from ./_posts, builds the email with formatter.js (same output
 * as the web preview), and creates a Resend Broadcast to your audience. The
 * unsubscribe link is Resend's managed merge tag, so unsubscribes are automatic.
 *
 * Setup (one time):
 *   1. cp .env.example .env   and fill in the values
 *   2. Node 18+ (uses built-in fetch). No npm install needed.
 *
 * Usage:
 *   node send.js <post>            # build + create a DRAFT broadcast in Resend (review there)
 *   node send.js <post> --send     # build + create + SEND immediately
 *   node send.js <post> --dry      # build only, write .preview.html, never touch Resend
 *   node send.js <post> --subject "Custom subject line"
 *
 *   <post> can be a filename or just a slug, e.g.:
 *     node send.js 2026-06-24-stealing-is-a-skill.md
 *     node send.js stealing-is-a-skill
 *     node send.js latest            # most recent post by date
 */

const fs = require("fs");
const path = require("path");
const Formatter = require("./formatter.js");

const POSTS_DIR = path.join(__dirname, "_posts");
const API = "https://api.resend.com";

/* ---------- tiny .env loader (no dependency) ---------- */
function loadEnv() {
  const p = path.join(__dirname, ".env");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    let v = m[2].trim().replace(/^["']|["']$/g, "");
    if (!(m[1] in process.env)) process.env[m[1]] = v;
  }
}

function die(msg) { console.error("\n✗ " + msg + "\n"); process.exit(1); }

/* ---------- resolve which post ---------- */
function resolvePost(arg) {
  if (!fs.existsSync(POSTS_DIR)) die("No _posts directory found at " + POSTS_DIR);
  const all = fs.readdirSync(POSTS_DIR).filter(f => /\.(md|markdown)$/i.test(f)).sort();
  if (!all.length) die("No posts in " + POSTS_DIR);
  if (!arg || arg === "latest") return all[all.length - 1];
  if (all.includes(arg)) return arg;
  const hit = all.find(f => f === arg + ".md" || f.replace(/\.(md|markdown)$/i, "").endsWith("-" + arg) || f.includes(arg));
  if (!hit) die('No post matching "' + arg + '". Available:\n  ' + all.slice(-8).reverse().join("\n  "));
  return hit;
}

/* ---------- Resend REST ---------- */
async function resend(method, endpoint, body) {
  const res = await fetch(API + endpoint, {
    method,
    headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json; try { json = text ? JSON.parse(text) : {}; } catch (_) { json = { raw: text }; }
  return { ok: res.ok, status: res.status, json };
}

// Resend is mid-rename Audiences -> Segments. Try audience_id, fall back to segment_id.
async function createBroadcast(base) {
  const targetId = process.env.RESEND_AUDIENCE_ID;
  for (const field of ["audience_id", "segment_id"]) {
    const r = await resend("POST", "/broadcasts", Object.assign({ [field]: targetId }, base));
    if (r.ok) return { id: r.json.id, field };
    const err = JSON.stringify(r.json).toLowerCase();
    // only retry with the other field name if this one was the problem
    if (!/audience|segment|unknown|invalid|not found/.test(err)) {
      die("Resend error (" + r.status + "): " + JSON.stringify(r.json, null, 2));
    }
  }
  die("Could not create broadcast with audience_id or segment_id. Check RESEND_AUDIENCE_ID.\n" +
      "Find the ID in the Resend dashboard under Audiences (or Segments).");
}

/* ---------- main ---------- */
(async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const flags = new Set(args.filter(a => a.startsWith("--")));
  const subjIdx = args.indexOf("--subject");
  const subjectOverride = subjIdx >= 0 ? args[subjIdx + 1] : null;
  const positional = args.filter((a, i) => !a.startsWith("--") && a !== subjectOverride);
  const dry = flags.has("--dry");
  const doSend = flags.has("--send");

  const file = resolvePost(positional[0]);
  const md = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const email = Formatter.buildEmail(md, { filename: file, unsubscribeUrl: Formatter.RESEND_UNSUBSCRIBE });
  const subject = subjectOverride || email.subject;

  console.log("\n  post:    " + file);
  console.log("  subject: " + subject);
  console.log("  url:     " + email.url);

  if (dry) {
    const out = path.join(__dirname, ".preview.html");
    fs.writeFileSync(out, email.full);
    console.log("\n✓ Dry run — wrote " + out + " (open it to check). Resend not contacted.\n");
    return;
  }

  for (const k of ["RESEND_API_KEY", "RESEND_AUDIENCE_ID", "RESEND_FROM"]) {
    if (!process.env[k]) die("Missing " + k + " in .env (copy .env.example).");
  }

  const base = {
    from: process.env.RESEND_FROM,                 // e.g. "ben-mini <ben@ben-mini.com>"
    subject,
    html: email.inner,
    name: file.replace(/\.(md|markdown)$/i, ""),   // internal label in Resend dashboard
  };
  if (process.env.RESEND_REPLY_TO) base.reply_to = process.env.RESEND_REPLY_TO;

  const { id, field } = await createBroadcast(base);
  console.log("\n✓ Broadcast created (" + field + "): " + id);

  if (!doSend) {
    console.log("  Draft is in your Resend dashboard — review it, then either");
    console.log("  click Send there, or re-run:  node send.js " + positional[0] + " --send\n");
    return;
  }

  const s = await resend("POST", "/broadcasts/" + id + "/send");
  if (!s.ok) die("Created the broadcast but send failed (" + s.status + "): " + JSON.stringify(s.json, null, 2));
  console.log("\n✓ Sent to your audience. 🎉\n");
})().catch(e => die(e.stack || String(e)));
