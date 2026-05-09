
// src/pages/SubmitPage.jsx

// import { useEffect, useState } from "react";

// export default function SubmitPage() {

//   // ======================================
// // STYLES
// // ======================================

// const styles = {

//   page: {

//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",

//     padding: "20px",

//     background: "#f4f7fb",

//     minHeight: "100vh"

//   },

//   card: {

//     width: "420px",

//     maxHeight: "90vh",

//     overflowY: "auto",

//     background: "#ffffff",

//     borderRadius: "18px",

//     padding: "24px",

//     boxShadow:
//       "0 10px 30px rgba(0,0,0,0.08)"

//   },

//   header: {

//     marginBottom: "20px"

//   },

//   heading: {

//     margin: 0,

//     fontSize: "24px",

//     color: "#1e293b"

//   },

//   subHeading: {

//     marginTop: "8px",

//     color: "#64748b",

//     fontSize: "14px",

//     lineHeight: "20px"

//   },

//   form: {

//     display: "flex",

//     flexDirection: "column",

//     gap: "16px"

//   },

//   field: {

//     display: "flex",

//     flexDirection: "column"

//   },

//   label: {

//     fontSize: "14px",

//     fontWeight: "600",

//     marginBottom: "6px",

//     color: "#334155"

//   },

//   input: {

//     padding: "12px",

//     border: "1px solid #dbe2ea",

//     borderRadius: "10px",

//     fontSize: "14px",

//     outline: "none"

//   },

//   select: {

//     padding: "12px",

//     border: "1px solid #dbe2ea",

//     borderRadius: "10px",

//     fontSize: "14px",

//     background: "#fff",

//     outline: "none"

//   },

//   readonly: {

//     padding: "12px",

//     border: "1px solid #dbe2ea",

//     borderRadius: "10px",

//     background: "#f1f5f9",

//     fontSize: "14px"

//   },

//   infoBox: {

//     background: "#eff6ff",

//     border: "1px solid #bfdbfe",

//     borderRadius: "12px",

//     padding: "12px"

//   },

//   infoText: {

//     margin: "4px 0",

//     fontSize: "13px",

//     color: "#1d4ed8"

//   },

//   button: {

//     marginTop: "10px",

//     background: "#2563eb",

//     color: "#fff",

//     border: "none",

//     padding: "14px",

//     borderRadius: "12px",

//     fontSize: "15px",

//     fontWeight: "600",

//     cursor: "pointer",

//     transition: "0.3s"

//   }

// };

//   const [form, setForm] = useState({

//     location: "",
//     price: "",
//     area: "",
//     land_type: "residential",
//     currency: "INR",
//     date: "",
//     lat: "",
//     lng: ""

//   });

//   // ======================================
//   // AUTO LOCATION
//   // ======================================

//   useEffect(() => {

//     navigator.geolocation.getCurrentPosition(

//       (pos) => {

//         setForm((prev) => ({

//           ...prev,

//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude

//         }));
//       },

//       () => {

//         console.log("Location permission denied");

//       }

//     );

//   }, []);

//   // ======================================
//   // HANDLE CHANGE
//   // ======================================

//   const handleChange = (e) => {

//     setForm({

//       ...form,
//       [e.target.name]: e.target.value

//     });

//   };

//   // ======================================
//   // SUBMIT LAND
//   // ======================================

//   const submitLand = async (e) => {

//     e.preventDefault();

//     try {

//       const payload = {

//         location: form.location,

//         price: Number(form.price),

//         area: Number(form.area),

//         land_type: form.land_type,

//         currency: form.currency,

//         date: form.date,

//         lat: Number(form.lat),

//         lng: Number(form.lng)

//       };

//       console.log("SUBMIT DATA:", payload);

//       const res = await fetch(
//         "http://localhost:8000/submit",
//         {

//           method: "POST",

//           headers: {
//             "Content-Type": "application/json"
//           },

//           body: JSON.stringify(payload)

//         }
//       );

//       const data = await res.json();

//       alert(
//         "Land submitted successfully. Waiting for moderator approval."
//       );

//       // RESET FORM

//       setForm({

//         location: "",
//         price: "",
//         area: "",
//         land_type: "residential",
//         currency: "INR",
//         date: "",
//         lat: form.lat,
//         lng: form.lng

