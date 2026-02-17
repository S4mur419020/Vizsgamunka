import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [termekek, setTermekek] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/termekek")
      .then((res) => res.json())
      .then((data) => setTermekek(data))
      .catch((err) => console.error("Hiba:", err));
  }, []);

  return (
    <div>

      <section>
        <h1>Üdv a Sneaker Webshopban</h1>
        <p>Vásárolj gyorsan és egyszerűen</p>
      </section>

      <section>
        <h2>Kiemelt termékek</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {termekek.slice(0, 2).map((t) => (
            <div
              key={t.cikkszam}
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "20px",
                borderRadius: "15px",
                width: "260px",
                height: "450px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <img
                src={`/kepek/${t.kepUrl}`}
                alt={t.nev}
                style={{
                  width: "100%",
                  height: "230px",   
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div style={{ flexGrow: 1, marginTop: "10px" }}>
                <h3>{t.nev}</h3>
                <p>{t.ar} Ft</p>
                <p
                  style={{
                    fontSize: "14px",
                    opacity: 0.8,
                    maxHeight: "80px",   
                    overflow: "hidden",
                  }}
                >
                  {t.leiras}
                </p>
              </div>

              <Link
                to={`/products/${t.cikkszam}`}
                style={{
                  marginTop: "10px",
                  display: "block",
                  color: "#00e5ff",
                  fontWeight: "bold",
                }}
              >
                Részletek
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Miért minket válassz?</h2>
        <ul>
          <li>Gyors szállítás</li>
          <li>Biztonságos fizetés</li>
          <li>Egyszerű vásárlás</li>
        </ul>
      </section>

    </div>
  );
}