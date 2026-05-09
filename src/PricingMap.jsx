import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function PricingMap({ data }) {
  const approved = data.filter(x => x.status === "approved");

  return (
    <div style={{ height: 500 }}>
      <MapContainer center={[16.5, 80.6]} zoom={10} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {approved.map(p => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <b>{p.location}</b><br/>
              {p.price} — {p.area}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
