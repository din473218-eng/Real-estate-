import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface LanguageContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  formatCurrency: (amount: number, rentalPeriod?: 'year' | 'month') => string;
  formatNumber: (value: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [lang, dir]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  const t = useMemo(() => translations[lang], [lang]);

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US').format(value);
  };

  const formatCurrency = (amount: number, rentalPeriod?: 'year' | 'month'): string => {
    const formatted = formatNumber(amount);
    const currency = lang === 'ar' ? 'ريال' : 'SAR';
    let suffix = '';
    if (rentalPeriod === 'year') {
      suffix = lang === 'ar' ? ' / سنوياً' : ' / year';
    } else if (rentalPeriod === 'month') {
      suffix = lang === 'ar' ? ' / شهرياً' : ' / month';
    }
    return `${formatted} ${currency}${suffix}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir,
        isRtl,
        toggleLanguage,
        setLanguage,
        t,
        formatCurrency,
        formatNumber,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
