import '../../css/PublicCss/Benefits.css';
import { FiGift, FiPercent, FiHeart, FiStar, FiBell, FiCalendar } from "react-icons/fi"; 
import useTranslation from '../../i18n/useTranslation';

export default function BenefitsPage() {
  const { t } = useTranslation();

  const benefitsData = [
    {
      icon: <FiGift />,
      title: t("benefits.gift_card.title"),
      text: t("benefits.gift_card.text"),
    },
    {
      icon: <FiPercent />,
      title: t("benefits.cashback.title"),
      text: t("benefits.cashback.text"),
    },
    {
      icon: <FiHeart />,
      title: t("benefits.wishlist.title"),
      text: t("benefits.wishlist.text"),
    },
    {
      icon: <FiStar />,
      title: t("benefits.raffle.title"),
      text: t("benefits.raffle.text"),
    },
    {
      icon: <FiBell />,
      title: t("benefits.notification.title"),
      text: t("benefits.notification.text"),
    },
    {
      icon: <FiCalendar />,
      title: t("benefits.birthday.title"),
      text: t("benefits.birthday.text"),
    }
  ];

  return (
    <div className="benefits-container">
      <h1 className="benefits-title">{t("benefits.title")}</h1>
      <p className="benefits-sub">{t("benefits.subtitle")}</p>

      <div className="benefits-grid">
        {benefitsData.map((benefit, index) => (
          <div className="benefit-card" key={index}>
            <div className="benefit-icon">{benefit.icon}</div>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}