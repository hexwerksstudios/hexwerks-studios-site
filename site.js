(function () {
  "use strict";

  var content = window.HexwerksContent;
  if (!content) {
    return;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function isActive(href) {
    var path = window.location.pathname;
    if (href === "/") {
      return path === "/" || path === "/index.html";
    }
    if (href === "/games/" && ["/black-oaths.html", "/einvigi.html", "/oaths-and-banners.html"].indexOf(path) !== -1) {
      return true;
    }
    return path.indexOf(href) === 0;
  }

  function navigationLinks() {
    return content.navigation.map(function (item) {
      var active = isActive(item.href) ? " aria-current=\"page\"" : "";
      var featured = item.featured ? " nav-featured" : "";
      var external = /^https?:\/\//.test(item.href) ? " target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"" + escapeHtml(item.name + " (opens in a new tab)") + "\"" : "";
      return "<a class=\"site-nav-link" + featured + "\" href=\"" + escapeHtml(item.href) + "\"" + active + external + ">" + escapeHtml(item.name) + "</a>";
    }).join("");
  }

  function renderHeader() {
    var currentHeader = document.querySelector(".topbar, [data-site-header]");
    if (!currentHeader) {
      return;
    }

    var replacement = document.createElement("div");
    replacement.className = "topbar site-header";
    replacement.setAttribute("data-site-header", "");
    replacement.innerHTML =
      "<a class=\"skip-link\" href=\"#main-content\">Skip to main content</a>" +
      "<nav class=\"site-nav\" aria-label=\"Primary navigation\">" +
        "<a class=\"site-brand\" href=\"/\" aria-label=\"Hexwerks Studios home\">" +
          "<img src=\"/IMG_2698.jpeg\" width=\"48\" height=\"48\" alt=\"\">" +
          "<span><strong>Hexwerks Studios</strong><small>Games. Systems. Physical worlds.</small></span>" +
        "</a>" +
        "<button class=\"nav-toggle\" type=\"button\" aria-expanded=\"false\" aria-controls=\"primary-menu\" aria-label=\"Open navigation\">" +
          "<span></span><span></span><span></span>" +
        "</button>" +
        "<div class=\"site-nav-links\" id=\"primary-menu\">" + navigationLinks() + "</div>" +
      "</nav>";
    currentHeader.replaceWith(replacement);

    var button = replacement.querySelector(".nav-toggle");
    var menu = replacement.querySelector(".site-nav-links");

    function closeMenu() {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation");
      menu.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }

    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      button.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-open", !open);
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        button.focus();
      }
    });
  }

  function renderFooter() {
    var currentFooter = document.querySelector("footer");
    if (!currentFooter) {
      return;
    }

    var socialLinks = content.socials.map(function (item) {
      return "<a href=\"" + item.href + "\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"" + escapeHtml(item.ariaLabel) + "\">" + escapeHtml(item.label) + "</a>";
    }).join("");

    currentFooter.className = "site-footer";
    currentFooter.innerHTML =
      "<div class=\"site-footer-grid\">" +
        "<div class=\"site-footer-identity\">" +
          "<a class=\"footer-mark\" href=\"/\">Hexwerks Studios</a>" +
          "<p>Original tabletop games, physical aircraft miniatures, and printable hobby systems in development.</p>" +
          "<p class=\"footer-legal\">&copy; 2026 Hexwerks Studios. Independent tabletop design and physical prototyping.</p>" +
        "</div>" +
        "<div><h2>Studio</h2><nav class=\"site-footer-links\" aria-label=\"Studio links\">" + navigationLinks() + "</nav></div>" +
        "<div><h2>Workshop</h2><nav class=\"site-footer-links\" aria-label=\"Workshop links\">" +
          "<a href=\"/death-spiral/aircraft/\">Aircraft Hangar</a>" +
          "<a href=\"/forge-files.html\">Forge Files</a>" +
          "<a href=\"/from-the-forge.html\">From the Werks</a>" +
          "<a href=\"mailto:contact@hexwerksstudios.com\">Contact</a>" +
        "</nav></div>" +
        "<div><h2>Community</h2><nav class=\"site-footer-links\" aria-label=\"Social links\">" + socialLinks + "</nav></div>" +
      "</div>";
  }

  function renderSystems(container) {
    container.innerHTML = content.systems.map(function (item, index) {
      var number = String(index + 1).padStart(2, "0");
      var prominence = item.prominence === "primary" ? " system-card-primary" : " system-card-secondary";
      var media = item.image ?
        "<div class=\"system-card-media\"><img src=\"" + item.image + "\" alt=\"" + escapeHtml(item.imageAlt || item.name) + "\" loading=\"lazy\"></div>" : "";
      return "<article class=\"system-card" + prominence + "\">" +
        "<div class=\"system-card-index\">" + number + "</div>" +
        media +
        "<div><span class=\"eyebrow\">" + escapeHtml(item.category) + "</span>" +
        "<h3>" + escapeHtml(item.name) + "</h3>" +
        "<p>" + escapeHtml(item.summary) + "</p></div>" +
        "<div class=\"card-foot\"><span class=\"status-badge\">" + escapeHtml(item.status) + "</span>" +
        "<a class=\"text-link\" href=\"" + item.href + "\">Explore " + escapeHtml(item.name) + " <span aria-hidden=\"true\">&rarr;</span></a></div>" +
      "</article>";
    }).join("");
  }

  function renderGames(container) {
    var includeFlagship = container.getAttribute("data-include-flagship") === "true";
    var games = content.games.filter(function (game) {
      return includeFlagship || !game.featured;
    });
    container.innerHTML = games.map(function (game) {
      return "<article class=\"game-card\">" +
        "<div class=\"game-card-image\"><img src=\"" + game.image + "\" alt=\"" + escapeHtml(game.imageAlt || game.name) + "\" loading=\"lazy\"></div>" +
        "<div class=\"game-card-copy\"><span class=\"status-badge\">" + escapeHtml(game.status) + "</span>" +
        "<h3><a href=\"" + game.href + "\">" + escapeHtml(game.name) + "</a></h3>" +
        "<p>" + escapeHtml(game.summary) + "</p></div>" +
      "</article>";
    }).join("");
  }

  function renderUpdates(container) {
    container.innerHTML = content.updates.map(function (item) {
      var media = item.image ?
        "<div class=\"development-card-media\"><img src=\"" + item.image + "\" alt=\"" + escapeHtml(item.imageAlt || item.title) + "\" loading=\"lazy\"></div>" : "";
      return "<article class=\"development-card\">" +
        media +
        "<span class=\"eyebrow\">" + escapeHtml(item.category) + "</span>" +
        "<h3><a href=\"" + item.href + "\">" + escapeHtml(item.title) + "</a></h3>" +
        "<p>" + escapeHtml(item.summary) + "</p>" +
        "<div class=\"card-foot\"><span class=\"status-badge\">" + escapeHtml(item.status) + "</span>" +
        "<a class=\"text-link\" href=\"" + item.href + "\">Read note <span aria-hidden=\"true\">&rarr;</span></a></div>" +
      "</article>";
    }).join("");
  }

  function renderAircraft(container) {
    if (!content.aircraft.length) {
      container.innerHTML = "<div class=\"editorial-empty\"><span class=\"eyebrow\">Hangar in development</span><h3>Aircraft records are taking shape.</h3><p>The Hangar will collect aircraft profiles, model photographs, and tabletop roles as they are introduced. For current prototype work, follow Death Spiral on Discord.</p><a class=\"button button-secondary\" href=\"https://discord.gg/AYHMBYaMqc\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Follow Death Spiral aircraft development on Discord\">Follow aircraft development</a></div>";
      return;
    }

    container.innerHTML = content.aircraft.map(function (aircraft) {
      return "<article class=\"aircraft-card\">" +
        "<span class=\"eyebrow\">" + escapeHtml(aircraft.scale) + " scale</span>" +
        "<h3>" + escapeHtml(aircraft.name) + "</h3>" +
        "<p>" + escapeHtml(aircraft.format) + "</p>" +
        "<div class=\"card-foot\"><span class=\"status-badge\">" + escapeHtml(aircraft.status) + "</span>" +
        "<a class=\"text-link\" href=\"" + escapeHtml(aircraft.href) + "\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Visit the eBay store for " + escapeHtml(aircraft.name) + " (opens in a new tab)\">Visit eBay store <span aria-hidden=\"true\">&rarr;</span></a></div>" +
      "</article>";
    }).join("");
  }

  function renderDownloads(container) {
    if (!content.downloads.length) {
      container.innerHTML = "<div class=\"editorial-empty\"><span class=\"eyebrow\">Playtest materials</span><h3>Public files are being prepared.</h3><p>Rules, print files, and assembly guides will appear here as clear versioned releases. For current playtest discussion, join Discord.</p><a class=\"button button-secondary\" href=\"https://discord.gg/AYHMBYaMqc\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Ask about current playtest files on Discord\">Ask about playtesting</a></div>";
    }
  }

  function renderCollections() {
    document.querySelectorAll("[data-collection]").forEach(function (container) {
      var type = container.getAttribute("data-collection");
      if (type === "systems") renderSystems(container);
      if (type === "games") renderGames(container);
      if (type === "updates") renderUpdates(container);
      if (type === "aircraft") renderAircraft(container);
      if (type === "downloads") renderDownloads(container);
    });
  }

  function loadAnalytics() {
    if (document.querySelector("script[data-goatcounter]")) {
      return;
    }
    var analytics = document.createElement("script");
    analytics.async = true;
    analytics.src = "//gc.zgo.at/count.js";
    analytics.setAttribute("data-goatcounter", "https://hexwerksstudios.goatcounter.com/count");
    document.head.appendChild(analytics);
  }

  renderHeader();
  renderFooter();
  renderCollections();
  loadAnalytics();
}());
