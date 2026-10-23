(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---- Games list (data comes from games.js) ----
  var list = document.getElementById("game-list");
  var games = Array.isArray(window.GAMES) ? window.GAMES : [];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function storeLink(href, label) {
    var a = el("a", "store-link", label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  if (!games.length) {
    var empty = el("div", "empty");
    var slot = el("div", "empty-slot");
    slot.setAttribute("aria-hidden", "true");
    var mark = el("img");
    mark.src = "favicon.svg";
    mark.alt = "";
    slot.appendChild(mark);
    empty.appendChild(slot);

    var copy = el("div", "empty-copy");
    copy.appendChild(el("h3", null, "Our first game is on the way"));
    copy.appendChild(el("p", null, "We're hard at work on it. When it launches, you'll find it right here with links to download it."));
    var follow = el("a", "empty-link", "Get in touch for updates");
    follow.href = "#contact";
    copy.appendChild(follow);
    empty.appendChild(copy);
    list.appendChild(empty);
    return;
  }

  var ul = el("ul", "game-grid");
  games.forEach(function (g) {
    var li = el("li", "game");
    if (g.image) {
      var img = el("img", "game-art");
      img.src = g.image;
      img.alt = g.title + " artwork";
      img.loading = "lazy";
      li.appendChild(img);
    }
    var body = el("div", "game-body");
    body.appendChild(el("h3", null, g.title));
    if (g.released) body.appendChild(el("p", "game-meta", "Released " + g.released));
    if (g.tagline) body.appendChild(el("p", "game-tagline", g.tagline));
    var links = el("div", "game-links");
    if (g.appStore) links.appendChild(storeLink(g.appStore, "App Store"));
    if (g.googlePlay) links.appendChild(storeLink(g.googlePlay, "Google Play"));
    if (g.website) links.appendChild(storeLink(g.website, "Website"));
    if (links.children.length) body.appendChild(links);
    li.appendChild(body);
    ul.appendChild(li);
  });
  list.appendChild(ul);
})();
