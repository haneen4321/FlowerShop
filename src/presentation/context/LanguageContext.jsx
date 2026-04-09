import { createContext, useContext, useEffect, useState } from "react";
import { ar } from "../languages/ar";
import { en } from "../languages/en";
import { zh } from "../languages/zh";
import { es } from "../languages/es";
import { hi } from "../languages/hi";
import { pt } from "../languages/pt";
import { fr } from "../languages/fr";
import { de } from "../languages/de";
import { jp } from "../languages/jp";
import { ru } from "../languages/ru";
const LanguageContext = createContext();
const LANGUAGES = {
  ar: {
    label: "العربية",
    dir: "rtl",
    translations: ar,
    image: "/images/languages/ar_lg.png",
  },
  en: {
    label: "English",
    dir: "ltr",
    translations: en,
    image: "/images/languages/en_lg.png",
  },
  zh: {
    label: "中文",
    dir: "ltr",
    translations: zh,
    image: "/images/languages/zh_lg.png",
  },
  es: {
    label: "Español",
    dir: "ltr",
    translations: es,
    image: "/images/languages/es_lg.png",
  },
  hi: {
    label: "हिन्दी",
    dir: "ltr",
    translations: hi,
    image: "/images/languages/hi_lg.png",
  },
  pt: {
    label: "Português",
    dir: "ltr",
    translations: pt,
    image: "/images/languages/pt_lg.png",
  },
  fr: {
    label: "Français",
    dir: "ltr",
    translations: fr,
    image: "/images/languages/fr_lg.png",
  },
  de: {
    label: "Deutsch",
    dir: "ltr",
    translations: de,
    image: "/images/languages/de_lg.png",
  },
  jp: {
    label: "日本語",
    dir: "ltr",
    translations: jp,
    image: "/images/languages/jp_lg.png",
  },
  ru: {
    label: "Русский",
    dir: "ltr",
    translations: ru,
    image: "/images/languages/ru_lg.png",
  },
  ru: {
    label: "Русский",
    dir: "ltr",
    translations: ru,
    image: "/images/languages/ru_lg.png",
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
      }}>
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