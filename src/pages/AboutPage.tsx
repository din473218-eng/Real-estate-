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
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E7B35]">
            <span>{t.brandName}</span>
            <span aria-hidden="true">·</span>
            <span>{siteConfig.demoNotice.badgeEn} / {siteConfig.demoNotice.badgeAr}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2B] font-display leading-[1.2] text-balance">
            {t.about.heading}
          </h1>

          <p className="text-sm sm:text-base text-[#5E6E82] leading-relaxed font-light">
            {t.about.heroSubtext}
          </p>

          <p className="text-xs sm:text-sm text-[#3E4D61] leading-relaxed">
            {lang === 'ar'
              ? 'نهدف إلى الارتقاء بتجربة الوساطة والاستشارة العقارية في الرياض من خلال منهجية واضحة ترتكز على الشفافية والتحليل المعماري الدقيق والمواءمة الحقيقية بين رغبات العميل والفرص المتاحة.'
              : 'Our objective is to elevate the real estate representation journey in Riyadh through an approach founded on transparency, spatial appreciation, and an alignment between family lifestyle aspirations and exceptional built spaces.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('properties')}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F1B2B] hover:bg-[#1E2F46] rounded-lg transition-colors shadow-xs"
            >
              {t.exploreProperties}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 text-xs font-semibold text-[#0F1B2B] bg-[#F0EBE1] hover:bg-[#E4DDCF] rounded-lg transition-colors"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-4/3 sm:aspect-5/4 rounded-2xl overflow-hidden shadow-lg border border-[#E8E2D5] bg-[#FAF5EB]">
            <ImageWithFallback
              src="/src/assets/images/about_arch_riyadh_1790553298984.jpg"
              alt="Modern Riyadh Architectural Facade"
              fallbackTitle="Modern Riyadh Architecture"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[11px] text-[#7A8699] mt-2 text-center lg:text-left lg:rtl:text-right">
            {t.about.editorialNotice}
          </p>
        </div>
      </section>

      {/* 2. Three Pillars of Our Advisory */}
      <section className="space-y-12">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
            {lang === 'ar' ? 'فلسفة التمثيل' : 'Our Advisory Pillars'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] font-display">
            {lang === 'ar' ? 'كيف نساعدك في اتخاذ القرار الصائب' : 'How We Guide Your Next Step'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-[#9E7B35] block mb-4 font-display">
                01
              </span>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-3">
                {t.about.section1Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.about.section1Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F3EFE6] text-[11px] text-[#7A8699]">
              {lang === 'ar' ? 'استماع عميق وتحديد دقيق للمعايير' : 'Attentive Listening & Spatial Criteria'}
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-[#9E7B35] block mb-4 font-display">
                02
              </span>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-3">
                {t.about.section2Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.about.section2Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F3EFE6] text-[11px] text-[#7A8699]">
              {lang === 'ar' ? 'انتقاء موضوعي خالٍ من الحشو' : 'Objective Curation & Value Quality'}
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-[#9E7B35] block mb-4 font-display">
                03
              </span>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-3">
                {t.about.section3Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.about.section3Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F3EFE6] text-[11px] text-[#7A8699]">
              {lang === 'ar' ? 'تنسيق مرن يحترم وقتك الثمين' : 'Coordinated Private Tours'}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Architectural Visual Strip */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-[#E8E2D5]">
          <ImageWithFallback
            src="/src/assets/images/villa_hittin_modern_1790553268044.jpg"
            alt="Contemporary Architecture in Hittin"
            fallbackTitle="Villa in Hittin"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#FAF5EB] p-8 sm:p-10 rounded-xl border border-[#E8E2D5] flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] mb-2">
            {lang === 'ar' ? 'سياق سوق الرياض' : 'Market Context'}
          </span>
          <h3 className="text-2xl font-bold text-[#0F1B2B] font-display mb-4">
            {lang === 'ar' ? 'عاصمة تشهد تحولاً معمارياً استثنائياً' : 'A Capital Redefining Contemporary Architecture'}
          </h3>
          <p className="text-xs text-[#5E6E82] leading-relaxed mb-6">
            {lang === 'ar'
              ? 'تشهد مدينة الرياض تطوراً معمارياً وحضرياً فريداً يجمع بين الأصالة النجدية والخطوط المودرن الصريحة، وتكامل المشاريع الكبرى مثل مركز الملك عبدالله المالي والمسار الرياضي وحديقة الملك سلمان.'
              : 'Riyadh is experiencing a profound urban evolution uniting local architectural sensibilities with contemporary clarity. Our focus is on connecting discerning buyers with spaces that embody this enduring transition.'}
          </p>
          <div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 text-xs font-semibold text-[#0F1B2B] bg-white hover:bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg transition-colors shadow-2xs"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      </section>

      {/* Demo notice box */}
      <div className="p-4 bg-white border border-[#E8E2D5] rounded-xl text-center text-xs text-[#7A8699]">
        <span>{siteConfig.demoNotice.disclaimerEn}</span>
        <span className="block mt-1 font-arabic" dir="rtl">{siteConfig.demoNotice.disclaimerAr}</span>
      </div>
    </div>
  );
};
