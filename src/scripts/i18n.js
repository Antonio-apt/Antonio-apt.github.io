import i18next from "i18next";

const STORAGE_KEY = "preferred-locale";
const { BASE_URL } = import.meta.env;

const loadLanguages = () => {
  const url = `${BASE_URL || ""}languages.json`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load languages: ${response.status}`);
      return response.json();
    })
    .catch((err) => {
      console.error("i18n: could not load translations", err);
      return { en: {}, pt: {} };
    });
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
  const localeData = languages[locale];
  const translation = localeData && localeData[key];
  el.innerText = translation != null ? translation : (languages.en && languages.en[key]) || defaultKey;
};

const applyTranslations = (elements, languages) => {
  elements.forEach((el) => translateElement(el, languages));
};

const updateLangButtonsState = (langButtons, locale) => {
  langButtons.forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.locale === locale);
    btn.setAttribute("aria-pressed", btn.dataset.locale === locale ? "true" : "false");
  });
};

const initTranslations = () => {
  const savedLocale = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const initialLng = savedLocale === "pt" || savedLocale === "en" ? savedLocale : "en";

  loadLanguages().then((languages) => {
    if (Object.keys(languages).length === 0) {
      return;
    }
    i18next.init(
      {
        lng: initialLng,
        resources: languages,
        fallbackLng: "en",
      },
      () => {
        const elements = document.querySelectorAll("[data-i18n]");
        applyTranslations(elements, languages);

        const langButtons = document.querySelectorAll(".lang-button");
        updateLangButtonsState(langButtons, i18next.language);

        langButtons.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const locale = e.currentTarget.dataset.locale;
            if (!locale) return;
            i18next.changeLanguage(locale);
            applyTranslations(elements, languages);
            updateLangButtonsState(langButtons, locale);
            try {
              localStorage.setItem(STORAGE_KEY, locale);
            } catch (_) {}
          });
        });
      }
    );
  });
};

export default initTranslations;
