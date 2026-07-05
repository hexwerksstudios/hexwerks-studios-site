(function () {
  "use strict";

  var KNOWLEDGE_URL = "data/raven-scribe-knowledge.md";
  var DISCORD_URL = "https://discord.gg/8raMgxhX";
  var knowledgeSections = [];
  var knowledgeLoaded = false;

  var topicMap = [
    { title: "Black Oaths", words: ["black oaths", "warband", "skirmish", "relic", "saint", "blood", "old gods"] },
    { title: "EINVIGI", words: ["einvigi", "einvígi", "duel", "holmgang", "hazel", "wyrd", "momentum", "overreach", "ring-out", "killing ground"] },
    { title: "Oaths & Banners", words: ["oaths & banners", "oaths and banners", "shieldwall", "banners"] },
    { title: "Omens & Ravens", words: ["omens", "ravens", "hex", "portable"] },
    { title: "Hoist the Black", words: ["hoist", "ship", "cannon", "boarding", "age-of-sail", "sail"] },
    { title: "Forge Files", words: ["forge files", "stl", "download", "payhip", "gumroad", "shopify", "printable files", "personal use", "license"] },
    { title: "From the Forge", words: ["from the forge", "printer", "printing", "resin", "filament", "anycubic", "photon", "kobra", "tools", "slicer", "model source", "affiliate"] },
    { title: "Playtesting", words: ["playtest", "testing", "development", "follow", "discord"] },
    { title: "Downloads", words: ["download", "pdf", "rulebook", "rules", "components", "print"] },
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

    return fetch(KNOWLEDGE_URL, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Knowledge file unavailable");
        }
        return response.text();
      })
      .then(function (text) {
        knowledgeSections = parseKnowledge(text);
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
