
// src/pages/HistoryPage.jsx

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function HistoryPage() {

   const { t } = useTranslation();
   
  // =========================================
  // STYLES
  // =========================================

  const styles = {

    page: {
      padding: "20px",
      background: "#f5f7fb",
      minHeight: "100vh",
      height: "100vh",
      overflowY: "auto",   // ✅ FULL PAGE SCROLLBAR FIX
      overflowX: "hidden"
    },

    header: {
      marginBottom: "20px"
    },

    heading: {
      margin: 0,
      fontSize: "26px",
      color: "#1e293b"
    },

    subheading: {
      marginTop: "5px",
      color: "#64748b"
    },

    analyticsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
      gap: "18px",
      marginBottom: "25px"
    },

    analyticsCard: {
      background: "#fff",
      borderRadius: "14px",
      padding: "20px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
    },

    cardTitle: {
      margin: 0,
      fontSize: "15px",
      color: "#64748b"
    },

    cardValue: {
      marginTop: "10px",
      fontSize: "24px",
      fontWeight: "700",
      color: "#0f172a"
    },

    growth: {
      marginTop: "10px",
      fontSize: "24px",
      fontWeight: "700",
      color: "green"
    },

    historyCard: {
      background: "#fff",
      borderRadius: "14px",
      padding: "20px",
      marginBottom: "25px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
    },

    sectionTitle: {
      marginBottom: "18px",
      color: "#0f172a"
    },

    table: {
      width: "100%",
      borderCollapse: "collapse"
    },

    th: {
      background: "#eff6ff",
      padding: "12px",
      textAlign: "left",
      fontSize: "14px"
    },

    td: {
      padding: "12px",
      borderBottom: "1px solid #e2e8f0",
      fontSize: "14px"
    },

    landGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
      gap: "16px"
    },

    landCard: {
      background: "#f8fafc",
      padding: "18px",
      borderRadius: "14px",
      border: "1px solid #e2e8f0"
    },

    landTitle: {
      marginBottom: "12px",
      color: "#0f172a"
    },

    landText: {
      margin: "6px 0",
      fontSize: "14px",
      color: "#334155"
    },

    high: {
      marginTop: "12px",
      background: "#fee2e2",
      color: "#dc2626",
      padding: "8px",
      borderRadius: "8px",
      textAlign: "center",
      fontWeight: "600"
    },

    low: {
      marginTop: "12px",
      background: "#dbeafe",
      color: "#2563eb",
      padding: "8px",
      borderRadius: "8px",
      textAlign: "center",
      fontWeight: "600"
    },

    normal: {
      marginTop: "12px",
      background: "#dcfce7",
      color: "#16a34a",
      padding: "8px",
      borderRadius: "8px",
      textAlign: "center",
      fontWeight: "600"
    }

  };

  const [lands, setLands] = useState([]);

  const [analytics, setAnalytics] = useState({
    averagePrice: 0,
    highestZone: "-",
    cheapestZone: "-",
    growth: 0
  });

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await fetch("http://localhost:8000/submissions");
      const data = await res.json();

      const approved = data.filter(
        (d) => d.status === "approved"
      );

      setLands(approved);
      calculateAnalytics(approved);

    } catch (err) {
      console.log(err);
    }
  };

  const chartData = lands.map((item) => ({
    year: item.date?.split("-")[0],
    price: item.price,
    area: item.area
  }));

  const calculateAnalytics = (data) => {

    if (!data.length) return;

    const avg =
      data.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      ) / data.length;

    let highest = data[0];
    let cheapest = data[0];

    data.forEach((item) => {
      if (Number(item.price) > Number(highest.price)) {
        highest = item;
      }
      if (Number(item.price) < Number(cheapest.price)) {
        cheapest = item;
      }
    });

    const sorted = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let growth = 0;

    if (sorted.length >= 2) {
      const first = Number(sorted[0].price);
      const last = Number(sorted[sorted.length - 1].price);
      growth = (((last - first) / first) * 100).toFixed(2);
    }

    setAnalytics({
      averagePrice: avg.toFixed(0),
      highestZone: highest.location || "-",
      cheapestZone: cheapest.location || "-",
      growth
    });
  };

  const groupedHistory = {};

  lands.forEach((item) => {
    const year = item.date?.split("-")[0];
    const district = item.location || "Unknown";

    if (!groupedHistory[district]) {
      groupedHistory[district] = [];
    }

    groupedHistory[district].push({
      year,
      price: item.price
    });
  });

  return (

    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.heading}>
          📈  {t("historicalTrends")}
        </h2>
        <p style={styles.subheading}>
          {t("dashboard")}
        </p>
      </div>

      {/* ANALYTICS */}
      <div style={styles.analyticsGrid}>

        <div style={styles.analyticsCard}>
          <h3 style={styles.cardTitle}>{t("averagePrice")}</h3>
          <p style={styles.cardValue}>₹ {analytics.averagePrice}</p>
        </div>

        <div style={styles.analyticsCard}>
          <h3 style={styles.cardTitle}>{t("highestZone")}</h3>
          <p style={styles.cardValue}>{t(analytics.highestZone)}</p>
        </div>

        <div style={styles.analyticsCard}>
          <h3 style={styles.cardTitle}>{t("Zone")}</h3>
          <p style={styles.cardValue}>{analytics.cheapestZone}</p>
        </div>

        <div style={styles.analyticsCard}>
          <h3 style={styles.cardTitle}>{t("growthPercent")} %</h3>
          <p style={styles.growth}>{analytics.growth}%</p>
        </div>

      </div>

      {/* CHARTS */}
      <div style={styles.historyCard}>
        <h3 style={styles.sectionTitle}>📈 {t("priceGrowthTrends")}</h3>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.historyCard}>
        <h3 style={styles.sectionTitle}>📊 {t("areaVsPrice")}</h3>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="area" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div style={styles.historyCard}>
        <h3 style={styles.sectionTitle}>📊 {t("districtHistorical")}</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("district")}</th>
              <th style={styles.th}>{t("year")}</th>
              <th style={styles.th}>{t("price")}</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(groupedHistory).map((district) =>
              groupedHistory[district].map((item, i) => (
                <tr key={`${district}-${i}`}>
                  <td style={styles.td}>{district}</td>
                  <td style={styles.td}>{item.year}</td>
                  <td style={styles.td}>₹ {item.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* LAND */}
      <div style={styles.historyCard}>
        <h3 style={styles.sectionTitle}>🏡 {t("approvedLandHistory")}</h3>

        <div style={styles.landGrid}>
          {lands.map((land) => (
            <div key={land.id} style={styles.landCard}>
              <h3 style={styles.landTitle}>{land.location}</h3>

              <p style={styles.landText}>💰 ₹ {land.price}</p>
              <p style={styles.landText}>📐 {t(land.area)} {t("area")}</p>
              <p style={styles.landText}>🏷 {t(land.type)}</p>
              <p style={styles.landText}>📅 {land.date}</p>

              {land.flag === "high" && <div style={styles.high}>🔴{t("flags.OVERPRICED")}</div>}
              {land.flag === "low" && <div style={styles.low}>🔵 {t("flags.UNDERVALUED")}</div>}
              {land.flag === "normal" && <div style={styles.normal}>🟢{t("flags.NORMAL")}</div>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}