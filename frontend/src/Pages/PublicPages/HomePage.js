import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTranslation from '../../i18n/useTranslation';
import useAuthContext from '../../context/AuthContext';
import { myAxios } from '../../services/api';
import "../../css/PublicCss/Home.css"; 

export default function HomePage() {
  const { t } = useTranslation();
  const { user } = useAuthContext();

  const [termekek, setTermekek] = useState([]);
  const [blogok, setBlogok] = useState([]);
  const [ujCim, setUjCim] = useState("");
  const [ujTartalom, setUjTartalom] = useState("");

  useEffect(() => {
    myAxios.get("/api/termekek")
      .then((res) => setTermekek(res.data))
      .catch((err) => console.error("Hiba a termékeknél:", err));

    if (user?.jogosultsag_id === 1) {
      fetchBlogok();
    }
  }, [user]);

  const fetchBlogok = () => {
    myAxios.get("/api/blog")
      .then((res) => setBlogok(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Blog hiba:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myAxios.post("/api/blog", {
        cim: ujCim,
        tartalom: ujTartalom
      });

      if (response.status === 200 || response.status === 201) {
        if (user?.jogosultsag_id === 1) {
          setBlogok([response.data, ...blogok]);
        }
        setUjCim("");
        setUjTartalom("");
        alert(t('home.feedback_success'));
      }
    } catch (error) {
      console.error("Mentési hiba:", error);
      alert(t('home.feedback_error'));
    }
  };

  return (
    <div className="home-container">
      <section className="home-hero">
        <h1>{t('home.welcome')}</h1>
        <p>{t('home.subtitle')}</p>
      </section>

      <section className="featured-section">
        <h2 className="section-title">{t('home.featured')}</h2>
        <div className="featured-grid">
          {termekek.slice(0, 2).map((item) => (
            <div key={item.cikkszam} className="product-card">
              <img src={`/kepek/${item.kepUrl}`} alt={item.nev} />
              <h3>{item.nev}</h3>
              <p>{item.ar} Ft</p>
              <Link to={`/products/${item.cikkszam}`} className="details-link">
                {t('home.details')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section className="feedback-section">
        <h2>{t('home.feedback_title')}</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            className="feedback-input"
            type="text" placeholder={t('home.subject_placeholder')} value={ujCim}
            onChange={(e) => setUjCim(e.target.value)}
            required
          />
          <textarea
            className="feedback-textarea"
            placeholder={t('home.message_placeholder')} value={ujTartalom}
            onChange={(e) => setUjTartalom(e.target.value)}
            required
          />
          <button type="submit" className="send-btn">
            {t('home.send_button')}
          </button>
        </form>
      </section>

      {user?.jogosultsag_id === 1 && (
        <section className="admin-blog-panel">
          <h2>Admin Panel: {t('home.reviews_received')}</h2>
          <div className="blog-list">
            {blogok.map((b) => (
              <div key={b.id} className="blog-item">
                <h4 style={{ margin: "0" }}>{b.cim}</h4>
                <p style={{ opacity: 0.8, fontSize: "14px" }}>{b.tartalom}</p>
                <small style={{ opacity: 0.5 }}>Dátum: {b.publikacio_datuma}</small>
              </div>
            ))}
            {blogok.length === 0 && <p>{t('home.no_reviews')}</p>}
          </div>
        </section>
      )}

      <section className="why-us-section">
        <h2>{t('home.why_us')}</h2>
        <ul className="feature-list">
          <li>{t('home.fast_shipping')}</li>
          <li>{t('home.secure_payment')}</li>
          <li>{t('home.easy_shopping')}</li>
        </ul>
      </section>
    </div>
  );
}