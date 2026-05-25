import React, { useEffect, useState } from 'react'; 
import "../../css/PublicCss/Discount.css";
import useTranslation from '../../i18n/useTranslation';
import { myAxios } from "../../services/api";

export default function DiscountsPage() {
  const { t } = useTranslation();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchPublicDiscounts = async () => {
      try {
        const res = await myAxios.get("/api/learazasok");
        setDiscounts(res.data);
      } catch (error) {
        console.error("Hiba az adatok lekérésekor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicDiscounts();
  }, []);

  const handleCopy = (generatedCode, id) => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (loading) return <div className="loading-container">{t('loading')}</div>;

  return (
    <div className="discounts-container"> 
      <h1>{t('discounts.title')}</h1>
      
      <div className="discounts-grid">
        {discounts.map((discount) => {
          const generatedCode = `${discount.marka.toUpperCase()}${discount.akcio_szazalek}`;

          return (
            <div className="discount-card" key={discount.akcio}>
              <div className="discount-info">
                <h3>{discount.marka} {discount.tipus}</h3>
                
                <div className="discount-percent">
                  <span className="percent-number">{discount.akcio_szazalek}% </span>
                  <span className="off-text">{t('discounts.title_suffix')}</span>
                </div>

                <div className="coupon-display">
                   <code>{generatedCode}</code>
                </div>

                <p className="validity-text">
                  {t('discounts.validity')}: {discount.zaro_datum}
                </p>
              </div>

              <button 
                className={`copy-btn ${copiedId === discount.akcio ? 'copied' : ''}`} 
                onClick={() => handleCopy(generatedCode, discount.akcio)}
              >
                {copiedId === discount.akcio ? '✓' : t('discounts.copy')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}