import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

export const DemoBanner: React.FC = () => {
  const { lang } = useLanguage();
  const notice = lang === 'ar' ? siteConfig.demoNotice.disclaimerAr : siteConfig.demoNotice.disclaimerEn;

  return (
    <aside
      aria-label="Demo notice"
      className="bg-[#13232D] text-[#E8E4DC] text-xs font-normal py-2 px-4 border-b border-[#203444] select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B49765]" />
          <span>{notice}</span>
        </div>
        <span className="hidden sm:inline text-[11px] text-[#A6B6C4]/80">
          {lang === 'ar' ? 'عرض تجريبي لمنشآت التطوير والوساطة العقارية' : 'Presentation Demo Platform'}
        </span>
      </div>
    </aside>
  );
};
