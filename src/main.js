import './scss/main.scss';
import LocomotiveScroll from 'locomotive-scroll';
import initTranslations from './scripts/i18n';
import init from './scripts/star';

const scroll = new LocomotiveScroll();

const { BASE_URL } = import.meta.env

document.querySelector(".header__actions").onmousemove = e => {
  for(const button of document.getElementsByClassName("lang-button")) {
    const rect = button.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

          button.style.setProperty("--mouse-x", `${x}px`);
          button.style.setProperty("--mouse-y", `${y}px`);
  };
}

(() => {
  const container = document.querySelector('.about-me__container');
  const inner = document.querySelector('.about-me__name');
  const mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition(event) {
      const { clientX, clientY } = event;
      this.x = clientX - this._x;
      this.y = (clientY - this._y) * -1;
    },
    setOrigin(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show() {
      return `(${this.x}, ${this.y})`;
    },
  };

  mouse.setOrigin(container);

  let counter = 0;
  const updateRate = 10;
  const isTimeToUpdate = () => counter++ % updateRate === 0;

  const onMouseEnterHandler = event => update(event);

  const onMouseLeaveHandler = () => {
    inner.style = '';
  };

  const onMouseMoveHandler = event => {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  const update = event => {
    mouse.updatePosition(event);
    const { offsetWidth, offsetHeight } = inner;
    const x = (mouse.y / offsetHeight / 2).toFixed(2);
    const y = (mouse.x / offsetWidth / 2).toFixed(2);
    updateTransformStyle(`rotateX(${x}deg) rotateY(${y}deg)`);
  };

  const updateTransformStyle = style => {
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
  };

  container.addEventListener('mouseenter', onMouseEnterHandler);
  container.addEventListener('mouseleave', onMouseLeaveHandler);
  container.addEventListener('mousemove', onMouseMoveHandler);
})();


initTranslations();
init();
