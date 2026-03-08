export default class AnimateScroll {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
  }

  init() {
    if (!this.sections.length) return this;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.sections.forEach((section) => this.observer.observe(section));
    return this;
  }

  stop() {
    if (this.observer) this.observer.disconnect();
  }
}
