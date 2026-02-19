import React, { createContext, useEffect, useState } from "react";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const stored = JSON.parse(localStorage.getItem("settings") || "{}");

  const [language, setLanguage] = useState(stored.language ?? "hu");
  const [notifications, setNotifications] = useState(stored.notifications ?? true);

  useEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ language, notifications })
    );
  }, [language, notifications]);

  return (
    <SettingsContext.Provider
      value={{ language, setLanguage, notifications, setNotifications }}
    >
      {children}
    </SettingsContext.Provider>
  );
}