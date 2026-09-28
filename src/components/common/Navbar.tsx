import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageRoute } from '../../types';
import { ArchitecturalLogo } from './ArchitecturalLogo';

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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomeHero = currentPage === 'home';
  const isTransparent = isHomeHero && !isScrolled;

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
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent text-white border-b border-white/10 backdrop-blur-xs'
          : 'bg-[#F7F5F0]/95 backdrop-blur-md text-[#202A30] border-b border-[#E8E4DC] shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-4">
        {/* Side 1: Placeholder Logo with Architectural Symbol */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left rtl:text-right group focus-visible:outline-2 cursor-pointer"
          aria-label={t.brandName}
        >
          <ArchitecturalLogo isLight={isTransparent} />
        </button>

        {/* Centre: Navigation links */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors py-1 relative whitespace-nowrap focus-visible:outline-2 cursor-pointer ${
                  isTransparent
                    ? isActive
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                    : isActive
                      ? 'text-[#13232D] font-semibold'
                      : 'text-[#4A5964] hover:text-[#13232D]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B49765] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Side 2: Language Switch & "Find a Property" button */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Language Switch */}
          <button
            type="button"
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border focus-visible:outline-2 cursor-pointer ${
              isTransparent
                ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                : 'bg-[#E8E4DC]/60 hover:bg-[#E8E4DC] border-[#D8D2C5] text-[#13232D]'
            }`}
            title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <svg
              className="w-3.5 h-3.5 text-[#B49765]"
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
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Primary Action Button: "Find a Property" */}
          <button
            type="button"
            onClick={() => handleLinkClick('properties')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#B49765] hover:bg-[#A38654] rounded-lg transition-colors shadow-xs whitespace-nowrap focus-visible:outline-2 cursor-pointer"
          >
            {t.findPropertyBtn}
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors focus-visible:outline-2 cursor-pointer ${
              isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-[#13232D] hover:bg-[#E8E4DC]'
            }`}
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
        <div className="md:hidden border-t border-[#E8E4DC] bg-[#F7F5F0] text-[#202A30] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left rtl:text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E8E4DC] text-[#13232D] font-semibold'
                      : 'text-[#4A5964] hover:bg-[#EDE9E1] hover:text-[#13232D]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#E8E4DC] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleLinkClick('properties')}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-[#B49765] hover:bg-[#A38654] rounded-lg transition-colors shadow-xs"
            >
              {t.findPropertyBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
