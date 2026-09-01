/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-stats. Base: cards (container).
 * Source: https://www.covista.com/ (.c-universal-grid)
 * xwalk project — field hints per child model blocks/cards-stats/_cards-stats.json
 * Child (card) model fields: image (reference), text (richtext).
 * Library structure: container, one row per card, 2 cells [image, text].
 */
export default function parse(element, { document }) {
  // Each stat tile is a universal-grid item.
  const items = Array.from(element.querySelectorAll('.c-universal-grid__item--universal, .c-cv-universal-grid__item--universal'));

  if (items.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  items.forEach((item) => {
    // Image cell: stat tiles use decorative icons rendered either as inline base64-SVG
    // <img> or as icon-font <span>. Only emit a real referenceable asset (http(s) src);
    // base64 data-URIs and icon fonts are decorative, so the image cell stays empty
    // (an empty cell is valid per the library description and gets no field hint).
    const realImage = Array.from(item.querySelectorAll('img'))
      .find((im) => /^https?:/i.test(im.getAttribute('src') || ''));

    // Text cell: stat value (.e-stat) as heading + supporting copy (.e-stat-copy).
    const statValue = item.querySelector('.e-stat');
    const statCopy = item.querySelector('.e-stat-copy');

    // Image cell — field:image (only when a real referenceable image exists).
    const imageCell = document.createDocumentFragment();
    if (realImage) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(realImage);
    }

    // Text cell — field:text. Promote the stat number to a heading.
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (statValue) {
      const h = document.createElement('h3');
      h.textContent = statValue.textContent.trim();
      textCell.appendChild(h);
    }
    if (statCopy) {
      const p = document.createElement('p');
      p.textContent = statCopy.textContent.replace(/\s+/g, ' ').trim();
      textCell.appendChild(p);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells });
  element.replaceWith(block);
}
