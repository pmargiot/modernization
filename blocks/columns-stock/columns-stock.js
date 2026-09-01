export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const cells = [...row.children];
  const info = cells[0];
  const promo = cells[1];

  // LEFT column — group the flat paragraph sequence into a stock ticker.
  if (info) {
    info.classList.add('columns-stock-info');
    const ps = [...info.querySelectorAll(':scope > p')];
    // ps: [0] exchange, [1] as-of, [2] delay note, [3] price, [4] change label, [5] change value
    if (ps.length >= 6) {
      const [exchange, asOf, delayNote, price, changeLabel, changeValue] = ps;

      // Meta row: exchange on the left, timestamp + delay note stacked on the right.
      const delay = document.createElement('div');
      delay.className = 'columns-stock-delay';
      delay.append(asOf, delayNote);
      const meta = document.createElement('div');
      meta.className = 'columns-stock-meta';
      info.insertBefore(meta, exchange);
      meta.append(exchange, delay);
      exchange.classList.add('columns-stock-exchange');

      // Oversized price value.
      price.classList.add('columns-stock-price');

      // Change row: label on the left, value on the right.
      const change = document.createElement('div');
      change.className = 'columns-stock-change';
      info.insertBefore(change, changeLabel);
      change.append(changeLabel, changeValue);
      changeLabel.classList.add('columns-stock-change-label');
      changeValue.classList.add('columns-stock-change-value');
    }
  }

  // RIGHT column — promo card with a floated portrait.
  if (promo) {
    promo.classList.add('columns-stock-promo');
    const imgP = [...promo.children].find((c) => c.querySelector('picture'));
    if (imgP) imgP.classList.add('columns-stock-promo-img');
  }
}
