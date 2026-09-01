/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-logos. Base: cards (container).
 * Source: https://www.covista.com/ (.c-universal-grid)
 * xwalk project — field hints per child model blocks/cards-logos/_cards-logos.json
 * Child (card) model fields: image (reference), text (richtext).
 * Library structure: container, one row per card, 2 cells [image, text].
 * Each logo card is an <a class="card-clickable"> wrapping a logo <img>.
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll('.c-universal-grid__item--universal, .c-cv-universal-grid__item--universal'));

  if (items.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  items.forEach((item) => {
    const link = item.querySelector('a.card-clickable, a[href]');
    const logo = item.querySelector('img');

    // Image cell — field:image (imageAlt collapses into <img alt>).
    const imageCell = document.createDocumentFragment();
    if (logo) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(logo);
    }

    // Text cell — field:text. Preserve the institution link as the card's linked text.
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (link && link.getAttribute('href')) {
      const a = document.createElement('a');
      a.setAttribute('href', link.getAttribute('href'));
      // Use the logo alt as accessible link text when available.
      a.textContent = (logo && logo.getAttribute('alt')) ? logo.getAttribute('alt').trim() : (link.textContent.trim() || link.getAttribute('href'));
      textCell.appendChild(a);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-logos', cells });
  element.replaceWith(block);
}
