import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [termekek, setTermekek] = useState([]);
  const [blogok, setBlogok] = useState([]);
  const [ujCim, setUjCim] = useState("");
  const [ujTartalom, setUjTartalom] = useState("");
  const [user, setUser] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:8000/api/termekek")
      .then((res) => res.json())
      .then((data) => setTermekek(data))
      .catch((err) => console.error("Hiba a termékeknél:", err));

    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((userData) => {
          setUser(userData);
          if (userData.jogosultsag_id === 1) {
            fetchBlogok(token);
          }
        })
        .catch((err) => console.error("Auth hiba:", err));
    }
  }, []);

  const fetchBlogok = (token) => {
    fetch("http://localhost:8000/api/blog", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBlogok(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Blog hiba:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ cim: ujCim, tartalom: ujTartalom }),
      });

      if (response.ok) {
        const mentettBlog = await response.json();
        if (user?.jogosultsag_id === 1) {
          setBlogok([mentettBlog, ...blogok]);
        }
        setUjCim("");
        setUjTartalom("");
        alert("Vélemény elküldve!");
      } else {
        alert("Hiba a mentés során. (Lehet, hogy nem vagy bejelentkezve?)");
      }
    } catch (error) {
      console.error("Hiba:", error);
    }
  };

  return (
    <div style={{ background: "#121212", color: "white", minHeight: "100vh", padding: "20px" }}>
      
      
      <section style={{ textAlign: "center", padding: "40px 0" }}>
        <h1>Üdv a Sneaker Webshopban</h1>
        <p>Vásárolj gyorsan és egyszerűen</p>
      </section>
      
      <section>
        <h2 style={{ textAlign: "center" }}>Kiemelt termékek</h2>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          {termekek.slice(0, 2).map((t) => (
            <div key={t.cikkszam} style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "15px", width: "260px" }}>
              <img src={`/kepek/${t.kepUrl}`} alt={t.nev} style={{ width: "100%", height: "230px", objectFit: "cover", borderRadius: "10px" }} />
              <h3>{t.nev}</h3>
              <p>{t.ar} Ft</p>
              <Link to={`/products/${t.cikkszam}`} style={{ color: "#00e5ff", fontWeight: "bold", textDecoration: "none" }}>Részletek</Link>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ margin: "50px 0", opacity: 0.1 }} />

      <section style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>Mondd el a véleményed!</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input 
            type="text" placeholder="Tárgy" value={ujCim} 
            onChange={(e) => setUjCim(e.target.value)} 
            style={{ padding: "10px", borderRadius: "5px", border: "none" }} required 
          />
          <textarea 
            placeholder="Írj valamit..." value={ujTartalom} 
            onChange={(e) => setUjTartalom(e.target.value)} 
            style={{ padding: "10px", borderRadius: "5px", border: "none", height: "100px" }} required 
          />
          <button type="submit" style={{ background: "#00e5ff", border: "none", padding: "10px", fontWeight: "bold", borderRadius: "5px", cursor: "pointer" }}>
            Küldés
          </button>
        </form>
      </section>

      {user?.jogosultsag_id === 1 && (
        <section style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", border: "1px solid #00e5ff", borderRadius: "10px" }}>
          <h2 style={{ color: "#00e5ff" }}>Admin Panel: Érkezett vélemények</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {blogok.map((b) => (
              <div key={b.id} style={{ background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "8px" }}>
                <h4 style={{ margin: "0" }}>{b.cim}</h4>
                <p style={{ opacity: 0.8, fontSize: "14px" }}>{b.tartalom}</p>
                <small style={{ opacity: 0.5 }}>Dátum: {b.publikacio_datuma}</small>
              </div>
            ))}
            {blogok.length === 0 && <p>Nincsenek megjeleníthető vélemények.</p>}
          </div>
        </section>
      )}
      <section style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Miért minket válassz?</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Gyors szállítás</li>
          <li>Biztonságos fizetés</li>
          <li>Egyszerű vásárlás</li>
        </ul>
      </section>
    </div>
  );
}