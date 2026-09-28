import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { PageRoute } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectServiceForContact: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectServiceForContact,
}) => {
  const { lang, t } = useLanguage();

  const serviceImages = [
    '/images/hero_riyadh_villa_1790553255457.jpg',
    '/images/apartment_kafd_penthouse_1790553278890.jpg',
    '/images/commercial_olaya_tower_1790553287935.jpg',
    '/images/villa_interior_living_1790553308957.jpg',
    '/images/commercial_kafd_office_1790553358459.jpg',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 sm:space-y-28">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
          {lang === 'ar' ? 'حلولنا واستشاراتنا' : 'Areas of Practice'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13232D] font-display">
          {t.services.heading}
        </h1>
        <p className="text-xs sm:text-sm text-[#526371] mt-2 leading-relaxed">
          {t.services.heroSubtext}
        </p>
      </div>

      {/* Individual Sections with Alternating Layouts */}
      <div className="space-y-16 sm:space-y-24">
        {t.services.servicesList.map((srv, idx) => {
          const isEven = idx % 2 === 1;
          const imageSrc = serviceImages[idx] || serviceImages[0];

          return (
            <article
              key={srv.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-10 rounded-2xl border border-[#E8E4DC] shadow-xs"
            >
              {/* Media */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-[#FAF5EB] border border-[#E8E4DC]">
                  <ImageWithFallback
                    src={imageSrc}
                    alt={srv.title}
                    fallbackTitle={srv.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text: Heading, Explanation, 3 Specific Activities, Contact Button */}
              <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="text-xs font-bold text-[#B49765] tracking-widest uppercase block font-display">
                  {`0${idx + 1}`} · {t.brandName}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#13232D] font-display">
                  {srv.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#526371] leading-relaxed">
                  {srv.explanation}
                </p>

                {/* 3 Specific Example Activities */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-[#13232D] uppercase tracking-wider block mb-2">
                    {lang === 'ar' ? 'أمثلة من أنشطة الخدمة:' : 'Specific Example Activities:'}
                  </span>
                  <ul className="space-y-2">
                    {srv.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#202A30]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B49765] mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button linking to Contact with pre-selected service */}
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForContact(srv.id)}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    {t.services.contactServiceBtn}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Final Action Section */}
      <div className="bg-[#13232D] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden border border-[#203444]">
        <div className="max-w-xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block">
            {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            {lang === 'ar' ? 'هل تود مناقشة خطتك العقارية القادمة؟' : 'Ready to Discuss Your Property Plans?'}
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B6C4] leading-relaxed">
            {lang === 'ar'
              ? 'تفضل بالتواصل معنا لترتيب جلسة استشارية أولية وفهم متطلباتك بالتفصيل.'
              : 'Contact our advisory team to discuss spatial criteria, district priorities, and viewing schedules.'}
          </p>
          <div className="pt-3">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-7 py-3 text-xs font-semibold text-[#13232D] bg-[#F7F5F0] hover:bg-white rounded-lg transition-all shadow-md focus-visible:outline-2 cursor-pointer"
            >
              {lang === 'ar' ? 'تواصل لمناقشة احتياجاتك' : 'Discuss Your Requirements'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
