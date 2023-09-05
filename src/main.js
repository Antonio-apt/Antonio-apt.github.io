import "./styles/main.scss";
import LocomotiveScroll from "locomotive-scroll";
import initTranslations from "./scripts/i18n";
import init from "./scripts/star";
import addGlow from "./scripts/glow";

const { BASE_URL } = import.meta.env;

addGlow(".header__translate-section", "lang-button");
addGlow(".resume", "card");


(()=> {

  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.querySelector('.header__actions');

  var checkScroll = function() {

    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) { 
      direction = 2;
    }
    else if (curScroll < prevScroll) { 
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }
    
    prevScroll = curScroll;
  };

  var toggleHeader = function(direction, curScroll) {
    if (direction === 2 && curScroll > 52) { 
      
      header.classList.add('hide');
      prevDirection = direction;
    }
    else if (direction === 1) {
      header.classList.remove('hide');
      prevDirection = direction;
    }
  };
  
  window.addEventListener('scroll', checkScroll);

})();

const zoom = document.querySelector('.carrousels');
const zoomText = document.querySelectorAll('.carrousel');
const minZoom = 1;
const maxZoom = 1.5;

addEventListener('scroll', e => {
	const vh = window.innerHeight / 100;
  const scrollTop = document.documentElement.scrollTop;
  const start = 100 * vh;
  const stop = 200 * vh;
  if (scrollTop > start && scrollTop < stop) {
	  const scale = Math.max(maxZoom - (scrollTop - start) / 500, minZoom);
  	zoom.style.transform = `scale(1, ${scale})`
    zoomText.forEach(text => {
  	  text.style.transform = `scale(${scale}, 1)`
    })
  }
})

const content = document.querySelector(".stack-description");
const maxSkew = 2;
const maxRotate = 2;

let currentPosition = window.pageYOffset;

function skewEffect() {
  const newPosition = window.pageYOffset;
  const dif = newPosition - currentPosition;

  let skew = dif * 0.8;
  let rotate = dif * 0.2;
  if (skew > maxSkew || skew < -maxSkew) {
    if (skew > 0) {
      skew = maxSkew;
    } else if (skew < 0) {
      skew = -maxSkew;
    }
  }
  if (rotate > maxRotate || rotate < -maxRotate) {
    if (rotate > 0) {
      rotate = maxRotate;
    } else if (skew < 0) {
      rotate = -maxRotate;
    }
  }

  content.style.transform = `skewY(${skew}deg) rotateY(${rotate}deg)`;
  currentPosition = newPosition;
  requestAnimationFrame(skewEffect);
}

skewEffect();



initTranslations();
init();
