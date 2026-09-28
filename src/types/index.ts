export type Language = 'en' | 'ar';

export type PageRoute = 'home' | 'properties' | 'property-details' | 'about' | 'services' | 'contact';

export type PropertyPurpose = 'sale' | 'rent';

export type PropertyType = 'villa' | 'apartment' | 'commercial' | 'land';

export type RentalPeriod = 'year' | 'month';

export interface PropertyListing {
  id: string;
  slug: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  titleEn: string;
  titleAr: string;
  districtEn: string;
  districtAr: string;
  priceSar: number;
  rentalPeriod?: RentalPeriod;
  areaSqm: number;
  builtUpAreaSqm?: number;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  yearBuilt?: number;
  finishingEn: string;
  finishingAr: string;
  headlineEn: string;
  headlineAr: string;
  descriptionEn: string;
  descriptionAr: string;
  featuresEn: string[];
  featuresAr: string[];
  amenitiesEn: string[];
  amenitiesAr: string[];
  images: string[];
  locationNoteEn: string;
  locationNoteAr: string;
  isFeatured?: boolean;
}

export interface PropertyFilterState {
  searchQuery?: string;
  purpose: 'all' | PropertyPurpose;
  district: string;
  type: 'all' | PropertyType;
  priceMin?: number;
  priceMax?: number;
  bedrooms: 'all' | '2' | '3' | '4' | '5+';
  areaMin?: number;
  areaMax?: number;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email?: string;
  inquiryType: string;
  preferredDistrict?: string;
  budgetRange?: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  preferredDate?: string;
}
