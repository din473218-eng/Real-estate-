import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sampleProperties, siteConfig } from '../config/siteConfig';
import { PropertyFilterState, PropertyListing } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertiesSidebarFilter } from '../components/property/PropertiesSidebarFilter';

interface PropertiesPageProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: PropertyFilterState) => void;
  onResetFilters: () => void;
  onSelectProperty: (property: PropertyListing) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onSelectProperty,
}) => {
  const { lang, t, formatNumber } = useLanguage();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Search input handler
  const handleSearchQueryChange = (query: string) => {
    onFilterChange({ ...filters, searchQuery: query });
  };

  const filteredProperties = useMemo(() => {
    return sampleProperties
      .filter((prop) => {
        // Text Search Query: title or district
        if (filters.searchQuery && filters.searchQuery.trim() !== '') {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchTitleEn = prop.titleEn.toLowerCase().includes(q);
          const matchTitleAr = prop.titleAr.toLowerCase().includes(q);
          const matchDistrictEn = prop.districtEn.toLowerCase().includes(q);
          const matchDistrictAr = prop.districtAr.toLowerCase().includes(q);
          if (!matchTitleEn && !matchTitleAr && !matchDistrictEn && !matchDistrictAr) {
            return false;
          }
        }

        // Purpose filter
        if (filters.purpose !== 'all' && prop.purpose !== filters.purpose) {
          return false;
        }

        // District filter
        if (filters.district !== 'all') {
          const propDistrictSlug = prop.districtEn.toLowerCase().replace(/\s+/g, '-');
          if (propDistrictSlug !== filters.district) {
            return false;
          }
        }

        // Type filter
        if (filters.type !== 'all' && prop.type !== filters.type) {
          return false;
        }

        // Price min
        if (filters.priceMin !== undefined && prop.priceSar < filters.priceMin) {
          return false;
        }

        // Price max
        if (filters.priceMax !== undefined && prop.priceSar > filters.priceMax) {
          return false;
        }

        // Bedrooms (only residential)
        if (filters.bedrooms !== 'all') {
          if (!prop.bedrooms) return false;
          const minBeds = parseInt(filters.bedrooms, 10);
          if (filters.bedrooms === '5+') {
            if (prop.bedrooms < 5) return false;
          } else if (prop.bedrooms < minBeds) {
            return false;
          }
        }

        // Area min
        if (filters.areaMin !== undefined && prop.areaSqm < filters.areaMin) {
          return false;
        }

        // Area max
        if (filters.areaMax !== undefined && prop.areaSqm > filters.areaMax) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') {
          return a.priceSar - b.priceSar;
        }
        if (filters.sortBy === 'price-desc') {
          return b.priceSar - a.priceSar;
        }
        return (b.yearBuilt || 2024) - (a.yearBuilt || 2024);
      });
  }, [filters]);

  // Remove individual filter chips
  const removeFilterChip = (key: keyof PropertyFilterState) => {
    const updated = { ...filters };
    if (key === 'purpose' || key === 'district' || key === 'type' || key === 'bedrooms') {
      (updated[key] as any) = 'all';
    } else if (key === 'priceMin' || key === 'priceMax' || key === 'areaMin' || key === 'areaMax') {
      delete updated[key];
    } else if (key === 'searchQuery') {
      updated.searchQuery = '';
    }
    onFilterChange(updated);
  };

  // Active filter chips list
  const activeChips: { key: keyof PropertyFilterState; label: string }[] = [];
  if (filters.searchQuery) {
    activeChips.push({ key: 'searchQuery', label: `"${filters.searchQuery}"` });
  }
  if (filters.purpose !== 'all') {
    activeChips.push({
      key: 'purpose',
      label: filters.purpose === 'sale' ? t.search.buy : t.search.rent,
    });
  }
  if (filters.type !== 'all') {
    const foundType = siteConfig.propertyTypes.find((p) => p.id === filters.type);
    if (foundType) {
      activeChips.push({
        key: 'type',
        label: lang === 'ar' ? foundType.labelAr : foundType.labelEn,
      });
    }
  }
  if (filters.district !== 'all') {
    const foundDist = siteConfig.districts.find((d) => d.id === filters.district);
    if (foundDist) {
      activeChips.push({
        key: 'district',
        label: lang === 'ar' ? foundDist.nameAr : foundDist.nameEn,
      });
    }
  }
  if (filters.bedrooms !== 'all') {
    activeChips.push({
      key: 'bedrooms',
      label: `${filters.bedrooms} ${lang === 'ar' ? 'غرف' : 'Beds'}`,
    });
  }
  if (filters.priceMin) {
    activeChips.push({
      key: 'priceMin',
      label: `≥ ${formatNumber(filters.priceMin)} SAR`,
    });
  }
  if (filters.priceMax) {
    activeChips.push({
      key: 'priceMax',
      label: `≤ ${formatNumber(filters.priceMax)} SAR`,
    });
  }
  if (filters.areaMin) {
    activeChips.push({
      key: 'areaMin',
      label: `≥ ${filters.areaMin} m²`,
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Heading & Short Introduction */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
          {lang === 'ar' ? 'معرض العقارات' : 'Property Collection'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13232D] font-display">
          {lang === 'ar' ? 'العقارات المعروضة في الرياض' : 'Distinctive Spaces in Riyadh'}
        </h1>
        <p className="text-xs sm:text-sm text-[#526371] mt-2 leading-relaxed">
          {lang === 'ar'
            ? 'تصفح باقة مختارة بعناية من الفلل المعمارية والشقق الفاخرة والأراضي والمقرات الإدارية في أرقى أحياء الرياض.'
            : 'Browse architectural villas, executive penthouses, and commercial spaces across northern and central Riyadh.'}
        </p>
      </div>

      {/* Search Input Bar + Mobile Filter Trigger */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 sm:p-4 rounded-xl border border-[#E8E4DC] shadow-xs">
        {/* Search by Property Title or District */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-[#738290]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={filters.searchQuery ?? ''}
            onChange={(e) => handleSearchQueryChange(e.target.value)}
            placeholder={t.search.searchPlaceholder}
            className="w-full pl-10 rtl:pl-4 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-[#F7F5F0] border border-[#E8E4DC] rounded-lg text-[#13232D] placeholder-[#738290] focus:bg-white focus:border-[#B49765] transition-colors"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchQueryChange('')}
              className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pr-0 rtl:pl-3 flex items-center text-[#738290] hover:text-[#13232D]"
              aria-label="Clear Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#13232D] bg-[#E8E4DC]/80 hover:bg-[#E8E4DC] border border-[#D8D2C5] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4 text-[#B49765]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span>{t.search.filterToggle}</span>
          {activeChips.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#13232D] text-white text-[10px] flex items-center justify-center">
              {activeChips.length}
            </span>
          )}
        </button>
      </div>

      {/* Removable Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#738290] font-medium me-1">
            {t.search.activeFilters}
          </span>
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#13232D] bg-white border border-[#D8D2C5] rounded-lg shadow-2xs"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={() => removeFilterChip(chip.key)}
                className="text-[#738290] hover:text-[#13232D] cursor-pointer"
                aria-label={`Remove filter ${chip.label}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-[#B49765] hover:text-[#13232D] font-semibold underline ms-2 cursor-pointer"
          >
            {t.search.resetFilters}
          </button>
        </div>
      )}

      {/* Main Two-Column Layout: Sidebar Filters (Desktop) + Property Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar for Desktop Filters & Mobile Drawer */}
        <PropertiesSidebarFilter
          filters={filters}
          onChange={onFilterChange}
          onReset={onResetFilters}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
          totalResults={filteredProperties.length}
        />

        {/* Right Main Grid Container */}
        <div className="flex-1 w-full space-y-6">
          {/* Top Status: Results Count & Disclaimer */}
          <div className="flex items-center justify-between text-xs text-[#526371] pb-2 border-b border-[#E8E4DC]">
            <span className="font-semibold text-[#13232D]">
              {t.search.resultsCount.replace('{count}', formatNumber(filteredProperties.length))}
            </span>
            <span className="text-[11px] text-[#738290]">
              {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
            </span>
          </div>

          {/* Listings Grid or Empty State */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>
          ) : (
            /* Helpful Empty State */
            <div className="bg-white border border-[#E8E4DC] rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xs my-12">
              <div className="w-12 h-12 rounded-full bg-[#FAF5EB] text-[#B49765] flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-[#13232D] font-display mb-2">
                {t.search.noResultsTitle}
              </h2>
              <p className="text-xs text-[#526371] leading-relaxed mb-6">
                {t.search.noResultsDesc}
              </p>
              <button
                type="button"
                onClick={onResetFilters}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors cursor-pointer"
              >
                {t.search.resetFilters}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
