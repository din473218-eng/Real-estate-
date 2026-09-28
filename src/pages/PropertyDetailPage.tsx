import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sampleProperties, siteConfig } from '../config/siteConfig';
import { PropertyListing } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { PropertyCard } from '../components/property/PropertyCard';

interface PropertyDetailPageProps {
  property: PropertyListing;
  onBack: () => void;
  onSelectProperty: (property: PropertyListing) => void;
  onRequestViewing: (propertyTitle?: string, propertyId?: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onSelectProperty,
  onRequestViewing,
}) => {
  const { lang, t, formatCurrency, formatNumber } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const title = lang === 'ar' ? property.titleAr : property.titleEn;
  const district = lang === 'ar' ? property.districtAr : property.districtEn;
  const headline = lang === 'ar' ? property.headlineAr : property.headlineEn;
  const description = lang === 'ar' ? property.descriptionAr : property.descriptionEn;
  const finishing = lang === 'ar' ? property.finishingAr : property.finishingEn;
  const locationNote = lang === 'ar' ? property.locationNoteAr : property.locationNoteEn;
  const features = lang === 'ar' ? property.featuresAr : property.featuresEn;
  const amenities = lang === 'ar' ? property.amenitiesAr : property.amenitiesEn;

  const purposeLabel = property.purpose === 'sale'
    ? (lang === 'ar' ? 'معروض للبيع' : 'Offered for Sale')
    : (lang === 'ar' ? 'معروض للإيجار' : 'Offered for Lease');

  const typeLabel = (() => {
    switch (property.type) {
      case 'villa':
        return lang === 'ar' ? 'فيلا سكنية' : 'Luxury Villa';
      case 'apartment':
        return lang === 'ar' ? 'شقة فاخرة' : 'Apartment / Penthouse';
      case 'commercial':
        return lang === 'ar' ? 'مساحة تجارية وإدارية' : 'Commercial Space';
      case 'land':
        return lang === 'ar' ? 'أرض سكنية' : 'Residential Land';
    }
  })();

  const isResidential = property.type === 'villa' || property.type === 'apartment';

  // Related listings
  const relatedProperties = sampleProperties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.districtEn === property.districtEn))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F1B2B] hover:text-[#9E7B35] transition-colors focus-visible:outline-2"
        >
          <svg className="w-4 h-4 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>{t.propertyDetails.backToProperties}</span>
        </button>

        <span className="text-[11px] font-medium text-[#7A8699] bg-[#FAF8F5] px-2.5 py-1 border border-[#E8E2D5] rounded-md">
          {t.sampleListingBadge} · {siteConfig.demoNotice.disclaimerEn}
        </span>
      </div>

      {/* Main Title & Price Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D5]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9E7B35] mb-2">
            <span>{district} · {lang === 'ar' ? 'الرياض' : 'Riyadh'}</span>
            <span aria-hidden="true">·</span>
            <span>{purposeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{typeLabel}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2B] font-display leading-tight text-balance">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-[#5E6E82] mt-2 leading-relaxed">
            {headline}
          </p>
        </div>

        <div className="lg:text-right shrink-0">
          <span className="text-xs text-[#7A8699] block font-normal">
            {lang === 'ar' ? 'السعر المقدر للعرض' : 'Sample Listing Valuation'}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] tabular-nums tracking-tight block">
            {formatCurrency(property.priceSar, property.rentalPeriod)}
          </span>
          <span className="text-[11px] text-[#9E7B35] mt-1 block">
            {siteConfig.demoNotice.badgeEn} / {siteConfig.demoNotice.badgeAr}
          </span>
        </div>
      </div>

      {/* 1. Large Image Gallery with Working Thumbnails */}
      <div className="space-y-4">
        {/* Main Active Image Display */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative aspect-16/9 sm:aspect-21/9 w-full bg-[#121E2E] rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
          role="button"
          tabIndex={0}
          aria-label={lang === 'ar' ? 'عرض الصورة بالحجم الكامل' : 'View full-size photo'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
        >
          <ImageWithFallback
            src={property.images[selectedImageIndex] || property.images[0]}
            alt={`${title} - view ${selectedImageIndex + 1}`}
            fallbackTitle={title}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

          {/* Enlarge Affordance */}
          <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{lang === 'ar' ? 'تكبير الصورة' : 'Full Screen'}</span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {property.images.map((img, idx) => {
            const isSelected = selectedImageIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-4/3 rounded-lg overflow-hidden border-2 transition-all focus-visible:outline-2 ${
                  isSelected
                    ? 'border-[#C5A869] shadow-sm'
                    : 'border-[#E8E2D5] opacity-70 hover:opacity-100'
                }`}
                aria-label={`Thumbnail ${idx + 1}`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fallbackTitle={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Content & Specifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 pt-4">
        {/* Left 2 Cols: Description, Specs, Amenities, Location Overview */}
        <div className="lg:col-span-2 space-y-10">
          {/* Architectural Description */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E2D5] shadow-xs">
            <h2 className="text-xl font-bold text-[#0F1B2B] font-display mb-4">
              {lang === 'ar' ? 'عن هذا العقار' : 'About This Property'}
            </h2>
            <p className="text-xs sm:text-sm text-[#3E4D61] leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E2D5] shadow-xs">
            <h2 className="text-xl font-bold text-[#0F1B2B] font-display mb-6">
              {t.propertyDetails.specifications}
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 text-xs">
              <div>
                <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.propertyId}
                </dt>
                <dd className="font-semibold text-[#0F1B2B] uppercase">
                  {property.id}
                </dd>
              </div>

              <div>
                <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.purpose}
                </dt>
                <dd className="font-semibold text-[#0F1B2B]">
                  {purposeLabel}
                </dd>
              </div>

              <div>
                <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.propertyType}
                </dt>
                <dd className="font-semibold text-[#0F1B2B]">
                  {typeLabel}
                </dd>
              </div>

              <div>
                <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.landArea}
                </dt>
                <dd className="font-semibold text-[#0F1B2B] tabular-nums">
                  {formatNumber(property.areaSqm)} {t.propertyCard.sqm}
                </dd>
              </div>

              {property.builtUpAreaSqm && (
                <div>
                  <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.builtUpArea}
                  </dt>
                  <dd className="font-semibold text-[#0F1B2B] tabular-nums">
                    {formatNumber(property.builtUpAreaSqm)} {t.propertyCard.sqm}
                  </dd>
                </div>
              )}

              {isResidential && property.bedrooms !== undefined && (
                <div>
                  <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.bedrooms}
                  </dt>
                  <dd className="font-semibold text-[#0F1B2B] tabular-nums">
                    {property.bedrooms} {t.propertyCard.beds}
                  </dd>
                </div>
              )}

              {isResidential && property.bathrooms !== undefined && (
                <div>
                  <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.bathrooms}
                  </dt>
                  <dd className="font-semibold text-[#0F1B2B] tabular-nums">
                    {property.bathrooms} {t.propertyCard.baths}
                  </dd>
                </div>
              )}

              {property.parkingSpaces !== undefined && (
                <div>
                  <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.parkingSpaces}
                  </dt>
                  <dd className="font-semibold text-[#0F1B2B] tabular-nums">
                    {property.parkingSpaces} {lang === 'ar' ? 'سيارات' : 'Vehicles'}
                  </dd>
                </div>
              )}

              {property.yearBuilt && (
                <div>
                  <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.yearBuilt}
                  </dt>
                  <dd className="font-semibold text-[#0F1B2B] tabular-nums">
                    {property.yearBuilt}
                  </dd>
                </div>
              )}

              <div className="col-span-2">
                <dt className="text-[#7A8699] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.finishing}
                </dt>
                <dd className="font-semibold text-[#0F1B2B]">
                  {finishing}
                </dd>
              </div>
            </dl>
          </div>

          {/* Features & Amenities */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E2D5] shadow-xs">
            <h2 className="text-xl font-bold text-[#0F1B2B] font-display mb-6">
              {t.propertyDetails.amenities}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#3E4D61]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
              {amenities.map((item, idx) => (
                <div key={`amenity-${idx}`} className="flex items-center gap-2.5 text-xs text-[#3E4D61]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E7B35] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approximate District Location */}
          <div className="bg-[#FAF5EB] p-6 sm:p-8 rounded-xl border border-[#E8E2D5] shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E7B35] mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{t.propertyDetails.locationOverview}</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-2">
              {district} · {lang === 'ar' ? 'الرياض' : 'Riyadh'}
            </h3>
            <p className="text-xs text-[#5E6E82] leading-relaxed mb-4">
              {locationNote}
            </p>
            <div className="bg-white p-3.5 rounded-lg border border-[#E8E2D5] text-[11px] text-[#7A8699] flex items-center gap-2">
              <svg className="w-4 h-4 text-[#9E7B35] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t.propertyDetails.locationContextNotice}</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Floating Sticky Viewing Card */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-[#E8E2D5] shadow-md space-y-6">
            <div>
              <span className="text-[11px] font-semibold text-[#9E7B35] uppercase tracking-wider block mb-1">
                {lang === 'ar' ? 'طلب زيارة أو استفسار' : 'Inquire or Schedule Tour'}
              </span>
              <h3 className="text-xl font-bold text-[#0F1B2B] font-display">
                {t.propertyDetails.inquireTitle}
              </h3>
              <p className="text-xs text-[#5E6E82] mt-1 leading-relaxed">
                {t.propertyDetails.inquireSubtext}
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE6DD] space-y-2 text-xs">
              <div className="flex justify-between text-[#5E6E82]">
                <span>{t.propertyDetails.propertyId}:</span>
                <span className="font-semibold text-[#0F1B2B] uppercase">{property.id}</span>
              </div>
              <div className="flex justify-between text-[#5E6E82]">
                <span>{t.propertyDetails.district}:</span>
                <span className="font-semibold text-[#0F1B2B]">{district}</span>
              </div>
              <div className="flex justify-between text-[#5E6E82]">
                <span>{lang === 'ar' ? 'السعر المقدر' : 'Sample Value'}:</span>
                <span className="font-semibold text-[#0F1B2B] tabular-nums">
                  {formatCurrency(property.priceSar, property.rentalPeriod)}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => onRequestViewing(title, property.id)}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0F1B2B] hover:bg-[#1E2F46] rounded-lg transition-colors shadow-xs"
              >
                {t.propertyDetails.requestViewing}
              </button>
              <button
                type="button"
                onClick={() => onRequestViewing(title, property.id)}
                className="w-full py-3 px-4 text-xs font-semibold text-[#0F1B2B] bg-[#F0EBE1] hover:bg-[#E4DDCF] rounded-lg transition-colors"
              >
                {t.propertyDetails.askAboutProperty}
              </button>
            </div>

            <p className="text-[11px] text-center text-[#7A8699] leading-relaxed">
              {siteConfig.demoNotice.disclaimerEn}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Related Opportunities */}
      {relatedProperties.length > 0 && (
        <section className="pt-12 border-t border-[#E8E2D5]">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
              {lang === 'ar' ? 'عقارات مختارة' : 'Recommendations'}
            </span>
            <h2 className="text-2xl font-bold text-[#0F1B2B] font-display">
              {t.propertyDetails.relatedTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {relatedProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onSelect={(selected) => {
                  onSelectProperty(selected);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            <ImageWithFallback
              src={property.images[selectedImageIndex]}
              alt={title}
              fallbackTitle={title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="mt-4 flex items-center gap-2">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    selectedImageIndex === i ? 'bg-[#C5A869]' : 'bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
