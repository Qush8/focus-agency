"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "@/data/translations.json";

type Language = "en" | "ka";
type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ka")) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === "ka") {
      document.body.classList.add("lang-ka");
      document.body.classList.remove("lang-en");
    } else {
      document.body.classList.add("lang-en");
      document.body.classList.remove("lang-ka");
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.classList.remove("lang-en", "lang-ka");
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
