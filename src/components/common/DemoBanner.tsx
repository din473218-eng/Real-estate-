import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

export const DemoBanner: React.FC = () => {
  const { lang } = useLanguage();
  const notice = lang === 'ar' ? siteConfig.demoNotice.disclaimerAr : siteConfig.demoNotice.disclaimerEn;

  return (
    <aside
      aria-label="Demo notice"
      className="bg-[#121E2E] text-[#D8C7A5] text-xs font-normal py-2 px-4 border-b border-[#24354D] select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A869]" />
          <span>{notice}</span>
        </div>
        <span className="hidden sm:inline text-[11px] text-[#A3B3C9]/70">
          {lang === 'ar' ? 'نموذج عرض تقديمي للشركات العقارية' : 'Presentation Demo Platform'}
        </span>
      </div>
    </aside>
  );
};
