import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImageIcon, ThumbsUp, BadgeCheck, MapPin, CalendarDays } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CategoryChip, StatusBadge } from "@/components/badges";
import { Button } from "@/components/ui/button";
import { getOccurrence } from "@/lib/mock-data";
import { toast } from "sonner";


export const Route = createFileRoute("/ocorrencia/$id")({
  head: () => ({
    meta: [{ title: "Ocorrência — EcoJampa" }],
  }),
  component: OccurrencePage,
  notFoundComponent: () => (
    <AppShell title="Ocorrência" showBack showNav={false}>
      <p className="py-16 text-center text-muted-foreground">Ocorrência não encontrada.</p>
    </AppShell>
  ),
});

function OccurrencePage() {
  const { id } = Route.useParams();
  const occ = getOccurrence(id);
  const [confirmed, setConfirmed] = useState(false);
  const [resolved, setResolved] = useState(false);

  if (!occ) {
    return (
      <AppShell title="Ocorrência" showBack showNav={false}>
        <p className="py-16 text-center text-muted-foreground">Ocorrência não encontrada.</p>
      </AppShell>
    );
  }

  return (
    <AppShell title="Ocorrência" showBack showNav={false}>
      <div className="space-y-4">
        <div className="grid aspect-[16/7] w-full place-items-center overflow-hidden rounded-2xl bg-muted text-muted-foreground">
          {occ.image ? (
            <img src={occ.image} alt={occ.title} width={1024} height={1024} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-10 w-10" />
          )}
        </div>


        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-xl font-bold">{occ.title}</h2>
          <StatusBadge status={occ.status} />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <CategoryChip category={occ.category} />
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {occ.neighborhood}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {new Date(occ.createdAt).toLocaleDateString("pt-BR")}
          </span>
        </div>

        <div className="rounded-xl border bg-card p-4 text-sm">
          <p className="font-semibold">{occ.address}</p>
          <p className="mt-2 text-muted-foreground">{occ.description}</p>
        </div>

        <div className="rounded-xl border bg-card p-3 text-sm">
          <span className="font-semibold text-primary">{occ.confirmations + (confirmed ? 1 : 0)}</span>{" "}
          <span className="text-muted-foreground">moradores confirmaram esta ocorrência</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            className="gap-2"
            disabled={confirmed}
            onClick={() => {
              setConfirmed(true);
              toast.success("Presença confirmada!", { description: "Obrigado por validar esta ocorrência." });
            }}
          >
            <ThumbsUp className="h-5 w-5" />
            {confirmed ? "Confirmada" : "Confirmar que existe"}
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            disabled={resolved}
            onClick={() => {
              setResolved(true);
              toast.success("Marcada como resolvida!", { description: "Os órgãos responsáveis serão notificados." });
            }}
          >
            <BadgeCheck className="h-5 w-5" />
            {resolved ? "Sinalizada" : "Marcar resolvida"}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
