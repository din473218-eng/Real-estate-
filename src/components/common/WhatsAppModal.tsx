import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();

  if (!isOpen) return null;

  const notice = lang === 'ar' 
    ? siteConfig.contact.whatsAppUnconfiguredNoticeAr 
    : siteConfig.contact.whatsAppUnconfiguredNoticeEn;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#13232D]/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-dialog-title"
    >
      <div className="relative w-full max-w-md bg-[#FFFFFF] border border-[#E8E4DC] rounded-2xl p-6 sm:p-7 shadow-2xl text-left rtl:text-right">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#B49765]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div>
            <h3 id="whatsapp-dialog-title" className="text-base font-bold text-[#13232D] font-display">
              {lang === 'ar' ? 'تنبيه الاتصال عبر واتساب' : 'WhatsApp Integration'}
            </h3>
            <p className="text-xs text-[#738290]">
              {lang === 'ar' ? 'وسائل التواصل المباشرة' : 'Direct Agency Channel'}
            </p>
          </div>
        </div>

        <p className="text-sm text-[#202A30] leading-relaxed mb-6 font-medium">
          {notice}
        </p>

        <div className="bg-[#F7F5F0] p-3.5 rounded-xl border border-[#E8E4DC] mb-6 text-xs text-[#526371]">
          <span className="font-bold text-[#13232D] block mb-1">
            {lang === 'ar' ? 'ملاحظة التخصيص:' : 'Customisation Note:'}
          </span>
          {lang === 'ar'
            ? 'يمكن ربط رقم الواتساب الرسمي المعتمد للمنشأة العقارية بسهولة عبر إعدادات siteConfig.ts'
            : 'The official business WhatsApp number is enabled in siteConfig.ts without modifying components.'}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-[#13232D] bg-[#E8E4DC] hover:bg-[#D8D2C5] transition-colors rounded-lg cursor-pointer"
          >
            {t.contact.close}
          </button>
        </div>
      </div>
    </div>
  );
};
