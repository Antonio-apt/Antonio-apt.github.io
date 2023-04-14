import './scss/main.scss';
import LocomotiveScroll from 'locomotive-scroll';
import initTranslations from './scripts/i18n'

const scroll = new LocomotiveScroll();

const { BASE_URL } = import.meta.env

initTranslations();
