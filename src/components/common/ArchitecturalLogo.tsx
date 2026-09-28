import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface ArchitecturalLogoProps {
  className?: string;
  isLight?: boolean;
}

export const ArchitecturalLogo: React.FC<ArchitecturalLogoProps> = ({
  className = '',
  isLight = false,
}) => {
  const { t, lang } = useLanguage();

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Architectural Symbol: Geometric modernist villa arches & cantilevered pavilion */}
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
          isLight
            ? 'bg-[#FAF5EB] text-[#B49765] border border-[#B49765]/30'
            : 'bg-[#13232D] text-[#B49765] border border-[#B49765]/20'
        }`}
        aria-hidden="true"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Architectural geometric pavilion structure */}
          <path d="M3 21h18" />
          <path d="M5 21V9l7-5 7 5v12" />
          <path d="M9 21v-7a3 3 0 0 1 6 0v7" />
          <path d="M12 4v4" />
        </svg>
      </div>

      {/* Placeholder Brand Text */}
      <div className="flex flex-col text-left rtl:text-right">
        <span
          className={`text-base sm:text-lg font-bold tracking-tight font-display leading-tight ${
            isLight ? 'text-white' : 'text-[#13232D]'
          }`}
        >
          {t.brandName}
        </span>
        <span
          className={`text-[10px] tracking-widest uppercase ${
            isLight ? 'text-[#B49765]' : 'text-[#847559]'
          }`}
        >
          {lang === 'ar' ? 'الرياض • عقارات فاخرة' : 'Riyadh • Luxury Real Estate'}
        </span>
      </div>
    </div>
  );
};
