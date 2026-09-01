/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay. Base: hero.
 * Source: https://www.covista.com/ (.block__inline-blockcomponent-banner)
 * Generated for xwalk project — field hints per model blocks/hero-overlay/_hero-overlay.json
 * Model fields: image (reference), imageAlt (collapsed), text (richtext).
 * Library structure: 1 column, up to 3 rows (name / image / text).
 */
export default function parse(element, { document }) {
  // --- INPUT EXTRACTION (validated against source.html) ---
  // Background asset: source has a desktop <video> and a mobile <img> inside .p-banner__media.
  // Use the mobile <img> as the importable background image (videos are not authorable references).
  const image = element.querySelector('.p-banner__media img, .e-image img, picture img, img');

  // Content: heading + optional CTA live in .c-banner__content--inner.
  const heading = element.querySelector('h1, h2, .p-banner-heading, [class*="banner--heading"]');
  const ctaLinks = Array.from(element.querySelectorAll('.p-banner-cta a, [class*="banner"] a[class*="btn"], a[class*="e-btn"]'));

  // Empty-block guard.
  if (!image && !heading && ctaLinks.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image cell — field:image (imageAlt collapses into <img alt>).
  if (image) {
    const imgCell = document.createDocumentFragment();
    imgCell.appendChild(document.createComment(' field:image '));
    imgCell.appendChild(image);
    cells.push([imgCell]);
  }

  // Row 3: text cell — field:text (heading + CTA rendered as richtext).
  const textParts = [];
  if (heading) textParts.push(heading);
  ctaLinks.forEach((a) => textParts.push(a));
  if (textParts.length) {
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    textParts.forEach((node) => textCell.appendChild(node));
    cells.push([textCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
