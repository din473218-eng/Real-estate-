import React from 'react';
import { PropertyListing } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface PropertyCardProps {
  property: PropertyListing;
  onSelect: (property: PropertyListing) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const { lang, t, formatCurrency, formatNumber } = useLanguage();

  const title = lang === 'ar' ? property.titleAr : property.titleEn;
  const district = lang === 'ar' ? property.districtAr : property.districtEn;
  const headline = lang === 'ar' ? property.headlineAr : property.headlineEn;

  // Type labels
  const typeLabel = (() => {
    switch (property.type) {
      case 'villa':
        return lang === 'ar' ? 'فيلا' : 'Villa';
      case 'apartment':
        return lang === 'ar' ? 'شقة' : 'Apartment';
      case 'commercial':
        return lang === 'ar' ? 'تجاري ومكاتب' : 'Commercial';
      case 'land':
        return lang === 'ar' ? 'أرض سكنية' : 'Land Plot';
    }
  })();

  const purposeLabel = property.purpose === 'sale'
    ? (lang === 'ar' ? 'للبيع' : 'For Sale')
    : (lang === 'ar' ? 'للإيجار' : 'For Lease');

  // Should we show beds and baths? Only for residential (villa, apartment)
  const isResidential = property.type === 'villa' || property.type === 'apartment';

  return (
    <article
      onClick={() => onSelect(property)}
      className="group cursor-pointer bg-white border border-[#E8E2D5] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#C5A869]/50 transition-all duration-200 flex flex-col h-full focus-visible:outline-2"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(property);
        }
      }}
      aria-label={`${title} in ${district}`}
    >
      {/* Photograph Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F0EBE1]">
        <ImageWithFallback
          src={property.images[0]}
          alt={title}
          fallbackTitle={title}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
        />

        {/* Minimalist Top Meta (Unboxed or clean quiet bar) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0F1B2B] bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-2xs border border-[#E8E2D5]">
            {purposeLabel} · {typeLabel}
          </span>
          <span className="text-[10px] font-medium text-[#7A8699] bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-[#E8E2D5]">
            {t.sampleListingBadge}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* District & Location Kicker */}
          <div className="text-xs font-semibold tracking-wider uppercase text-[#9E7B35] mb-1.5 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{district} · {lang === 'ar' ? 'الرياض' : 'Riyadh'}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[#0F1B2B] font-display leading-snug group-hover:text-[#9E7B35] transition-colors line-clamp-1 mb-2">
            {title}
          </h3>

          {/* Short Headline / Architectural Summary */}
          <p className="text-xs text-[#5E6E82] leading-relaxed line-clamp-2 mb-4">
            {headline}
          </p>
        </div>

        <div>
          {/* Metadata Row: Unboxed clean text with typographic separators (Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5E6E82] py-2.5 border-y border-[#F3EFE6] mb-3">
            <span className="font-medium text-[#0F1B2B] tabular-nums">
              {formatNumber(property.areaSqm)} {t.propertyCard.sqm}
            </span>

            {isResidential && property.bedrooms !== undefined && (
              <>
                <span aria-hidden="true" className="text-[#C5A869]">·</span>
                <span className="tabular-nums">
                  {property.bedrooms} {t.propertyCard.beds}
                </span>
              </>
            )}

            {isResidential && property.bathrooms !== undefined && (
              <>
                <span aria-hidden="true" className="text-[#C5A869]">·</span>
                <span className="tabular-nums">
                  {property.bathrooms} {t.propertyCard.baths}
                </span>
              </>
            )}

            {property.parkingSpaces !== undefined && property.parkingSpaces > 0 && (
              <>
                <span aria-hidden="true" className="text-[#C5A869]">·</span>
                <span className="tabular-nums">
                  {property.parkingSpaces} {t.propertyCard.parking}
                </span>
              </>
            )}
          </div>

          {/* Price and CTA row */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs text-[#7A8699] block font-normal">
                {lang === 'ar' ? 'السعر التقديري' : 'Sample Value'}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#0F1B2B] tabular-nums tracking-tight">
                {formatCurrency(property.priceSar, property.rentalPeriod)}
              </span>
            </div>

            <span className="text-xs font-semibold text-[#0F1B2B] group-hover:text-[#9E7B35] transition-colors flex items-center gap-1">
              <span>{t.propertyCard.viewDetails}</span>
              <svg
                className="w-3.5 h-3.5 transform rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
