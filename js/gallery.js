/* ============================================
   GALLERY DATA
   To add more photos later: drop the file in assets/gallery/
   and add one entry below. category must match a data-filter
   value in gallery.html's filter buttons.
   ============================================ */
const galleryItems = [
  {
    src: 'assets/gallery/aluminium-bifold-doors-install-1.jpg',
    category: 'glazing',
    caption: 'Aluminium bifold door installation — in progress'
  },
  {
    src: 'assets/gallery/aluminium-bifold-doors-complete.jpg',
    category: 'glazing',
    caption: 'Aluminium bifold doors — completed patio opening'
  },
  {
    src: 'assets/gallery/paving-installation-1.jpg',
    category: 'paving',
    caption: 'Interlocking paver installation — driveway'
  },
  {
    src: 'assets/gallery/paving-driveway-1.jpg',
    category: 'paving',
    caption: 'Driveway paving — nearing completion'
  },
  {
    src: 'assets/gallery/paving-driveway-2.jpg',
    category: 'paving',
    caption: 'Paving in progress — courtyard driveway'
  },
  {
    src: 'assets/gallery/plumbing-drainage-trench.jpg',
    category: 'plumbing',
    caption: 'Drainage line — trenched and laid'
  },
  {
    src: 'assets/gallery/roof-truss-carpentry.jpg',
    category: 'carpentry',
    caption: 'Roof truss and ceiling batten installation'
  },
  {
    src: 'assets/gallery/interior-painting-finishes.jpg',
    category: 'interior',
    caption: 'Interior wall finishing and painting'
  }
];

const grid = document.getElementById('galleryGrid');
const filterBar = document.getElementById('filterBar');

function renderGrid(filter) {
  grid.innerHTML = '';
  galleryItems.forEach((item, index) => {
    if (filter !== 'all' && item.category !== filter) return;
    const fig = document.createElement('button');
    fig.className = 'gallery-item';
    fig.setAttribute('data-index', index);
    fig.setAttribute('aria-label', `View: ${item.caption}`);
    fig.innerHTML = `<img src="${item.src}" alt="${item.caption}" loading="lazy">`;
    fig.addEventListener('click', () => openLightbox(index));
    grid.appendChild(fig);
  });
}

renderGrid('all');

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  renderGrid(btn.dataset.filter);
});

/* ============================================
   LIGHTBOX
   ============================================ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function updateLightbox() {
  const item = galleryItems[currentIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.caption;
  lightboxCaption.textContent = item.caption;
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNext);
lightboxPrev.addEventListener('click', showPrev);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});
