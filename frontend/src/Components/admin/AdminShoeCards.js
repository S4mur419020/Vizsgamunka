import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

function AdminShoeCards({ termekek, onSzerkeszt, onTorol }) {
  const { user } = useAuthContext();
  const isAdmin = user && user.role === "admin";

  if (!isAdmin) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
        Nincs jogosultságod az admin felület megtekintéséhez.
      </div>
    );
  }

  if (!termekek || !termekek.length) {
    return <p>Nincs elérhető termék.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {termekek.map(termek => (
        <div
          key={termek.id}
          style={{
            background: "#1a1a1a",
            padding: "15px",
            borderRadius: "10px",
            color: "white",
            border: "2px solid #ffcc00",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            transition: "0.3s",
          }}
        >
          <img
            src={`/kepek/${termek.kepUrl}`}
            alt={termek.nev}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />

          <h3>{termek.nev}</h3>

          <p style={{ color: "#007bff", fontWeight: "bold" }}>
            {Number(termek.ar).toLocaleString()} Ft
          </p>

          {/* Admin gombok */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            <Link
              to={`/admin/products/edit/${termek.id}`}
              style={{
                background: "#0d6efd",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: "5px",
                textDecoration: "none",
                fontSize: "14px",
              }}
              onClick={() => onSzerkeszt && onSzerkeszt(termek)}
            >
              Szerkesztés
            </Link>

            <button
              onClick={() => onTorol && onTorol(termek.id)}
              style={{
                background: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Törlés
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminShoeCards;