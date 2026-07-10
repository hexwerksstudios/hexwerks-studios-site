(function () {
  "use strict";

  var KNOWLEDGE_URLS = [
    "data/raven-scribe-knowledge.md",
    "data/einvigi-rules-knowledge.md",
    "data/black-oaths-rules-knowledge.md"
  ];
  var DISCORD_URL = "https://discord.gg/8raMgxhX";
  var knowledgeSections = [];
  var knowledgeLoaded = false;

  var topicMap = [
    { title: "Black Oaths Rules: How the Skirmish Works", words: ["how does black oaths play", "how does black oaths work", "black oaths rules", "black oaths turn", "black oaths activation"] },
    { title: "Black Oaths Rules: What You Need", words: ["black oaths components", "black oaths what do i need", "36", "battlefield", "markers"] },
    { title: "Black Oaths Rules: Turn and Activations", words: ["initiative phase", "activation phase", "fate phase", "activate", "activating", "standing up"] },
    { title: "Black Oaths Rules: Actions", words: ["move action", "charge", "withdraw", "scramble", "ranged action", "fight action", "special action", "action lockout"] },
    { title: "Black Oaths Rules: Fate Tests", words: ["fate test", "fate dice", "doom dice", "forsaken", "favored", "foretold", "peril test"] },
    { title: "Black Oaths Rules: Norn-Marks and Wyrd", words: ["norn-mark", "norn marks", "norn-marks", "wyrd", "deathblow"] },
    { title: "Black Oaths Rules: Combat", words: ["black oaths combat", "melee attack", "ranged attack", "visibility", "engaged", "within 1"] },
    { title: "Black Oaths Rules: Wounds Down and Lost", words: ["wound roll", "wound rolls", "down model", "down models", "lost model", "lost models", "no harm"] },
    { title: "Black Oaths Rules: Warband Fate", words: ["doomed", "fate roll", "warband breaks", "breaks", "leader lost"] },
    { title: "Black Oaths Rules: Warband Building", words: ["build a warband", "100 silver", "old oaths", "new covenant", "harbinger", "leader", "sworn", "levy", "oathbound"] },
    { title: "Black Oaths Rules: Prophecy Black Oaths and Glory", words: ["prophecy", "prophecies", "black oath", "black oaths", "glory", "oath of"] },
    { title: "Black Oaths Rules: Campaigns", words: ["campaign", "injury", "injuries", "scar", "nickname", "advancement", "blood feud", "spoils"] },
    { title: "Black Oaths Rules: Traditions and Factions", words: ["tradition", "traditions", "faction", "factions", "vestfold", "uppsala", "jutland", "austvegr", "saxon", "frisian", "frankish", "border oathbreakers"] },
    { title: "Black Oaths", words: ["black oaths", "warband", "skirmish", "relic", "saint", "blood", "old gods"] },
    { title: "EINVIGI Rules: How the Duel Works", words: ["how does einvigi play", "how does einvigi work", "duel loop", "round sequence", "secret intent", "hidden intent"] },
    { title: "EINVIGI Rules: What You Need", words: ["what do i need", "components", "fighter board", "movement cards", "action cards", "tokens"] },
    { title: "EINVIGI Rules: Hazel-Bound Ground", words: ["hazel-bound", "killing ground", "arena", "center circle", "middle band", "edge band", "outer hazel"] },
    { title: "EINVIGI Rules: Hazel Staves", words: ["hazel stave", "hazel staves", "short hazel", "long hazel", "crooked hazel", "pre-measuring", "pre measuring"] },
    { title: "EINVIGI Rules: Movement", words: ["primary movement", "follow-up movement", "follow up movement", "movement order", "step in", "step back", "rush", "circle", "slip"] },
    { title: "EINVIGI Rules: Action Cards", words: ["action card", "action cards", "strike", "grapple", "guard", "maneuver", "feint", "dice"] },
    { title: "EINVIGI Rules: Attacks and Defenses", words: ["attack", "defense", "defence", "strike resolution", "grapple resolution", "push", "drive", "turn", "control"] },
    { title: "EINVIGI Rules: Wyrd Momentum and Overreach", words: ["wyrd", "momentum", "overreach", "angle", "resource", "resources", "tactical advantage"] },
    { title: "EINVIGI Rules: Wounds and Victory", words: ["wound", "wounds", "bloodied", "broken", "slain", "victory", "defeated"] },
    { title: "EINVIGI Rules: Ring-Out", words: ["ring-out", "ring out", "out of the ring", "pushed out", "outer boundary"] },
    { title: "EINVIGI", words: ["einvigi", "einvígi", "duel", "holmgang"] },
    { title: "Oaths & Banners", words: ["oaths & banners", "oaths and banners", "shieldwall", "banners"] },
    { title: "Omens & Ravens", words: ["omens", "ravens", "hex", "portable"] },
    { title: "Hoist the Black", words: ["hoist", "ship", "cannon", "boarding", "age-of-sail", "sail"] },
    { title: "Downloads", words: ["download", "pdf", "rulebook", "rules", "components", "print"] },
    { title: "Forge Files", words: ["forge files", "stl", "download", "payhip", "gumroad", "shopify", "printable files", "personal use", "license"] },
    { title: "From the Forge", words: ["from the forge", "printer", "printing", "resin", "filament", "anycubic", "photon", "kobra", "tools", "slicer", "model source", "affiliate"] },
    { title: "Playtesting", words: ["playtest", "testing", "development", "follow", "discord"] },
    { title: "Social Links", words: ["social", "instagram", "facebook", "reddit", "discord"] },
    { title: "Contact", words: ["contact", "email", "message"] },
    { title: "Hexwerks Studios", words: ["hexwerks", "studio", "about", "who"] }
  ];

  function buildWidget() {
    var root = document.createElement("section");
    root.className = "raven-scribe";
    root.setAttribute("aria-label", "The Raven-Scribe question bot");
    root.innerHTML = [
      '<button class="raven-scribe-toggle" type="button" aria-expanded="false" aria-controls="raven-scribe-panel">',
      '  <span class="raven-mark" aria-hidden="true">R</span>',
      '  <span>Ask The Raven-Scribe</span>',
      '</button>',
      '<div class="raven-scribe-panel" id="raven-scribe-panel" hidden>',
      '  <div class="raven-scribe-header">',
      '    <div>',
      '      <span class="tag">Read-only guide</span>',
      '      <h2>The Raven-Scribe</h2>',
      '    </div>',
      '    <button class="raven-scribe-close" type="button" aria-label="Close The Raven-Scribe">Close</button>',
      '  </div>',
      '  <div class="raven-scribe-log" aria-live="polite"></div>',
      '  <div class="raven-scribe-prompts" aria-label="Suggested questions">',
      '    <button type="button" data-question="What is Black Oaths?">Black Oaths</button>',
      '    <button type="button" data-question="What is EINVIGI?">EINVIGI</button>',
      '    <button type="button" data-question="What tools are used in the forge?">From the Forge</button>',
      '    <button type="button" data-question="How do I follow development?">Follow development</button>',
      '  </div>',
      '  <form class="raven-scribe-form">',
      '    <label for="raven-scribe-question">Ask about Hexwerks Studios</label>',
      '    <div>',
      '      <input id="raven-scribe-question" name="question" type="text" autocomplete="off" maxlength="180" placeholder="Ask about games, playtesting, the forge, or socials">',
      '      <button type="submit">Ask</button>',
      '    </div>',
      '  </form>',
      '  <p class="raven-scribe-note">The Raven-Scribe answers only from approved site notes. For uncertain matters, join Discord.</p>',
      '</div>'
    ].join("");
    document.body.appendChild(root);
    wireWidget(root);
  }

  function wireWidget(root) {
    var toggle = root.querySelector(".raven-scribe-toggle");
    var panel = root.querySelector(".raven-scribe-panel");
    var close = root.querySelector(".raven-scribe-close");
    var log = root.querySelector(".raven-scribe-log");
    var form = root.querySelector(".raven-scribe-form");
    var input = root.querySelector("#raven-scribe-question");

    function openPanel() {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      loadKnowledge().then(function () {
        if (!log.children.length) {
          addMessage(log, "scribe", "Ask me about Hexwerks Studios, Black Oaths, EINVIGI, playtesting, From the Forge, downloads, or social links. I only answer from approved notes.");
        }
        input.focus();
      });
    }

    function closePanel() {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }

    toggle.addEventListener("click", function () {
      if (panel.hidden) {
        openPanel();
      } else {
        closePanel();
      }
    });

    close.addEventListener("click", closePanel);

    root.querySelectorAll("[data-question]").forEach(function (button) {
      button.addEventListener("click", function () {
        askQuestion(button.getAttribute("data-question"), log);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var question = input.value.trim();
      if (!question) {
        return;
      }
      input.value = "";
      askQuestion(question, log);
    });
  }

  function askQuestion(question, log) {
    addMessage(log, "visitor", question);
    loadKnowledge().then(function () {
      addMessage(log, "scribe", answerQuestion(question));
    });
  }

  function loadKnowledge() {
    if (knowledgeLoaded) {
      return Promise.resolve();
    }

    return Promise.all(KNOWLEDGE_URLS.map(function (url) {
      return fetch(url, { cache: "no-store" })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Knowledge file unavailable: " + url);
          }
          return response.text();
        });
    }))
      .then(function (texts) {
        knowledgeSections = texts.reduce(function (sections, text) {
          return sections.concat(parseKnowledge(text));
        }, []);
        knowledgeLoaded = true;
      })
      .catch(function () {
        knowledgeSections = [{
          title: "Discord",
          body: "I cannot read the approved notes right now. Please join the Hexwerks Studios Discord for current development questions: " + DISCORD_URL
        }];
        knowledgeLoaded = true;
      });
  }

  function parseKnowledge(markdown) {
    var sections = [];
    var parts = markdown.split(/^## /m);
    parts.slice(1).forEach(function (part) {
      var lines = part.trim().split(/\r?\n/);
      var title = lines.shift().trim();
      var body = lines.join("\n").trim();
      if (title && body) {
        sections.push({ title: title, body: body });
      }
    });
    return sections;
  }

  function answerQuestion(question) {
    var normalized = question.toLowerCase();

    if (normalized.indexOf("price") !== -1 || normalized.indexOf("release") !== -1 || normalized.indexOf("ship") !== -1 || normalized.indexOf("available") !== -1) {
      return "I do not have an approved date, price, shipping note, or availability claim. The safest path is to join the Hexwerks Discord for current development talk: " + DISCORD_URL;
    }

    var matchedTopic = topicMap.find(function (topic) {
      return topic.words.some(function (word) {
        return normalized.indexOf(word) !== -1;
      });
    });

    if (matchedTopic) {
      var section = findSection(matchedTopic.title);
      if (section) {
        return section.body;
      }
    }

    return "I do not have an approved answer for that. Join the Hexwerks Discord for the current word from the forge: " + DISCORD_URL;
  }

  function findSection(title) {
    return knowledgeSections.find(function (section) {
      return section.title.toLowerCase() === title.toLowerCase();
    });
  }

  function addMessage(log, speaker, text) {
    var message = document.createElement("div");
    message.className = "raven-message raven-message-" + speaker;

    var label = document.createElement("strong");
    label.textContent = speaker === "visitor" ? "You" : "The Raven-Scribe";

    var body = document.createElement("p");
    body.textContent = text;

    message.appendChild(label);
    message.appendChild(body);
    log.appendChild(message);
    log.scrollTop = log.scrollHeight;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }
})();
