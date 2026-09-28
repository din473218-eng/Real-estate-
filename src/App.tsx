/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PageRoute, PropertyFilterState, PropertyListing } from './types';
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

  // Sync hash routing for natural browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('property/')) {
        const propId = hash.replace('property/', '');
        const found = sampleProperties.find((p) => p.id === propId || p.slug === propId);
        if (found) {
          setSelectedProperty(found);
          setCurrentPage('property-details');
          return;
        }
      }

      if (['home', 'properties', 'about', 'services', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageRoute);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (property: PropertyListing) => {
    setSelectedProperty(property);
    setCurrentPage('property-details');
    window.location.hash = `property/${property.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyFiltersAndNavigate = (newFilters: Partial<PropertyFilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    navigateTo('properties');
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleOpenViewingModal = (title?: string, id?: string) => {
    setViewingModalPropertyTitle(title);
    setViewingModalPropertyId(id);
    setViewingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F1B2B] antialiased">
      {/* Top Demo Disclaimer Banner */}
      <DemoBanner />

      {/* Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Page Body */}
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
            onFilterChange={setFilters}
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
              onClick={() => navigateTo('properties')}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F1B2B] rounded-lg"
            >
              {t.propertyDetails.backToProperties}
            </button>
          </div>
        )}

        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentPage === 'services' && <ServicesPage onNavigate={navigateTo} />}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Viewing / Consultation Modal */}
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
