import React from 'react';
import { PropertyFilterState, PropertyPurpose, PropertyType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

interface PropertiesSidebarFilterProps {
  filters: PropertyFilterState;
  onChange: (filters: PropertyFilterState) => void;
  onReset: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalResults: number;
}

export const PropertiesSidebarFilter: React.FC<PropertiesSidebarFilterProps> = ({
  filters,
  onChange,
  onReset,
  isOpenMobile,
  onCloseMobile,
  totalResults,
}) => {
  const { lang, t, formatNumber } = useLanguage();

  const handlePurposeChange = (purpose: 'all' | PropertyPurpose) => {
    onChange({ ...filters, purpose });
  };

  const handleTypeChange = (type: 'all' | PropertyType) => {
    onChange({ ...filters, type });
  };

  const handleDistrictChange = (district: string) => {
    onChange({ ...filters, district });
  };

  const handleBedroomsChange = (bedrooms: 'all' | '2' | '3' | '4' | '5+') => {
    onChange({ ...filters, bedrooms });
  };

  const handleSortChange = (sortBy: PropertyFilterState['sortBy']) => {
    onChange({ ...filters, sortBy });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Purpose: Buy / Rent */}
      <div>
        <label className="block text-xs font-bold text-[#13232D] uppercase tracking-wider mb-2.5">
          {lang === 'ar' ? 'نوع المعاملة' : 'Offering Purpose'}
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#E8E4DC]/60 rounded-lg border border-[#D8D2C5]">
          <button
            type="button"
            onClick={() => handlePurposeChange('all')}
            className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filters.purpose === 'all'
                ? 'bg-white text-[#13232D] shadow-xs'
                : 'text-[#526371] hover:text-[#13232D]'
            }`}
          >
            {t.search.all}
          </button>
          <button
            type="button"
            onClick={() => handlePurposeChange('sale')}
            className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filters.purpose === 'sale'
                ? 'bg-white text-[#13232D] shadow-xs'
                : 'text-[#526371] hover:text-[#13232D]'
            }`}
          >
            {t.search.buy}
          </button>
          <button
            type="button"
            onClick={() => handlePurposeChange('rent')}
            className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filters.purpose === 'rent'
                ? 'bg-white text-[#13232D] shadow-xs'
                : 'text-[#526371] hover:text-[#13232D]'
            }`}
          >
            {t.search.rent}
          </button>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-bold text-[#13232D] uppercase tracking-wider mb-2">
          {t.search.propertyType}
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2.5 text-xs text-[#202A30] cursor-pointer">
            <input
              type="radio"
              name="property-type"
              checked={filters.type === 'all'}
              onChange={() => handleTypeChange('all')}
              className="accent-[#B49765]"
            />
            <span>{t.search.allTypes}</span>
          </label>
          {siteConfig.propertyTypes.map((pt) => (
            <label key={pt.id} className="flex items-center gap-2.5 text-xs text-[#202A30] cursor-pointer">
              <input
                type="radio"
                name="property-type"
                checked={filters.type === pt.id}
                onChange={() => handleTypeChange(pt.id as PropertyType)}
                className="accent-[#B49765]"
              />
              <span>{lang === 'ar' ? pt.labelAr : pt.labelEn}</span>
            </label>
          ))}
        </div>
      </div>

      {/* District */}
      <div>
        <label htmlFor="sidebar-district" className="block text-xs font-bold text-[#13232D] uppercase tracking-wider mb-2">
          {t.search.district}
        </label>
        <select
          id="sidebar-district"
          value={filters.district}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-white border border-[#D8D2C5] rounded-lg text-[#13232D] focus:border-[#B49765]"
        >
          <option value="all">{t.search.allDistricts}</option>
          {siteConfig.districts.map((d) => (
            <option key={d.id} value={d.id}>
              {lang === 'ar' ? d.nameAr : d.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* Bedrooms: (Relevant for residential) */}
      {filters.type !== 'land' && filters.type !== 'commercial' && (
        <div>
          <label htmlFor="sidebar-bedrooms" className="block text-xs font-bold text-[#13232D] uppercase tracking-wider mb-2">
            {t.search.bedrooms}
          </label>
          <div className="grid grid-cols-5 gap-1">
            {(['all', '2', '3', '4', '5+'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => handleBedroomsChange(b)}
                className={`py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                  filters.bedrooms === b
                    ? 'bg-[#13232D] text-white border-[#13232D]'
                    : 'bg-white text-[#526371] border-[#D8D2C5] hover:border-[#13232D]'
                }`}
              >
                {b === 'all' ? (lang === 'ar' ? 'الكل' : 'Any') : b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold text-[#13232D] uppercase tracking-wider mb-2">
          {t.search.priceRange}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-[#738290] block mb-1">{t.search.minPrice}</span>
            <input
              type="number"
              value={filters.priceMin ?? ''}
              placeholder="0"
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMin: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D8D2C5] rounded-md text-[#13232D] focus:border-[#B49765]"
            />
          </div>
          <div>
            <span className="text-[10px] text-[#738290] block mb-1">{t.search.maxPrice}</span>
            <input
              type="number"
              value={filters.priceMax ?? ''}
              placeholder="30,000,000"
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMax: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D8D2C5] rounded-md text-[#13232D] focus:border-[#B49765]"
            />
          </div>
        </div>
      </div>

      {/* Minimum Area (m²) */}
      <div>
        <label htmlFor="sidebar-area-min" className="block text-xs font-bold text-[#13232D] uppercase tracking-wider mb-2">
          {t.search.minArea}
        </label>
        <input
          id="sidebar-area-min"
          type="number"
          value={filters.areaMin ?? ''}
          placeholder={lang === 'ar' ? 'مثال: 250 م²' : 'e.g. 250 m²'}
          onChange={(e) =>
            onChange({
              ...filters,
              areaMin: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="w-full px-3 py-2 text-xs bg-white border border-[#D8D2C5] rounded-lg text-[#13232D] focus:border-[#B49765]"
        />
      </div>

      {/* Sort By */}
      <div>
        <label htmlFor="sidebar-sort" className="block text-xs font-bold text-[#13232D] uppercase tracking-wider mb-2">
          {t.search.sortBy}
        </label>
        <select
          id="sidebar-sort"
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as PropertyFilterState['sortBy'])}
          className="w-full px-3 py-2 text-xs bg-white border border-[#D8D2C5] rounded-lg text-[#13232D] focus:border-[#B49765]"
        >
          <option value="newest">{t.search.newest}</option>
          <option value="price-asc">{t.search.priceLowHigh}</option>
          <option value="price-desc">{t.search.priceHighLow}</option>
        </select>
      </div>

      {/* Clear All Filters Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 px-4 text-xs font-semibold text-[#13232D] bg-[#E8E4DC]/80 hover:bg-[#E8E4DC] border border-[#D8D2C5] rounded-lg transition-colors cursor-pointer"
        >
          {t.search.resetFilters}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-xs self-start sticky top-28">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E4DC]">
          <h2 className="text-base font-bold text-[#13232D] font-display">
            {t.search.filterToggle}
          </h2>
          <span className="text-xs text-[#738290]">
            {formatNumber(totalResults)} {lang === 'ar' ? 'عقاراً' : 'units'}
          </span>
        </div>
        {filterContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden bg-[#13232D]/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm bg-[#F7F5F0] h-full overflow-y-auto p-6 shadow-2xl ms-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E4DC]">
              <h2 className="text-lg font-bold text-[#13232D] font-display">
                {t.search.filterToggle}
              </h2>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-[#526371] hover:text-[#13232D] hover:bg-[#E8E4DC]"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {filterContent}
            <div className="pt-6">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-3 text-xs font-semibold text-white bg-[#B49765] hover:bg-[#A38654] rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'عرض النتائج' : 'Apply & View Results'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
