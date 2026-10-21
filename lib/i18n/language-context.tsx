'use client';

import * as React from 'react';
import { type Language, LANGUAGES } from './languages';
import { translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  t: (key: string, fallback?: string) => string;
  formatPrice: (amount: number) => string;
  config: (typeof LANGUAGES)[Language];
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'aereostack_language';
const CHANGE_EVENT = 'aereostack_lang_change';

function applyDocumentAttributes(lang: Language) {
  if (typeof document === 'undefined') return;
  const direction = LANGUAGES[lang].dir;
  document.documentElement.lang = lang;
  document.documentElement.dir = direction;
  if (direction === 'rtl') {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === 'en' || saved === 'es' || saved === 'ar') {
      return saved;
    }
    const browser = navigator.language?.slice(0, 2);
    if (browser === 'es' || browser === 'ar') {
      return browser;
    }
  } catch {
    // Ignore storage restrictions
  }
  return 'en';
}

function getServerSnapshot(): Language {
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Synchronize document attributes whenever language changes
  React.useEffect(() => {
    applyDocumentAttributes(language);
  }, [language]);

  const setLanguage = React.useCallback((newLang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Storage unavailable
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }
    applyDocumentAttributes(newLang);
  }, []);

  const config = LANGUAGES[language];
  const dir = config.dir;
  const isRTL = dir === 'rtl';

  const t = React.useCallback(
    (key: string, fallback?: string): string => {
      const langMap = translations[language];
      if (langMap && langMap[key]) {
        return langMap[key];
      }
      // Fallback to English
      const enMap = translations.en;
      if (enMap && enMap[key]) {
        return enMap[key];
      }
      return fallback ?? key;
    },
    [language]
  );

  const formatPrice = React.useCallback(
    (amount: number): string => {
      if (language === 'ar') {
        return new Intl.NumberFormat('ar-AE', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(amount);
      }
      if (language === 'es') {
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(amount);
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(amount);
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dir,
        isRTL,
        t,
        formatPrice,
        config,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = React.useContext(LanguageContext);
  if (!context) {
    // Graceful fallback for components rendered outside provider
    return {
      language: 'en',
      setLanguage: () => {},
      dir: 'ltr',
      isRTL: false,
      t: (key: string, fallback?: string) => translations.en[key] ?? fallback ?? key,
      formatPrice: (amount: number) => `$${amount.toLocaleString()}`,
      config: LANGUAGES.en,
    };
  }
  return context;
}
