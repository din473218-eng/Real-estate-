import React, { useState, useEffect } from 'react';
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

  // In-page enquiry card state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryDate, setEnquiryDate] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquiryNotice, setEnquiryNotice] = useState(false);
  const [enquiryErrors, setEnquiryErrors] = useState<{ name?: string; phone?: string }>({});

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
        return lang === 'ar' ? 'مساحة تجارية' : 'Commercial Space';
      case 'land':
        return lang === 'ar' ? 'أرض سكنية' : 'Residential Land';
    }
  })();

  const isResidential = property.type === 'villa' || property.type === 'apartment';

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev + 1) % property.images.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, property.images.length]);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string } = {};
    if (!enquiryName.trim()) {
      errors.name = lang === 'ar' ? 'يرجى إدخال الاسم الكريم' : 'Please provide your full name';
    }
    if (!enquiryPhone.trim()) {
      errors.phone = lang === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please enter a valid phone number';
    }
    if (Object.keys(errors).length > 0) {
      setEnquiryErrors(errors);
      return;
    }
    setEnquiryErrors({});
    setEnquiryNotice(true);
  };

  // Related properties in same district or category
  const relatedProperties = sampleProperties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.districtEn === property.districtEn))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 lg:pb-12">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-[#526371]">
        <ol className="flex items-center gap-2">
          <li>
            <button
              type="button"
              onClick={onBack}
              className="text-[#13232D] hover:text-[#B49765] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t.propertyDetails.backToProperties}</span>
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#B49765] font-medium">{district}</li>
          <li aria-hidden="true" className="hidden sm:inline">/</li>
          <li className="hidden sm:inline text-[#738290] truncate max-w-xs">{title}</li>
        </ol>

        <span className="text-[11px] font-medium text-[#738290] bg-[#FAF8F5] px-2.5 py-1 border border-[#E8E4DC] rounded">
          {t.sampleListingBadge}
        </span>
      </nav>

      {/* 2. Property Title, District, Prominent Price */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E8E4DC]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B49765] mb-2">
            <span>{district} · {lang === 'ar' ? 'الرياض' : 'Riyadh'}</span>
            <span aria-hidden="true">·</span>
            <span>{purposeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{typeLabel}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13232D] font-display leading-tight text-balance">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-[#526371] mt-2 leading-relaxed">
            {headline}
          </p>
        </div>

        <div className="lg:text-right shrink-0">
          <span className="text-[11px] text-[#738290] block uppercase tracking-wider">
            {lang === 'ar' ? 'السعر المقدر' : 'Sample Value'}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-[#13232D] tabular-nums tracking-tight block">
            {formatCurrency(property.priceSar, property.rentalPeriod)}
          </span>
          <span className="text-[10px] text-[#B49765] mt-1 block">
            {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
          </span>
        </div>
      </div>

      {/* 3. Photo Gallery with Clickable Thumbnails and Lightbox */}
      <div className="space-y-4">
        {/* Main Display */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative aspect-16/9 sm:aspect-21/9 w-full bg-[#13232D] rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
          role="button"
          tabIndex={0}
          aria-label={lang === 'ar' ? 'تكبير الصورة وعرض المعرض' : 'Open photo lightbox'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
        >
          <ImageWithFallback
            src={property.images[selectedImageIndex] || property.images[0]}
            alt={`${title} - photo ${selectedImageIndex + 1}`}
            fallbackTitle={title}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

          {/* Enlarge Affordance */}
          <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 bg-[#13232D]/80 backdrop-blur-xs text-white text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
            <svg className="w-4 h-4 text-[#B49765]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{lang === 'ar' ? 'عرض بالحجم الكامل' : 'Full Screen'}</span>
          </div>
        </div>

        {/* Clickable Thumbnails */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {property.images.map((img, idx) => {
            const isSelected = selectedImageIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-4/3 rounded-lg overflow-hidden border-2 transition-all focus-visible:outline-2 cursor-pointer ${
                  isSelected
                    ? 'border-[#B49765] shadow-xs'
                    : 'border-[#E8E4DC] opacity-70 hover:opacity-100'
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

      {/* 4. Content Specifications + Sticky Desktop Enquiry Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4">
        {/* Left 8 Cols: Description, Specs, Amenities, District Location */}
        <div className="lg:col-span-8 space-y-10">
          {/* Description */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-xs">
            <h2 className="text-xl font-bold text-[#13232D] font-display mb-4">
              {lang === 'ar' ? 'عن هذا العقار' : 'About This Property'}
            </h2>
            <p className="text-xs sm:text-sm text-[#202A30] leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-xs">
            <h2 className="text-xl font-bold text-[#13232D] font-display mb-6">
              {t.propertyDetails.specifications}
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 text-xs">
              <div>
                <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.propertyId}
                </dt>
                <dd className="font-semibold text-[#13232D] uppercase">
                  {property.id}
                </dd>
              </div>

              <div>
                <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.purpose}
                </dt>
                <dd className="font-semibold text-[#13232D]">
                  {purposeLabel}
                </dd>
              </div>

              <div>
                <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.propertyType}
                </dt>
                <dd className="font-semibold text-[#13232D]">
                  {typeLabel}
                </dd>
              </div>

              <div>
                <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.landArea}
                </dt>
                <dd className="font-semibold text-[#13232D] tabular-nums">
                  {formatNumber(property.areaSqm)} {t.propertyCard.sqm}
                </dd>
              </div>

              {property.builtUpAreaSqm && (
                <div>
                  <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.builtUpArea}
                  </dt>
                  <dd className="font-semibold text-[#13232D] tabular-nums">
                    {formatNumber(property.builtUpAreaSqm)} {t.propertyCard.sqm}
                  </dd>
                </div>
              )}

              {isResidential && property.bedrooms !== undefined && (
                <div>
                  <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.bedrooms}
                  </dt>
                  <dd className="font-semibold text-[#13232D] tabular-nums">
                    {property.bedrooms} {t.propertyCard.beds}
                  </dd>
                </div>
              )}

              {isResidential && property.bathrooms !== undefined && (
                <div>
                  <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.bathrooms}
                  </dt>
                  <dd className="font-semibold text-[#13232D] tabular-nums">
                    {property.bathrooms} {t.propertyCard.baths}
                  </dd>
                </div>
              )}

              {property.parkingSpaces !== undefined && (
                <div>
                  <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.parkingSpaces}
                  </dt>
                  <dd className="font-semibold text-[#13232D] tabular-nums">
                    {property.parkingSpaces} {lang === 'ar' ? 'سيارات' : 'Vehicles'}
                  </dd>
                </div>
              )}

              {property.yearBuilt && (
                <div>
                  <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                    {t.propertyDetails.yearBuilt}
                  </dt>
                  <dd className="font-semibold text-[#13232D] tabular-nums">
                    {property.yearBuilt}
                  </dd>
                </div>
              )}

              <div className="col-span-2">
                <dt className="text-[#738290] uppercase tracking-wider text-[11px] mb-1">
                  {t.propertyDetails.finishing}
                </dt>
                <dd className="font-semibold text-[#13232D]">
                  {finishing}
                </dd>
              </div>
            </dl>
          </div>

          {/* Amenities & Features */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-xs">
            <h2 className="text-xl font-bold text-[#13232D] font-display mb-6">
              {t.propertyDetails.amenities}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#202A30]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B49765] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
              {amenities.map((item, idx) => (
                <div key={`amenity-${idx}`} className="flex items-center gap-2.5 text-xs text-[#526371]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8D2C5] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* District Location Section (District-level only, no fake addresses) */}
          <div className="bg-[#FAF5EB] p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B49765] mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{t.propertyDetails.locationOverview}</span>
            </div>
            <h3 className="text-xl font-bold text-[#13232D] font-display mb-2">
              {district} · {lang === 'ar' ? 'الرياض' : 'Riyadh'}
            </h3>
            <p className="text-xs text-[#526371] leading-relaxed mb-4">
              {locationNote}
            </p>
            <div className="bg-white p-3.5 rounded-xl border border-[#E8E4DC] text-[11px] text-[#738290] flex items-center gap-2">
              <svg className="w-4 h-4 text-[#B49765] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t.propertyDetails.locationContextNotice}</span>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Sticky Desktop Enquiry Card */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28 bg-white p-7 rounded-2xl border border-[#E8E4DC] shadow-md space-y-5">
            <div>
              <span className="text-[11px] font-semibold text-[#B49765] uppercase tracking-wider block mb-1">
                {lang === 'ar' ? 'استفسار أو موعد معاينة' : 'Viewing Request'}
              </span>
              <h3 className="text-xl font-bold text-[#13232D] font-display">
                {t.propertyDetails.interestedTitle}
              </h3>
              <p className="text-xs text-[#526371] mt-1 leading-relaxed">
                {t.propertyDetails.enquiryCardSubtext}
              </p>
            </div>

            {/* Pre-filled property badge */}
            <div className="p-3 bg-[#F7F5F0] rounded-xl border border-[#E8E4DC] text-xs">
              <span className="text-[10px] text-[#738290] block">{lang === 'ar' ? 'العقار المحدد' : 'Selected Property'}</span>
              <span className="font-semibold text-[#13232D] block truncate">{title}</span>
              <span className="text-[11px] text-[#B49765] font-medium">{formatCurrency(property.priceSar, property.rentalPeriod)}</span>
            </div>

            {enquiryNotice ? (
              <div className="p-4 bg-[#FAF5EB] border border-[#B49765]/40 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B49765]">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t.contact.demoAlertTitle}</span>
                </div>
                <p className="text-xs text-[#202A30] leading-relaxed">
                  {siteConfig.demoNotice.submissionNoticeEn}
                </p>
                <p className="text-xs text-[#202A30] leading-relaxed font-arabic" dir="rtl">
                  {siteConfig.demoNotice.submissionNoticeAr}
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="enquiry-name" className="block text-xs font-medium text-[#202A30] mb-1">
                    {t.contact.fullName} <span className="text-[#B49765]">*</span>
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    placeholder={lang === 'ar' ? 'مثال: فهد الدوسري' : 'e.g. Fahad Al-Dossary'}
                    className="w-full px-3 py-2 text-xs bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765]"
                  />
                  {enquiryErrors.name && (
                    <p className="text-[11px] text-rose-600 mt-1">{enquiryErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="enquiry-phone" className="block text-xs font-medium text-[#202A30] mb-1">
                    {t.contact.phone} <span className="text-[#B49765]">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    placeholder="+966 50 000 0000"
                    dir="ltr"
                    className="w-full px-3 py-2 text-xs bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] text-left"
                  />
                  {enquiryErrors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{enquiryErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="enquiry-date" className="block text-xs font-medium text-[#202A30] mb-1">
                    {t.contact.preferredDate}
                  </label>
                  <input
                    id="enquiry-date"
                    type="date"
                    value={enquiryDate}
                    onChange={(e) => setEnquiryDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765]"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-message" className="block text-xs font-medium text-[#202A30] mb-1">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={3}
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    placeholder={lang === 'ar' ? 'حدد أي استفسار أو موعد مفضل...' : 'Add questions or viewing preferences...'}
                    className="w-full px-3 py-2 text-xs bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {t.propertyDetails.requestViewing}
                </button>
              </form>
            )}

            <p className="text-[10px] text-center text-[#738290] leading-relaxed">
              {siteConfig.demoNotice.disclaimerEn}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="pt-12 border-t border-[#E8E4DC]">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
              {lang === 'ar' ? 'فرص مقترحة' : 'Suggested Spaces'}
            </span>
            <h2 className="text-2xl font-bold text-[#13232D] font-display">
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

      {/* 6. Mobile Compact Bottom Action Bar (does not cover content) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#F7F5F0]/95 backdrop-blur-md border-t border-[#E8E4DC] px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div className="truncate">
          <span className="text-[10px] text-[#738290] block truncate">{title}</span>
          <span className="text-sm font-bold text-[#13232D] tabular-nums">
            {formatCurrency(property.priceSar, property.rentalPeriod)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onRequestViewing(title, property.id)}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          {t.propertyDetails.requestViewing}
        </button>
      </div>

      {/* Lightbox Modal with Close and Keyboard Controls */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#13232D]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left / Right Arrow buttons */}
          <button
            type="button"
            onClick={() => setSelectedImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
            className="absolute left-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setSelectedImageIndex((prev) => (prev + 1) % property.images.length)}
            className="absolute right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            <ImageWithFallback
              src={property.images[selectedImageIndex]}
              alt={title}
              fallbackTitle={title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="mt-4 flex items-center gap-2">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    selectedImageIndex === i ? 'bg-[#B49765]' : 'bg-white/40'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
