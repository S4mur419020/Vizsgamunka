import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

export default function ShoeCard({ termek, onTorles }) {
  const { user } = useAuthContext();
  const isAdmin = user && user.role === "admin";
  const shoeId = termek.id || termek._id;

  return (
    <div
      style={{
        background: "#1a1a1a",
        padding: "15px",
        borderRadius: "10px",
        color: "white",
        border: isAdmin ? "2px solid #ffcc00" : "1px solid #333",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative"
      }}
    >

      {isAdmin && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#ffcc00",
            color: "#000",
            padding: "4px 8px",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "5px",
            zIndex: 1
          }}
        >
          ADMIN
        </div>
      )}

      <img
        src={`/kepek/${termek.kepUrl}`}
        alt={termek.nev}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "5px"
        }}
      />

      <h3>{termek.nev}</h3>

      <p style={{ color: "#007bff", fontWeight: "bold" }}>
        {Number(termek.ar).toLocaleString()} Ft
      </p>

      {!isAdmin && (
        <Link
          to={`/products/${termek.cikkszam}`}
          style={{
            color: "#fff",
            background: "#333",
            textDecoration: "none",
            padding: "8px",
            borderRadius: "5px",
            marginTop: "10px"
          }}
        >
          Részletek
        </Link>
      )}

      {isAdmin && (
        <div style={{ marginTop: "10px", display: "flex", gap: "8px", justifyContent: "center" }}>
          <Link
            to={`/admin/edit-shoe/${shoeId}`}
            style={{
              background: "#0d6efd",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "5px",
              textDecoration: "none",
              fontSize: "14px"
            }}
          >
            Szerkesztés
          </Link>

          <button
            onClick={() => onTorles && onTorles(shoeId)}
            style={{
              background: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "5px",
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            Törlés
          </button>
        </div>
      )}
    </div>
  );
}