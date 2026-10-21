export type Language = 'en' | 'es' | 'ar';

export interface LanguageConfig {
  code: Language;
  name: string;
  localName: string;
  short: string;
  dir: 'ltr' | 'rtl';
  flag: string;
  region: string;
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    localName: 'English',
    short: 'EN',
    dir: 'ltr',
    flag: '🇬🇧',
    region: 'Global / UK',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    localName: 'Español',
    short: 'ES',
    dir: 'ltr',
    flag: '🇪🇸',
    region: 'España / LatAm',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    localName: 'العربية',
    short: 'عربي',
    dir: 'rtl',
    flag: '🇦🇪',
    region: 'الشرق الأوسط / دولي',
  },
};

export const LANGUAGE_LIST: LanguageConfig[] = Object.values(LANGUAGES);
