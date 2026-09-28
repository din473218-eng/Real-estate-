import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { WhatsAppModal } from '../components/common/WhatsAppModal';

export const ContactPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('buying');
  const [message, setMessage] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});
  const [showDemoAlert, setShowDemoAlert] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B35] block mb-1">
          {lang === 'ar' ? 'قنوات التواصل' : 'Direct Consultation'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2B] font-display">
          {t.contact.heading}
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6E82] mt-2 leading-relaxed">
          {t.contact.subtext}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left 7 Cols: Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#E8E2D5] shadow-xs">
          <h2 className="text-xl font-bold text-[#0F1B2B] font-display mb-6">
            {lang === 'ar' ? 'نموذج إرسال الطلب' : 'Submit Consultation Request'}
          </h2>

          {showDemoAlert && (
            <div className="mb-6 p-4 bg-[#FAF5EB] border border-[#C5A869]/40 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#9E7B35]">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t.contact.demoAlertTitle}</span>
              </div>
              <p className="text-xs text-[#3E4D61] leading-relaxed">
                {siteConfig.demoNotice.submissionNoticeEn}
              </p>
              <p className="text-xs text-[#3E4D61] leading-relaxed font-arabic" dir="rtl">
                {siteConfig.demoNotice.submissionNoticeAr}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowDemoAlert(false)}
                  className="text-xs font-semibold text-[#0F1B2B] underline hover:text-[#9E7B35]"
                >
                  {lang === 'ar' ? 'إغلاق التنبيه' : 'Dismiss notice'}
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-[#3E4D61] mb-1">
                {t.contact.fullName} <span className="text-[#C5A869]">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: فهد السليمان' : 'e.g. Fahad Al-Sulaiman'}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors"
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-medium text-[#3E4D61] mb-1">
                  {t.contact.phone} <span className="text-[#C5A869]">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors text-left"
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-[#3E4D61] mb-1">
                  {t.contact.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors text-left"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-inquiryType" className="block text-xs font-medium text-[#3E4D61] mb-1">
                  {t.contact.inquiryType}
                </label>
                <select
                  id="contact-inquiryType"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors"
                >
                  <option value="buying">{t.contact.buying}</option>
                  <option value="selling">{t.contact.selling}</option>
                  <option value="renting">{t.contact.renting}</option>
                  <option value="management">{t.contact.management}</option>
                  <option value="advisory">{t.contact.advisory}</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-preferredDate" className="block text-xs font-medium text-[#3E4D61] mb-1">
                  {t.contact.preferredDate}
                </label>
                <input
                  id="contact-preferredDate"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-[#3E4D61] mb-1">
                {t.contact.message}
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={lang === 'ar' ? 'شاركنا الأحياء المفضلة أو تفاصيل العقار أو الاستفسار...' : 'Specify target districts, budget parameters, or property details...'}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg text-[#0F1B2B] focus:bg-white focus:border-[#C5A869] transition-colors resize-none"
              />
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[11px] text-[#7A8699]">
                {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
              </span>
              <button
                type="submit"
                className="px-8 py-3 text-xs font-semibold text-white bg-[#0F1B2B] hover:bg-[#1E2F46] rounded-lg transition-colors shadow-xs"
              >
                {t.contact.submitBtn}
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 Cols: Contact Details Placeholders */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF5EB] p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] space-y-6 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-[#9E7B35] uppercase tracking-wider block mb-1">
                {lang === 'ar' ? 'معلومات المكتب' : 'Agency Presence'}
              </span>
              <h3 className="text-xl font-bold text-[#0F1B2B] font-display">
                {t.brandName}
              </h3>
            </div>

            {/* Office Address */}
            <div className="space-y-1.5 text-xs text-[#3E4D61] pb-4 border-b border-[#E8E2D5]">
              <span className="font-semibold text-[#0F1B2B] block">
                {t.contact.officeTitle}:
              </span>
              <p className="leading-relaxed">
                {lang === 'ar' ? siteConfig.contact.addressAr : siteConfig.contact.addressEn}
              </p>
            </div>

            {/* Business Hours */}
            <div className="space-y-1.5 text-xs text-[#3E4D61] pb-4 border-b border-[#E8E2D5]">
              <span className="font-semibold text-[#0F1B2B] block">
                {t.contact.hoursTitle}:
              </span>
              <p>
                {lang === 'ar' ? siteConfig.contact.workingHoursAr : siteConfig.contact.workingHoursEn}
              </p>
            </div>

            {/* Phone & Direct Email */}
            <div className="space-y-2 text-xs text-[#3E4D61] pb-4 border-b border-[#E8E2D5]">
              <div className="flex justify-between">
                <span className="font-semibold text-[#0F1B2B]">{t.contact.phoneTitle}:</span>
                <span dir="ltr" className="tabular-nums font-medium text-[#0F1B2B]">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#0F1B2B]">{t.contact.emailTitle}:</span>
                <span className="font-medium text-[#0F1B2B]">
                  {siteConfig.contact.emailDisplay}
                </span>
              </div>
            </div>

            {/* WhatsApp Trigger Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowWhatsAppModal(true)}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#1A3A34] hover:bg-[#224e46] border border-[#2B5E54] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.302c-.087.089-.177.187-.076.36.101.173.45 1.742 1.488 2.666 1.332 1.185 2.457 1.554 2.804 1.698.347.144.55.12.75-.11.202-.231.867-1.011 1.1-1.358.231-.347.462-.289.779-.173.318.116 2.019.953 2.366 1.127.347.173.578.26.664.404.087.145.087.839-.057 1.244z"/>
                </svg>
                <span>{t.contact.whatsappBtn}</span>
              </button>
              <p className="text-[11px] text-[#7A8699] text-center mt-2">
                {lang === 'ar'
                  ? 'سيتم تفعيل الرقم الحقيقي للمنشأة عند تسليم الموقع وتخصيصه.'
                  : 'Live WhatsApp routing will be enabled upon client hand-off.'}
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
