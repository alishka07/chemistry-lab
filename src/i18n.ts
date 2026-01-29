import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '../src/locales/ru/ru.json'; // Основной русский для quarters и labs
import kk from '../src/locales/kk/kk.json'; // Основной казахский для quarters и labs
import commonru from '../src/locales/ru/commonru.json'; // Дополнительный русский JSON для других TSX
import commonkk from '../src/locales/kk/commonkk.json'; // Дополнительный казахский JSON для других TSX

// Инициализация i18next с несколькими namespaces
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: ru, // Основной namespace по умолчанию
        extra: commonru, // Дополнительный namespace для других частей приложения
      },
      kk: {
        translation: kk, // Основной namespace по умолчанию
        extra: commonkk, // Дополнительный namespace для других частей приложения
      },
    },
    lng: 'ru', // Язык по умолчанию
    fallbackLng: 'ru',
    ns: ['translation', 'extra'], // Список namespaces
    defaultNS: 'translation', // Namespace по умолчанию
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;