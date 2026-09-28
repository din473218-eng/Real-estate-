/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PageRoute, PropertyFilterState, PropertyListing, PropertyPurpose, PropertyType } from './types';
import { sampleProperties } from './config/siteConfig';

// Layout & Common Components
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ViewingModal } from './components/common/ViewingModal';

// Pages
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';

const defaultFilters: PropertyFilterState = {
  searchQuery: '',
  purpose: 'all',
  district: 'all',
  type: 'all',
  bedrooms: 'all',
  sortBy: 'newest',
};

function MainApp() {
  const { lang, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [filters, setFilters] = useState<PropertyFilterState>(defaultFilters);

  // Viewing Modal State
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [viewingModalPropertyTitle, setViewingModalPropertyTitle] = useState<string | undefined>();
  const [viewingModalPropertyId, setViewingModalPropertyId] = useState<string | undefined>();

  // Pre-selected contact options from services or property tours
  const [contactInquiryType, setContactInquiryType] = useState<string | undefined>();
  const [contactPropertyTitle, setContactPropertyTitle] = useState<string | undefined>();

  // Parse URL hash including query params so filters can be shared & restored
  const parseHash = useCallback(() => {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    const [pathPart, queryString] = rawHash.split('?');
    const params = new URLSearchParams(queryString || '');

    // 1. Property Details: properties/:id or property/:id
    if (pathPart && (pathPart.startsWith('properties/') || pathPart.startsWith('property/'))) {
      const propId = pathPart.replace(/^(properties|property)\//, '');
      const found = sampleProperties.find((p) => p.id === propId || p.slug === propId);
      if (found) {
        setSelectedProperty(found);
        setCurrentPage('property-details');
        return;
      }
    }

    // 2. Properties Listing with filters in URL
    if (pathPart === 'properties') {
      const updatedFilters: PropertyFilterState = {
        searchQuery: params.get('q') || '',
        purpose: (params.get('purpose') as 'all' | PropertyPurpose) || 'all',
        district: params.get('district') || 'all',
        type: (params.get('type') as 'all' | PropertyType) || 'all',
        bedrooms: (params.get('beds') as 'all' | '2' | '3' | '4' | '5+') || 'all',
        sortBy: (params.get('sort') as PropertyFilterState['sortBy']) || 'newest',
        priceMin: params.get('minP') ? Number(params.get('minP')) : undefined,
        priceMax: params.get('maxP') ? Number(params.get('maxP')) : undefined,
        areaMin: params.get('minA') ? Number(params.get('minA')) : undefined,
      };
      setFilters(updatedFilters);
      setCurrentPage('properties');
      return;
    }

    // 3. Contact page with possible pre-selected service
    if (pathPart === 'contact') {
      const serviceParam = params.get('service');
      if (serviceParam) {
        setContactInquiryType(serviceParam);
      }
      setCurrentPage('contact');
      return;
    }

    // 4. Other pages
    if (['home', 'about', 'services'].includes(pathPart)) {
      setCurrentPage(pathPart as PageRoute);
    } else {
      setCurrentPage('home');
    }
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  // Sync state changes into URL hash with query params so back/forward and sharing works
  const syncPropertiesUrl = (newFilters: PropertyFilterState) => {
    const params = new URLSearchParams();
    if (newFilters.searchQuery) params.set('q', newFilters.searchQuery);
    if (newFilters.purpose !== 'all') params.set('purpose', newFilters.purpose);
    if (newFilters.district !== 'all') params.set('district', newFilters.district);
    if (newFilters.type !== 'all') params.set('type', newFilters.type);
    if (newFilters.bedrooms !== 'all') params.set('beds', newFilters.bedrooms);
    if (newFilters.sortBy !== 'newest') params.set('sort', newFilters.sortBy);
    if (newFilters.priceMin) params.set('minP', newFilters.priceMin.toString());
    if (newFilters.priceMax) params.set('maxP', newFilters.priceMax.toString());
    if (newFilters.areaMin) params.set('minA', newFilters.areaMin.toString());

    const qs = params.toString();
    const newHash = qs ? `properties?${qs}` : 'properties';
    window.location.hash = newHash;
  };

  const navigateTo = (page: PageRoute) => {
    if (page === 'properties') {
      syncPropertiesUrl(filters);
    } else {
      window.location.hash = page === 'home' ? '' : page;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (property: PropertyListing) => {
    setSelectedProperty(property);
    setCurrentPage('property-details');
    window.location.hash = `properties/${property.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyFiltersAndNavigate = (newFilters: Partial<PropertyFilterState>) => {
    const combined: PropertyFilterState = {
      ...defaultFilters,
      ...newFilters,
    };
    setFilters(combined);
    syncPropertiesUrl(combined);
    setCurrentPage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (updated: PropertyFilterState) => {
    setFilters(updated);
    syncPropertiesUrl(updated);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    syncPropertiesUrl(defaultFilters);
  };

  const handleOpenViewingModal = (title?: string, id?: string) => {
    setViewingModalPropertyTitle(title);
    setViewingModalPropertyId(id);
    setViewingModalOpen(true);
  };

  const handleSelectServiceForContact = (serviceId: string) => {
    setContactInquiryType(serviceId);
    window.location.hash = `contact?service=${serviceId}`;
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#202A30] antialiased">
      {/* Top Demo Notice Banner */}
      <DemoBanner />

      {/* Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProperty={handleSelectProperty}
            onApplyFiltersAndNavigate={handleApplyFiltersAndNavigate}
            onRequestViewing={() => handleOpenViewingModal()}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesPage
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentPage === 'property-details' && selectedProperty && (
          <PropertyDetailPage
            property={selectedProperty}
            onBack={() => navigateTo('properties')}
            onSelectProperty={handleSelectProperty}
            onRequestViewing={(title, id) => handleOpenViewingModal(title, id)}
          />
        )}

        {currentPage === 'property-details' && !selectedProperty && (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-xl font-bold font-display mb-4">
              {lang === 'ar' ? 'العقار غير متوفر' : 'Property Not Found'}
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('properties')}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#13232D] rounded-lg cursor-pointer"
            >
              {t.propertyDetails.backToProperties}
            </button>
          </div>
        )}

        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onSelectServiceForContact={handleSelectServiceForContact}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialInquiryType={contactInquiryType}
            initialPropertyTitle={contactPropertyTitle}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onFilterByCategory={(type) => {
          handleApplyFiltersAndNavigate({ type });
        }}
      />

      {/* Viewing & Inquire Modal */}
      <ViewingModal
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
        propertyTitle={viewingModalPropertyTitle}
        propertyId={viewingModalPropertyId}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
