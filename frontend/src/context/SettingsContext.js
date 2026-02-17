import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("hu");
  const [notifications, setNotifications] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        language,
        setLanguage,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}