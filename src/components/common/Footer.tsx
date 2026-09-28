import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/siteConfig';
import { PageRoute, PropertyType } from '../../types';
import { ArchitecturalLogo } from './ArchitecturalLogo';
import { WhatsAppModal } from './WhatsAppModal';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onFilterByCategory?: (type: PropertyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterByCategory }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const handleLinkClick = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (type: PropertyType) => {
    if (onFilterByCategory) {
      onFilterByCategory(type);
    } else {
      onNavigate('properties');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#13232D] text-[#E8E4DC] border-t border-[#203444] mt-24">
      {/* Upper Footer: Brand, Navigation, Property Categories, Contact Placeholders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1: Wordmark & Brand Introduction */}
          <div className="lg:col-span-4 space-y-4">
            <ArchitecturalLogo isLight={true} />
            <p className="text-xs text-[#A6B6C4] leading-relaxed pt-2">
              {t.footer.shortIntro}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#E8E4DC] bg-[#1A2E3B] border border-[#2B4354] rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B49765]" />
                {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
              </span>

              {/* Language switch button in footer */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-2.5 py-1 text-[11px] font-medium text-[#B49765] hover:text-white bg-[#1A2E3B] border border-[#2B4354] rounded-md transition-colors"
              >
                {lang === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B49765]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A6B6C4]">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-white transition-colors focus-visible:outline-1 cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('properties')}
                  className="hover:text-white transition-colors focus-visible:outline-1 cursor-pointer"
                >
                  {t.nav.properties}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-white transition-colors focus-visible:outline-1 cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="hover:text-white transition-colors focus-visible:outline-1 cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-white transition-colors focus-visible:outline-1 cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Property Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B49765]">
              {t.footer.propertyTypes}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A6B6C4]">
              {siteConfig.propertyTypes.map((pt) => (
                <li key={pt.id}>
                  <button
                    onClick={() => handleCategoryClick(pt.id as PropertyType)}
                    className="hover:text-white transition-colors focus-visible:outline-1 cursor-pointer"
                  >
                    {lang === 'ar' ? pt.labelAr : pt.labelEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Placeholders & Direct Channels */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B49765]">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-2 text-xs text-[#A6B6C4]">
              <p className="leading-relaxed">
                {lang === 'ar' ? siteConfig.contact.addressAr : siteConfig.contact.addressEn}
              </p>
              <p>
                <span className="text-white block font-medium">{t.contact.hoursTitle}:</span>
                {lang === 'ar' ? siteConfig.contact.workingHoursAr : siteConfig.contact.workingHoursEn}
              </p>
              <div className="pt-1 space-y-1">
                <p>
                  <span className="text-white inline-block w-20">{t.contact.phoneTitle}:</span>
                  <span dir="ltr" className="text-white font-medium">{siteConfig.contact.phoneDisplay}</span>
                </p>
                <p>
                  <span className="text-white inline-block w-20">{t.contact.emailTitle}:</span>
                  <span className="text-white">{siteConfig.contact.emailDisplay}</span>
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowWhatsAppModal(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#1A3A34] hover:bg-[#204941] border border-[#2B5E54] rounded-lg transition-colors focus-visible:outline-1 cursor-pointer"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.302c-.087.089-.177.187-.076.36.101.173.45 1.742 1.488 2.666 1.332 1.185 2.457 1.554 2.804 1.698.347.144.55.12.75-.11.202-.231.867-1.011 1.1-1.358.231-.347.462-.289.779-.173.318.116 2.019.953 2.366 1.127.347.173.578.26.664.404.087.145.087.839-.057 1.244z"/>
                </svg>
                <span>{t.contact.whatsappBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lower Banner: Distinct Required Demo Notice */}
        <div className="mt-12 pt-8 border-t border-[#203444] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A9BAA]">
          <p className="max-w-2xl leading-relaxed text-center sm:text-left sm:rtl:text-right font-medium text-[#C6D2DC]">
            {t.footerNotice}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span>© 2026 {t.brandName}. {t.footer.allRights}</span>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
      />
    </footer>
  );
};
