import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translitionEn from "./Translation/en.json";
import translitionAr from "./Translation/ar.json";
import translitionFr from "./Translation/fr.json";

const resources = {
  en: {
    translation: translitionEn,
  },
  fr: {
    translation: translitionFr,
  },
  ar: {
    translation: translitionAr,
  },
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: { escapeValue: false }, // React already protects against XSS
    lng: localStorage.getItem("translition"),
    react: {
      useSuspence: false,
    },
  });
