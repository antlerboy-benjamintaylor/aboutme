(() => {
  const q = document.querySelector('#q');
  const buttons = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('[data-tags]')];
  let active = 'all';

  function apply() {
    const needle = (q?.value || '').trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').toLowerCase();
      const text = card.innerText.toLowerCase();
      const visible = (active === 'all' || tags.includes(active)) && (!needle || text.includes(needle));
      card.classList.toggle('hidden', !visible);
      if (visible) shown += 1;
    });
    const count = document.querySelector('#result-count');
    if (count) count.textContent = `${shown} item${shown === 1 ? '' : 's'} shown`;
  }

  q?.addEventListener('input', apply);
  buttons.forEach(button => button.addEventListener('click', () => {
    active = button.dataset.filter || 'all';
    buttons.forEach(other => other.classList.toggle('active', other === button));
    apply();
  }));
  if (cards.length) apply();

  const data = document.querySelector('#unexpected-data');
  const unexpectedButton = document.querySelector('#unexpected-button');
  const unexpectedHeading = document.querySelector('#unexpected-heading');
  const unexpectedType = document.querySelector('#unexpected-type');
  const unexpectedTitle = document.querySelector('#unexpected-title');
  const unexpectedNote = document.querySelector('#unexpected-note');
  const unexpectedOpen = document.querySelector('#unexpected-open');
  let last = -1;

  function randomIndex(max) {
    if (window.crypto?.getRandomValues) {
      const bucket = new Uint32Array(1);
      window.crypto.getRandomValues(bucket);
      return bucket[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function showUnexpected() {
    if (!data) return;
    const items = JSON.parse(data.textContent || '[]');
    if (!items.length) return;
    let next = randomIndex(items.length);
    if (items.length > 1 && next === last) next = (next + 1) % items.length;
    last = next;
    const item = items[next];
    unexpectedType.textContent = item.type;
    unexpectedTitle.textContent = item.title;
    unexpectedNote.textContent = item.note;
    unexpectedOpen.href = item.url;
  }

  unexpectedButton?.addEventListener('click', showUnexpected);
  unexpectedHeading?.addEventListener('click', showUnexpected);
  unexpectedHeading?.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showUnexpected();
    }
  });
  if (data) showUnexpected();
})();
