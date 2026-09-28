import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyId?: string;
}

export const ViewingModal: React.FC<ViewingModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  propertyId,
}) => {
  const { lang, t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});

  if (!isOpen) return null;

  const handleValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; phone?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = lang === 'ar' ? 'يرجى إدخال الاسم الكريم' : 'Please provide your full name';
    }
    if (!phone.trim()) {
      newErrors.phone = lang === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please provide a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowDemoNotice(true);
  };

  const handleClose = () => {
    setShowDemoNotice(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#13232D]/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewing-modal-title"
    >
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#E8E4DC] rounded-2xl p-6 sm:p-8 shadow-2xl text-left rtl:text-right my-8">
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#E8E4DC]">
          <div>
            <h3 id="viewing-modal-title" className="text-xl font-bold text-[#13232D] font-display">
              {t.propertyDetails.requestViewing}
            </h3>
            {propertyTitle ? (
              <p className="text-xs text-[#B49765] font-semibold mt-1">
                {propertyTitle}
              </p>
            ) : (
              <p className="text-xs text-[#526371] mt-1">
                {t.propertyDetails.enquiryCardSubtext}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-[#526371] hover:text-[#13232D] rounded-lg hover:bg-[#F7F5F0] transition-colors cursor-pointer"
            aria-label={t.contact.close}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showDemoNotice ? (
          <div className="py-4">
            <div className="p-5 bg-[#FAF5EB] border border-[#B49765]/40 rounded-xl mb-6">
              <div className="flex items-center gap-2 text-[#B49765] font-bold text-sm mb-1">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t.contact.demoAlertTitle}</span>
              </div>
              <p className="text-xs text-[#202A30] leading-relaxed">
                {siteConfig.demoNotice.submissionNoticeEn}
              </p>
              <p className="text-xs text-[#202A30] leading-relaxed mt-1 font-arabic" dir="rtl">
                {siteConfig.demoNotice.submissionNoticeAr}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors cursor-pointer"
              >
                {t.contact.close}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleValidateAndSubmit} className="space-y-4">
            <div>
              <label htmlFor="viewing-name" className="block text-xs font-medium text-[#202A30] mb-1">
                {t.contact.fullName} <span className="text-[#B49765]">*</span>
              </label>
              <input
                id="viewing-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: عبدالله القحطاني' : 'e.g. Sultan Al-Mansour'}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg focus:bg-white focus:border-[#B49765] text-[#13232D] transition-colors"
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="viewing-phone" className="block text-xs font-medium text-[#202A30] mb-1">
                  {t.contact.phone} <span className="text-[#B49765]">*</span>
                </label>
                <input
                  id="viewing-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg focus:bg-white focus:border-[#B49765] text-[#13232D] transition-colors text-left"
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="viewing-date" className="block text-xs font-medium text-[#202A30] mb-1">
                  {t.contact.preferredDate}
                </label>
                <input
                  id="viewing-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg focus:bg-white focus:border-[#B49765] text-[#13232D] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="viewing-email" className="block text-xs font-medium text-[#202A30] mb-1">
                {t.contact.email}
              </label>
              <input
                id="viewing-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                dir="ltr"
                className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg focus:bg-white focus:border-[#B49765] text-[#13232D] transition-colors text-left"
              />
            </div>

            <div>
              <label htmlFor="viewing-message" className="block text-xs font-medium text-[#202A30] mb-1">
                {t.contact.message}
              </label>
              <textarea
                id="viewing-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={lang === 'ar' ? 'حدد أي استفسار أو موعد مفضل للزيارة...' : 'Specify timing or questions...'}
                className="w-full px-3.5 py-2 text-sm bg-[#F7F5F0] border border-[#D8D2C5] rounded-lg focus:bg-white focus:border-[#B49765] text-[#13232D] transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#738290]">
                {siteConfig.demoNotice.badgeEn} · {siteConfig.demoNotice.badgeAr}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium text-[#526371] hover:text-[#13232D] rounded-lg transition-colors cursor-pointer"
                >
                  {t.contact.close}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#13232D] hover:bg-[#1C3240] rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {t.contact.submitBtn}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
