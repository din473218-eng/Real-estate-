import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sampleProperties } from '../config/siteConfig';
import { PropertyFilterState, PropertyListing } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { FilterBar } from '../components/property/FilterBar';

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
  const { lang, t } = useLanguage();

  const filteredProperties = useMemo(() => {
    return sampleProperties
      .filter((prop) => {
        // Purpose filter
        if (filters.purpose !== 'all' && prop.purpose !== filters.purpose) {
          return false;
        }

        // District filter
        if (filters.district !== 'all') {
          // Compare slugified district ID
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

        // Bedrooms
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
        if (filters.sortBy === 'area-desc') {
          return b.areaSqm - a.areaSqm;
        }
        // default: newest
        return (b.yearBuilt || 2024) - (a.yearBuilt || 2024);
      });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Editorial Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
          {lang === 'ar' ? 'سوق الرياض العقاري' : 'Riyadh Curated Portfolio'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1B2B] font-display">
          {lang === 'ar' ? 'استكشف أرقى العقارات في الرياض' : 'Explore Prime Spaces Across Riyadh'}
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6E82] mt-2 leading-relaxed">
          {lang === 'ar'
            ? 'مجموعة مختارة من الفلل السكنية الفاخرة، والشقق الراقية، والمساحات التجارية، والأراضي المتميزة في أحياء الرياض الحيوية.'
            : 'Explore architectural residences, executive office suites, and prime land plots positioned across northern and central Riyadh.'}
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onChange={onFilterChange}
        onReset={onResetFilters}
        totalResults={filteredProperties.length}
      />

      {/* Grid or Empty Results */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-[#E8E2D5] rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xs my-12">
          <div className="w-12 h-12 rounded-full bg-[#FAF5EB] text-[#9E7B35] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[#0F1B2B] font-display mb-2">
            {t.search.noResultsTitle}
          </h2>
          <p className="text-xs text-[#5E6E82] leading-relaxed mb-6">
            {t.search.noResultsDesc}
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-6 py-2.5 text-xs font-semibold text-[#0F1B2B] bg-[#F0EBE1] hover:bg-[#E4DDCF] rounded-lg transition-colors focus-visible:outline-2"
          >
            {t.search.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
};
