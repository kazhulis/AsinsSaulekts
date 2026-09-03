const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.book-card');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    cards.forEach((card) => {
      const category = card.dataset.category;
      const matches = selectedFilter === 'all' || category === selectedFilter;
      card.classList.toggle('hidden', !matches);
    });
  });
});

cards.forEach((card) => {
  card.addEventListener('click', () => {
    cards.forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');
  });
});
