import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SlidersHorizontal, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MapView } from "@/components/MapView";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { RegisterFab } from "@/components/RegisterFab";
import { occurrences, categories, type CategoryId } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de ocorrências — EcoJampa" },
      { name: "description", content: "Veja irregularidades urbanas próximas a você no mapa colaborativo de João Pessoa." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [active, setActive] = useState<CategoryId | "todas">("todas");
  const filtered = active === "todas" ? occurrences : occurrences.filter((o) => o.category === active);
  const nearby = [...filtered].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <AppShell title="Mapa" showBell showHelp flush>
      <div className="relative">
        <div className="h-64 overflow-hidden border-b sm:h-72">
          <MapView items={filtered} />
        </div>

        <div className="space-y-4 px-4 py-4 pb-24">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <FilterPill label="Todas" active={active === "todas"} onClick={() => setActive("todas")} />
            {categories.map((c) => (
              <FilterPill
                key={c.id}
                label={c.label}
                active={active === c.id}
                onClick={() => setActive(c.id)}
              />
            ))}
            <span className="ml-auto flex shrink-0 items-center gap-1.5 self-center text-xs text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filtrar
            </span>
          </div>

          <div>
            <h2 className="mb-2 flex items-center gap-1.5 font-display text-base font-bold">
              <MapPin className="h-4 w-4 text-primary" /> Ocorrências próximas
            </h2>
            <div className="space-y-2.5">
              {nearby.map((o) => (
                <OccurrenceCard key={o.id} occurrence={o} />
              ))}
            </div>
          </div>
        </div>

        <RegisterFab />

      </div>
    </AppShell>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:bg-muted",
      )}
    >
      {label}
    </button>
  );
}
