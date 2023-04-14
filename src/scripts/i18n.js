import i18next from "i18next";

const loadLanguages = () => {
  return fetch('src/utils/languages.json')
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

      const langInputs = document.querySelectorAll(".language__control");
      langInputs.forEach(input => {
        input.addEventListener("change", (e) => {
          const locale = e.target.value;
          i18next.changeLanguage(locale);
          elements.forEach(el => {
            translateElement(el, languages);
          });
        });
      });
    });
  }).catch(err => {
    console.log(err)
  }) 
  ;
};

export default initTranslations;
