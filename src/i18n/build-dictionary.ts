import dictionary from './dictionary';

export type SupportedLocales = 'fr' | 'sq' | 'en';
type DictionaryKey = keyof typeof dictionary;
type DictionaryValue = Record<SupportedLocales, any>;
type Dictionary = Record<DictionaryKey, DictionaryValue>;

export const createDictionary = (lang: SupportedLocales): Record<string, string> => {
  return Object.entries(dictionary as Dictionary).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value[lang],
    };
  }, {});
};

export const getLang = (defaultLang?: string) => {
  const lang = defaultLang?.split('-')[0];
  return lang;
};

export default createDictionary(getLang('fr'));
