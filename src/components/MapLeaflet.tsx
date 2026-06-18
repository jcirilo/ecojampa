import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { useNavigate } from "@tanstack/react-router";
import { JP_CENTER, getCategory, type Occurrence } from "@/lib/mock-data";

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const statusColorVar: Record<string, string> = {
  "status-lighting": "var(--status-lighting)",
  "status-waste": "var(--status-waste)",
  "status-vandalism": "var(--status-vandalism)",
  primary: "var(--primary)",
};

export default function MapLeaflet({ items }: { items: Occurrence[] }) {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={JP_CENTER}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full"
      style={{ background: "var(--muted)" }}
    >
      <Recenter center={JP_CENTER} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((o) => {
        const cat = getCategory(o.category);
        const color = statusColorVar[cat.color] ?? "var(--primary)";
        return (
          <CircleMarker
            key={o.id}
            center={[o.lat, o.lng]}
            radius={10}
            pathOptions={{
              color: "white",
              weight: 2,
              fillColor: color,
              fillOpacity: o.status === "resolvida" ? 0.45 : 0.95,
            }}
            eventHandlers={{ click: () => navigate({ to: "/ocorrencia/$id", params: { id: o.id } }) }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              <span className="font-medium">{o.title}</span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
