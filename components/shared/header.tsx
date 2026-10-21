'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './container';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';
import { useLanguage } from '@/lib/i18n/language-context';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { t, isRTL } = useLanguage();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/catalog', label: t('nav.collections', 'Curated Collections') },
    { href: '/story', label: t('nav.story', 'Heritage & Craft') },
    { href: '/faq', label: t('nav.faq', 'Client Care') },
    { href: '/contact', label: t('nav.contact', 'Private Consultation') },
  ];

  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <header
      id="main-header"
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E2DB] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
          : 'bg-[#FAF9F6]/80 backdrop-blur-sm border-b border-transparent'
      )}
    >
      <Container className="h-20 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <Link
          href="/"
          id="header-brand-link"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-none border border-[#111111] flex items-center justify-center bg-[#111111] text-[#FAFAFA] text-xs font-serif tracking-widest transition-transform duration-300 group-hover:scale-105 group-hover:border-[#C5A880]">
            Æ
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.25em] text-[#111111] uppercase font-medium">
              {t('brand.name', 'AEREOSTACK')}
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#737373] uppercase -mt-1">
              {t('brand.subtitle', 'HAUTE MAISON & RETREATS')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav id="desktop-navigation" className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-200 py-1 relative',
                  isActive
                    ? 'text-[#111111]'
                    : 'text-[#666666] hover:text-[#111111]'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#C5A880]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher / Private Salon / Admin Access */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Changer Button */}
          <LanguageSwitcher variant="header" />

          <Link
            href="/contact"
            id="header-inquire-cta"
            className="text-xs uppercase tracking-[0.18em] font-medium px-5 py-2.5 bg-[#111111] text-[#FAF9F6] hover:bg-[#262626] border border-[#111111] transition-all duration-300"
          >
            {t('nav.inquire', 'Inquire')}
          </Link>

          <Link
            href="/admin"
            id="header-admin-portal-link"
            title={t('nav.admin', 'Curator Access')}
            className={cn(
              'p-2 text-[#737373] hover:text-[#111111] transition-colors',
              isAdminRoute && 'text-[#C5A880]'
            )}
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu & Quick Lang Trigger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Header Language Switcher for Mobile */}
          <LanguageSwitcher variant="header" className="scale-90" />

          <Link
            href="/admin"
            className="p-2 text-[#737373] hover:text-[#111111]"
            aria-label={t('nav.admin', 'Admin Portal')}
          >
            <Shield className="w-4 h-4" />
          </Link>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-[#111111] focus:outline-none"
            aria-label={t('nav.menu', 'Toggle navigation menu')}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#FAF9F6] border-b border-[#E5E2DB] overflow-hidden"
          >
            <Container className="py-6 flex flex-col space-y-5">
              {/* Language Selection Segmented Control */}
              <div className="pb-2 border-b border-[#E5E2DB]">
                <LanguageSwitcher variant="mobile" />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-sm tracking-[0.2em] uppercase font-medium py-1 transition-colors',
                        isActive ? 'text-[#C5A880]' : 'text-[#111111]'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center text-xs tracking-[0.2em] uppercase bg-[#111111] text-[#FAFAFA] font-medium"
                >
                  {t('nav.contact', 'Request Private Consultation')}
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase text-[#737373] py-2"
                >
                  <Shield className="w-4 h-4" /> {t('nav.admin', 'Curator Administration')}
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
