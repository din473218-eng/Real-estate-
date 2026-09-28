import React, { useState } from 'react';
import { PropertyFilterState, PropertyPurpose, PropertyType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

interface FilterBarProps {
  filters: PropertyFilterState;
  onChange: (filters: PropertyFilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const { lang, t, formatNumber } = useLanguage();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const hasActiveFilters =
    filters.purpose !== 'all' ||
    filters.district !== 'all' ||
    filters.type !== 'all' ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.bedrooms !== 'all' ||
    filters.areaMin !== undefined ||
    filters.areaMax !== undefined ||
    filters.sortBy !== 'newest';

  const handlePurposeChange = (purpose: 'all' | PropertyPurpose) => {
    onChange({ ...filters, purpose });
  };

  const handleDistrictChange = (district: string) => {
    onChange({ ...filters, district });
  };

  const handleTypeChange = (type: 'all' | PropertyType) => {
    onChange({ ...filters, type });
  };

  const handleBedroomsChange = (bedrooms: 'all' | '2' | '3' | '4' | '5+') => {
    onChange({ ...filters, bedrooms });
  };

  const handleSortChange = (sortBy: PropertyFilterState['sortBy']) => {
    onChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-white border border-[#E8E2D5] rounded-xl p-4 sm:p-6 shadow-xs space-y-4">
      {/* Top Row: Purpose Segments + District + Type + Sort + Clear */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Purpose Segmented Control (Sale / Rent / All) */}
        <div className="inline-flex p-1 bg-[#F3EFE6] rounded-lg border border-[#E4DDD0] self-start">
          <button
            type="button"
            onClick={() => handlePurposeChange('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              filters.purpose === 'all'
                ? 'bg-white text-[#0F1B2B] shadow-xs'
                : 'text-[#5E6E82] hover:text-[#0F1B2B]'
            }`}
          >
            {t.search.all}
          </button>
          <button
            type="button"
            onClick={() => handlePurposeChange('sale')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              filters.purpose === 'sale'
                ? 'bg-white text-[#0F1B2B] shadow-xs'
                : 'text-[#5E6E82] hover:text-[#0F1B2B]'
            }`}
          >
            {t.search.buy}
          </button>
          <button
            type="button"
            onClick={() => handlePurposeChange('rent')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              filters.purpose === 'rent'
                ? 'bg-white text-[#0F1B2B] shadow-xs'
                : 'text-[#5E6E82] hover:text-[#0F1B2B]'
            }`}
          >
            {t.search.rent}
          </button>
        </div>

        {/* Quick Selects: District, Property Type, Sort */}
        <div className="flex flex-wrap items-center gap-3 flex-1 lg:justify-end">
          {/* District Select */}
          <div className="min-w-[140px] flex-1 sm:flex-initial">
            <label htmlFor="filter-district" className="sr-only">
              {t.search.district}
            </label>
            <select
              id="filter-district"
              value={filters.district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors"
            >
              <option value="all">{t.search.allDistricts}</option>
              {siteConfig.districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {lang === 'ar' ? d.nameAr : d.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type Select */}
          <div className="min-w-[140px] flex-1 sm:flex-initial">
            <label htmlFor="filter-type" className="sr-only">
              {t.search.propertyType}
            </label>
            <select
              id="filter-type"
              value={filters.type}
              onChange={(e) => handleTypeChange(e.target.value as 'all' | PropertyType)}
              className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors"
            >
              <option value="all">{t.search.allTypes}</option>
              {siteConfig.propertyTypes.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {lang === 'ar' ? pt.labelAr : pt.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Select */}
          <div className="min-w-[150px] flex-1 sm:flex-initial">
            <label htmlFor="filter-sort" className="sr-only">
              {t.search.sortBy}
            </label>
            <select
              id="filter-sort"
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as PropertyFilterState['sortBy'])}
              className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors"
            >
              <option value="newest">{t.search.newest}</option>
              <option value="price-asc">{t.search.priceLowHigh}</option>
              <option value="price-desc">{t.search.priceHighLow}</option>
              <option value="area-desc">{t.search.areaHighLow}</option>
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`px-3 py-2 text-xs font-medium border rounded-lg transition-colors flex items-center gap-1.5 ${
              isAdvancedOpen || filters.bedrooms !== 'all' || filters.priceMin || filters.priceMax || filters.areaMin || filters.areaMax
                ? 'bg-[#0F1B2B] text-white border-[#0F1B2B]'
                : 'bg-[#FAF8F5] text-[#3E4D61] border-[#E0D9CC] hover:bg-[#F3EFE6]'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>{lang === 'ar' ? 'فلاتر إضافية' : 'More Filters'}</span>
          </button>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="px-3 py-2 text-xs font-medium text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
            >
              {t.search.resetFilters}
            </button>
          )}
        </div>
      </div>

      {/* Advanced Expandable Panel: Bedrooms, Min Price, Max Price, Min Area, Max Area */}
      {isAdvancedOpen && (
        <div className="pt-4 mt-2 border-t border-[#F0EBE1] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Bedrooms */}
          <div>
            <label htmlFor="filter-bedrooms" className="block text-[11px] font-semibold text-[#5E6E82] uppercase tracking-wider mb-1">
              {t.search.bedrooms}
            </label>
            <select
              id="filter-bedrooms"
              value={filters.bedrooms}
              onChange={(e) => handleBedroomsChange(e.target.value as 'all' | '2' | '3' | '4' | '5+')}
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869]"
            >
              <option value="all">{t.search.anyBedrooms}</option>
              <option value="2">2+ {lang === 'ar' ? 'غرف' : 'Beds'}</option>
              <option value="3">3+ {lang === 'ar' ? 'غرف' : 'Beds'}</option>
              <option value="4">4+ {lang === 'ar' ? 'غرف' : 'Beds'}</option>
              <option value="5+">5+ {lang === 'ar' ? 'غرف' : 'Beds'}</option>
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label htmlFor="filter-price-min" className="block text-[11px] font-semibold text-[#5E6E82] uppercase tracking-wider mb-1">
              {t.search.minPrice} (SAR)
            </label>
            <input
              id="filter-price-min"
              type="number"
              value={filters.priceMin ?? ''}
              placeholder="0"
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMin: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869]"
            />
          </div>

          {/* Max Price */}
          <div>
            <label htmlFor="filter-price-max" className="block text-[11px] font-semibold text-[#5E6E82] uppercase tracking-wider mb-1">
              {t.search.maxPrice} (SAR)
            </label>
            <input
              id="filter-price-max"
              type="number"
              value={filters.priceMax ?? ''}
              placeholder="30,000,000"
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMax: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869]"
            />
          </div>

          {/* Min Area */}
          <div>
            <label htmlFor="filter-area-min" className="block text-[11px] font-semibold text-[#5E6E82] uppercase tracking-wider mb-1">
              {t.search.minArea}
            </label>
            <input
              id="filter-area-min"
              type="number"
              value={filters.areaMin ?? ''}
              placeholder="100"
              onChange={(e) =>
                onChange({
                  ...filters,
                  areaMin: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869]"
            />
          </div>

          {/* Max Area */}
          <div>
            <label htmlFor="filter-area-max" className="block text-[11px] font-semibold text-[#5E6E82] uppercase tracking-wider mb-1">
              {t.search.maxArea}
            </label>
            <input
              id="filter-area-max"
              type="number"
              value={filters.areaMax ?? ''}
              placeholder="2,000"
              onChange={(e) =>
                onChange({
                  ...filters,
                  areaMax: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869]"
            />
          </div>
        </div>
      )}

      {/* Results Count & Status Row */}
      <div className="flex items-center justify-between text-xs text-[#5E6E82] pt-1">
        <span className="font-medium text-[#0F1B2B]">
          {t.search.resultsCount.replace('{count}', formatNumber(totalResults))}
        </span>
        <span className="text-[11px] text-[#7A8699]">
          {siteConfig.demoNotice.disclaimerEn}
        </span>
      </div>
    </div>
  );
};
