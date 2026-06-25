import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { studyTracks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trilhas")({
  head: () => ({
    meta: [
      { title: "Trilhas de estudo — EcoJampa" },
      { name: "description", content: "Conteúdo educativo sobre descarte correto, reciclagem e cuidado com a cidade." },
    ],
  }),
  component: TracksPage,
});

const colorBg: Record<string, string> = {
  "status-lighting": "bg-status-lighting/15 text-foreground",
  "status-waste": "bg-status-waste/15 text-status-waste",
  "status-vandalism": "bg-status-vandalism/15 text-status-vandalism",
  primary: "bg-primary/15 text-primary",
};

function TracksPage() {
  return (
    <AppShell title="Trilhas de Estudo" showBell>
      <p className="mb-4 text-sm text-muted-foreground">
        Aprenda a lidar com problemas urbanos e ambientais da sua cidade.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {studyTracks.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.slug}
              to="/trilhas/$slug"
              params={{ slug: t.slug }}
              className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-3 text-center shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <span className={cn("grid h-12 w-12 place-items-center rounded-xl", colorBg[t.color] ?? "bg-muted")}>
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-xs font-medium leading-tight">{t.title}</span>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
