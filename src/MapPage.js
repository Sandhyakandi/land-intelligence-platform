// src/MapPage.js
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// =======================================
// FIX LEAFLET DEFAULT ICON ISSUE
// =======================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// =======================================
// HEATMAP COMPONENT
// =======================================

function HeatmapLayer({ data }) {

  const map = useMap();

  useEffect(() => {

    if (!data.length) return;

    const heatLayer = L.heatLayer(

      data.map((d) => [
        Number(d.lat),
        Number(d.lng),
        // Number(d.price) / 100000
        Math.max(Number(d.price) / 100000, 0.2)
      ]),

      {
        radius: 30,
        blur: 25,

    gradient: {
      0.2: "green",
      0.5: "yellow",
      0.8: "blue",
      1.0: "red"
    }
      }

    );
     heatLayer.addTo(map);


    return () => {
      map.removeLayer(heatLayer);
    };

  }, [data, map]);

  return null;
}

// =======================================
// MAP CLICK HANDLER
// =======================================

function MapClickHandler({
  setSelectedPosition,
  setShowForm
}) {

  useMapEvents({

    click(e) {

      setSelectedPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });

      // OPEN FORM AUTOMATICALLY
      setShowForm(true);
    }
  });

  return null;
}

// =======================================
// MARKER COLOR LOGIC
// =======================================

function getMarkerIcon(flag) {

  let color = "green";

  // OVERPRICED
  if (flag === "high") {
    color = "red";
  }

  // UNDERVALUED
  else if (flag === "low") {
    color = "yellow";
  }

  // NORMAL
  else {
    color = "green";
  }

  return new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [40, 40]
  });
}

// =======================================
// MAIN COMPONENT
// =======================================

