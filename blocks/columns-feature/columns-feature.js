export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-feature-${cols.length}-cols`);

  // Tag image vs. content columns so CSS can lay them out.
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic && pic.closest('div') === col && col.children.length === 1) {
        // picture is the only content in this column -> media column
        col.classList.add('columns-feature-img-col');
      } else {
        col.classList.add('columns-feature-content');
      }
    });
  });

  // The source alternates layout between successive feature blocks:
  // 1st = image left / text right, 2nd = image right / text left, etc.
  // The authored content is identical for each instance, so mirror by
  // document order: every even-indexed instance (0-based) is reversed.
  const features = [...document.querySelectorAll('.columns-feature.block')];
  const index = features.indexOf(block);
  if (index % 2 === 1) {
    block.classList.add('columns-feature-reversed');
  }
}
