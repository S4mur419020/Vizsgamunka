import React, { useState } from 'react'; 
import "../css/Discount.css";
import useTranslation from "../i18n/useTranslation";

export default function DiscountsPage() {
  const { t } = useTranslation();
  const couponCode = "7X4K-29QZ";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="discounts-container">
      <h1>{t('discounts.title')}</h1>
      <div className="discount-card">
        <div className="discount-info">
          <h3>10% {t('discounts.title_suffix')}</h3> 
          <div className="coupon-display">
            <code>{couponCode}</code>
          </div>

          <p>{t('discounts.validity')}: 3 {t('discounts.days')}</p>
        </div>
        <button className={`copy-btn ${isCopied ? 'copied' : ''}`} onClick={handleCopy}>
          {isCopied ? '✓' : t('discounts.copy')}
        </button>
      </div>
    </div>
  );
}