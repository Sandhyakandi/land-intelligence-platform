import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

export default function HeatLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    const heat = L.heatLayer(
      data.map(d => [d[5], d[6], d[2] / 100000]),
      { radius: 25 }
    ).addTo(map);

    return () => map.removeLayer(heat);
  }, [data]);

  return null;
}