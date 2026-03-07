import "./styles/main.scss";
import "./scripts/tilt";
import initTranslations from "./scripts/i18n";
import initStars from "./scripts/star";
import addGlow from "./scripts/glow";
import AnimateScroll from "./scripts/animate-scroll";
import initBurger from "./scripts/burger";
import initHeader from "./scripts/header";
import initCarousel from "./scripts/carousel";

new AnimateScroll("[data-anime='scroll']").init();

addGlow(".header__translate-section", "lang-button");
addGlow("main", "card");

initBurger();
initHeader();
initCarousel();
initTranslations();
initStars();
