/* ben-mini email builder — shared by email-formatter.html (browser) and send.js (Node).
   Single source of truth: markdown (+ Jekyll front matter) -> styled email HTML. */
(function (root) {
  "use strict";

  var GREEN = "#4bae34";
  var LOGO = "https://ben-mini.com/assets/images/ben-mini-full.png";
  var SITE = "https://ben-mini.com";
  var IMG_BASE = SITE + "/assets/images/";
  var TALLY_UNSUB = "https://tally.so/r/w4PVQr"; // fallback for the copy/paste path

  /* ---------- helpers ---------- */
  function slugify(t) {
    return (t || "").toLowerCase().replace(/[‘’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function fromFilename(f) {
    var n = (f || "").replace(/\.(md|markdown)$/i, "");
    var m = n.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
    return m ? { year: m[1], date: m[1] + "-" + m[2] + "-" + m[3], slug: m[4] } : null;
  }
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function fmtDate(raw) {
    var m = (raw || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return { pretty: "", year: "" };
    return { pretty: MONTHS[+m[2] - 1] + " " + (+m[3]) + ", " + m[1], year: m[1] };
  }
  function shortDate(raw) {
    var m = (raw || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return "";
    return MONTHS_SHORT[+m[2] - 1] + " " + (+m[3]) + ", " + m[1];
  }
  function fixImg(s) {
    s = s.trim();
    if (/^https?:\/\//i.test(s)) return s;
    return s.replace(/^\.\.\/assets\/images\//, IMG_BASE)
            .replace(/^\/?assets\/images\//, IMG_BASE)
            .replace(/^\.\.\//, SITE + "/")
            .replace(/^\//, SITE + "/");
  }
  function fixHref(h) {
    h = h.trim();
    if (/^(https?:|mailto:|#)/i.test(h)) return h;
    if (h.charAt(0) === "/") return SITE + h;
    return h;
  }

  /* ---------- front matter ---------- */
  function parseFrontMatter(src) {
    var meta = {}, body = src;
    var fm = src.match(/^\s*---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (fm) {
      body = src.slice(fm[0].length);
      var cur = null;
      fm[1].split("\n").forEach(function (line) {
        var top = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
        var nest = line.match(/^\s+([A-Za-z0-9_]+):\s*(.*)$/);
        if (top) { cur = top[1]; meta[top[1]] = top[2].replace(/^["']|["']$/g, "").trim(); }
        else if (nest && cur) { meta[cur + "." + nest[1]] = nest[2].replace(/^["']|["']$/g, "").trim(); }
      });
    }
    return { meta: meta, body: body };
  }

  /* ---------- markdown ---------- */
  function inline(t) {
    t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, function (_, a, s) {
      return '<img src="' + fixImg(s) + '" alt="' + a + '" style="display:block;margin:0 auto;max-width:100%;height:auto;border-radius:6px;">';
    });
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, x, h) {
      return '<a href="' + fixHref(h) + '" target="_blank" style="color:' + GREEN + ';text-decoration:underline;">' + x + "</a>";
    });
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    t = t.replace(/`([^`]+)`/g, '<code style="background:#eef3ec;padding:1px 5px;border-radius:4px;font-size:.9em;">$1</code>');
    return t;
  }
  function mdToHtml(src) {
    var lines = src.replace(/\r/g, "").split("\n"), out = [], i = 0;
    function flushP(b) { if (b.length) out.push('<p style="margin:0 0 18px;">' + inline(b.join(" ")) + "</p>"); }
    while (i < lines.length) {
      var line = lines[i];
      if (/^\s*$/.test(line)) { i++; continue; }
      if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) { out.push('<hr style="border:0;border-top:1px solid ' + GREEN + ';margin:24px 0;">'); i++; continue; }
      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { var lv = h[1].length, sz = [26,22,19,17,16,15][lv-1]; out.push("<h"+lv+' style="font-size:'+sz+'px;line-height:1.3;margin:24px 0 10px;color:#222;">'+inline(h[2])+"</h"+lv+">"); i++; continue; }
      if (/^\s*>/.test(line)) { var qb=[]; while(i<lines.length && /^\s*>/.test(lines[i])){qb.push(lines[i].replace(/^\s*>\s?/,""));i++;} out.push('<blockquote style="border-left:4px solid '+GREEN+';padding:2px 0 2px 14px;margin:18px 0;font-style:italic;color:#555;">'+inline(qb.join(" "))+"</blockquote>"); continue; }
      if (/^\s*[-*+]\s+/.test(line)) { var ub=[]; while(i<lines.length && /^\s*[-*+]\s+/.test(lines[i])){ub.push('<li style="margin:0 0 6px;">'+inline(lines[i].replace(/^\s*[-*+]\s+/,""))+"</li>");i++;} out.push('<ul style="margin:0 0 18px;padding-left:22px;">'+ub.join("")+"</ul>"); continue; }
      if (/^\s*\d+\.\s+/.test(line)) { var ob=[]; while(i<lines.length && /^\s*\d+\.\s+/.test(lines[i])){ob.push('<li style="margin:0 0 6px;">'+inline(lines[i].replace(/^\s*\d+\.\s+/,""))+"</li>");i++;} out.push('<ol style="margin:0 0 18px;padding-left:22px;">'+ob.join("")+"</ol>"); continue; }
      var pb = [];
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^\s*(>|#{1,6}\s|[-*+]\s|\d+\.\s|-{3,}\s*$|\*{3,}\s*$)/.test(lines[i])) { pb.push(lines[i]); i++; }
      flushP(pb);
    }
    return out.join("\n");
  }

  /* ---------- compose ---------- */
  function permalink(meta, filename) {
    var ff = fromFilename(filename);
    var year = (ff && ff.year) || fmtDate(meta.date).year || "";
    var slug = (ff && ff.slug) || slugify(meta.title);
    return SITE + "/" + year + "/" + slug;
  }
  function buildInner(meta, content, url, unsubUrl) {
    var title = meta.title || "Untitled", subtitle = meta.subtitle || "", d = fmtDate(meta.date);
    var sub = subtitle ? '<p style="font-size:16px;color:#555;font-style:italic;margin:0 0 6px;">' + subtitle + "</p>" : "";
    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8f6e4;margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;">\n'
      + ' <tr><td align="center" style="padding:20px 0;">\n'
      + '  <table role="presentation" width="700" cellpadding="0" cellspacing="0" border="0" style="width:700px;max-width:700px;background-color:#ffffff;padding:24px;border:1px solid #ddd;border-radius:8px;">\n'
      + '   <tr><td style="text-align:left;font-family:Arial,Helvetica,sans-serif;">\n'
      + '    <p style="margin:0 0 12px;font-size:14px;"><a href="' + url + '" target="_blank" style="color:' + GREEN + ';text-decoration:underline;">View in Browser</a></p>\n'
      + '    <div style="text-align:center;margin-bottom:20px;"><a href="' + SITE + '" target="_blank"><img src="' + LOGO + '" alt="ben-mini" style="max-width:240px;width:100%;height:auto;border:0;"></a></div>\n'
      + '    <h1 style="font-size:26px;line-height:1.25;color:#222;margin:0 0 6px;">' + title + "</h1>\n"
      + "    " + sub + "\n"
      + '    <p style="font-size:14px;color:#777;margin:0 0 18px;">' + d.pretty + "</p>\n"
      + '    <hr style="border:0;border-top:1px solid ' + GREEN + ';margin:20px 0;">\n'
      + '    <div style="font-size:16px;color:#333;line-height:1.65;">' + content + "</div>\n"
      + '    <hr style="border:0;border-top:1px solid ' + GREEN + ';margin:24px 0 16px;">\n'
      + '    <p style="font-size:12px;color:#888;text-align:center;margin:0;"><a href="' + unsubUrl + '" target="_blank" style="color:' + GREEN + ';text-decoration:underline;">Unsubscribe</a></p>\n'
      + "   </td></tr>\n  </table>\n </td></tr>\n</table>";
  }
  function fullDoc(inner) {
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>\n'
      + '<body style="margin:0;padding:0;background-color:#e8f6e4;">\n' + inner + "\n</body></html>";
  }

  /* ---------- public ---------- */
  // opts: { filename, unsubscribeUrl }
  function buildEmail(markdown, opts) {
    opts = opts || {};
    var parsed = parseFrontMatter(markdown);
    var url = permalink(parsed.meta, opts.filename);
    var unsub = opts.unsubscribeUrl || TALLY_UNSUB;
    var inner = buildInner(parsed.meta, mdToHtml(parsed.body), url, unsub);
    return {
      meta: parsed.meta,
      title: parsed.meta.title || "Untitled",
      subject: parsed.meta.title || "Untitled",
      url: url,
      inner: inner,
      full: fullDoc(inner)
    };
  }

  var api = {
    slugify: slugify, fromFilename: fromFilename, fmtDate: fmtDate, shortDate: shortDate,
    fixImg: fixImg, fixHref: fixHref, parseFrontMatter: parseFrontMatter,
    mdToHtml: mdToHtml, buildInner: buildInner, fullDoc: fullDoc, permalink: permalink,
    buildEmail: buildEmail,
    RESEND_UNSUBSCRIBE: "{{{RESEND_UNSUBSCRIBE_URL}}}"
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api; // Node
  else root.Formatter = api;                                                // browser
})(typeof self !== "undefined" ? self : this);
