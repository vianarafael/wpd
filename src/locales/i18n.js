import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhCN from './zhCN.json';
import zhTW from './zhTW.json';
import enUS from './enUS.json';
const resources = {
  zhCN: {
    translation: zhCN,
  },
  'zh-CN': {
    translation: zhCN,
  },
  zhTW: {
    translation: zhTW,
  },
  'zh-TW': {
    translation: zhTW,
  },
  zhHK: {
    translation: zhTW,
  },
  'zh-HK': {
    translation: zhTW,
  },
  enUS: {
    translation: enUS,
  },
  'en-US': {
    translation: enUS,
  },
  en: {
    translation: enUS,
  },
  zh:{
    translation: zhCN,
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: { order: ['path', 'navigator'] },
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    keySeparator: '.',
  });
export default i18n;
