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


initTranslations();
init();
