import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, SlidersHorizontal, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MapView } from "@/components/MapView";
import { CategoryChip, StatusBadge } from "@/components/badges";
import { Button } from "@/components/ui/button";
import { categories, occurrences, type CategoryId } from "@/lib/mock-data";
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
    <AppShell title="Mapa" showBell showBrand>
      <div className="space-y-4">
        <div className="relative h-64 overflow-hidden rounded-2xl border shadow-sm">
          <MapView items={filtered} />
        </div>

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

        <Button asChild size="lg" className="w-full gap-2">
          <Link to="/registrar">
            <Plus className="h-5 w-5" /> Registrar ocorrência
          </Link>
        </Button>

        <div>
          <h2 className="mb-2 flex items-center gap-1.5 font-display text-base font-bold">
            <MapPin className="h-4 w-4 text-primary" /> Ocorrências próximas
          </h2>
          <div className="space-y-2.5">
            {nearby.map((o) => (
              <Link
                key={o.id}
                to="/ocorrencia/$id"
                params={{ id: o.id }}
                className="block rounded-xl border bg-card p-3 shadow-sm transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 flex-1 truncate font-semibold">{o.title}</p>
                  <StatusBadge status={o.status} />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <CategoryChip category={o.category} />
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {o.neighborhood} · {o.distanceKm} km
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