//       });

//     } catch (err) {

//       console.log(err);

//       alert("Submission failed");

//     }

//   };

//   // ======================================
//   // UI
//   // ======================================

//   return (

//     <div style={styles.page}>

//       <div style={styles.card}>

//         {/* HEADER */}

//         <div style={styles.header}>

//           <h2 style={styles.heading}>
//             🌍 Submit Land Details
//           </h2>

//           <p style={styles.subHeading}>
//             Submit property pricing information for
//             moderation and map visualization
//           </p>

//         </div>

//         {/* FORM */}

//         <form
//           onSubmit={submitLand}
//           style={styles.form}
//         >

//           {/* LOCATION */}

//           <div style={styles.field}>

//             <label style={styles.label}>
//               Location
//             </label>

//             <input
//               type="text"
//               name="location"
//               placeholder="Enter location"
//               value={form.location}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />

//           </div>

//           {/* PRICE */}

//           <div style={styles.field}>

//             <label style={styles.label}>
//               Price
//             </label>

//             <input
//               type="number"
//               name="price"
//               placeholder="Enter price"
//               value={form.price}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />

//           </div>

//           {/* AREA */}

//           <div style={styles.field}>

//             <label style={styles.label}>
//               Area (sqyd)
//             </label>

//             <input
//               type="number"
//               name="area"
//               placeholder="Enter area"
//               value={form.area}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />

//           </div>

//           {/* LAND TYPE */}

//           <div style={styles.field}>

//             <label style={styles.label}>
//               Land Type
//             </label>

//             <select
//               name="land_type"
//               value={form.land_type}
//               onChange={handleChange}
//               style={styles.select}
//             >

//               <option value="residential">
//                 Residential
//               </option>

//               <option value="commercial">
//                 Commercial
//               </option>

//               <option value="agriculture">
//                 Agriculture
//               </option>

//             </select>

//           </div>

//           {/* CURRENCY */}

//           <div style={styles.field}>

//             <label style={styles.label}>
//               Currency
//             </label>

//             <select
//               name="currency"
//               value={form.currency}
//               onChange={handleChange}
//               style={styles.select}
//             >

//               <option value="INR">
//                 INR
//               </option>

//               <option value="USD">
//                 USD
//               </option>

//             </select>

//           </div>

//           {/* DATE */}

//           <div style={styles.field}>

//             <label style={styles.label}>
//               Submission Date
//             </label>

//             <input
//               type="date"
//               name="date"
//               value={form.date}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />

//           </div>

//           {/* LATITUDE */}

//           <div style={styles.field}>

//             <label style={styles.label}>
//               Latitude
//             </label>

//             <input
//               type="number"
//               name="lat"
//               value={form.lat}
//               readOnly
//               style={styles.readonly}
//             />

//           </div>

//           {/* LONGITUDE */}

//           <div style={styles.field}>

//             <label style={styles.label}>
//               Longitude
//             </label>

//             <input
//               type="number"
//               name="lng"
//               value={form.lng}
//               readOnly
//               style={styles.readonly}
//             />

//           </div>

//           {/* INFO */}

//           <div style={styles.infoBox}>

//             <p style={styles.infoText}>
//               ✅ Submitted lands go to moderator approval
//             </p>

//             <p style={styles.infoText}>
//               ✅ Approved lands appear on map markers
//             </p>

//             <p style={styles.infoText}>
//               ✅ Heatmap colors depend on land prices
//             </p>

//           </div>

//           {/* BUTTON */}

//           <button
//             type="submit"
//             style={styles.button}
//           >
//             Submit Land
//           </button>

//         </form>

//       </div>

//     </div>

//   );

// }






// src/SubmitPage.js

// import { useEffect, useState } from "react";

// export default function SubmitPage() {
 

//   const [form, setForm] = useState({
//   location: "",
//   price: "",
//   area: "",
//   land_type: "residential",
//   lat: 0,
//   lng: 0,
//   date: "",
//   currency: "INR"
// });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       setForm((prev) => ({
//         ...prev,
//         lat: pos.coords.latitude,
//         lng: pos.coords.longitude
//       }));
//     });
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });


// const submit = async (e) => {
//   e.preventDefault();

