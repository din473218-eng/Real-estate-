import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { WhatsAppModal } from '../components/common/WhatsAppModal';

interface ContactPageProps {
  initialInquiryType?: string;
  initialPropertyTitle?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialInquiryType,
  initialPropertyTitle,
}) => {
  const { lang, t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('buying');
  const [preferredDistrict, setPreferredDistrict] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});
  const [showDemoAlert, setShowDemoAlert] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  useEffect(() => {
    if (initialInquiryType) {
      setInquiryType(initialInquiryType);
    }
    if (initialPropertyTitle) {
      setMessage((prev) =>
        prev
          ? prev
          : lang === 'ar'
          ? `استفسار بخصوص العقار: ${initialPropertyTitle}`
          : `Inquiry regarding listing: ${initialPropertyTitle}`
      );
    }
  }, [initialInquiryType, initialPropertyTitle, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; phone?: string; email?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = lang === 'ar' ? 'يرجى إدخال الاسم الكريم' : 'Please provide your full name';
    }
    if (!phone.trim()) {
      newErrors.phone = lang === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please provide a valid phone number';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowDemoAlert(true);
  };

  const handleWhatsAppClick = () => {
    if (siteConfig.contact.isWhatsAppConfigured) {
      const targetPhone = '966110000000';
      const text = encodeURIComponent(
        lang === 'ar'
          ? 'السلام عليكم، أود الاستفسار عن العقارات المعروضة في الرياض.'
          : 'Hello, I would like to inquire about property opportunities in Riyadh.'
      );
      window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
    } else {
      setShowWhatsAppModal(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Heading */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B49765] block mb-1">
          {lang === 'ar' ? 'بدء المحادثة' : 'Start a Conversation'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13232D] font-display">
          {t.contact.heading}
        </h1>
        <p className="text-xs sm:text-sm text-[#526371] mt-2 leading-relaxed">
          {t.contact.subtext}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left 7 Cols: Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#E8E4DC] shadow-xs">
          <h2 className="text-xl font-bold text-[#13232D] font-display mb-6">
            {lang === 'ar' ? 'بيانات الاستفسار' : 'Enquiry Information'}
          </h2>

          {showDemoAlert && (
            <div className="mb-6 p-5 bg-[#FAF5EB] border border-[#B49765]/40 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#B49765]">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t.contact.demoAlertTitle}</span>
              </div>
              <p className="text-xs text-[#202A30] leading-relaxed">
                {siteConfig.demoNotice.submissionNoticeEn}
              </p>
              <p className="text-xs text-[#202A30] leading-relaxed font-arabic" dir="rtl">
                {siteConfig.demoNotice.submissionNoticeAr}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowDemoAlert(false)}
                  className="text-xs font-semibold text-[#13232D] underline hover:text-[#B49765] cursor-pointer"
                >
                  {t.contact.close}
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-fullname" className="block text-xs font-medium text-[#202A30] mb-1">
                {t.contact.fullName} <span className="text-[#B49765]">*</span>
              </label>
              <input
                id="contact-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: فهد السليمان' : 'e.g. Fahad Al-Sulaiman'}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] transition-colors"
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-medium text-[#202A30] mb-1">
                  {t.contact.phone} <span className="text-[#B49765]">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] transition-colors text-left"
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-[#202A30] mb-1">
                  {t.contact.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.example"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] transition-colors text-left"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-inquiryType" className="block text-xs font-medium text-[#202A30] mb-1">
                  {t.contact.inquiryType}
                </label>
                <select
                  id="contact-inquiryType"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] transition-colors"
                >
                  <option value="buying">{t.contact.buying}</option>
                  <option value="selling">{t.contact.selling}</option>
                  <option value="residential-leasing">{t.contact.rentingRes}</option>
                  <option value="commercial-leasing">{t.contact.rentingCom}</option>
                  <option value="marketing">{t.contact.marketing}</option>
                  <option value="management">{t.contact.management}</option>
                  <option value="general">{t.contact.general}</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-district" className="block text-xs font-medium text-[#202A30] mb-1">
                  {t.contact.preferredDistrict}
                </label>
                <select
                  id="contact-district"
                  value={preferredDistrict}
                  onChange={(e) => setPreferredDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] transition-colors"
                >
                  <option value="">{lang === 'ar' ? 'حدد الحي المفضل...' : 'Select district...'}</option>
                  {siteConfig.districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {lang === 'ar' ? d.nameAr : d.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-budget" className="block text-xs font-medium text-[#202A30] mb-1">
                {t.contact.budgetRange}
              </label>
              <select
                id="contact-budget"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] transition-colors"
              >
                <option value="">{lang === 'ar' ? 'حدد الميزانية المتوقعة...' : 'Select budget range...'}</option>
                <option value="under-3m">{lang === 'ar' ? 'أقل من 3 مليون ريال' : 'Under 3M SAR'}</option>
                <option value="3m-8m">{lang === 'ar' ? '3 - 8 مليون ريال' : '3M – 8M SAR'}</option>
                <option value="8m-15m">{lang === 'ar' ? '8 - 15 مليون ريال' : '8M – 15M SAR'}</option>
                <option value="above-15m">{lang === 'ar' ? 'أكثر من 15 مليون ريال' : 'Above 15M SAR'}</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-[#202A30] mb-1">
                {t.contact.message}
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={lang === 'ar' ? 'شاركنا التفاصيل أو المعايير المكانية الخاصة بك...' : 'Specify spatial criteria, timing, or questions...'}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg text-[#13232D] focus:bg-white focus:border-[#B49765] transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[11px] text-[#738290]">
                {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
              </span>
              <button
                type="submit"
                className="px-8 py-3 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                {t.contact.submitBtn}
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 Cols: Contact Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF5EB] p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] space-y-6 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-[#B49765] uppercase tracking-wider block mb-1">
                {lang === 'ar' ? 'معلومات المكتب' : 'Agency Location'}
              </span>
              <h3 className="text-xl font-bold text-[#13232D] font-display">
                {t.brandName}
              </h3>
            </div>

            {/* Office Address */}
            <div className="space-y-1.5 text-xs text-[#202A30] pb-4 border-b border-[#E8E4DC]">
              <span className="font-bold text-[#13232D] block">
                {t.contact.officeTitle}:
              </span>
              <p className="leading-relaxed">
                {lang === 'ar' ? siteConfig.contact.addressAr : siteConfig.contact.addressEn}
              </p>
            </div>

            {/* Business Hours */}
            <div className="space-y-1.5 text-xs text-[#202A30] pb-4 border-b border-[#E8E4DC]">
              <span className="font-bold text-[#13232D] block">
                {t.contact.hoursTitle}:
              </span>
              <p>
                {lang === 'ar' ? siteConfig.contact.workingHoursAr : siteConfig.contact.workingHoursEn}
              </p>
            </div>

            {/* Telephone & Email */}
            <div className="space-y-2 text-xs text-[#202A30] pb-4 border-b border-[#E8E4DC]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#13232D]">{t.contact.phoneTitle}:</span>
                <span dir="ltr" className="tabular-nums font-semibold text-[#13232D]">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#13232D]">{t.contact.emailTitle}:</span>
                <span className="font-medium text-[#13232D]">
                  {siteConfig.contact.emailDisplay}
                </span>
              </div>
            </div>

            {/* WhatsApp Trigger Button */}
            <div>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#1A3A34] hover:bg-[#224e46] border border-[#2B5E54] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.302c-.087.089-.177.187-.076.36.101.173.45 1.742 1.488 2.666 1.332 1.185 2.457 1.554 2.804 1.698.347.144.55.12.75-.11.202-.231.867-1.011 1.1-1.358.231-.347.462-.289.779-.173.318.116 2.019.953 2.366 1.127.347.173.578.26.664.404.087.145.087.839-.057 1.244z"/>
                </svg>
                <span>{t.contact.whatsappBtn}</span>
              </button>
              <p className="text-[11px] text-[#738290] text-center mt-2">
                {lang === 'ar'
                  ? 'سيتم تفعيل الرقم الرسمي المباشر عند تخصيص هذا الموقع لشركتكم.'
                  : 'Official direct WhatsApp line will be enabled upon client hand-off.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
      />
    </div>
  );
};
