/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-news. Base: carousel (container).
 * Source: https://www.covista.com/ (.block__inline-blockcomponent-embedded)
 * xwalk project — field hints per child model blocks/carousel-news/_carousel-news.json
 * Child (carousel-news-item) model fields: media_image (reference), media_imageAlt (collapsed),
 *   content_text (richtext).
 * Library structure: container, one row per slide, 2 cells [media_image, content_text].
 * NOTE: source is a Slick carousel that duplicates slides as `.slick-cloned` — dedupe those.
 */
export default function parse(element, { document }) {
  // Only real slides — exclude Slick's cloned duplicates.
  const slides = Array.from(element.querySelectorAll('.views-row.slick-slide'))
    .filter((s) => !s.classList.contains('slick-cloned'));

  if (slides.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  slides.forEach((slide) => {
    const image = slide.querySelector('.image--container img, .e-image img, picture img, img');
    const tags = slide.querySelector('.view-tag-field');
    const titleLink = slide.querySelector('.view-title-field a, .view-title-field');

    // Cell 1: media_image — field:media_image (media_imageAlt collapses into <img alt>).
    const imageCell = document.createDocumentFragment();
    if (image) {
      imageCell.appendChild(document.createComment(' field:media_image '));
      imageCell.appendChild(image);
    }

    // Cell 2: content_text — field:content_text (tags line + linked title as richtext).
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:content_text '));
    if (tags) {
      const p = document.createElement('p');
      p.textContent = tags.textContent.replace(/\s+/g, ' ').trim();
      textCell.appendChild(p);
    }
    if (titleLink) {
      const h = document.createElement('h3');
      const a = titleLink.tagName === 'A' ? titleLink : titleLink.querySelector('a');
      if (a && a.getAttribute('href')) {
        const link = document.createElement('a');
        link.setAttribute('href', a.getAttribute('href'));
        link.textContent = a.textContent.trim();
        h.appendChild(link);
      } else {
        h.textContent = titleLink.textContent.trim();
      }
      textCell.appendChild(h);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-news', cells });
  element.replaceWith(block);
}
