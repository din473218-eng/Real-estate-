import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { PageRoute } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 sm:space-y-28">
      {/* 1. Hero Editorial Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B49765]">
            <span>{t.brandName}</span>
            <span aria-hidden="true">·</span>
            <span>{siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13232D] font-display leading-[1.18] text-balance">
            {t.about.heading}
          </h1>

          <p className="text-sm sm:text-base text-[#526371] leading-relaxed font-light">
            {t.about.heroSubtext}
          </p>

          <p className="text-xs sm:text-sm text-[#202A30] leading-relaxed">
            {t.about.p1}
          </p>

          <p className="text-xs sm:text-sm text-[#202A30] leading-relaxed">
            {t.about.p2}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('properties')}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {t.exploreProperties}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 text-xs font-semibold text-[#13232D] bg-[#E8E4DC]/80 hover:bg-[#E8E4DC] rounded-lg transition-colors border border-[#D8D2C5] cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-4/3 sm:aspect-5/4 rounded-2xl overflow-hidden shadow-lg border border-[#E8E4DC] bg-[#FAF5EB]">
            <ImageWithFallback
              src="/src/assets/images/about_arch_riyadh_1790553298984.jpg"
              alt="Architectural limestone facade in Riyadh"
              fallbackTitle="Modern Riyadh Architecture"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[11px] text-[#738290] mt-2.5 text-center lg:text-left lg:rtl:text-right">
            {t.about.editorialNotice}
          </p>
        </div>
      </section>

      {/* 2. Simple Values Section (Clarity, Attention to Detail, Personal Service) */}
      <section className="space-y-12">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
            {lang === 'ar' ? 'مبادئنا الأساسية' : 'Our Guiding Principles'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#13232D] font-display">
            {t.about.valuesHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1: Clarity */}
          <div className="bg-white p-8 rounded-2xl border border-[#E8E4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#B49765] flex items-center justify-center font-bold text-sm mb-5">
                01
              </div>
              <h3 className="text-lg font-bold text-[#13232D] font-display mb-3">
                {t.about.val1Title}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {t.about.val1Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F0ECE2] text-[11px] text-[#738290]">
              {lang === 'ar' ? 'شفافية كاملة في العرض' : 'Complete Presentation Transparency'}
            </div>
          </div>

          {/* Value 2: Attention to Detail */}
          <div className="bg-white p-8 rounded-2xl border border-[#E8E4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#B49765] flex items-center justify-center font-bold text-sm mb-5">
                02
              </div>
              <h3 className="text-lg font-bold text-[#13232D] font-display mb-3">
                {t.about.val2Title}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {t.about.val2Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F0ECE2] text-[11px] text-[#738290]">
              {lang === 'ar' ? 'فحص شامل لمعايير الجودة' : 'Rigorous Quality Appraisal'}
            </div>
          </div>

          {/* Value 3: Personal Service */}
          <div className="bg-white p-8 rounded-2xl border border-[#E8E4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#B49765] flex items-center justify-center font-bold text-sm mb-5">
                03
              </div>
              <h3 className="text-lg font-bold text-[#13232D] font-display mb-3">
                {t.about.val3Title}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {t.about.val3Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F0ECE2] text-[11px] text-[#738290]">
              {lang === 'ar' ? 'تنسيق مرن يحترم وقتك' : 'Adaptive Private Coordination'}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Architectural Visual Strip */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-[#E8E4DC]">
          <ImageWithFallback
            src="/src/assets/images/villa_hittin_modern_1790553268044.jpg"
            alt="Contemporary Architecture in Hittin"
            fallbackTitle="Villa in Hittin"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#FAF5EB] p-8 sm:p-10 rounded-xl border border-[#E8E4DC] flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] mb-2">
            {lang === 'ar' ? 'سياق سوق الرياض' : 'Market Context'}
          </span>
          <h3 className="text-2xl font-bold text-[#13232D] font-display mb-3">
            {lang === 'ar' ? 'عاصمة تشهد تحولاً معمارياً ملهماً' : 'A Capital Redefining Contemporary Architecture'}
          </h3>
          <p className="text-xs text-[#526371] leading-relaxed mb-6">
            {lang === 'ar'
              ? 'تجمع الرياض اليوم بين روح الأصالة النجدية والخطوط المعمارية الحديثة، مع تكامل محاور حيوية كمركز الملك عبدالله المالي والمسار الرياضي. نركز على ربط المشترين بالمساحات التي تجسد هذا التحول المستدام.'
              : 'Riyadh is experiencing a profound architectural renaissance uniting regional identity with clean modernist design. Our focus is connecting discerning buyers with spaces that embody this enduring transition.'}
          </p>
          <div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 text-xs font-semibold text-[#13232D] bg-white hover:bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      </section>

      {/* Demo Notice Box */}
      <div className="p-4 bg-white border border-[#E8E4DC] rounded-xl text-center text-xs text-[#738290]">
        <span>{siteConfig.demoNotice.disclaimerEn}</span>
        <span className="block mt-1 font-arabic" dir="rtl">{siteConfig.demoNotice.disclaimerAr}</span>
      </div>
    </div>
  );
};
