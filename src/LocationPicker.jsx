import { useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";

export default function LocationPicker({ onPick }) {
  const [pos, setPos] = useState(null);

  useMapEvents({
    click(e) {
      setPos(e.latlng);
      onPick(e.latlng);
    }
  });

  return pos ? <Marker position={pos} /> : null;
}
