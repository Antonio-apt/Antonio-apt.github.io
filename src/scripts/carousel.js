const MIN_SCALE = 1;
const MAX_SCALE = 1.5;
const ZOOM_SPEED = 500;

export default function initCarousel() {
  const carrousels = document.querySelector('.carrousels');
  const carrouselItems = document.querySelectorAll('.carrousel');

  if (!carrousels || !carrouselItems.length) return;

  window.addEventListener('scroll', () => {
    const vh = window.innerHeight / 100;
    const scrollTop = document.documentElement.scrollTop;
    const start = 100 * vh;
    const stop = 200 * vh;

    if (scrollTop > start && scrollTop < stop) {
      const scale = Math.max(MAX_SCALE - (scrollTop - start) / ZOOM_SPEED, MIN_SCALE);
      carrousels.style.transform = `scale(1, ${scale})`;
      carrouselItems.forEach((item) => {
        item.style.transform = `scale(${scale}, 1)`;
      });
    }
  });
}