export default function MapPage() {
   const { t } = useTranslation();
  

  const [lands, setLands] = useState([]);

  const [heatmap, setHeatmap] = useState(false);

  const [selectedPosition, setSelectedPosition] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  // =======================================
  // FILTERS
  // =======================================

  const [landType, setLandType] =
    useState("all");

  const [district, setDistrict] =
    useState("");

  const [priceRange, setPriceRange] =
    useState("");

  const [areaRange, setAreaRange] =
    useState("");

  // =======================================
  // FORM
  // =======================================

  const [form, setForm] = useState({

    location: "",

    price: "",

    area: "",

    // land_type: "residential",
    type: "residential",

    currency: "INR",

    date: ""

  });


const loadData = async () => {

  try {

    const res = await fetch(
      "http://localhost:8000/submissions"
    );

    const data = await res.json();

    console.log("MAP DATA:", data);

    if (!Array.isArray(data)) {
      setLands([]);
      return;
      
    }

    const validData = data.filter(
      (d) =>
        d.lat !== null &&
        d.lng !== null &&
        !isNaN(d.lat) &&
        !isNaN(d.lng)
    );

    setLands(validData);

  } catch (err) {

    console.log(err);

  }
};

useEffect(() => {
 loadData();
  }, []);
  // =======================================
  // FILTER LOGIC
  // =======================================

  const filteredData = lands.filter((d) => {

    // TYPE
    // if (
    //   landType !== "all" &&
    //   d.type !== landType
    // ) {
    //   return false;
    // }
if (
      landType !== "all" &&
     d.type?.toLowerCase() !==
      landType.toLowerCase()
    ) {
      return false;
    }

    // DISTRICT / LOCATION
    if (
      district &&
      !d.location
        .toLowerCase()
        .includes(district.toLowerCase())
    ) {
      return false;
    }

    // PRICE FILTER
//  const price = Number(d.price);
//     if (
//       priceRange === "low" &&
//       d.price > 30000
//     ) {
//       return false;
//     }

//     if (
//       priceRange === "medium" &&
//       (d.price < 30000 || d.price > 70000)
//     ) {
//       return false;
//     }

//     if (
//       priceRange === "high" &&
//       d.price < 70000
//     ) {
//       return false;
//     }


if (
    priceRange &&
    d.flag?.toLowerCase() !==
      priceRange.toLowerCase()
  ) {
    return false;
  }


    // AREA FILTER
 const area = Number(d.area);
    if (
      areaRange === "small" &&
      d.area > 200
    ) {
      return false;
    }

    if (
      areaRange === "medium" &&
      (d.area < 200 || d.area > 500)
    ) {
      return false;
    }

    if (
      areaRange === "large" &&
      d.area < 500
    ) {
      return false;
    }

    return true;
  });

  // =======================================
  // SUBMIT LAND
  // =======================================

  const submitLand = async () => {

    try {

      const payload = {

        ...form,

        lat: selectedPosition.lat,

        lng: selectedPosition.lng

      };

      const res = await fetch(
        "http://localhost:8000/submit",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      alert(data.message);

      // CLOSE FORM
      setShowForm(false);

      // RESET FORM
      setForm({
        location: "",
        price: "",
        area: "",
        // land_type: "residential",
        type: "residential",
        currency: "INR",
        date: ""
      });

      // RELOAD DATA
      loadData();

    } catch (err) {

      console.log(err);

      alert("Submission failed");
    }
  };

  // =======================================
  // UI
  // =======================================

  return (

    <div className="map-page">

      {/* ======================================= */}
      {/* HEADER */}
      {/* ======================================= */}

      <div className="map-topbar">

        <h2>
           <h2>  🌍 {t("landPricingIntelligence")}</h2>
        </h2>

        <div className="toggle-buttons">

          <button
            onClick={() => setHeatmap(false)}
          >
            📍 {t("markers")}
          </button>

          <button
            onClick={() => setHeatmap(true)}
          >
            🔥  {t("heatmap")}
          </button>

        </div>
      </div>

      {/* ======================================= */}
      {/* FILTERS */}
      {/* ======================================= */}

      <div className="filters">

        {/* LAND TYPE */}

        <select
          value={landType}
          onChange={(e) =>
            setLandType(e.target.value)
          }
        >

          <option value="all">
            {t("allTypes")}
          </option>

          <option value="residential">
            {t("residential")}
          </option>

          <option value="commercial">
             {t("commercial")}
          </option>

          <option value="agriculture">
            {t("agriculture")}
          </option>

        </select>

        {/* PRICE */}

        <select
          value={priceRange}
          onChange={(e) =>
            setPriceRange(e.target.value)
          }
        >

          <option value="">
          {t("priceRange")}
          </option>

          <option value="low">
           {t("flags.LOW")}
          </option>

          <option value="medium">
            {t("sizes.MEDIUM")}
          </option>

          <option value="high">
            {t("flags.HIGH")}
          </option>

        </select>

        {/* AREA */}

        <select
          value={areaRange}
          onChange={(e) =>
            setAreaRange(e.target.value)
          }
        >
          <option value="">
            {t("areaRange")}
          </option>

          <option value="small">
             {t("sizes.SMALL")}
          </option>

          <option value="medium">
             {t("sizes.MEDIUM")}
          </option>

          <option value="large">
             {t("sizes.LARGE")}
          </option>

        </select>

        {/* DISTRICT */}

        <input
          type="text"
          placeholder={t("districtKeyword")}
          value={district}
          onChange={(e) =>
            setDistrict(e.target.value)
          }
        />

      </div>

      {/* ======================================= */}
      {/* LAYOUT */}
      {/* ======================================= */}
{/* 
      <div className="map-layout"> */}
      <div
  className="map-layout"
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "flex-start"
  }}
>

        {/* ======================================= */}
        {/* MAP */}
        {/* ======================================= */}

        {/* <div className="map-container"> */}

        <div
  className="map-container"
  style={{
    width: showForm ? "75%" : "100%"
  }}
>

          <MapContainer
            center={[16.5062, 80.648]}
            zoom={12}
            style={{
              height: "80vh",
              width: "100%",
              borderRadius: "12px"
            }}
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* CLICK EVENT */}

            <MapClickHandler
              setSelectedPosition={
                setSelectedPosition
              }
              setShowForm={setShowForm}
            />

            {/* HEATMAP */}

            {/* {heatmap && ( */}

              {/* HEATMAP LEGEND */}

{heatmap && (
  <div
    style={{
      position: "absolute",
      bottom: "20px",
      right: "20px",
      background: "white",
      padding: "12px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      zIndex: 1000,
      width: "200px"
    }}
  >
    <h4 style={{ marginBottom: "10px" }}>
     {t("heatmapGuide")}
    </h4>

    <p>
      {t("lowPrice")}
    </p>

    <p>
      {t("mediumPrice")}
    </p>

    <p>
      {t("expensivePrice")}
    </p>

<p>
    {t("normalPrice")}
    </p>
  </div>
)}
              {heatmap && ( <div>
                <HeatmapLayer
                data={filteredData}
              />
              </div>
            )}



