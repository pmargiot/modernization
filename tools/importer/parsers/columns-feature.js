/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature. Base: columns.
 * Source: https://www.covista.com/ (.block__inline-blockcomponent-card) — 2 instances.
 * xwalk project — Columns blocks do NOT use field hints (hinting.md Rule 4 exception).
 * Library structure: 2-column layout; second row holds the columns' content.
 * Source is a two-column card: media (image) + content (heading/text/CTA).
 */
export default function parse(element, { document }) {
  const image = element.querySelector('.c-card__item--media img, picture img, img');
  const copy = element.querySelector('.c-card__item--copy');
  const heading = element.querySelector('.c-card__item--copy h1, .c-card__item--copy h2, .c-card__item--copy h3, h2');
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
