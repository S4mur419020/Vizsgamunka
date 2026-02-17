import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import '../css/Settings.css'


export default function SettingsPage({ visible, onClose }) {
  const { darkMode, setDarkMode, language, setLanguage, notifications, setNotifications } =
    useContext(SettingsContext);

  if (!visible) return null;

  return (
    <>
      {/* overlay a háttérhez */}
      <div
        className="settings-overlay"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 999,
        }}
      />

      <div
        className="settings-dropdown"
        onClick={(e) => e.stopPropagation()} // hogy a cardon belüli kattintás ne zárja be
        style={{
          position: "fixed",
          top: "60px",
          right: "20px",
          width: "300px",
          backgroundColor: "#111827",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
      >
        <div className="settings-section">
          <label className="settings-label">
            Sötét mód
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </label>
        </div>

        <div className="settings-section">
          <label className="settings-label">
            Értesítések
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </label>
        </div>

        <div className="settings-section">
          <label className="settings-label">
            Nyelv
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="settings-select"
            >
              <option value="en">Angol</option>
              <option value="hu">Magyar</option>
              <option value="de">Német</option>
            </select>
          </label>
        </div>

        <button className="settings-close" onClick={onClose}>
          Bezárás
        </button>
      </div>
    </>
  );
}
