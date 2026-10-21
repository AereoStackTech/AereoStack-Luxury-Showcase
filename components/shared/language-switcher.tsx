'use client';

import * as React from 'react';
import { useLanguage } from '@/lib/i18n/language-context';
import { LANGUAGE_LIST, type Language } from '@/lib/i18n/languages';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'header' | 'mobile' | 'footer';
  className?: string;
}

export function LanguageSwitcher({
  variant = 'header',
  className,
}: LanguageSwitcherProps) {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Click outside listener
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Mobile segmented control
  if (variant === 'mobile') {
    return (
      <div className={cn('flex flex-col space-y-2', className)}>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#737373] font-medium">
          <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{t('lang.changer', 'Language')}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4F1EA] border border-[#E5E2DB]">
          {LANGUAGE_LIST.map((lang) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  'py-2 px-2 text-xs uppercase tracking-wider font-medium transition-all text-center flex items-center justify-center gap-1.5',
                  isActive
                    ? 'bg-[#111111] text-[#FAF9F6] shadow-sm font-semibold'
                    : 'text-[#666666] hover:text-[#111111] hover:bg-[#FAF9F6]/60'
                )}
                aria-pressed={isActive}
              >
                <span>{lang.flag}</span>
                <span className={lang.code === 'ar' ? 'font-sans' : ''}>
                  {lang.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Footer minimalist switcher
  if (variant === 'footer') {
    return (
      <div
        ref={dropdownRef}
        className={cn('relative inline-block text-left', className)}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 text-xs tracking-[0.15em] text-[#999999] hover:text-[#C5A880] transition-colors py-1 focus:outline-none"
          aria-expanded={isOpen}
          aria-label={t('lang.selectTitle', 'Select Maison Language')}
        >
          <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="uppercase tracking-wider">
            {LANGUAGE_LIST.find((l) => l.code === language)?.localName || 'English'}
          </span>
          <ChevronDown
            className={cn(
              'w-3 h-3 text-[#737373] transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute bottom-full mb-2 z-50 w-52 bg-[#1A1A1A] border border-[#333333] shadow-[0_-8px_30px_rgba(0,0,0,0.5)] p-1.5',
                isRTL ? 'right-0' : 'left-0'
              )}
            >
              <div className="px-3 py-2 border-b border-[#2A2A2A] mb-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#737373] font-medium block">
                  {t('lang.selectTitle', 'Select Language')}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                {LANGUAGE_LIST.map((lang) => {
                  const isActive = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 text-xs tracking-wider transition-colors text-left',
                        isRTL && 'text-right flex-row-reverse',
                        isActive
                          ? 'bg-[#262626] text-[#C5A880] font-medium'
                          : 'text-[#CCCCCC] hover:bg-[#222222] hover:text-[#FAF9F6]'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span className="font-medium text-xs">{lang.localName}</span>
                          <span className="text-[9px] text-[#777777]">{lang.name}</span>
                        </div>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Header desktop dropdown
  const currentLang = LANGUAGE_LIST.find((l) => l.code === language) || LANGUAGE_LIST[0];

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block text-left', className)}
    >
      <button
        id="language-changer-button"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'group flex items-center gap-2 py-2 px-3 border transition-all duration-200 text-xs tracking-[0.15em] uppercase font-medium focus:outline-none',
          isOpen
            ? 'border-[#C5A880] bg-[#FFFFFF] text-[#111111] shadow-sm'
            : 'border-[#E5E2DB] bg-transparent text-[#666666] hover:text-[#111111] hover:border-[#111111]/40'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t('lang.selectTitle', 'Select Maison Language')}
      >
        <Globe className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium text-[#111111] flex items-center gap-1.5">
          <span>{currentLang.flag}</span>
          <span>{currentLang.short}</span>
        </span>
        <ChevronDown
          className={cn(
            'w-3 h-3 text-[#737373] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute top-full mt-2 z-50 w-60 bg-[#FFFFFF] border border-[#E5E2DB] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-2',
              isRTL ? 'left-0' : 'right-0'
            )}
          >
            {/* Header info */}
            <div className="px-3 py-2 border-b border-[#F0ECE1] mb-1.5">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
                {t('lang.changer', 'Language')}
              </span>
              <span className="text-[11px] text-[#737373] font-light">
                {t('lang.selectTitle', 'Select Maison Language')}
              </span>
            </div>

            {/* Language options */}
            <div className="flex flex-col space-y-1">
              {LANGUAGE_LIST.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 text-xs tracking-wider transition-all text-left',
                      isRTL && 'text-right flex-row-reverse',
                      isActive
                        ? 'bg-[#FAF9F6] text-[#111111] border-l-2 border-[#C5A880] font-medium'
                        : 'text-[#666666] hover:bg-[#FAF9F6] hover:text-[#111111] border-l-2 border-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-serif font-medium text-[#111111]">
                          {lang.localName}
                        </span>
                        <span className="text-[10px] text-[#888888]">
                          {lang.name} &bull; {lang.region}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <span className="flex items-center gap-1 text-[10px] text-[#C5A880] uppercase tracking-wider font-semibold">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
