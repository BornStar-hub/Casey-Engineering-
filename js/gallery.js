/* ============================================
   GALLERY — loads its photo list from
   assets/gallery/manifest.json instead of a
   hand-typed array. To add photos: drop the files
   in assets/gallery/ and regenerate manifest.json
   using tools/manifest-builder.html.
   ============================================ */
const grid = document.getElementById('galleryGrid');
const galleryNote = document.getElementById('galleryNote');

let galleryItems = [];

fetch('assets/gallery/manifest.json')
  .then(res => {
    if (!res.ok) throw new Error('manifest not found');
    return res.json();
  })
  .then(filenames => {
    galleryItems = filenames.map(name => ({
      src: `assets/gallery/${name}`,
      caption: 'Casey Engineered Maintenance Systems — site work'
    }));
    renderGrid();
  })
  .catch(() => {
    if (galleryNote) {
      galleryNote.textContent = "Photos couldn't be loaded right now — please check back shortly.";
    }
  });

function renderGrid() {
  grid.innerHTML = '';
  galleryItems.forEach((item, index) => {
    const fig = document.createElement('button');
    fig.className = 'gallery-item';
    fig.setAttribute('aria-label', 'View photo');
    fig.innerHTML = `<img src="${item.src}" alt="${item.caption}" loading="lazy">`;
    fig.addEventListener('click', () => openLightbox(index));
    grid.appendChild(fig);
  });
}

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
