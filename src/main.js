import './scss/main.scss';
import LocomotiveScroll from 'locomotive-scroll';
import initTranslations from './scripts/i18n';
import init from './scripts/star';

const scroll = new LocomotiveScroll();

const { BASE_URL } = import.meta.env

initTranslations();
init();
