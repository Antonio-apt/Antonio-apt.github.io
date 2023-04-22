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

initTranslations();
init();
