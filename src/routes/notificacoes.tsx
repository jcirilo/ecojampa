import { createFileRoute, Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { notifications, getOccurrence } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notificacoes")({
  head: () => ({
    meta: [{ title: "Notificações — EcoJampa" }],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <AppShell title="Notificações" showBack showNav={false}>
      <ul className="space-y-2.5">
        {notifications.map((n) => {
          const occ = n.occurrenceId ? getOccurrence(n.occurrenceId) : undefined;
          const inner = (
            <>
              <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
                {occ?.image ? (
                  <img src={occ.image} alt={occ.title} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <Award className="h-5 w-5 text-gold" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                {occ && (
                  <p className="truncate text-xs font-semibold text-primary">{occ.title}</p>
                )}
                <p className="text-sm leading-snug">{n.text}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.date}</p>
              </div>
              {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
            </>
          );

          const className = cn(
            "flex items-start gap-3 rounded-xl border bg-card p-3 transition-colors",
            n.unread && "border-primary/40 bg-primary/5",
            occ && "hover:bg-muted/50",
          );

          return (
            <li key={n.id}>
              {occ ? (
                <Link to="/ocorrencia/$id" params={{ id: occ.id }} className={className}>
                  {inner}
                </Link>
              ) : (
                <div className={className}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
