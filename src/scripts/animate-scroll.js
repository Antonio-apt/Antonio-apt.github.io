import debounce from './debouce';

export default class AnimateScroll {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowHalf = Math.floor(window.innerHeight * 0.6);

    this.animate = debounce(this.animate.bind(this), 50);
  }

  init() {
    if (!this.sections.length) return this;
    this.getDistances();
    this.animate();
    this.addEvent();
    return this;
  }

  addEvent() {
    window.addEventListener('scroll', this.animate);
  }

  getDistances() {
    const yOffset = window.pageYOffset || window.scrollY;
    this.distances = [...this.sections].map((section) => ({
      el: section,
      offset: section.getBoundingClientRect().top + yOffset - this.windowHalf,
    }));
  }

  animate() {
    const currentY = window.pageYOffset || window.scrollY;
    this.distances.forEach((dist) => {
      if (currentY > dist.offset) {
        dist.el.classList.add('active');
      } else if (dist.el.classList.contains('active')) {
        dist.el.classList.remove('active');
      }
    });
  }

  stop() {
    window.removeEventListener('scroll', this.animate);
  }
}
