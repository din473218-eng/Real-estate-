import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageRoute } from '../../types';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageRoute; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'properties', label: t.nav.properties },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleLinkClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-[#E8E2D5] shadow-xs'
          : 'bg-[#FAF8F5] border-[#EFECE4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left rtl:text-right group focus-visible:outline-2"
          aria-label={t.brandName}
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F1B2B] font-display transition-colors group-hover:text-[#9E7B35]">
            {t.brandName}
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-[#3E4D61]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors py-1 relative whitespace-nowrap focus-visible:outline-2 ${
                  isActive
                    ? 'text-[#0F1B2B] font-semibold'
                    : 'hover:text-[#0F1B2B]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A869] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions + Language switcher */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F1B2B] bg-[#F3EFE6] hover:bg-[#EAE4D7] border border-[#E0D9CC] rounded-lg transition-colors focus-visible:outline-2"
            title={lang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
            aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          >
            <svg
              className="w-3.5 h-3.5 text-[#9E7B35]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => handleLinkClick('properties')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#0F1B2B] hover:bg-[#1E2F46] rounded-lg transition-colors shadow-xs whitespace-nowrap focus-visible:outline-2"
          >
            {t.exploreProperties}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0F1B2B] hover:bg-[#F3EFE6] rounded-lg transition-colors focus-visible:outline-2"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D5] bg-[#FAF8F5] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left rtl:text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EFE9DD] text-[#0F1B2B] font-semibold'
                      : 'text-[#3E4D61] hover:bg-[#F3EFE6] hover:text-[#0F1B2B]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#E8E2D5] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleLinkClick('properties')}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-[#0F1B2B] hover:bg-[#1E2F46] rounded-lg transition-colors shadow-xs"
            >
              {t.exploreProperties}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
