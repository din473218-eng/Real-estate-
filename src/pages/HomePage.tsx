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

    if (searchBudget === 'under-3m') {
      priceMax = 3000000;
    } else if (searchBudget === '3m-8m') {
      priceMin = 3000000;
      priceMax = 8000000;
    } else if (searchBudget === '8m-15m') {
      priceMin = 8000000;
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

  const handleDistrictSelect = (districtId: string) => {
    onApplyFiltersAndNavigate({
      district: districtId,
      purpose: 'all',
      type: 'all',
    });
  };

  return (
    <div className="space-y-24 sm:space-y-36">
      {/* 1. Hero Section (~85vh desktop, natural mobile height) */}
      <section className="relative min-h-[600px] lg:min-h-[88vh] -mt-20 sm:-mt-22 flex flex-col justify-between pt-28 sm:pt-36 pb-24 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#13232D]">
        {/* Large Architectural Photograph with subtle dark overlay */}
        <div className="absolute inset-0 z-0 bg-[#13232D]">
          <ImageWithFallback
            src="/images/hero_riyadh_villa_1790553255457.jpg"
            alt="Contemporary luxury villa in Riyadh"
            fallbackTitle="Luxury Villa in Riyadh"
            darkFallback
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay ensuring rich contrast for hero typography and header */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#13232D]/95 via-[#13232D]/80 to-[#13232D]/70" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center pt-8 sm:pt-14">
          {/* Small label: RIYADH • HOMES • INVESTMENT */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#B49765] mb-5">
            <span>{t.heroKicker}</span>
          </div>

          {/* Main Heading: A Better Address. A New Beginning. */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display tracking-tight leading-[1.18] text-balance mb-6 whitespace-pre-line">
            {t.heroHeading}
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base lg:text-lg text-[#E8E4DC] font-light max-w-2xl leading-relaxed text-balance mb-8">
            {t.heroSubtext}
          </p>

          {/* Primary Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('properties')}
              className="px-7 py-3 text-xs sm:text-sm font-semibold text-white bg-[#B49765] hover:bg-[#A38654] rounded-lg transition-all shadow-md focus-visible:outline-2 cursor-pointer"
            >
              {t.exploreProperties}
            </button>
            <button
              type="button"
              onClick={onRequestViewing}
              className="px-7 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all focus-visible:outline-2 cursor-pointer"
            >
              {t.discussRequirements}
            </button>
          </div>
        </div>

        {/* 2. Property Search Panel: Near bottom of hero, visually overlapping the next section on desktop */}
        <div className="relative z-20 max-w-5xl mx-auto w-full -mb-16 sm:-mb-24 pt-8">
          <div className="bg-[#F7F5F0] rounded-2xl p-5 sm:p-7 shadow-2xl border border-[#E8E4DC] text-left rtl:text-right">
            <form onSubmit={handleHeroSearch} className="space-y-4">
              {/* Buy / Rent Tabs */}
              <div className="inline-flex p-1 bg-[#E8E4DC]/70 rounded-lg border border-[#D8D2C5]">
                <button
                  type="button"
                  onClick={() => setSearchPurpose('sale')}
                  className={`px-5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    searchPurpose === 'sale'
                      ? 'bg-white text-[#13232D] shadow-xs'
                      : 'text-[#526371] hover:text-[#13232D]'
                  }`}
                >
                  {t.search.buy}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchPurpose('rent')}
                  className={`px-5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    searchPurpose === 'rent'
                      ? 'bg-white text-[#13232D] shadow-xs'
                      : 'text-[#526371] hover:text-[#13232D]'
                  }`}
                >
                  {t.search.rent}
                </button>
              </div>

              {/* Stacked / Grid Filter Selects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
                {/* Property Type */}
                <div>
                  <label htmlFor="hero-type" className="block text-[11px] font-semibold text-[#526371] uppercase tracking-wider mb-1">
                    {t.search.propertyType}
                  </label>
                  <select
                    id="hero-type"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D8D2C5] rounded-lg text-[#13232D] focus:border-[#B49765] transition-colors"
                  >
                    <option value="all">{t.search.allTypes}</option>
                    {siteConfig.propertyTypes.map((pt) => (
                      <option key={pt.id} value={pt.id}>
                        {lang === 'ar' ? pt.labelAr : pt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Riyadh District */}
                <div>
                  <label htmlFor="hero-district" className="block text-[11px] font-semibold text-[#526371] uppercase tracking-wider mb-1">
                    {t.search.district}
                  </label>
                  <select
                    id="hero-district"
                    value={searchDistrict}
                    onChange={(e) => setSearchDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D8D2C5] rounded-lg text-[#13232D] focus:border-[#B49765] transition-colors"
                  >
                    <option value="all">{t.search.allDistricts}</option>
                    {siteConfig.districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {lang === 'ar' ? d.nameAr : d.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="hero-budget" className="block text-[11px] font-semibold text-[#526371] uppercase tracking-wider mb-1">
                    {t.search.budget}
                  </label>
                  <select
                    id="hero-budget"
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D8D2C5] rounded-lg text-[#13232D] focus:border-[#B49765] transition-colors"
                  >
                    <option value="all">{t.search.anyBudget}</option>
                    <option value="under-3m">{lang === 'ar' ? 'أقل من 3 مليون ريال' : 'Under 3M SAR'}</option>
                    <option value="3m-8m">{lang === 'ar' ? '3 - 8 مليون ريال' : '3M – 8M SAR'}</option>
                    <option value="8m-15m">{lang === 'ar' ? '8 - 15 مليون ريال' : '8M – 15M SAR'}</option>
                    <option value="above-15m">{lang === 'ar' ? 'أكثر من 15 مليون ريال' : 'Above 15M SAR'}</option>
                  </select>
                </div>

                {/* Strong Search Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#B49765]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* 3. Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E4DC]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
              {lang === 'ar' ? 'عقارات مختارة' : 'Curated Listings'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#13232D] font-display">
              {t.home.featuredHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#526371] mt-1 max-w-xl">
              {t.home.featuredSubtext}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('properties')}
            className="text-xs font-semibold text-[#13232D] hover:text-[#B49765] transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>{t.home.viewAllProperties}</span>
            <svg className="w-4 h-4 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 3 columns desktop, 2 columns tablet, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 4. Browse by Property Type (4 Image Tiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
            {lang === 'ar' ? 'تصنيفات المساحات' : 'Space Categories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#13232D] font-display mb-2">
            {t.home.browseByTypeTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#526371]">
            {t.home.browseByTypeSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Villas */}
          <div
            onClick={() => handleTypeSelect('villa')}
            className="group cursor-pointer relative aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-[#E8E4DC]"
          >
            <ImageWithFallback
              src="/images/villa_hittin_modern_1790553268044.jpg"
              alt="Luxury Villas"
              fallbackTitle="Villas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13232D]/90 via-[#13232D]/35 to-transparent flex flex-col justify-end p-5">
              <span className="text-lg font-bold text-white font-display">
                {lang === 'ar' ? 'الفلل والقصور' : 'Villas'}
              </span>
              <span className="text-[11px] text-[#E8E4DC] flex items-center gap-1 mt-1 group-hover:text-[#B49765] transition-colors">
                <span>{lang === 'ar' ? 'استعراض المعروض' : 'Browse Listings'}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Apartments */}
          <div
            onClick={() => handleTypeSelect('apartment')}
            className="group cursor-pointer relative aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-[#E8E4DC]"
          >
            <ImageWithFallback
              src="/images/apartment_kafd_penthouse_1790553278890.jpg"
              alt="Luxury Apartments"
              fallbackTitle="Apartments"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13232D]/90 via-[#13232D]/35 to-transparent flex flex-col justify-end p-5">
              <span className="text-lg font-bold text-white font-display">
                {lang === 'ar' ? 'الشقق والبنتهاوس' : 'Apartments'}
              </span>
              <span className="text-[11px] text-[#E8E4DC] flex items-center gap-1 mt-1 group-hover:text-[#B49765] transition-colors">
                <span>{lang === 'ar' ? 'استعراض المعروض' : 'Browse Listings'}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Land */}
          <div
            onClick={() => handleTypeSelect('land')}
            className="group cursor-pointer relative aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-[#E8E4DC]"
          >
            <ImageWithFallback
              src="/images/district_alnarjis_1790554513083.jpg"
              alt="Residential Land"
              fallbackTitle="Land"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13232D]/90 via-[#13232D]/35 to-transparent flex flex-col justify-end p-5">
              <span className="text-lg font-bold text-white font-display">
                {lang === 'ar' ? 'الأراضي السكنية' : 'Land Plots'}
              </span>
              <span className="text-[11px] text-[#E8E4DC] flex items-center gap-1 mt-1 group-hover:text-[#B49765] transition-colors">
                <span>{lang === 'ar' ? 'استعراض المعروض' : 'Browse Listings'}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Commercial */}
          <div
            onClick={() => handleTypeSelect('commercial')}
            className="group cursor-pointer relative aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-[#E8E4DC]"
          >
            <ImageWithFallback
              src="/images/commercial_olaya_tower_1790553287935.jpg"
              alt="Commercial & Office"
              fallbackTitle="Commercial"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13232D]/90 via-[#13232D]/35 to-transparent flex flex-col justify-end p-5">
              <span className="text-lg font-bold text-white font-display">
                {lang === 'ar' ? 'التجاري والمكاتب' : 'Commercial'}
              </span>
              <span className="text-[11px] text-[#E8E4DC] flex items-center gap-1 mt-1 group-hover:text-[#B49765] transition-colors">
                <span>{lang === 'ar' ? 'استعراض المعروض' : 'Browse Listings'}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Editorial Feature Section (Asymmetric Two-Column Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-2xl border border-[#E8E4DC] shadow-xs">
          {/* Large Architectural Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-xl overflow-hidden bg-[#E8E4DC]">
              <ImageWithFallback
                src="/images/about_arch_riyadh_1790553298984.jpg"
                alt="Contemporary architecture in Riyadh"
                fallbackTitle="Architectural Clarity"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Heading, Copy, Button */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block">
              {lang === 'ar' ? 'رؤية معمارية هادئة' : 'Editorial Perspective'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#13232D] font-display leading-tight text-balance">
              {t.home.editorialHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#526371] leading-relaxed">
              {t.home.editorialCopy}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="px-6 py-2.5 text-xs font-semibold text-[#13232D] bg-[#E8E4DC]/80 hover:bg-[#E8E4DC] rounded-lg transition-colors border border-[#D8D2C5] cursor-pointer"
              >
                {t.home.editorialBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Explore Riyadh (4 District Cards: Al Narjis, Al Yasmin, Al Malqa, Qurtubah) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E4DC]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
              {lang === 'ar' ? 'خريطة الأحياء' : 'District Guide'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#13232D] font-display">
              {t.home.exploreRiyadhHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#526371] mt-1 max-w-xl">
              {t.home.exploreRiyadhSubtext}
            </p>
          </div>
          <span className="text-[11px] text-[#738290]">
            {lang === 'ar' ? 'انقر على الحي لعرض العقارات المتوفرة' : 'Click any district to view its sample listings'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.featuredDistricts.map((dist) => (
            <div
              key={dist.id}
              onClick={() => handleDistrictSelect(dist.id)}
              className="group cursor-pointer bg-white border border-[#E8E4DC] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#B49765]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#E8E4DC]">
                  <ImageWithFallback
                    src={dist.image}
                    alt={lang === 'ar' ? dist.nameAr : dist.nameEn}
                    fallbackTitle={dist.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 bg-[#13232D]/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
                    {lang === 'ar' ? 'صورة توضيحية للحي' : 'Illustrative Context'}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#13232D] font-display mb-1.5 group-hover:text-[#B49765] transition-colors">
                    {lang === 'ar' ? dist.nameAr : dist.nameEn}
                  </h3>
                  <p className="text-xs text-[#526371] leading-relaxed">
                    {lang === 'ar' ? dist.descAr : dist.descEn}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-[#F0ECE2] flex items-center justify-between text-xs font-semibold text-[#B49765]">
                <span>{lang === 'ar' ? 'استعراض عقارات الحي' : 'View District Spaces'}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Services Preview (4 Services with Line Icons) */}
      <section className="bg-[#EFECE4]/60 py-20 border-y border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
                {lang === 'ar' ? 'مجالات العمل' : 'Areas of Expertise'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#13232D] font-display">
                {t.home.servicesHeading}
              </h2>
              <p className="text-xs sm:text-sm text-[#526371] mt-1 max-w-xl">
                {t.home.servicesSubtext}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="px-5 py-2.5 text-xs font-semibold text-[#13232D] bg-white hover:bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg transition-colors shadow-2xs self-start lg:self-auto cursor-pointer"
            >
              {lang === 'ar' ? 'استعراض التفاصيل الكاملة' : 'View Full Services'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: Sales */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E4DC] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#B49765] flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#13232D] font-display">
                {lang === 'ar' ? 'بيع وشراء العقارات' : 'Property Sales'}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {lang === 'ar'
                  ? 'تمثيل متوازن في صفقات الفلل والأراضي السكنية والتجارية مع تقييم سوقي واقعي وإفراغ نظامي سلس.'
                  : 'Guiding buyers and sellers through fair valuations, dossier preparation, and structured contract execution.'}
              </p>
            </div>

            {/* Service 2: Rentals */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E4DC] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#B49765] flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#13232D] font-display">
                {lang === 'ar' ? 'التأجير السكني والتجاري' : 'Residential & Commercial Rentals'}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {lang === 'ar'
                  ? 'ربط المستأجرين بأرقى الوحدات السكنية والمقرات الإدارية والمعارض في أهم مراكز الأعمال في الرياض.'
                  : 'Securing single-family residences, sky penthouses, and corporate office floors across prime nodes.'}
              </p>
            </div>

            {/* Service 3: Marketing */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E4DC] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#B49765] flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#13232D] font-display">
                {lang === 'ar' ? 'التصوير والتسويق العقاري' : 'Property Marketing'}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {lang === 'ar'
                  ? 'إنتاج محتوى بصري احترافي وبطاقات مواصفات دقيقة وحملات رقمية موجهة لجمهور المشترين الجادين.'
                  : 'Architectural photography, cinematic video tours, and targeted digital distribution to high-net-worth buyers.'}
              </p>
            </div>

            {/* Service 4: Management */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E4DC] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#B49765] flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#13232D] font-display">
                {lang === 'ar' ? 'إدارة الأملاك العقارية' : 'Property Management'}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {lang === 'ar'
                  ? 'متابعة تشغيلية وصيانة دورية للحفاظ على القيمة الاستثمارية والإنشائية للعقار واستقرار المستأجرين.'
                  : 'Proactive maintenance oversight, lease renewals, and periodic financial reporting for property owners.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. How It Works (3 Clear Steps: Explore, Enquire, Take the Next Step) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
            {lang === 'ar' ? 'خطوات واضحة' : 'The Process'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#13232D] font-display mb-2">
            {t.home.howItWorksHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#526371]">
            {t.home.howItWorksSubtext}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Explore */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#B49765] border border-[#E8E4DC] flex items-center justify-center font-bold text-sm mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-[#13232D] font-display mb-3">
                {t.home.step1Title}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {t.home.step1Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F0ECE2]">
              <button
                type="button"
                onClick={() => onNavigate('properties')}
                className="text-xs font-semibold text-[#B49765] hover:text-[#13232D] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{t.exploreProperties}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Step 2: Enquire */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#B49765] border border-[#E8E4DC] flex items-center justify-center font-bold text-sm mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-[#13232D] font-display mb-3">
                {t.home.step2Title}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {t.home.step2Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F0ECE2]">
              <button
                type="button"
                onClick={onRequestViewing}
                className="text-xs font-semibold text-[#B49765] hover:text-[#13232D] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{t.propertyDetails.requestViewing}</span>
                <svg className="w-3.5 h-3.5 transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Step 3: Take the Next Step */}
          <div className="bg-white p-8 rounded-xl border border-[#E8E4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#B49765] border border-[#E8E4DC] flex items-center justify-center font-bold text-sm mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-[#13232D] font-display mb-3">
                {t.home.step3Title}
              </h3>
              <p className="text-xs text-[#526371] leading-relaxed">
                {t.home.step3Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F0ECE2]">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-xs font-semibold text-[#B49765] hover:text-[#13232D] transition-colors flex items-center gap-1 cursor-pointer"
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

      {/* 9. Closing Call to Action: Full-width navy section (#13232D) with ivory typography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#13232D] rounded-2xl p-8 sm:p-14 text-center text-[#F7F5F0] relative overflow-hidden border border-[#203444] shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-3">
              {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4 text-balance">
              {t.home.finalCtaHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#A6B6C4] leading-relaxed mb-8 text-balance">
              {t.home.finalCtaSubtext}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-7 py-3 text-xs font-semibold text-[#13232D] bg-[#F7F5F0] hover:bg-white rounded-lg transition-all shadow-md focus-visible:outline-2 cursor-pointer"
              >
                {t.home.finalCtaBtn}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('properties')}
                className="px-7 py-3 text-xs font-semibold text-white bg-transparent hover:bg-white/10 border border-[#B49765]/50 rounded-lg transition-all focus-visible:outline-2 cursor-pointer"
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
