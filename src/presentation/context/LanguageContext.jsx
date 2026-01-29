import { createContext, useContext, useEffect, useState } from "react";
import { ar } from "../languages/ar";
import { en } from "../languages/en";
import { fr } from "../languages/fr";
import { zh } from "../languages/zh";
import { ru } from "../languages/ru";

const LanguageContext = createContext();
const LANGUAGES = {
  ar: {
    label: "العربية",
    dir: "rtl",
    translations: ar,
  },
  en: {
    label: "English",
    dir: "ltr",
    translations: en,
  },
  fr: {
    label: "Français",
    dir: "ltr",
    translations: fr,
  },

zh: {
    label: "中文",
    dir: "ltr",
    translations: zh,
  },
  ru: {
    label: "Русский",
    dir: "ltr",
    translations: ru,
  },
};

export function LanguageProvider({ children }) {
  
  const [lang, setLang] = useState("ar");

  const current = LANGUAGES[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = current.dir;
  }, [lang, current.dir]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        languages: LANGUAGES,
        translations: current.translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
};