import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { seedDummyData } from "./dummyPrices";
import { useEffect } from "react";
import MapPage from "./MapPage";
import SubmitPage from "./SubmitPage";
import HistoryPage from "./HistoryPage";
import ModerationPage from "./ModerationPage";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";

export default function App() {

  const { t } = useTranslation();

  useEffect(() => {
    seedDummyData();
  }, []);

  // 🌐 Language switch with persistence
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const currentLang = localStorage.getItem("lang") || "en";

  return (
    <BrowserRouter>
      <div className="layout">

        {/* 🔥 SIDEBAR */}
        <nav className="sidebar">

          
          <h2> {t("landPricingIntelligence")}</h2>

          {/* ✅ Use translations */}
          <NavLink to="/" end>{t("map")}</NavLink>
          <NavLink to="/submit">{t("submit")}</NavLink>
          <NavLink to="/history">{t("history")}</NavLink>
          <NavLink to="/moderation">{t("moderation")}</NavLink>

          {/* 🌐 Language Switch */}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => changeLanguage("en")}
              style={{ background: currentLang === "en" ? "#4CAF50" : "" }}
            >
               {t("languages.EN")}
            </button>

            <button
              onClick={() => changeLanguage("te")}
              style={{ background: currentLang === "te" ? "#4CAF50" : "" }}
            >
               {t("languages.TE")}
            </button>

            <button
              onClick={() => changeLanguage("hi")}
              style={{ background: currentLang === "hi" ? "#4CAF50" : "" }}
            >
               {t("languages.HI")}
            </button>
          </div>
        </nav>

        {/* 📦 CONTENT */}
        <div className="content">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/moderation" element={<ModerationPage />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}


