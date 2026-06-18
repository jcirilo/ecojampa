import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { notifications } from "@/lib/mock-data";
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
        {notifications.map((n) => (
          <li
            key={n.id}
            className={cn(
              "flex items-start gap-3 rounded-xl border bg-card p-3",
              n.unread && "border-primary/40 bg-primary/5",
            )}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <ImageIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">{n.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">{n.date}</p>
            </div>
            {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
