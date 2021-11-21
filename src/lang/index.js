import { initReactI18next } from 'react-i18next';
import { LANGUAGE_PREF_KEY } from 'src/constants';

import en_js from './en';
import zh_js from './zh';

import i18n from 'i18next';

const browser_language = navigator.language.split('-')[0] || 'en';

const stored_language_pref = localStorage.getItem(LANGUAGE_PREF_KEY);
const locale = stored_language_pref || navigator.language;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en_js,
      zh: zh_js,
    },
    lng: locale.split('_')[0],
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

console.log('locale', locale);
