/*
  Email helpers.
  A mailto: link only works if the visitor has an email app set up
  (often not the case on Windows when people use Gmail/Outlook in a browser).
  So every email spot also offers "Copy address" and webmail links.
*/
(function () {
  "use strict";

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    var label = btn.textContent;
    var status = btn.parentElement.parentElement.querySelector(".copy-status");
    btn.addEventListener("click", function () {
      var email = btn.getAttribute("data-copy-email");
      copy(email).then(function (ok) {
        btn.textContent = ok ? "Copied" : label;
        if (status) {
          status.textContent = ok
            ? "Email address copied. Paste it into your email app."
            : "Couldn't copy automatically. The address is " + email + ".";
        }
        setTimeout(function () { btn.textContent = label; }, 2000);
      });
    });
  });
})();
