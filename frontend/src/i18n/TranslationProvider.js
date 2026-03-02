import { createContext, useContext, useEffect, useState } from "react";
import hu from "./hu.json";
import en from "./en.json";
import de from "./de.json";
import { SettingsContext } from "../context/SettingsContext";

const dictionaries = { hu, en, de };

export const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const { language } = useContext(SettingsContext);

  const [dict, setDict] = useState(dictionaries[language]);

  useEffect(() => {
    setDict(dictionaries[language]);
  }, [language]);

  const t = (key) => dict[key] || key;

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
}