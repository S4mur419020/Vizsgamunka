import "../css/Benefits.css";
import { FiGift, FiPercent, FiHeart, FiStar, FiBell, FiCalendar } from "react-icons/fi";

export default function BenefitsPage() {
  return (
    <div className="benefits-container">
      <h1 className="benefits-title">Footshop előnyök</h1>
      <p className="benefits-sub">Előnyök, amik már a regisztrációval megilletnek</p>

      <div className="benefits-grid">

        <div className="benefit-card">
          <FiGift className="benefit-icon" />
          <div>
            <h3>3250 Ft a regisztrációért</h3>
            <p>Csak regisztrálj, ilyen egyszerű. Jutalmul egy 3250 Ft-os kupont kapsz, amit 50 000 Ft feletti vásárlásnál válthatsz be.</p>
          </div>
        </div>

        <div className="benefit-card">
          <FiPercent className="benefit-icon" />
          <div>
            <h3>Kapsz vissza 5%-ot minden rendelésből</h3>
            <p>Minden rendelésből 5% visszajár kupon formájában, amelyet a következő vásárlásnál felhasználhatsz.</p>
          </div>
        </div>

        <div className="benefit-card">
          <FiHeart className="benefit-icon" />
          <div>
            <h3>A Te kívánságlistád</h3>
            <p>Ha megtetszik valami, elmentheted a kívánságlistádra, hogy később is könnyen megtaláld.</p>
          </div>
        </div>

        <div className="benefit-card">
          <FiStar className="benefit-icon" />
          <div>
            <h3>2x raffle nyeremény esély</h3>
            <p>Footshop Club tagként megduplázódik az esélyed, hogy megnyerd a raffle-eket.</p>
          </div>
        </div>

        <div className="benefit-card">
          <FiBell className="benefit-icon" />
          <div>
            <h3>Elsőként értesülhetsz kedvezményekről</h3>
            <p>A regisztráció része, hogy értesülsz az új kollekciókról, limitált termékekről és akciókról.</p>
          </div>
        </div>

        <div className="benefit-card">
          <FiCalendar className="benefit-icon" />
          <div>
            <h3>Szülinapi ajándék</h3>
            <p>Minden évben egy tőlünk járó szülinapi ajándék kupont kapsz – csak mert velünk vagy.</p>
          </div>
        </div>

      </div>
    </div>
  );
}