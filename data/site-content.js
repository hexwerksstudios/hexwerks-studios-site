(function () {
  "use strict";

  var ebayStore = {
    name: "Hexwerks Studios on eBay",
    href: "https://www.ebay.com/str/hexwerksstudios",
    verifiedOn: "2026-10-27"
  };

  window.HexwerksContent = {
    store: ebayStore,
    navigation: [
      { name: "Home", href: "/" },
      { name: "Death Spiral", href: "/death-spiral/", featured: true },
      { name: "Shop on eBay", href: ebayStore.href, featured: true },
      { name: "Systems", href: "/systems/" },
      { name: "Games", href: "/games/" },
      { name: "Downloads", href: "/downloads/" },
      { name: "Development", href: "/development/" },
      { name: "Community", href: "/community/" }
    ],
    socials: [
      {
        name: "Discord",
        label: "Join the Discord",
        href: "https://discord.gg/AYHMBYaMqc",
        ariaLabel: "Join the Hexwerks Studios Discord"
      },
      {
        name: "Facebook",
        label: "Facebook",
        href: "https://www.facebook.com/HexwerksStudios",
        ariaLabel: "Hexwerks Studios on Facebook"
      },
      {
        name: "Instagram",
        label: "Instagram",
        href: "https://www.instagram.com/hexwerks.studios/",
        ariaLabel: "Hexwerks Studios on Instagram"
      },
      {
        name: "Reddit",
        label: "Reddit",
        href: "https://www.reddit.com/user/Hexwerksstudios/",
        ariaLabel: "Hexwerks Studios on Reddit"
      }
    ],
    systems: [
      {
        name: "HexFlight",
        slug: "hexflight",
        summary: "Physical 1/144 resin aircraft are listed on eBay. Wider system development continues. Prototype models are pictured here; see eBay for product photos.",
        status: "1/144 miniatures on eBay",
        href: "/systems/hexflight/",
        category: "Aircraft system",
        prominence: "primary",
        image: "/images/death-spiral/hexflight-aircraft-closeup.webp",
        imageAlt: "Painted green and red HexFlight prototype aircraft on HexAxis prototype stands above the Death Spiral battlefield",
        sortOrder: 1
      },
      {
        name: "HexAxis",
        slug: "hexaxis",
        summary: "An articulated printable flight-stand system for aircraft position, attitude, and table reference.",
        status: "Prototype",
        href: "/systems/hexaxis/",
        category: "Flight stand system",
        prominence: "primary",
        image: "/images/death-spiral/hexaxis-prototype-detail.webp",
        imageAlt: "Grey HexAxis prototype flight stand holding a printed aircraft above a faceted base",
        sortOrder: 2
      },
      {
        name: "Death Spiral Battlefield",
        slug: "modular-battlefield",
        summary: "A modular printed battlefield designed to place the dogfight over a physical WWI environment.",
        status: "In development",
        href: "/systems/modular-battlefield/",
        category: "WWI battlefield set",
        prominence: "secondary",
        image: "/images/death-spiral/hexlink-battlefield-overview.webp",
        imageAlt: "Painted modular Death Spiral Battlefield sections with craters, trenches, and hex spaces",
        sortOrder: 3
      },
      {
        name: "Printable Accessories",
        slug: "accessories",
        summary: "Pilot cards, aircraft cards, mission tools, markers, and other tabletop support components.",
        status: "In development",
        href: "/systems/accessories/",
        category: "Table support",
        prominence: "secondary",
        image: "/images/death-spiral/death-spiral-flight-test.webp",
        imageAlt: "Painted WWI aircraft and numbered flight stands positioned on the printed Death Spiral Battlefield during a prototype test",
        sortOrder: 4
      }
    ],
    games: [
      {
        name: "Death Spiral",
        slug: "death-spiral",
        summary: "Fast, character-driven WWI air combat supported by a connected printable tabletop ecosystem.",
        status: "Flagship in development",
        href: "/death-spiral/",
        image: "/images/death-spiral/death-spiral-primary.webp",
        imageAlt: "Death Spiral graphic showing painted WWI aircraft on HexAxis stands above the Death Spiral Battlefield",
        featured: true,
        sortOrder: 1
      },
      {
        name: "Black Oaths",
        slug: "black-oaths",
        summary: "A grim Viking Age skirmish game of oath-bound warbands, blood debt, relics, and broken faith.",
        status: "Rules in development",
        href: "/black-oaths.html",
        image: "/images/black-oaths/black-oaths-featured-cover.jpg",
        imageAlt: "Black Oaths cover with a dark winged figure standing above a mound of skulls",
        featured: false,
        sortOrder: 2
      },
      {
        name: "EINV\u00cdGI",
        slug: "einvigi",
        summary: "A brutal Norse duel game of hidden intent, distance, commitment, Wyrd, and the killing ground.",
        status: "Prototype",
        href: "/einvigi.html",
        image: "/images/einvigi/einvigi-cover.webp",
        imageAlt: "EINVIGI cover showing two Norse fighters facing each other among runestones",
        featured: false,
        sortOrder: 3
      },
      {
        name: "Oaths & Banners",
        slug: "oaths-and-banners",
        summary: "A Dark Age warband game of shieldwalls, banners, leadership, and hard battlefield choices.",
        status: "Core rules in draft",
        href: "/oaths-and-banners.html",
        image: "/images/oaths-and-banners/oaths-banners-warband.jpg",
        imageAlt: "Painted Oaths and Banners warband assembled on the tabletop",
        featured: false,
        sortOrder: 4
      }
    ],
    // Verified physical listings, not a live inventory feed. Product photos and
    // current sales details belong to eBay; existing site photos show prototypes.
    aircraft: [
      {
        name: "Fokker Dr.I",
        slug: "fokker-dr-i",
        scale: "1/144",
        format: "Physical resin miniature",
        status: "Listed on eBay",
        href: ebayStore.href,
        sortOrder: 1
      },
      {
        name: "Fokker D.VII",
        slug: "fokker-d-vii",
        scale: "1/144",
        format: "Physical resin miniature",
        status: "Listed on eBay",
        href: ebayStore.href,
        sortOrder: 2
      },
      {
        name: "Albatros D.Va",
        slug: "albatros-d-va",
        scale: "1/144",
        format: "Physical resin miniature",
        status: "Listed on eBay",
        href: ebayStore.href,
        sortOrder: 3
      },
      {
        name: "Pfalz D.III",
        slug: "pfalz-d-iii",
        scale: "1/144",
        format: "Physical resin miniature",
        status: "Listed on eBay",
        href: ebayStore.href,
        sortOrder: 4
      }
    ],
    downloads: [],
    updates: [
      {
        title: "Building Death Spiral",
        slug: "building-death-spiral",
        category: "Studio Note",
        summary: "Why the game, aircraft, flight stands, battlefield, and table tools are being developed as one connected system.",
        href: "/development/building-death-spiral/",
        status: "Foundation note",
        image: "/images/death-spiral/death-spiral-prototype-workbench.webp",
        imageAlt: "Early Death Spiral aircraft and stand prototypes arranged on a workshop table",
        sortOrder: 1
      },
      {
        title: "Aircraft as Tabletop Pieces",
        slug: "aircraft-as-tabletop-pieces",
        category: "Aircraft Workshop",
        summary: "A working design brief for aircraft that read clearly, survive repeated handling, and belong on the table.",
        href: "/systems/hexflight/#design-principles",
        status: "Design brief",
        image: "/images/death-spiral/hexflight-aircraft-closeup.webp",
        imageAlt: "Painted green and red WWI aircraft on HexAxis stands above a hex battlefield",
        sortOrder: 2
      },
      {
        title: "Building the Death Spiral Battlefield",
        slug: "printable-battlefield",
        category: "Battlefield Development",
        summary: "Developing the printed WWI battlefield beneath the aircraft, stands, and missions of Death Spiral.",
        href: "/systems/modular-battlefield/",
        status: "Development overview",
        image: "/images/death-spiral/hexlink-battlefield-overview.webp",
        imageAlt: "Painted Death Spiral Battlefield sections with craters, trenches, and hex spaces",
        sortOrder: 3
      }
    ]
  };
}());
