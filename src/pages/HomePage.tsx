import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig, sampleProperties } from '../config/siteConfig';
import { PropertyFilterState, PropertyListing, PropertyPurpose, PropertyType, PageRoute } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectProperty: (property: PropertyListing) => void;
  onApplyFiltersAndNavigate: (filters: Partial<PropertyFilterState>) => void;
  onRequestViewing: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProperty,
  onApplyFiltersAndNavigate,
  onRequestViewing,
}) => {
  const { lang, t } = useLanguage();

  // Search panel states
  const [searchPurpose, setSearchPurpose] = useState<PropertyPurpose>('sale');
  const [searchDistrict, setSearchDistrict] = useState<string>('all');
  const [searchType, setSearchType] = useState<string>('all');
  const [searchBudget, setSearchBudget] = useState<string>('all');

  const featuredProperties = sampleProperties.filter((p) => p.isFeatured).slice(0, 6);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let priceMax: number | undefined = undefined;
    let priceMin: number | undefined = undefined;

    if (searchBudget === 'under-5m') {
      priceMax = 5000000;
    } else if (searchBudget === '5m-15m') {
      priceMin = 5000000;
      priceMax = 15000000;
    } else if (searchBudget === 'above-15m') {
      priceMin = 15000000;
    }

    onApplyFiltersAndNavigate({
      purpose: searchPurpose,
      district: searchDistrict,
      type: searchType as 'all' | PropertyType,
      priceMin,
      priceMax,
    });
  };

  const handleTypeSelect = (typeId: PropertyType) => {
    onApplyFiltersAndNavigate({
      type: typeId,
      purpose: 'all',
      district: 'all',
    });
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[740px] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Architectural Background Media */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/src/assets/images/hero_riyadh_villa_1790553255457.jpg"
            alt="Contemporary Luxury Villa in Riyadh"
            fallbackTitle="Luxury Riyadh Villa"
            className="w-full h-full object-cover object-center"
          />
          {/* Measured Scrim for WCAG AA readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2B]/95 via-[#0F1B2B]/75 to-[#0F1B2B]/55" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center pt-8">
          {/* Unboxed Location Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D8C7A5] mb-4">
            <span>{lang === 'ar' ? 'سوق الرياض العقاري' : 'Riyadh Real Estate Market'}</span>
            <span aria-hidden="true">·</span>
            <span>{siteConfig.demoNotice.badgeEn} / {siteConfig.demoNotice.badgeAr}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display tracking-tight max-w-3xl leading-[1.15] text-balance mb-6">
            {t.tagline}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#E1E8F0] font-light max-w-2xl leading-relaxed text-balance mb-8">
            {t.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              type="button"
              onClick={() => onNavigate('properties')}
              className="px-7 py-3 text-sm font-semibold text-[#0F1B2B] bg-[#FAF8F5] hover:bg-white rounded-lg transition-all shadow-md focus-visible:outline-2"
            >
              {t.exploreProperties}
            </button>
            <button
              type="button"
              onClick={onRequestViewing}
              className="px-7 py-3 text-sm font-semibold text-white bg-transparent hover:bg-white/10 border border-[#D8C7A5]/50 rounded-lg transition-all focus-visible:outline-2"
            >
              {t.discussRequirements}
            </button>
          </div>

          {/* Search Panel Component */}
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#E8E2D5] text-left rtl:text-right">
            <form onSubmit={handleHeroSearch} className="space-y-4">
              {/* Buy / Rent Toggle */}
              <div className="inline-flex p-1 bg-[#F3EFE6] rounded-lg border border-[#E0D9CC]">
                <button
                  type="button"
                  onClick={() => setSearchPurpose('sale')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    searchPurpose === 'sale'
                      ? 'bg-white text-[#0F1B2B] shadow-xs'
                      : 'text-[#5E6E82] hover:text-[#0F1B2B]'
                  }`}
                >
                  {t.search.buy}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchPurpose('rent')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    searchPurpose === 'rent'
                      ? 'bg-white text-[#0F1B2B] shadow-xs'
                      : 'text-[#5E6E82] hover:text-[#0F1B2B]'
                  }`}
                >
                  {t.search.rent}
                </button>
              </div>

              {/* Filter Selects & CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                {/* District */}
                <div>
                  <label htmlFor="hero-district" className="block text-[11px] font-semibold text-[#5E6E82] uppercase tracking-wider mb-1">
                    {t.search.district}
                  </label>
                  <select
                    id="hero-district"
                    value={searchDistrict}
                    onChange={(e) => setSearchDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869]"
                  >
                    <option value="all">{t.search.allDistricts}</option>
                    {siteConfig.districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {lang === 'ar' ? d.nameAr : d.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label htmlFor="hero-type" className="block text-[11px] font-semibold text-[#5E6E82] uppercase tracking-wider mb-1">
                    {t.search.propertyType}
                  </label>
                  <select
                    id="hero-type"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869]"
                  >
                    <option value="all">{t.search.allTypes}</option>
                    {siteConfig.propertyTypes.map((pt) => (
                      <option key={pt.id} value={pt.id}>
                        {lang === 'ar' ? pt.labelAr : pt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="hero-budget" className="block text-[11px] font-semibold text-[#5E6E82] uppercase tracking-wider mb-1">
                    {t.search.budget}
                  </label>
                  <select
                    id="hero-budget"
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869]"
                  >
                    <option value="all">{t.search.anyBudget}</option>
                    <option value="under-5m">
                      {lang === 'ar' ? 'أقل من 5 مليون ريال' : 'Under 5M SAR'}
                    </option>
                    <option value="5m-15m">
                      {lang === 'ar' ? '5 - 15 مليون ريال' : '5M – 15M SAR'}
                    </option>
                    <option value="above-15m">
                      {lang === 'ar' ? 'أكثر من 15 مليون ريال' : 'Above 15M SAR'}
                    </option>
                  </select>
                </div>

                {/* Submit Search */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0F1B2B] hover:bg-[#1E2F46] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <svg className="w-4 h-4 text-[#C5A869]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>{t.search.searchButton}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E2D5]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
              {lang === 'ar' ? 'عقارات مختارة' : 'Curated Portfolio'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] font-display">
              {t.home.featuredTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6E82] mt-1 max-w-xl">
              {t.home.featuredSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('properties')}
            className="text-xs font-semibold text-[#0F1B2B] hover:text-[#9E7B35] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>{t.home.viewAllProperties}</span>
            <svg
              className="w-4 h-4 transform rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 3. Browse by Type Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
            {lang === 'ar' ? 'فئات العقار' : 'Property Categories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] font-display mb-2">
            {t.home.browseByTypeTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6E82]">
            {t.home.browseByTypeSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Villas */}
          <div
            onClick={() => handleTypeSelect('villa')}
            className="group cursor-pointer bg-white border border-[#E8E2D5] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#C5A869] transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FAF5EB] text-[#9E7B35] flex items-center justify-center mb-5 group-hover:bg-[#0F1B2B] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-2 group-hover:text-[#9E7B35] transition-colors">
                {lang === 'ar' ? 'الفلل والقصور' : 'Villas & Mansions'}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {lang === 'ar'
                  ? 'مساكن عائلية مستقلة بأفنية خاصة ومسابح وتصاميم معمارية معاصرة في أحياء شمال الرياض.'
                  : 'Standalone architectural residences offering private courtyards, swimming pools, and dedicated family quarters.'}
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-semibold text-[#0F1B2B]">
              <span>{lang === 'ar' ? 'استعراض الفلل' : 'Explore Villas'}</span>
              <svg className="w-4 h-4 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform text-[#9E7B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Apartments */}
          <div
            onClick={() => handleTypeSelect('apartment')}
            className="group cursor-pointer bg-white border border-[#E8E2D5] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#C5A869] transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FAF5EB] text-[#9E7B35] flex items-center justify-center mb-5 group-hover:bg-[#0F1B2B] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-2 group-hover:text-[#9E7B35] transition-colors">
                {lang === 'ar' ? 'الشقق والبنتهاوس' : 'Apartments & Penthouses'}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {lang === 'ar'
                  ? 'بنتهاوس سماوي ووحدات سكنية متطورة بإطلالات بانورامية في مركز الملك عبدالله المالي والأحياء الحديثة.'
                  : 'Elevated urban living with sky terraces and high-spec amenities in prime financial and cultural corridors.'}
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-semibold text-[#0F1B2B]">
              <span>{lang === 'ar' ? 'استعراض الشقق' : 'Explore Apartments'}</span>
              <svg className="w-4 h-4 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform text-[#9E7B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Land */}
          <div
            onClick={() => handleTypeSelect('land')}
            className="group cursor-pointer bg-white border border-[#E8E2D5] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#C5A869] transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FAF5EB] text-[#9E7B35] flex items-center justify-center mb-5 group-hover:bg-[#0F1B2B] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-2 group-hover:text-[#9E7B35] transition-colors">
                {lang === 'ar' ? 'الأراضي السكنية' : 'Residential Land'}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {lang === 'ar'
                  ? 'قطع أراضٍ سكنية واستثمارية مهيأة للبناء في مواقع استراتيجية تتيح تصميم مسكن أحلامك.'
                  : 'Prime plots suited for bespoke private estates and residential developments with infrastructure connections.'}
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-semibold text-[#0F1B2B]">
              <span>{lang === 'ar' ? 'استعراض الأراضي' : 'Explore Land'}</span>
              <svg className="w-4 h-4 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform text-[#9E7B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Commercial */}
          <div
            onClick={() => handleTypeSelect('commercial')}
            className="group cursor-pointer bg-white border border-[#E8E2D5] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#C5A869] transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FAF5EB] text-[#9E7B35] flex items-center justify-center mb-5 group-hover:bg-[#0F1B2B] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-2 group-hover:text-[#9E7B35] transition-colors">
                {lang === 'ar' ? 'المكاتب والمساحات التجارية' : 'Commercial & Office'}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {lang === 'ar'
                  ? 'طوابق مكتبية ومعارض تجارية فاخرة على أهم المحاور التجارية بالرياض لتعزيز حضور علامتك.'
                  : 'Turnkey executive office suites and flagship retail showrooms along Riyadh’s premier commercial arteries.'}
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-semibold text-[#0F1B2B]">
              <span>{lang === 'ar' ? 'استعراض التجاري' : 'Explore Commercial'}</span>
              <svg className="w-4 h-4 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform text-[#9E7B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Overview Section */}
      <section className="bg-[#FAF5EB] py-20 border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
                {lang === 'ar' ? 'خدمات احترافية' : 'Bespoke Services'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] font-display">
                {t.home.servicesSectionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#5E6E82] mt-1 max-w-xl">
                {t.home.servicesSectionSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="px-5 py-2.5 text-xs font-semibold text-[#0F1B2B] bg-white hover:bg-[#F3EFE6] border border-[#E0D9CC] rounded-lg transition-colors shadow-2xs self-start lg:self-auto"
            >
              {lang === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: Property Sales */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] shadow-2xs">
              <span className="text-xs font-bold text-[#9E7B35] block mb-3 font-display">01</span>
              <h3 className="text-base font-semibold text-[#0F1B2B] mb-2 font-display">
                {t.services.service1Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.services.service1Desc}
              </p>
            </div>

            {/* Service 2: Rentals */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] shadow-2xs">
              <span className="text-xs font-bold text-[#9E7B35] block mb-3 font-display">02</span>
              <h3 className="text-base font-semibold text-[#0F1B2B] mb-2 font-display">
                {t.services.service2Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.services.service2Desc}
              </p>
            </div>

            {/* Service 3: Marketing & Photography */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] shadow-2xs">
              <span className="text-xs font-bold text-[#9E7B35] block mb-3 font-display">03</span>
              <h3 className="text-base font-semibold text-[#0F1B2B] mb-2 font-display">
                {t.services.service3Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.services.service3Desc}
              </p>
            </div>

            {/* Service 4: Property Management */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] shadow-2xs">
              <span className="text-xs font-bold text-[#9E7B35] block mb-3 font-display">04</span>
              <h3 className="text-base font-semibold text-[#0F1B2B] mb-2 font-display">
                {t.services.service4Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.services.service4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Three-Step Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
            {lang === 'ar' ? 'منهجية العمل' : 'Our Advisory Process'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] font-display mb-2">
            {t.home.stepsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6E82]">
            {t.home.stepsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#9E7B35] border border-[#E8E2D5] flex items-center justify-center font-bold text-sm mb-6">
                1
              </div>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-3">
                {t.home.step1Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.home.step1Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F3EFE6]">
              <button
                type="button"
                onClick={() => onNavigate('properties')}
                className="text-xs font-semibold text-[#9E7B35] hover:text-[#0F1B2B] transition-colors flex items-center gap-1"
              >
                <span>{t.exploreProperties}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#9E7B35] border border-[#E8E2D5] flex items-center justify-center font-bold text-sm mb-6">
                2
              </div>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-3">
                {t.home.step2Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.home.step2Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F3EFE6]">
              <button
                type="button"
                onClick={onRequestViewing}
                className="text-xs font-semibold text-[#9E7B35] hover:text-[#0F1B2B] transition-colors flex items-center gap-1"
              >
                <span>{t.propertyDetails.requestViewing}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#9E7B35] border border-[#E8E2D5] flex items-center justify-center font-bold text-sm mb-6">
                3
              </div>
              <h3 className="text-lg font-semibold text-[#0F1B2B] font-display mb-3">
                {t.home.step3Title}
              </h3>
              <p className="text-xs text-[#5E6E82] leading-relaxed">
                {t.home.step3Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F3EFE6]">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-xs font-semibold text-[#9E7B35] hover:text-[#0F1B2B] transition-colors flex items-center gap-1"
              >
                <span>{t.nav.contact}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F1B2B] rounded-2xl p-8 sm:p-14 text-center text-white relative overflow-hidden border border-[#1E2F46] shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A869] block mb-2">
              {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4 text-balance">
              {t.home.finalCtaHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#A3B3C9] leading-relaxed mb-8 text-balance">
              {t.home.finalCtaSubtext}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-7 py-3 text-xs font-semibold text-[#0F1B2B] bg-[#FAF8F5] hover:bg-white rounded-lg transition-all shadow-md focus-visible:outline-2"
              >
                {t.home.discussPropertyNeeds}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('properties')}
                className="px-7 py-3 text-xs font-semibold text-white bg-transparent hover:bg-white/10 border border-[#D8C7A5]/40 rounded-lg transition-all focus-visible:outline-2"
              >
                {t.exploreProperties}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
