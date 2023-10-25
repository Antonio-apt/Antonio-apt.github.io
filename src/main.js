import "./styles/main.scss";
import initTranslations from "./scripts/i18n";
import init from "./scripts/star";
import addGlow from "./scripts/glow";
import AnimateScroll from "./scripts/animate-scroll";
import MouseHoverTilt from "./scripts/tilt";

const { BASE_URL } = import.meta.env;

const animateScroll = new AnimateScroll("[data-anime='scroll']");
animateScroll.init();

addGlow(".header__translate-section", "lang-button");
addGlow("main", "card");

(function() {
  let burger = document.getElementById('burger');
  let nav = document.getElementById('main-nav');
  let headerActionsMobile = document.querySelector('.header__actions--mobile');

  if (!burger || !nav || !headerActionsMobile) {
      return;
  }

  burger.addEventListener('click', toggleMenu);

  function toggleMenu() {
      let isOpen = burger.classList.toggle('is-open');
      nav.classList.toggle('is-open');

      if (isOpen) {
          headerActionsMobile.style.height = '100vh';
      } else {
          setTimeout(function() {
              headerActionsMobile.style.height = '';
          }, 500); 
      }
  }

  let navItems = nav.querySelectorAll('a');
  navItems.forEach(item => {
      item.addEventListener('click', function() {
          if (burger.classList.contains('is-open')) {
              toggleMenu();
          }
      });
  });
})();





(() => {
  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.querySelector(".header__actions");

  var checkScroll = function () {
    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      direction = 2;
    } else if (curScroll < prevScroll) {
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  var toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > 52) {
      header.classList.add("hide");
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove("hide");
      prevDirection = direction;
    }
  };

  window.addEventListener("scroll", checkScroll);
})();

const zoom = document.querySelector(".carrousels");
const zoomText = document.querySelectorAll(".carrousel");
const minZoom = 1;
const maxZoom = 1.5;

addEventListener("scroll", (e) => {
  const vh = window.innerHeight / 100;
  const scrollTop = document.documentElement.scrollTop;
  const start = 100 * vh;
  const stop = 200 * vh;
  if (scrollTop > start && scrollTop < stop) {
    const scale = Math.max(maxZoom - (scrollTop - start) / 500, minZoom);
    zoom.style.transform = `scale(1, ${scale})`;
    zoomText.forEach((text) => {
      text.style.transform = `scale(${scale}, 1)`;
    });
  }
});

initTranslations();
init();
