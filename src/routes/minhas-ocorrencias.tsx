import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ImageIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { CategoryChip, StatusBadge } from "@/components/badges";
import { Button } from "@/components/ui/button";
import { myOccurrences } from "@/lib/mock-data";

export const Route = createFileRoute("/minhas-ocorrencias")({
  head: () => ({
    meta: [{ title: "Minhas ocorrências — EcoJampa" }],
  }),
  component: () => (
    <AuthGate title="Minhas Ocorrências">
      <MyOccurrencesPage />
    </AuthGate>
  ),
});

function MyOccurrencesPage() {
  return (
    <AppShell title="Minhas Ocorrências" showBell>
      <div className="space-y-3">
        {myOccurrences.map((o) => (
          <Link
            key={o.id}
            to="/ocorrencia/$id"
            params={{ id: o.id }}
            className="block overflow-hidden rounded-2xl border bg-card shadow-sm transition-colors hover:bg-muted/40"
          >
            <div className="grid h-32 w-full place-items-center overflow-hidden bg-muted text-muted-foreground">
              {o.image ? (
                <img src={o.image} alt={o.title} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
              ) : (
                <ImageIcon className="h-8 w-8" />
              )}
            </div>

            <div className="space-y-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 flex-1 truncate font-semibold">{o.title}</p>
                <StatusBadge status={o.status} />
              </div>
              <div className="flex items-center justify-between gap-2">
                <CategoryChip category={o.category} />
                <span className="text-xs text-muted-foreground">
                  {new Date(o.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </Link>
        ))}

        <Button asChild size="lg" className="w-full gap-2">
          <Link to="/registrar">
            <Plus className="h-5 w-5" /> Nova ocorrência
          </Link>
        </Button>
      </div>
    </AppShell>
  );
}
