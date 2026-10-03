const carouselTrack = document.querySelector('[data-carousel-track]');
const carouselButtons = document.querySelectorAll('[data-carousel-direction]');
const catalogMenu = document.querySelector('.nav-menu');
const servicesLink = document.querySelector('.mega-menu a[href="#productos"]');

servicesLink?.addEventListener('click', () => {
  if (catalogMenu) {
    catalogMenu.open = false;
  }
});

document.addEventListener('click', (event) => {
  if (catalogMenu?.open && !catalogMenu.contains(event.target)) {
    catalogMenu.open = false;
  }
});

if (carouselTrack && carouselButtons.length) {
  const getScrollDistance = () => {
    const card = carouselTrack.querySelector('.featured-card');
    const gap = Number.parseFloat(getComputedStyle(carouselTrack).gap) || 0;
    return card ? card.getBoundingClientRect().width + gap : carouselTrack.clientWidth;
  };

  const updateCarouselButtons = () => {
    const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth - 1;
    carouselButtons.forEach((button) => {
      button.disabled = button.dataset.carouselDirection === 'previous'
        ? carouselTrack.scrollLeft <= 1
        : carouselTrack.scrollLeft >= maxScroll;
    });
  };

  carouselButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.carouselDirection === 'next' ? 1 : -1;
      carouselTrack.scrollBy({ left: direction * getScrollDistance(), behavior: 'smooth' });
    });
  });

  carouselTrack.addEventListener('scroll', updateCarouselButtons, { passive: true });
  window.addEventListener('resize', updateCarouselButtons);
  updateCarouselButtons();
}