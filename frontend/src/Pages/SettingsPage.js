import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import ReactCountryFlag from 'react-country-flag';
import "../css/Settings.css";

export default function SettingsPage({ visible, onClose }) {
  const {
    language,
    setLanguage,
    notifications,
    setNotifications,
  } = useContext(SettingsContext);

  if (!visible) return null;

  return (
    <>
      <div className="settings-overlay" onClick={onClose}></div>

      <div className="settings-dropdown" onClick={(e) => e.stopPropagation()}>
        <h3 className="settings-title">Beállítások</h3>
        <label className="settings-label">
          Értesítések
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications((v) => !v)}
          />
        </label>
        <label className="settings-label">
          Nyelv
          <div className="flag-container">
            <ReactCountryFlag
              countryCode="HU"
              svg
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              title="Magyar"
              className={language === "hu" ? "active" : ""}
              onClick={() => setLanguage("hu")}
            />

            <ReactCountryFlag
              countryCode="US"
              svg
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              title="Angol"
              className={language === "en" ? "active" : ""}
              onClick={() => setLanguage("en")}
            />

            <ReactCountryFlag
              countryCode="DE"
              svg
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              title="Német"
              className={language === "de" ? "active" : ""}
              onClick={() => setLanguage("de")}
            />
          </div>
        </label>

        <button className="settings-close" onClick={onClose}>
          Bezárás
        </button>
      </div>
    </>
  );
}