import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function ModerationPage() {

   const { t } = useTranslation();
  const [data, setData] = useState([]);
  
  // LOAD PENDING DATA
  const loadData = async () => {

    try {

      const res = await fetch("https://land-intelligence-platform-production.up.railway.app/pending");

      const json = await res.json();

      console.log("Pending Data:", json);

      setData(json);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // APPROVE
  const approveLand = async (id) => {

    await fetch(`https://land-intelligence-platform-production.up.railway.app/approve/${id}`, {
      method: "POST"
    });

   alert(t("approvedSuccess"));

    loadData();
  };

  // REJECT
  const rejectLand = async (id) => {

    await fetch(`https://land-intelligence-platform-production.up.railway.app/reject/${id}`, {
      method: "POST"
    });

   alert(t("rejectedSuccess"));

    loadData();
  };
return (
  <div className="moderation-page">

    <h2>{t("moderation")}</h2>
  <div className="moderation-table-wrapper">
    <table className="moderation-table">

      <thead>
        <tr>
          <th>{t("location")}</th>
          <th>{t("price")}</th>
          <th>{t("area")}</th>
          <th>{t("landType")}</th>
          <th>{t("flag")}</th>
          <th>{t("actions")}</th>
        </tr>
      </thead>

      <tbody>

        {data.map((d, index) => (

          <tr key={d.id || index}>

            <td>{d.location}</td>
           
            <td>₹ {d.price}</td>

            <td>{d.area}</td>
{/* 
            <td>{d.type}</td>

            <td>{d.flag}</td> */}
 <td>
        {t(`landTypes.${d.type.toUpperCase()}`)}
      </td>

      <td>
        {t(`flags.${d.flag.toUpperCase()}`)}
      </td>

            <td>

              <button
                className="approve-btn"
                onClick={() => approveLand(d.id)}
              >
                 {t("approve")}
              </button>

              <button
                className="reject-btn"
                onClick={() => rejectLand(d.id)}
              >
                {t("reject")}
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
</div>
  </div>
);
}