import i18next from "i18next";
import LocomotiveScroll from "locomotive-scroll";

const loadLanguages = () => {
  return fetch('/languages.json')
    .then(response => response.json());
};

const getTranslationKey = (el, defaultKey) => {
  const key = el.dataset.i18n;
  if (key) {
    return key;
  }
  return defaultKey;
};

const translateElement = (el, languages) => {
  const defaultKey = el.innerText;
  const locale = el.dataset.locale || i18next.language;
  const key = getTranslationKey(el, defaultKey);
  const translation = languages[locale][key];
  el.innerText = translation || defaultKey;
};

const initTranslations = () => {
  loadLanguages().then(languages => {
    i18next.init({
      lng: 'en',
      resources: languages,
      fallbackLng: 'en'
    }, () => {
      const elements = document.querySelectorAll("[data-i18n]");
      elements.forEach(el => {
        translateElement(el, languages);
      });

      const langButtons = document.querySelectorAll(".lang-button");
      langButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          const locale = e.target.dataset.locale;
          i18next.changeLanguage(locale);
          elements.forEach(el => {
            translateElement(el, languages);
          });
          langButtons.forEach(otherBtn => {
            otherBtn.classList.toggle("selected", otherBtn === e.target);
          });
        });
        btn.classList.toggle("selected", btn.dataset.locale === i18next.language);
      });
    });
  });
};

export default initTranslations;
