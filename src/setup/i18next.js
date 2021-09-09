import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../translations/enTranslation';
import jpTranslation from '../translations/jpTranslation';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en-US',
    resources: {
      'en-US': {
        translation: {
          ...enTranslation,
        },
      },
      'ja-JP': {
        translation: {
          ...jpTranslation,
        },
      },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
      format: (value, format, lng) => {
        let returnValue = value;
        if (format === 'number') {
          returnValue = new Intl.NumberFormat(lng).format(value);
        }
        return returnValue;
      },
    },
  });

export default i18n;
