import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { badges, getRankingEntry } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/usuario/$id")({
  head: () => ({
    meta: [{ title: "Perfil — EcoJampa" }],
  }),
  component: RankingProfilePage,
  notFoundComponent: () => (
    <AppShell title="Perfil" showBack showNav={false}>
      <p className="py-16 text-center text-muted-foreground">Perfil não encontrado.</p>
    </AppShell>
  ),
});

function RankingProfilePage() {
  const { id } = Route.useParams();
  const entry = getRankingEntry(id);

  if (!entry) {
    return (
      <AppShell title="Perfil" showBack showNav={false}>
        <p className="py-16 text-center text-muted-foreground">Perfil não encontrado.</p>
      </AppShell>
    );
  }

  return (
    <AppShell title="Perfil" showBack showNav={false}>
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={entry.avatar}
            alt={entry.name}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/20"
          />
          <h2 className="mt-3 font-display text-xl font-bold">{entry.name}</h2>
          <p className="text-sm text-muted-foreground">{entry.neighborhood} · João Pessoa</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-sm font-semibold text-gold-foreground">
            <Trophy className="h-4 w-4 text-gold" /> {entry.position}º lugar · {entry.xp} XP
          </span>
        </div>

        <div className="grid grid-cols-3 overflow-hidden rounded-2xl bg-primary text-primary-foreground">
          <Stat value={entry.occurrencesCount} label="Ocorrências" />
          <Stat value={`${entry.position}º`} label="No bairro" border />
          <Stat value={entry.auditedCount} label="Auditadas" />
        </div>

        <div>
          <h3 className="mb-3 font-display text-base font-bold">Emblemas</h3>
          <div className="grid grid-cols-5 gap-2">
            {badges.map((b) => {
              const Icon = b.icon;
              const earned = entry.earnedBadges.includes(b.id);
              return (
                <div key={b.id} className="flex flex-col items-center gap-1.5 text-center">
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-xl",
                      earned ? "bg-gold/20 text-gold-foreground" : "bg-muted text-muted-foreground/40",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[0.6rem] leading-tight text-muted-foreground">{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ value, label, border }: { value: string | number; label: string; border?: boolean }) {
  return (
    <div className={cn("px-2 py-4 text-center", border && "border-x border-primary-foreground/20")}>
      <p className="font-display text-2xl font-extrabold">{value}</p>
      <p className="text-[0.65rem] opacity-90">{label}</p>
    </div>
  );
}
