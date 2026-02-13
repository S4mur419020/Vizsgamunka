import React, { useContext } from 'react';
import SettingsContext  from '../Context/SettingsContext';

export default function SettingsPage() {
  const { darkMode, setDarkMode, language, setLanguage, notifications, setNotifications } =
    useContext(SettingsContext);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Beállítások</h1>

      <div style={{ marginBottom: '15px' }}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Sötét mód
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Értesítések engedélyezése
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>
          Nyelv:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="en">Angol</option>
            <option value="hu">Magyar</option>
            <option value="de">Német</option>
          </select>
        </label>
      </div>

      <p>Jelenlegi nyelv: {language}</p>
    </div>
  );
}
