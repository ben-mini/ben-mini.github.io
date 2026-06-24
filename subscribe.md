---
layout: single
title: Subscribe to ben-mini
permalink: /subscribe/
---

<div class="subscribe">
  <p class="sub-label">Subscribe by email</p>
  <form id="subscribe-form" novalidate>
    <input id="sub-email" type="email" name="email" placeholder="you@example.com" autocomplete="email" required>
    <button id="sub-btn" type="submit">Subscribe</button>
  </form>
  <p id="sub-msg" role="status" aria-live="polite"></p>

  <p class="sub-label sub-label--rss">Subscribe by RSS</p>
  <p class="sub-rss"><button id="rss-copy" type="button">https://ben-mini.com/feed.xml</button><span id="rss-copied"></span></p>
</div>

<style>
  .subscribe { max-width: 460px; margin: 1.5em 0; }
  .subscribe .sub-label { font-size: .95em; font-weight: 700; color: #333; margin: 0 0 .6em; }
  .subscribe .sub-label--rss { margin-top: 1.75em; }

  #subscribe-form {
    display: flex; gap: 8px; margin: 0; padding: 0;
    background: none !important; border: 0 !important; box-shadow: none !important;
  }
  #sub-email {
    flex: 1; min-width: 0; margin: 0; font-size: 1em; line-height: 1.3; padding: 11px 14px;
    color: #222; background: #fff; border: 1px solid #d4d4d4; border-radius: 8px; box-shadow: none;
  }
  #sub-email:focus { outline: none; border-color: #4bae34; box-shadow: 0 0 0 3px rgba(75,174,52,.18); }

  #sub-btn {
    flex: 0 0 auto; margin: 0; font-size: 1em; font-weight: 700; line-height: 1.3; white-space: nowrap;
    padding: 11px 22px; cursor: pointer; color: #fff;
    background: #4bae34; border: 1px solid #4bae34; border-radius: 8px; box-shadow: none;
  }
  #sub-btn:hover:not(:disabled) { background: #3a9329; border-color: #3a9329; }
  #sub-btn:disabled { opacity: .6; cursor: default; }

  #sub-msg { margin: .8em 0 0; font-size: .92em; min-height: 1.1em; }
  #sub-msg.ok { color: #000; }
  #sub-msg.err { color: #000; }

  .sub-rss { margin: 0; font-size: .95em; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  #rss-copy {
    font: inherit; color: #4bae34; background: none; border: 0; padding: 0; cursor: pointer;
    text-decoration: underline; text-underline-offset: 2px;
  }
  #rss-copy:hover { color: #3a9329; }
  #rss-copied { font-size: .85em; color: #3a9329; }

  @media (max-width: 460px) {
    #subscribe-form { flex-wrap: wrap; }
    #sub-btn { width: 100%; }
  }
</style>

<script>
  var WORKER_URL = "https://ben-mini-subscribe.bewal416.workers.dev";

  (function () {
    var form = document.getElementById("subscribe-form");
    var input = document.getElementById("sub-email");
    var btn = document.getElementById("sub-btn");
    var msg = document.getElementById("sub-msg");

    function setMsg(text, kind) { msg.textContent = text; msg.className = kind || ""; }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return setMsg("Please enter a valid email address.", "err");
      }
      btn.disabled = true;
      setMsg("Subscribing…", "");
      fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
      })
        .then(function (r) { return r.json().then(function (d) { return { status: r.status, d: d }; }); })
        .then(function (res) {
          if (res.d && res.d.ok) {
            setMsg(res.d.already ? "You're already on the list, thanks! 🎉" : "You're in! Thank you for subscribing.", "ok");
            form.reset();
          } else {
            setMsg((res.d && res.d.error) || "Something went wrong. Please try again.", "err");
          }
        })
        .catch(function () { setMsg("Network error — please try again.", "err"); })
        .finally(function () { btn.disabled = false; });
    });

    var rss = document.getElementById("rss-copy");
    var rssMsg = document.getElementById("rss-copied");
    rss.addEventListener("click", function () {
      navigator.clipboard.writeText("https://ben-mini.com/feed.xml").then(function () {
        rssMsg.textContent = "Copied!";
        setTimeout(function () { rssMsg.textContent = ""; }, 1500);
      }).catch(function () { rssMsg.textContent = "Press ⌘C to copy"; });
    });
  })();
</script>
