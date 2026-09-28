import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { PageRoute } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();

  const services = [
    {
      number: '01',
      title: t.services.service1Title,
      description: t.services.service1Desc,
      image: '/src/assets/images/hero_riyadh_villa_1790553255457.jpg',
      alt: 'Luxury Property Sales in Riyadh',
      highlights: lang === 'ar'
        ? ['تقييم سوقي واقعي وموضوعي', 'تمثيل تفاوضي رفيع المستوى', 'حفظ الخصوصية لصفقات العقارات الكبرى']
        : ['Objective valuation methodologies', 'Discreet client representation', 'End-to-end conveyance guidance'],
    },
    {
      number: '02',
      title: t.services.service2Title,
      description: t.services.service2Desc,
      image: '/src/assets/images/apartment_kafd_penthouse_1790553278890.jpg',
      alt: 'Residential & Commercial Rentals in Riyadh',
      highlights: lang === 'ar'
        ? ['تأجير سكني فاخر للفلل والبنتهاوس', 'مقرات شركات ومكاتب في مركز المالي والعليا', 'عقود موثقة عبر منصة إيجار']
        : ['Curated executive leasing portfolios', 'Prime KAFD & Olaya corporate floors', 'Structured lease agreements'],
    },
    {
      number: '03',
      title: t.services.service3Title,
      description: t.services.service3Desc,
      image: '/src/assets/images/villa_interior_living_1790553308957.jpg',
      alt: 'Property Photography and Marketing in Riyadh',
      highlights: lang === 'ar'
        ? ['تصوير معماري احترافي فائق الدقة', 'جولات فيديو سينمائية للمساحات الفاخرة', 'وصول رقمي موجه للمشترين المؤهلين']
        : ['Architectural editorial photography', 'Cinematic interior video walkthroughs', 'Targeted digital campaigns'],
    },
    {
      number: '04',
      title: t.services.service4Title,
      description: t.services.service4Desc,
      image: '/src/assets/images/commercial_olaya_tower_1790553287935.jpg',
      alt: 'Commercial Property Management in Riyadh',
      highlights: lang === 'ar'
        ? ['إشراف دوري على صيانة المباني والمرافق', 'إدارة العلاقات مع المستأجرين وتحصيل الإيجارات', 'تقارير دورية شفافة للملاك']
        : ['Proactive facility oversight', 'Tenant relations & lease renewals', 'Transparent financial reporting'],
    },
    {
      number: '05',
      title: t.services.service5Title,
      description: t.services.service5Desc,
      image: '/src/assets/images/commercial_kafd_office_1790553358459.jpg',
      alt: 'Strategic Real Estate Exploration in Riyadh',
      highlights: lang === 'ar'
        ? ['تحليل اتجاهات التوسع العمراني بالرياض', 'دراسة الأراضي السكنية والتجارية الواعدة', 'استشارات مكانية موضوعية دون وعود مضاربية']
        : ['Corridor expansion analysis', 'Plot acquisition viability reviews', 'Grounded perspective without speculative hype'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
          {lang === 'ar' ? 'حلولنا وخدماتنا' : 'Our Professional Scope'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2B] font-display">
          {t.services.heading}
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6E82] mt-2 leading-relaxed">
          {t.services.heroSubtext}
        </p>
      </div>

      {/* Services List: Alternating Editorial Rows */}
      <div className="space-y-16">
        {services.map((srv, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <article
              key={srv.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 rounded-2xl border border-[#E8E2D5] shadow-xs ${
                isEven ? 'lg:direction-reverse' : ''
              }`}
            >
              {/* Media */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-[#FAF5EB] border border-[#E8E2D5]">
                  <ImageWithFallback
                    src={srv.image}
                    alt={srv.alt}
                    fallbackTitle={srv.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Description */}
              <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="text-xs font-bold text-[#9E7B35] tracking-widest uppercase block font-display">
                  {srv.number} · {t.brandName}
                </span>
                <h2 className="text-2xl font-bold text-[#0F1B2B] font-display">
                  {srv.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5E6E82] leading-relaxed">
                  {srv.description}
                </p>

                <ul className="space-y-2 pt-2">
                  {srv.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#3E4D61]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {/* Final Action Section */}
      <div className="bg-[#0F1B2B] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden border border-[#1E2F46]">
        <div className="max-w-xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A869] block">
            {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            {lang === 'ar' ? 'هل تود مناقشة خطتك العقارية؟' : 'Ready to Structure Your Next Acquisition?'}
          </h2>
          <p className="text-xs sm:text-sm text-[#A3B3C9] leading-relaxed">
            {lang === 'ar'
              ? 'تفضل بالتواصل معنا لترتيب جلسة استشارية أولية وفهم متطلباتك بالتفصيل.'
              : 'Contact our advisory team to discuss spatial criteria, district priorities, and viewing schedules.'}
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-7 py-3 text-xs font-semibold text-[#0F1B2B] bg-[#FAF8F5] hover:bg-white rounded-lg transition-all shadow-md focus-visible:outline-2"
            >
              {t.services.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
