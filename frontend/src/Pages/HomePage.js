import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../i18n/useTranslation";
import useAuthContext from "../context/AuthContext"; 
import { myAxios } from "../services/api"; 

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
    <div style={{ background: "#121212", color: "white", minHeight: "100vh", padding: "20px" }}>
      
      <section style={{ textAlign: "center", padding: "40px 0" }}>
        <h1>{t('home.welcome')}</h1>
        <p>{t('home.subtitle')}</p>
      </section>
      
      <section>
        <h2 style={{ textAlign: "center" }}>{t('home.featured')}</h2>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          {termekek.slice(0, 2).map((item) => (
            <div key={item.cikkszam} style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "15px", width: "260px" }}>
              <img src={`/kepek/${item.kepUrl}`} alt={item.nev} style={{ width: "100%", height: "230px", objectFit: "cover", borderRadius: "10px" }} />
              <h3>{item.nev}</h3>
              <p>{item.ar} Ft</p>
              <Link to={`/products/${item.cikkszam}`} style={{ color: "#00e5ff", fontWeight: "bold", textDecoration: "none" }}>
                {t('home.details')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ margin: "50px 0", opacity: 0.1 }} />

      <section style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>{t('home.feedback_title')}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input 
            type="text" placeholder={t('home.subject_placeholder')} value={ujCim} 
            onChange={(e) => setUjCim(e.target.value)} 
            style={{ padding: "10px", borderRadius: "5px", border: "none" }} required 
          />
          <textarea 
            placeholder={t('home.message_placeholder')} value={ujTartalom} 
            onChange={(e) => setUjTartalom(e.target.value)} 
            style={{ padding: "10px", borderRadius: "5px", border: "none", height: "100px" }} required 
          />
          <button type="submit" style={{ background: "#00e5ff", border: "none", padding: "10px", fontWeight: "bold", borderRadius: "5px", cursor: "pointer" }}>
            {t('home.send_button')}
          </button>
        </form>
      </section>

      {user?.jogosultsag_id === 1 && (
        <section style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", border: "1px solid #00e5ff", borderRadius: "10px" }}>
          <h2 style={{ color: "#00e5ff" }}>Admin Panel: {t('home.reviews_received')}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {blogok.map((b) => (
              <div key={b.id} style={{ background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "8px" }}>
                <h4 style={{ margin: "0" }}>{b.cim}</h4>
                <p style={{ opacity: 0.8, fontSize: "14px" }}>{b.tartalom}</p>
                <small style={{ opacity: 0.5 }}>Dátum: {b.publikacio_datuma}</small>
              </div>
            ))}
            {blogok.length === 0 && <p>{t('home.no_reviews')}</p>}
          </div>
        </section>
      )}

      <section style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>{t('home.why_us')}</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>{t('home.fast_shipping')}</li>
          <li>{t('home.secure_payment')}</li>
          <li>{t('home.easy_shopping')}</li>
        </ul>
      </section>
    </div>
  );
}