import React, { createContext, useContext, useState, useEffect } from "react";
import { myAxios } from "../services/api";

const SizeContext = createContext();

export function SizeProvider({ children }) {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    myAxios.get("/api/meretek")
      .then(res => {
        const convertedSizes = res.data.map(m => {
          const actualId = m.id || m.meret_id || m.meretvalasztek_id || Object.values(m)[0];
          const eu = m.meretvalasztek;
          return {
            id: actualId,
            EU: eu,
            US: eu - 33,
            UK: eu - 34
          };
        });
        setSizes(convertedSizes);
        setLoading(false);
      })
      .catch(err => {
        console.error("Méret lekérési hiba:", err);
        setLoading(false);
      });
  }, []);

  return (
    <SizeContext.Provider value={{ sizes, loading }}>
      {children}
    </SizeContext.Provider>
  );
}

export function useSizeContext() {
  return useContext(SizeContext);
}