import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationES from './locales/es.json';
import translationEN from './locales/en.json';

const resources = {
  es: { translation: translationES },
  en: { translation: translationEN }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Idioma por defecto al entrar a la página
    fallbackLng: 'es', // Si falta una traducción, usa español por seguridad
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;