{/* HEATMAP LEGEND */}



            {/* ======================================= */}
            {/* MARKERS */}
            {/* ======================================= */}

            {!heatmap &&

              filteredData.map((land,index) => {
// DEBUG
    console.log("MARKER LAND:", land);

                if (
      land.lat === null ||
      land.lng === null ||
      land.lat === "" ||
      land.lng === "" ||
      isNaN(Number(land.lat)) ||
      isNaN(Number(land.lng))
    ) {
      return null;
    }

                 if (land.status !== "approved")
      return null;

          
   

                return (

                  <Marker
                    key={land.id || index}
                    // position={[
                    //   land.lat,
                    //   land.lng
                    // ]}
                    position={[
  Number(land.lat),
  Number(land.lng)
]}
                    icon={getMarkerIcon(
                      land.flag
                    )}
                  >

                    <Popup>

                      <div
                        style={{
                          minWidth: "220px"
                        }}
                      >

                        <h3>
                          {land.location}
                        </h3>

                        <hr />

                        <p>
                          <strong>
                            📍{t("landType")}:
                          </strong>
                          {" "}
                          {t(land.type)}
                        </p>

                        <p>
                          <strong>
                            💰 {t("price")}:
                          </strong>
                          {" "}
                          ₹ {land.price}
                        </p>

                        <p>
                          <strong>
                            📐 {t("area")}:
                          </strong>
                          {" "}
                          {land.area} 
                        </p>

                       

                        <p>
                          <strong>
                            📅 {t("date")}:
                          </strong>
                          {" "}
                          {land.date}
                        </p>

                        <p>
                          <strong>
                           {t("status")}:
                          </strong>
                          {" "}
                          {t(land.status)}
                        </p>

                        {/* FLAGS */}

                        {land.flag === "high" && (
                          <p
                            style={{
                              color: "red",
                              fontWeight: "bold"
                            }}
                          >
                            🔴 Overpriced Land
                          </p>
                        )}

                        {land.flag === "low" && (
                          <p
                            style={{
                              color: "yellow",
                              fontWeight: "bold"
                            }}
                          >
                            🔵 Undervalued Land
                          </p>
                        )}

                        {land.flag === "normal" && (
                          <p
                            style={{
                              color: "green",
                              fontWeight: "bold"
                            }}
                          >
                            🟢 Normal Price
                          </p>
                        )}

                      </div>

                    </Popup>

                  </Marker>
                );
              })
            }

          </MapContainer>

        </div>

        {/* ======================================= */}
        {/* SUBMIT PANEL */}
        {/* ======================================= */}

         {showForm &&
          selectedPosition && (

          // <div className="submit-panel">
          <div
  className="submit-panel"
  // style={{
  //   width: "320px",
  //   background: "white",
  //   padding: "20px",
  //   borderRadius: "12px",
  //   boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  // }}
>

<div className="submit-header">

  <h3 className="submit-title">
    {t("submit")}
  </h3>

  <button
    className="close-btn"
    onClick={() => setShowForm(false)}
  >
    ✕
  </button>

</div>

            
 <p className="submit-subtitle">
      {t("submitLandTitle")}
    </p>

            <p>
              📍 {t("latitude")}:
              {" "}
              {selectedPosition.lat.toFixed(5)}
            </p>

            <p>
              📍 {t("longitude")}:
              {" "}
              {selectedPosition.lng.toFixed(5)}
            </p>

            {/* LOCATION */}
<div className="form-group">
   <label>{t("location")}</label>
            <input
              type="text"
               placeholder={t("location")}

              value={form.location}

              onChange={(e) =>
                setForm({
                  ...form,
                  location:
                    e.target.value
                })
              }
            />
</div>
            {/* PRICE */}
 <div className="form-group">

      <label>{t("price")} (₹)</label>
            <input
              type="number"
              placeholder={t("price")} 

              value={form.price}

              onChange={(e) =>
                setForm({
                  ...form,
                  price:
                    e.target.value
                })
              }
            />
</div>
            {/* AREA */}
 <div className="form-group">

      <label>{t("area")} </label>
            <input
              type="number"
              placeholder={t("area")}

              value={form.area}

              onChange={(e) =>
                setForm({
                  ...form,
                  area:
                    e.target.value
                })
              }
            />
</div>
            {/* LAND TYPE */}
 <div className="row-fields">

      {/* LAND TYPE */}
      <div className="form-group">

        <label>{t("landType")}</label>
            <select
              value={form.type}

              // value={form.land_type}

              onChange={(e) =>
                setForm({
                  ...form,
                  type:
                    e.target.value
                })
              }
            >

              <option value="residential">
                {t("residential")}
              </option>

              <option value="commercial">
                {t("commercial")}
              </option>

              <option value="agriculture">
                {t("agriculture")}
              </option>

            </select>
  </div>

            {/* CURRENCY */}
  <div className="form-group">

        <label> {t("currency")}</label>

            <select
              value={form.currency}

              onChange={(e) =>
                setForm({
                  ...form,
                  currency:
                    e.target.value
                })
              }
            >

              <option value="INR">
              {t("currencies.INR")}
              </option>

              <option value="USD">
               {t("currencies.USD")}
              </option>

            </select>
</div>
</div>
            {/* DATE */}
  <div className="form-group">

      <label> {t("submissionDate")}</label>

            <input
              type="date"

              value={form.date}

              onChange={(e) =>
                setForm({
                  ...form,
                  date:
                    e.target.value
                })
              }
            />
</div>
            {/* BUTTON */}

            <button   className="submit-btn"
              onClick={submitLand}
            >
              {t("submitButton")}
            </button>
 <div className="info-box">
      {t("reviewMsg")}
    </div>
          </div>
        )} 

      </div>
    </div>
  );
}