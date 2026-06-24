---
layout: single
title: Subscribe to ben-mini
permalink: /subscribe/
---

#### Subscribe via Email

<form id="subscribe-form" novalidate>
  <div class="sub-row">
    <input id="sub-email" type="email" name="email" placeholder="you@example.com" autocomplete="email" required>
    <button id="sub-btn" type="submit">Subscribe</button>
  </div>
  <p id="sub-msg" role="status" aria-live="polite"></p>
</form>

<style>
  #subscribe-form { margin: 0 0 0.5em; max-width: 460px; }
  .sub-row { display: flex; gap: 8px; flex-wrap: wrap; }
  #sub-email {
    flex: 1; min-width: 200px; font-size: 1em; padding: 10px 12px;
    border: 1px solid #ccc; border-radius: 8px;
  }
  #sub-email:focus { outline: none; border-color: #4bae34; box-shadow: 0 0 0 3px rgba(75,174,52,.15); }
  #sub-btn {
    font-size: 1em; font-weight: 600; padding: 10px 18px; cursor: pointer;
    color: #fff; background: #4bae34; border: 1px solid #4bae34; border-radius: 8px;
  }
  #sub-btn:hover:not(:disabled) { background: #3a9329; border-color: #3a9329; }
  #sub-btn:disabled { opacity: .6; cursor: default; }
  #sub-msg { margin: 10px 0 0; font-size: .95em; min-height: 1.2em; }
  #sub-msg.ok { color: #3a9329; }
  #sub-msg.err { color: #b3261e; }
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
            setMsg(res.d.already ? "You're already on the list — thanks! 🎉" : "You're in! Check your inbox for the next one. 🎉", "ok");
            form.reset();
          } else {
            setMsg((res.d && res.d.error) || "Something went wrong. Please try again.", "err");
          }
        })
        .catch(function () { setMsg("Network error — please try again.", "err"); })
        .finally(function () { btn.disabled = false; });
    });
  })();
</script>

---

[<span style="font-size: 1.0625em;">Subscribe via RSS</span>](https://ben-mini.com/feed.xml)
