import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
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
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="settings-select"
          >
            <option value="hu">Magyar</option>
            <option value="en">Angol</option>
            <option value="de">Német</option>
          </select>
        </label>

        <button className="settings-close" onClick={onClose}>
          Bezárás
        </button>
      </div>
    </>
  );
}