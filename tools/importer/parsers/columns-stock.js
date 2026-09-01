/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-stock. Base: columns.
 * Source: https://www.covista.com/ (.t-layout__two-column.layout__split--5050.sidebar-first)
 * xwalk project — Columns blocks do NOT use field hints (hinting.md Rule 4 exception).
 * Library structure: 2-column layout; second row holds the columns' content.
 * Source: sidebar region = stock ticker (heading + price + change); main region = image+content card.
 */
export default function parse(element, { document }) {
  const sidebar = element.querySelector('.layout__region--sidebar, .c-stock-ticker');
  const main = element.querySelector('.layout__region--main, .c-card');

  if (!sidebar && !main) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Column 1: stock ticker content.
  const stockCol = [];
  const ticker = element.querySelector('.c-stock-ticker');
  if (ticker) {
    stockCol.push(ticker);
  } else if (sidebar) {
    stockCol.push(sidebar);
  }

  // Column 2: image + copy + CTA from the main card.
  const contentCol = [];
  const image = element.querySelector('.layout__region--main img, .c-card__item--media img');
  const copy = element.querySelector('.layout__region--main .c-card__item--copy, .c-card__item--copy');
  const ctaLinks = Array.from(element.querySelectorAll('.layout__region--main .c-card__item--cta a, .c-card__item--cta a'));
  if (image) contentCol.push(image);
  if (copy) contentCol.push(copy);
  ctaLinks.forEach((a) => contentCol.push(a));

  const cells = [];
  cells.push([stockCol, contentCol]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-stock', cells });
  element.replaceWith(block);
}
