import { PostProcessorModule } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';

// Only English (the fallback) is bundled; other locales are split into their own chunks and
// loaded on demand by `changeLanguage`.
const localeLoaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
    ar: () => import('./locales/ar.json'),
    bg: () => import('./locales/bg.json'),
    ca: () => import('./locales/ca.json'),
    cs: () => import('./locales/cs.json'),
    da: () => import('./locales/da.json'),
    de: () => import('./locales/de.json'),
    es: () => import('./locales/es.json'),
    et: () => import('./locales/et.json'),
    eu: () => import('./locales/eu.json'),
    fa: () => import('./locales/fa.json'),
    fi: () => import('./locales/fi.json'),
    fr: () => import('./locales/fr.json'),
    gl: () => import('./locales/gl.json'),
    hu: () => import('./locales/hu.json'),
    id: () => import('./locales/id.json'),
    it: () => import('./locales/it.json'),
    ja: () => import('./locales/ja.json'),
    ko: () => import('./locales/ko.json'),
    lv: () => import('./locales/lv.json'),
    'nb-NO': () => import('./locales/nb-NO.json'),
    nl: () => import('./locales/nl.json'),
    nn: () => import('./locales/nn.json'),
    pl: () => import('./locales/pl.json'),
    pt: () => import('./locales/pt.json'),
    'pt-BR': () => import('./locales/pt-BR.json'),
    ro: () => import('./locales/ro.json'),
    ru: () => import('./locales/ru.json'),
    sk: () => import('./locales/sk.json'),
    sl: () => import('./locales/sl.json'),
    sr: () => import('./locales/sr.json'),
    sv: () => import('./locales/sv.json'),
    ta: () => import('./locales/ta.json'),
    th: () => import('./locales/th.json'),
    tl: () => import('./locales/tl.json'),
    tr: () => import('./locales/tr.json'),
    uk: () => import('./locales/uk.json'),
    'zh-Hans': () => import('./locales/zh-Hans.json'),
    'zh-Hant': () => import('./locales/zh-Hant.json'),
};

export const languages = [
    {
        label: 'English',
        value: 'en',
    },
    {
        label: 'العربية',
        value: 'ar',
    },
    {
        label: 'Български',
        value: 'bg',
    },
    {
        label: 'Català',
        value: 'ca',
    },
    {
        label: 'Čeština',
        value: 'cs',
    },
    {
        label: 'Dansk',
        value: 'da',
    },
    {
        label: 'Deutsch',
        value: 'de',
    },
    {
        label: 'Español',
        value: 'es',
    },
    {
        label: 'Eesti',
        value: 'et',
    },
    {
        label: 'Basque',
        value: 'eu',
    },
    {
        label: 'Français',
        value: 'fr',
    },
    {
        label: 'Galego',
        value: 'gl',
    },
    {
        label: 'Bahasa Indonesia',
        value: 'id',
    },
    {
        label: 'Suomeksi',
        value: 'fi',
    },
    {
        label: 'Magyar',
        value: 'hu',
    },
    {
        label: 'Italiano',
        value: 'it',
    },
    {
        label: '日本語',
        value: 'ja',
    },
    {
        label: '한국어',
        value: 'ko',
    },
    {
        label: 'Latviešu',
        value: 'lv',
    },
    {
        label: 'Nederlands',
        value: 'nl',
    },
    {
        label: 'Norsk (Bokmål)',
        value: 'nb-NO',
    },
    {
        label: 'Norsk (Nynorsk)',
        value: 'nn',
    },
    {
        label: 'فارسی',
        value: 'fa',
    },
    {
        label: 'Português',
        value: 'pt',
    },
    {
        label: 'Português (Brasil)',
        value: 'pt-BR',
    },
    {
        label: 'Polski',
        value: 'pl',
    },
    {
        label: 'Română',
        value: 'ro',
    },
    {
        label: 'Русский',
        value: 'ru',
    },
    {
        label: 'Slovenčina',
        value: 'sk',
    },
    {
        label: 'Slovenščina',
        value: 'sl',
    },
    {
        label: 'Srpski',
        value: 'sr',
    },
    {
        label: 'Svenska',
        value: 'sv',
    },
    {
        label: 'Tamil',
        value: 'ta',
    },
    {
        label: 'Thai',
        value: 'th',
    },
    {
        label: 'Tagalog',
        value: 'tl',
    },
    {
        label: 'Türkçe',
        value: 'tr',
    },
    {
        label: 'Українська',
        value: 'uk',
    },
    {
        label: '简体中文',
        value: 'zh-Hans',
    },
    {
        label: '繁體中文',
        value: 'zh-Hant',
    },
];

const lowerCasePostProcessor: PostProcessorModule = {
    name: 'lowerCase',
    process: (value: string) => {
        return value.toLocaleLowerCase();
    },
    type: 'postProcessor',
};

const upperCasePostProcessor: PostProcessorModule = {
    name: 'upperCase',
    process: (value: string) => {
        return value.toLocaleUpperCase();
    },
    type: 'postProcessor',
};

const titleCasePostProcessor: PostProcessorModule = {
    name: 'titleCase',
    process: (value: string) => {
        return value.replace(/\S\S*/g, (txt) => {
            return txt.charAt(0).toLocaleUpperCase() + txt.slice(1).toLowerCase();
        });
    },
    type: 'postProcessor',
};

// const ignoreSentenceCaseLanguages = ['de'];

const sentenceCasePostProcessor: PostProcessorModule = {
    name: 'sentenceCase',
    process: (value: string) => {
        const sentences = value.split('. ');

        return sentences
            .map((sentence) => {
                return (
                    sentence.charAt(0).toLocaleUpperCase() + sentence.slice(1).toLocaleLowerCase()
                );
            })
            .join('. ');
    },
    type: 'postProcessor',
};
i18n.use(lowerCasePostProcessor)
    .use(upperCasePostProcessor)
    .use(titleCasePostProcessor)
    .use(sentenceCasePostProcessor)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: 'en',
        // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        resources: { en: { translation: en } },
    });

export const changeLanguage = async (language: string) => {
    const loadLocale = localeLoaders[language];

    if (loadLocale && !i18n.hasResourceBundle(language, 'translation')) {
        const locale = await loadLocale();
        i18n.addResourceBundle(language, 'translation', locale.default);
    }

    return i18n.changeLanguage(language);
};

export default i18n;
