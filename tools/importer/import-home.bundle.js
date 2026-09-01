/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/hero-overlay.js
  function parse(element, { document: document2 }) {
    const image = element.querySelector(".p-banner__media img, .e-image img, picture img, img");
    const heading = element.querySelector('h1, h2, .p-banner-heading, [class*="banner--heading"]');
    const ctaLinks = Array.from(element.querySelectorAll('.p-banner-cta a, [class*="banner"] a[class*="btn"], a[class*="e-btn"]'));
    if (!image && !heading && ctaLinks.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (image) {
      const imgCell = document2.createDocumentFragment();
      imgCell.appendChild(document2.createComment(" field:image "));
      imgCell.appendChild(image);
      cells.push([imgCell]);
    }
    const textParts = [];
    if (heading) textParts.push(heading);
    ctaLinks.forEach((a) => textParts.push(a));
    if (textParts.length) {
      const textCell = document2.createDocumentFragment();
      textCell.appendChild(document2.createComment(" field:text "));
      textParts.forEach((node) => textCell.appendChild(node));
      cells.push([textCell]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-stats.js
  function parse2(element, { document: document2 }) {
    const items = Array.from(element.querySelectorAll(".c-universal-grid__item--universal, .c-cv-universal-grid__item--universal"));
    if (items.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    items.forEach((item) => {
      const realImage = Array.from(item.querySelectorAll("img")).find((im) => /^https?:/i.test(im.getAttribute("src") || ""));
      const statValue = item.querySelector(".e-stat");
      const statCopy = item.querySelector(".e-stat-copy");
      const imageCell = document2.createDocumentFragment();
      if (realImage) {
        imageCell.appendChild(document2.createComment(" field:image "));
        imageCell.appendChild(realImage);
      }
      const textCell = document2.createDocumentFragment();
      textCell.appendChild(document2.createComment(" field:text "));
      if (statValue) {
        const h = document2.createElement("h3");
        h.textContent = statValue.textContent.trim();
        textCell.appendChild(h);
      }
      if (statCopy) {
        const p = document2.createElement("p");
        p.textContent = statCopy.textContent.replace(/\s+/g, " ").trim();
        textCell.appendChild(p);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-highlight.js
  function parse3(element, { document: document2 }) {
    const image = element.querySelector(".c-card__item--media img, picture img, img");
    const copy = element.querySelector(".c-card__item--copy");
    const heading = element.querySelector(".c-card__item--copy h1, .c-card__item--copy h2, .c-card__item--copy h3, h2");
    const ctaLinks = Array.from(element.querySelectorAll('.c-card__item--cta a, a[class*="e-btn"]'));
    if (!image && !copy && !heading) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const imageCol = [];
    if (image) imageCol.push(image);
    const contentCol = [];
    if (copy) {
      contentCol.push(copy);
    } else if (heading) {
      contentCol.push(heading);
    }
    ctaLinks.forEach((a) => contentCol.push(a));
    const cells = [];
    cells.push([imageCol, contentCol]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-highlight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-logos.js
  function parse4(element, { document: document2 }) {
    const items = Array.from(element.querySelectorAll(".c-universal-grid__item--universal, .c-cv-universal-grid__item--universal"));
    if (items.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    items.forEach((item) => {
      const link = item.querySelector("a.card-clickable, a[href]");
      const logo = item.querySelector("img");
      const imageCell = document2.createDocumentFragment();
      if (logo) {
        imageCell.appendChild(document2.createComment(" field:image "));
        imageCell.appendChild(logo);
      }
      const textCell = document2.createDocumentFragment();
      textCell.appendChild(document2.createComment(" field:text "));
      if (link && link.getAttribute("href")) {
        const a = document2.createElement("a");
        a.setAttribute("href", link.getAttribute("href"));
        a.textContent = logo && logo.getAttribute("alt") ? logo.getAttribute("alt").trim() : link.textContent.trim() || link.getAttribute("href");
        textCell.appendChild(a);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-logos", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse5(element, { document: document2 }) {
    const image = element.querySelector(".c-card__item--media img, picture img, img");
    const copy = element.querySelector(".c-card__item--copy");
    const heading = element.querySelector(".c-card__item--copy h1, .c-card__item--copy h2, .c-card__item--copy h3, h2");
    const ctaLinks = Array.from(element.querySelectorAll('.c-card__item--cta a, a[class*="e-btn"]'));
    if (!image && !copy && !heading) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const imageCol = [];
    if (image) imageCol.push(image);
    const contentCol = [];
    if (copy) {
      contentCol.push(copy);
    } else if (heading) {
      contentCol.push(heading);
    }
    ctaLinks.forEach((a) => contentCol.push(a));
    const cells = [];
    cells.push([imageCol, contentCol]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-stock.js
  function parse6(element, { document: document2 }) {
    const sidebar = element.querySelector(".layout__region--sidebar, .c-stock-ticker");
    const main = element.querySelector(".layout__region--main, .c-card");
    if (!sidebar && !main) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const stockCol = [];
    const ticker = element.querySelector(".c-stock-ticker");
    if (ticker) {
      stockCol.push(ticker);
    } else if (sidebar) {
      stockCol.push(sidebar);
    }
    const contentCol = [];
    const image = element.querySelector(".layout__region--main img, .c-card__item--media img");
    const copy = element.querySelector(".layout__region--main .c-card__item--copy, .c-card__item--copy");
    const ctaLinks = Array.from(element.querySelectorAll(".layout__region--main .c-card__item--cta a, .c-card__item--cta a"));
    if (image) contentCol.push(image);
    if (copy) contentCol.push(copy);
    ctaLinks.forEach((a) => contentCol.push(a));
    const cells = [];
    cells.push([stockCol, contentCol]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-stock", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-news.js
  function parse7(element, { document: document2 }) {
    const slides = Array.from(element.querySelectorAll(".views-row.slick-slide")).filter((s) => !s.classList.contains("slick-cloned"));
    if (slides.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    slides.forEach((slide) => {
      const image = slide.querySelector(".image--container img, .e-image img, picture img, img");
      const tags = slide.querySelector(".view-tag-field");
      const titleLink = slide.querySelector(".view-title-field a, .view-title-field");
      const imageCell = document2.createDocumentFragment();
      if (image) {
        imageCell.appendChild(document2.createComment(" field:media_image "));
        imageCell.appendChild(image);
      }
      const textCell = document2.createDocumentFragment();
      textCell.appendChild(document2.createComment(" field:content_text "));
      if (tags) {
        const p = document2.createElement("p");
        p.textContent = tags.textContent.replace(/\s+/g, " ").trim();
        textCell.appendChild(p);
      }
      if (titleLink) {
        const h = document2.createElement("h3");
        const a = titleLink.tagName === "A" ? titleLink : titleLink.querySelector("a");
        if (a && a.getAttribute("href")) {
          const link = document2.createElement("a");
          link.setAttribute("href", a.getAttribute("href"));
          link.textContent = a.textContent.trim();
          h.appendChild(link);
        } else {
          h.textContent = titleLink.textContent.trim();
        }
        textCell.appendChild(h);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "carousel-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/covista-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["#consent_blackbar"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".skip-link",
        "header.page--header",
        ".region__admin",
        "a#main-content",
        "footer.page--footer"
      ]);
    }
  }

  // tools/importer/transformers/covista-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function transform2(hookName, element, payload) {
    const sections = payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || element.querySelector(section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-home.js
  var parsers = {
    "hero-overlay": parse,
    "cards-stats": parse2,
    "columns-highlight": parse3,
    "cards-logos": parse4,
    "columns-feature": parse5,
    "columns-stock": parse6,
    "carousel-news": parse7
  };
  var PAGE_TEMPLATE = {
    name: "home",
    description: "Covista homepage - hero, stat cards, feature columns, institution logos, stock info and news carousel",
    urls: [
      "https://www.covista.com/"
    ],
    blocks: [
      {
        name: "hero-overlay",
        instances: [
          ".t-layout__one-column.edge-to-edge.no-padding.no-max-width.layout--atge-one-column:nth-of-type(1) .block__inline-blockcomponent-banner"
        ]
      },
      {
        name: "cards-stats",
        instances: [
          ".t-layout__one-column.overlap.cc-bg-secondary-mobile .c-universal-grid"
        ]
      },
      {
        name: "columns-highlight",
        instances: [
          ".t-layout__one-column.pad-top-0.pad-bottom-0.edge-to-edge__mobile .block__inline-blockcomponent-card"
        ]
      },
      {
        name: "cards-logos",
        instances: [
          ".standard-width.p-universal-bg-color--secondary.pad-bottom-0.pad-top-0 .c-universal-grid"
        ]
      },
      {
        name: "columns-feature",
        instances: [
          ".edge-to-edge.no-padding.no-max-width.pad-top-20-desktop.pad-bottom-40-desktop .block__inline-blockcomponent-card",
          ".edge-to-edge.no-padding.no-max-width.pad-y-0.pad-bottom-50-desktop .block__inline-blockcomponent-card"
        ]
      },
      {
        name: "columns-stock",
        instances: [
          ".t-layout__two-column.layout__split--5050.sidebar-first"
        ]
      },
      {
        name: "carousel-news",
        instances: [
          ".carousel-view--edge-to-edge .block__inline-blockcomponent-embedded"
        ]
      }
    ],
    sections: [
      { id: "rc3", name: "Hero", selector: ".t-layout__one-column.edge-to-edge.no-padding.no-max-width.layout--atge-one-column:nth-of-type(1)", style: null, blocks: ["hero-overlay"], defaultContent: [] },
      { id: "rc4", name: "Stat tiles", selector: ".t-layout__one-column.overlap.cc-bg-secondary-mobile", style: null, blocks: ["cards-stats"], defaultContent: [] },
      { id: "rc5", name: "Research feature", selector: ".t-layout__one-column.pad-top-0.pad-bottom-0.edge-to-edge__mobile", style: null, blocks: ["columns-highlight"], defaultContent: [] },
      { id: "rc6", name: "Our institutions intro", selector: ".t-layout__one-column.optimized-width.p-universal-bg-color--secondary.pad-top-0.pad-bottom-0", style: "secondary", blocks: [], defaultContent: [".t-layout__one-column.optimized-width.p-universal-bg-color--secondary.pad-top-0.pad-bottom-0 .block__inline-blockcomponent-richtext"] },
      { id: "rc7", name: "Institution logos", selector: ".standard-width.p-universal-bg-color--secondary.pad-bottom-0.pad-top-0", style: "secondary", blocks: ["cards-logos"], defaultContent: [] },
      { id: "rc8", name: "Learn more CTA", selector: ".optimized-width.p-universal-bg-color--secondary.pad-top-20.pad-bottom-40", style: "secondary", blocks: [], defaultContent: [".optimized-width.p-universal-bg-color--secondary.pad-top-20.pad-bottom-40 .block__inline-blockcomponent-richtext"] },
      { id: "rc9", name: "Supporting healthcare workers", selector: ".edge-to-edge.no-padding.no-max-width.pad-top-20-desktop.pad-bottom-40-desktop", style: null, blocks: ["columns-feature"], defaultContent: [] },
      { id: "rc10", name: "Careers", selector: ".edge-to-edge.no-padding.no-max-width.pad-y-0.pad-bottom-50-desktop", style: null, blocks: ["columns-feature"], defaultContent: [] },
      { id: "rc11", name: "Stock information", selector: ".t-layout__two-column.layout__split--5050.sidebar-first", style: "secondary", blocks: ["columns-stock"], defaultContent: [] },
      { id: "rc12", name: "News and stories heading", selector: ".t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-30", style: null, blocks: [], defaultContent: [".t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-30 .block__inline-blockcomponent-richtext"] },
      { id: "rc13", name: "News carousel", selector: ".carousel-view--edge-to-edge", style: null, blocks: ["carousel-news"], defaultContent: [] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        let elements;
        try {
          elements = document2.querySelectorAll(selector);
        } catch (e) {
          console.warn(`Invalid selector for "${blockDef.name}": ${selector}`, e.message);
          return;
        }
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const {
        document: document2,
        url,
        html,
        params
      } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
