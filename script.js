const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.book-card');

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

const illustrationImages = [
  { src: 'images/3.png', alt: 'Asins saullēkts ilustrācija - maina skats uz Livonijas mežiem' },
  { src: 'images/4.png', alt: 'Asins saullēkts ilustrācija - jauneklis Jānis mežā' },
  { src: 'images/10.png', alt: 'Asins saullēkts ilustrācija - kauju ainas' },
  { src: 'images/11.png', alt: 'Asins saullēkts ilustrācija - ievainots jauneklis' }
];

const illustrationImage = document.getElementById('illustration-image');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const illustrationStage = document.querySelector('.illustration-stage');

let currentIllustrationIndex = 0;

function renderIllustration(index) {
  if (!illustrationImage) return;
  illustrationImage.src = illustrationImages[index].src;
  illustrationImage.alt = illustrationImages[index].alt;
  updateDots(index);
}

function updateDots(index) {
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function createCarouselDots() {
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  
  illustrationImages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to illustration ${index + 1}`);
    dot.addEventListener('click', () => {
      currentIllustrationIndex = index;
      renderIllustration(currentIllustrationIndex);
    });
    dotsContainer.appendChild(dot);
  });
  
  illustrationStage?.parentElement?.appendChild(dotsContainer);
}

if (prevBtn && nextBtn && illustrationImage) {
  prevBtn.addEventListener('click', () => {
    currentIllustrationIndex = (currentIllustrationIndex - 1 + illustrationImages.length) % illustrationImages.length;
    renderIllustration(currentIllustrationIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIllustrationIndex = (currentIllustrationIndex + 1) % illustrationImages.length;
    renderIllustration(currentIllustrationIndex);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!illustrationImage) return;
    const illustCarousel = illustrationImage.closest('.illustration-carousel');
    if (!illustCarousel) return;
    
    if (e.key === 'ArrowLeft') {
      currentIllustrationIndex = (currentIllustrationIndex - 1 + illustrationImages.length) % illustrationImages.length;
      renderIllustration(currentIllustrationIndex);
    } else if (e.key === 'ArrowRight') {
      currentIllustrationIndex = (currentIllustrationIndex + 1) % illustrationImages.length;
      renderIllustration(currentIllustrationIndex);
    }
  });

  createCarouselDots();
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.getElementById(targetId.slice(1));
    if (!target) return;

    event.preventDefault();

    const offset = 88;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach((section) => {
  section.style.animationPlayState = 'paused';
  observer.observe(section);
});

const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
