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
      newErrors.phone = lang === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please provide a contact phone number';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1B2B]/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewing-modal-title"
    >
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#E8E2D5] rounded-xl p-6 sm:p-8 shadow-2xl text-left rtl:text-right my-8">
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#F0EBE1]">
          <div>
            <h3 id="viewing-modal-title" className="text-xl font-semibold text-[#0F1B2B] font-display">
              {t.propertyDetails.inquireTitle}
            </h3>
            {propertyTitle ? (
              <p className="text-xs text-[#C5A869] font-medium mt-1">
                {propertyTitle}
              </p>
            ) : (
              <p className="text-xs text-[#5E6E82] mt-1">
                {t.propertyDetails.inquireSubtext}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-[#5E6E82] hover:text-[#0F1B2B] rounded-lg hover:bg-[#F5F2EB] transition-colors"
            aria-label={t.contact.close}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showDemoNotice ? (
          <div className="py-4">
            <div className="p-4 bg-[#FAF5EB] border border-[#C5A869]/30 rounded-lg mb-6">
              <div className="flex items-center gap-2 text-[#9E7B35] font-semibold text-sm mb-1">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t.contact.demoAlertTitle}</span>
              </div>
              <p className="text-xs text-[#3E4D61] leading-relaxed">
                {siteConfig.demoNotice.submissionNoticeEn}
              </p>
              <p className="text-xs text-[#3E4D61] leading-relaxed mt-1 font-arabic" dir="rtl">
                {siteConfig.demoNotice.submissionNoticeAr}
              </p>
            </div>
            <p className="text-xs text-[#7A8699] mb-6">
              {lang === 'ar'
                ? 'عند ربط الموقع بنظام إدارة علاقات العملاء (CRM) أو البريد الإلكتروني الخاص بشركتكم، سيتم إرسال هذا الطلب مباشرة إلى فريق المبيعات.'
                : 'When connected to your real estate CRM or corporate inbox, inquiries will route instantly to your sales team.'}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F1B2B] hover:bg-[#1E2F46] rounded-lg transition-colors"
              >
                {t.contact.close}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleValidateAndSubmit} className="space-y-4">
            <div>
              <label htmlFor="viewing-fullName" className="block text-xs font-medium text-[#3E4D61] mb-1">
                {t.contact.fullName} <span className="text-[#C5A869]">*</span>
              </label>
              <input
                id="viewing-fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: عبدالله القحطاني' : 'e.g. Sultan Al-Mansour'}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg focus:bg-white focus:border-[#C5A869] text-[#0F1B2B] transition-colors"
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="viewing-phone" className="block text-xs font-medium text-[#3E4D61] mb-1">
                  {t.contact.phone} <span className="text-[#C5A869]">*</span>
                </label>
                <input
                  id="viewing-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg focus:bg-white focus:border-[#C5A869] text-[#0F1B2B] transition-colors text-left"
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="viewing-date" className="block text-xs font-medium text-[#3E4D61] mb-1">
                  {t.contact.preferredDate}
                </label>
                <input
                  id="viewing-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg focus:bg-white focus:border-[#C5A869] text-[#0F1B2B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="viewing-email" className="block text-xs font-medium text-[#3E4D61] mb-1">
                {t.contact.email}
              </label>
              <input
                id="viewing-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                dir="ltr"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg focus:bg-white focus:border-[#C5A869] text-[#0F1B2B] transition-colors text-left"
              />
            </div>

            <div>
              <label htmlFor="viewing-message" className="block text-xs font-medium text-[#3E4D61] mb-1">
                {t.contact.message}
              </label>
              <textarea
                id="viewing-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={lang === 'ar' ? 'حدد أي تفاصيل أو أوقات تناسبك للزيارة...' : 'Specify timing or spatial questions...'}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#E0D9CC] rounded-lg focus:bg-white focus:border-[#C5A869] text-[#0F1B2B] transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#7A8699]">
                {siteConfig.demoNotice.badgeEn} / {siteConfig.demoNotice.badgeAr}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium text-[#5E6E82] hover:text-[#0F1B2B] rounded-lg transition-colors"
                >
                  {t.contact.close}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F1B2B] hover:bg-[#1E2F46] rounded-lg transition-colors shadow-xs"
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
