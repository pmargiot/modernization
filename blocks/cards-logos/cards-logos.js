import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const picture = row.querySelector('picture');
    const link = row.querySelector('a');

    if (picture) {
      if (link) {
        // Source wraps each logo in its institution link (logo-only, no visible label)
        const anchor = document.createElement('a');
        anchor.href = link.href;
        const label = link.textContent.trim();
        if (label) anchor.setAttribute('aria-label', label);
        anchor.append(picture);
        li.append(anchor);
      } else {
        li.append(picture);
      }
    }

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
