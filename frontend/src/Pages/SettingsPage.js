import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import useTranslation from "../i18n/useTranslation"; 
import ReactCountryFlag from 'react-country-flag';
import "../css/Settings.css";

export default function SettingsPage({ visible, onClose }) {
  const {
    language,
    setLanguage,
    notifications,
    setNotifications,
  } = useContext(SettingsContext);

  const { t } = useTranslation(); 

  if (!visible) return null;

  return (
    <>
      <div className="settings-overlay" onClick={onClose}></div>

      <div className="settings-dropdown" onClick={(e) => e.stopPropagation()}>
        <h3 className="settings-title">{t('settings.title')}</h3>
        
        <label className="settings-label">
          {t('settings.notifications')}
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications((v) => !v)}
          />
        </label>

        <label className="settings-label">
          {t('settings.language')}
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
              title="English"
              className={language === "en" ? "active" : ""}
              onClick={() => setLanguage("en")}
            />

            <ReactCountryFlag
              countryCode="DE"
              svg
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              title="Deutsch"
              className={language === "de" ? "active" : ""}
              onClick={() => setLanguage("de")}
            />
          </div>
        </label>

        <button className="settings-close" onClick={onClose}>
          {t('settings.close')}
        </button>
      </div>
    </>
  );
}