//   const payload = {
//     location: form.location,
//     price: Number(form.price),
//     area: Number(form.area),
//     land_type: form.land_type,
//     lat: Number(form.lat),
//     lng: Number(form.lng),
//     date: form.date,
//     currency: form.currency || "INR"
//   };

//   console.log(payload);

//   const res = await fetch("http://localhost:8000/submit", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(payload)
//   });

//   const data = await res.json();

//   console.log(data);

//   alert(data.message || data.error);
// };


//   return (
//     <div className="card">
//       <h2>Submit Land</h2>

//       <form className="form" onSubmit={submit}>
//         <input
//           name="location"
//           placeholder="Location"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="price"
//           type="number"
//           placeholder="Price"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="area"
//           type="number"
//           placeholder="Area"
//           onChange={handleChange}
//           required
//         />

//         <select name="land_type" onChange={handleChange}>
//           <option value="residential">Residential</option>
//           <option value="commercial">Commercial</option>
//           <option value="agriculture">Agriculture</option>
//         </select>

//         <input
//           type="date"
//           name="date"
//           onChange={handleChange}
//         />

//         <p>Lat: {form.lat}</p>
//         <p>Lng: {form.lng}</p>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }



//
//
//
//11
//
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export default function SubmitPage() {

    const { t } = useTranslation();

  const styles = {

  page: {

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "20px",

    background: "#f4f7fb",

    minHeight: "100vh"

  },

  card: {

    // width: "420px",

    width: "500px",

    maxHeight: "90vh",

    overflowY: "auto",

    background: "#ffffff",

    borderRadius: "18px",

    padding: "24px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)"

  },

  header: {

    marginBottom: "20px"

  },

  heading: {

    margin: 0,

    fontSize: "24px",

    color: "#1e293b"

  },

  subHeading: {

    marginTop: "8px",

    color: "#64748b",

    fontSize: "14px",

    lineHeight: "20px"

  },

  form: {

    display: "flex",

    flexDirection: "column",

    gap: "16px"

  },

  field: {

    display: "flex",

    flexDirection: "column"

  },

  label: {

    fontSize: "14px",

    fontWeight: "600",

    marginBottom: "6px",

    color: "#334155"

  },

  input: {

    padding: "12px",

    border: "1px solid #dbe2ea",

    borderRadius: "10px",

    fontSize: "14px",

    outline: "none"

  },

  select: {

    padding: "12px",

    border: "1px solid #dbe2ea",

    borderRadius: "10px",

    fontSize: "14px",

    background: "#fff",

    outline: "none"

  },

  readonly: {

    padding: "12px",

    border: "1px solid #dbe2ea",

    borderRadius: "10px",

    background: "#f1f5f9",

    fontSize: "14px"

  },

  infoBox: {

    background: "#eff6ff",

    border: "1px solid #bfdbfe",

    borderRadius: "12px",

    padding: "12px"

  },

  infoText: {

    margin: "4px 0",

    fontSize: "13px",

    color: "#1d4ed8"

  },

  button: {

    marginTop: "10px",

    background: "#2563eb",

    color: "#fff",

    border: "none",

    padding: "14px",

    borderRadius: "12px",

    fontSize: "15px",

    fontWeight: "600",

    cursor: "pointer",

    transition: "0.3s"

  }

};

  const [form, setForm] = useState({

    location: "",

    price: "",

    area: "",

    // land_type: "residential",
     type: "residential",

    currency: "INR",

    date: "",

    lat: "",

    lng: ""

  });

  // ======================================
  // AUTO GET USER LOCATION
  // ======================================

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        setForm((prev) => ({

          ...prev,

          lat: pos.coords.latitude,

          lng: pos.coords.longitude

        }));
      },

      () => {

        console.log(
          "Location permission denied"
        );
      }

    );

  }, []);

  // ======================================
  // HANDLE INPUT
  // ======================================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });
  };

  // ======================================
  // SUBMIT
  // ======================================

  const submitLand = async (e) => {

    e.preventDefault();

    try {

      // const payload = {

      //   location: form.location,

      //   price: Number(form.price),

      //   area: Number(form.area),

      //   land_type: form.land_type,

      //   currency: form.currency,

      //   date: form.date,

      //   lat: Number(form.lat),

      //   lng: Number(form.lng)

      // };
      const payload = {
  location: form.location,
  price: Number(form.price),
  area: Number(form.area),
  type: form.type,
  currency: form.currency,
  date: form.date,

  lat: parseFloat(form.lat),
  lng: parseFloat(form.lng)
};

      console.log("SUBMIT PAYLOAD:", payload);

      const res = await fetch(
        "https://land-intelligence-platform-production.up.railway.app/submit",
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

      // RESET FORM

      setForm({

        location: "",

        price: "",

        area: "",

        // land_type: "residential",
          type: "residential",

        currency: "INR",

        date: "",

        lat: form.lat,

        lng: form.lng
      });

    } catch (err) {

      console.log(err);

      alert("Submission failed");
    }
  };

  // ======================================
  // UI
  // ======================================

  return (

    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     marginTop: "30px"
    //   }}
    // >

    //   <div
    //     className="submit-card"
    //     style={{
    //       width: "350px",
    //       background: "white",
    //       padding: "25px",
    //       borderRadius: "14px",
    //       boxShadow:
    //         "0 4px 15px rgba(0,0,0,0.08)"
    //     }}
    //   >

    //     <h2
    //       style={{
    //         marginBottom: "20px"
    //       }}
    //     >
    //       Submit Land
    //     </h2>



<div style={styles.page}>

    <div style={styles.card}>

         {/* HEADER */}
        <div style={styles.header}>

         {/* <h2 style={styles.heading}>
             🌍 Submit Land Details
          </h2> */}

           <h2 style={styles.heading}>
             🌍 {t("submitLandTitle")}
          </h2>

          <p style={styles.subHeading}>
           {t("submitLandDesc")}
           </p>

       </div>


        <form
          onSubmit={submitLand}
          style={styles.form}
        >
<div style={styles.field}>


            <label style={styles.label}>
              {t("location")}
             </label>

          {/* LOCATION */}

          <input
            type="text"
            name="location"
            placeholder={t("location")}
            value={form.location}
            onChange={handleChange}
            required
             style={styles.input}

          />
</div>
          {/* PRICE */}
 <div style={styles.field}>


           <label style={styles.label}>
           {t("price")}
            </label>

          <input
            type="number"
            name="price"
            placeholder={t("price")}
             style={styles.input}
            value={form.price}
            onChange={handleChange}
            required
          />
</div>
          {/* AREA */}

<div style={styles.field}>


           <label style={styles.label}>
           {t("area")}           </label>

          <input
            type="number"
            name="area"
           style={styles.select}

            placeholder={t("area")}
            value={form.area}
            onChange={handleChange}
            required
          />
</div>
          {/* TYPE */}
 <div style={styles.field}>


           <label style={styles.label}>
            {t("landType")}
            </label>

          <select
          style={styles.select}
            name="type"
            value={form.type}
            onChange={handleChange}
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
 <div style={styles.field}>


            <label style={styles.label}>
             {t("currency")}
          </label>

          <select
            name="currency"
             style={styles.select}
            value={form.currency}
            onChange={handleChange}
          >

            <option value="INR">
              {t("currencies.INR")}
            </option>

            <option value="USD">
            {t("currencies.USD")}
            </option>

          </select>
</div>
          {/* DATE */}
 <div style={styles.field}>


            <label style={styles.label}>
             {t("submissionDate")}
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
             style={styles.input}

            onChange={handleChange}
            required
          />
          </div>

          {/* LAT */}
 <div style={styles.field}>


             <label style={styles.label}>
            {t("latitude")}
            </label>

          <input
            type="number"
            name="lat"
         
             style={styles.readonly}
            placeholder= {t("latitude")}
            value={form.lat}
               readOnly
          />
          </div>

          {/* LNG */}
<div style={styles.field}>


             <label style={styles.label}>
             {t("longitude")}
            </label>
          <input
            type="number"
            name="lng"
             style={styles.readonly}
            placeholder= {t("longitude")}
            value={form.lng}
            readOnly
          />
</div>

 <div style={styles.infoBox}>


            <p style={styles.infoText}>
              ✅ {t("submittedNote")}
          </p>


             <p style={styles.infoText}>
               ✅ {t("approvedNote")}
            </p>
</div>
          {/* BUTTON */}

          <button
            type="submit"
            style={styles.button}
          >
            {t("submitButton")}
          </button>

        </form>

      </div>

    </div>
  );
}
