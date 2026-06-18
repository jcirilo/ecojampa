import { getCategory, statusLabels, type CategoryId, type OccurrenceStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const catStyles: Record<string, string> = {
  "status-lighting": "bg-status-lighting/15 text-foreground",
  "status-waste": "bg-status-waste/15 text-status-waste",
  "status-vandalism": "bg-status-vandalism/15 text-status-vandalism",
};

export function CategoryChip({ category }: { category: CategoryId }) {
  const cat = getCategory(category);
  const Icon = cat.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        catStyles[cat.color] ?? "bg-muted text-muted-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {cat.label}
    </span>
  );
}

const statusStyles: Record<OccurrenceStatus, string> = {
  aberta: "bg-destructive/15 text-destructive",
  em_analise: "bg-gold/20 text-gold-foreground",
  resolvida: "bg-primary/15 text-primary",
};

export function StatusBadge({ status }: { status: OccurrenceStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
