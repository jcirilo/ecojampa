import { Link } from "@tanstack/react-router";
import { ImageIcon, MapPin } from "lucide-react";
import { CategoryChip, StatusBadge } from "@/components/badges";
import type { Occurrence } from "@/lib/mock-data";

/**
 * Shared card used by both /mapa and /minhas-ocorrencias so the layout
 * stays consistent across screens.
 */
export function OccurrenceCard({ occurrence: o }: { occurrence: Occurrence }) {
  return (
    <Link
      to="/ocorrencia/$id"
      params={{ id: o.id }}
      className="flex gap-3 rounded-xl border bg-card p-3 shadow-sm transition-colors hover:bg-muted/50"
    >
      <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
        {o.image ? (
          <img
            src={o.image}
            alt={o.title}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImageIcon className="h-6 w-6" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 flex-1 truncate font-semibold">{o.title}</p>
          <StatusBadge status={o.status} />
        </div>
        <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {o.neighborhood} · {o.address}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <CategoryChip category={o.category} />
          <span className="shrink-0 text-xs text-muted-foreground">
            {typeof o.distanceKm === "number" ? `${o.distanceKm} km` : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
