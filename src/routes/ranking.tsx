import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ranking } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [{ title: "Ranking do bairro — EcoJampa" }],
  }),
  component: RankingPage,
});

const medal = ["text-gold", "text-muted-foreground", "text-status-waste"];

function RankingPage() {
  return (
    <AppShell title="Ranking" showBack showNav={false}>
      <div className="mb-4 flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-primary-foreground">
        <Trophy className="h-5 w-5 text-gold" />
        <span className="font-display font-bold">Ranking — Tambaú</span>
      </div>

      <ul className="space-y-2">
        {ranking.map((r) => (
          <li key={r.position}>
            <Link
              to="/usuario/$id"
              params={{ id: r.id }}
              className={cn(
                "flex items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:bg-muted/50",
                r.isCurrentUser && "border-primary bg-primary/5",
              )}
            >
              <span
                className={cn(
                  "w-6 text-center font-display text-lg font-extrabold",
                  r.position <= 3 ? medal[r.position - 1] : "text-muted-foreground",
                )}
              >
                {r.position}
              </span>
              <img
                src={r.avatar}
                alt={r.name}
                loading="lazy"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
              <span className={cn("min-w-0 flex-1 truncate font-medium", r.isCurrentUser && "text-primary")}>
                {r.name}
              </span>
              <span className="shrink-0 font-semibold text-muted-foreground">{r.xp} XP</span>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
