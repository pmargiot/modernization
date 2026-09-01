/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroOverlayParser from './parsers/hero-overlay.js';
import cardsStatsParser from './parsers/cards-stats.js';
import columnsHighlightParser from './parsers/columns-highlight.js';
import cardsLogosParser from './parsers/cards-logos.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import columnsStockParser from './parsers/columns-stock.js';
import carouselNewsParser from './parsers/carousel-news.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/covista-cleanup.js';
import sectionsTransformer from './transformers/covista-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-overlay': heroOverlayParser,
  'cards-stats': cardsStatsParser,
  'columns-highlight': columnsHighlightParser,
  'cards-logos': cardsLogosParser,
  'columns-feature': columnsFeatureParser,
  'columns-stock': columnsStockParser,
  'carousel-news': carouselNewsParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'home',
  description: 'Covista homepage - hero, stat cards, feature columns, institution logos, stock info and news carousel',
  urls: [
    'https://www.covista.com/',
  ],
  blocks: [
    {
      name: 'hero-overlay',
      instances: [
        '.t-layout__one-column.edge-to-edge.no-padding.no-max-width.layout--atge-one-column:nth-of-type(1) .block__inline-blockcomponent-banner',
      ],
    },
    {
      name: 'cards-stats',
      instances: [
        '.t-layout__one-column.overlap.cc-bg-secondary-mobile .c-universal-grid',
      ],
    },
    {
      name: 'columns-highlight',
      instances: [
        '.t-layout__one-column.pad-top-0.pad-bottom-0.edge-to-edge__mobile .block__inline-blockcomponent-card',
      ],
    },
    {
      name: 'cards-logos',
      instances: [
        '.standard-width.p-universal-bg-color--secondary.pad-bottom-0.pad-top-0 .c-universal-grid',
      ],
    },
    {
      name: 'columns-feature',
      instances: [
        '.edge-to-edge.no-padding.no-max-width.pad-top-20-desktop.pad-bottom-40-desktop .block__inline-blockcomponent-card',
        '.edge-to-edge.no-padding.no-max-width.pad-y-0.pad-bottom-50-desktop .block__inline-blockcomponent-card',
      ],
    },
    {
      name: 'columns-stock',
      instances: [
        '.t-layout__two-column.layout__split--5050.sidebar-first',
      ],
    },
    {
      name: 'carousel-news',
      instances: [
        '.carousel-view--edge-to-edge .block__inline-blockcomponent-embedded',
      ],
    },
  ],
  sections: [
    { id: 'rc3', name: 'Hero', selector: '.t-layout__one-column.edge-to-edge.no-padding.no-max-width.layout--atge-one-column:nth-of-type(1)', style: null, blocks: ['hero-overlay'], defaultContent: [] },
    { id: 'rc4', name: 'Stat tiles', selector: '.t-layout__one-column.overlap.cc-bg-secondary-mobile', style: null, blocks: ['cards-stats'], defaultContent: [] },
    { id: 'rc5', name: 'Research feature', selector: '.t-layout__one-column.pad-top-0.pad-bottom-0.edge-to-edge__mobile', style: null, blocks: ['columns-highlight'], defaultContent: [] },
    { id: 'rc6', name: 'Our institutions intro', selector: '.t-layout__one-column.optimized-width.p-universal-bg-color--secondary.pad-top-0.pad-bottom-0', style: 'secondary', blocks: [], defaultContent: ['.t-layout__one-column.optimized-width.p-universal-bg-color--secondary.pad-top-0.pad-bottom-0 .block__inline-blockcomponent-richtext'] },
    { id: 'rc7', name: 'Institution logos', selector: '.standard-width.p-universal-bg-color--secondary.pad-bottom-0.pad-top-0', style: 'secondary', blocks: ['cards-logos'], defaultContent: [] },
    { id: 'rc8', name: 'Learn more CTA', selector: '.optimized-width.p-universal-bg-color--secondary.pad-top-20.pad-bottom-40', style: 'secondary', blocks: [], defaultContent: ['.optimized-width.p-universal-bg-color--secondary.pad-top-20.pad-bottom-40 .block__inline-blockcomponent-richtext'] },
    { id: 'rc9', name: 'Supporting healthcare workers', selector: '.edge-to-edge.no-padding.no-max-width.pad-top-20-desktop.pad-bottom-40-desktop', style: null, blocks: ['columns-feature'], defaultContent: [] },
    { id: 'rc10', name: 'Careers', selector: '.edge-to-edge.no-padding.no-max-width.pad-y-0.pad-bottom-50-desktop', style: null, blocks: ['columns-feature'], defaultContent: [] },
    { id: 'rc11', name: 'Stock information', selector: '.t-layout__two-column.layout__split--5050.sidebar-first', style: 'secondary', blocks: ['columns-stock'], defaultContent: [] },
    { id: 'rc12', name: 'News and stories heading', selector: '.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-30', style: null, blocks: [], defaultContent: ['.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-30 .block__inline-blockcomponent-richtext'] },
    { id: 'rc13', name: 'News carousel', selector: '.carousel-view--edge-to-edge', style: null, blocks: ['carousel-news'], defaultContent: [] },
  ],
};

// TRANSFORMER REGISTRY - cleanup first, then section breaks/metadata
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      let elements;
      try {
        elements = document.querySelectorAll(selector);
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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path (map root URL to /index)
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
