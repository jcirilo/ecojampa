import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { studyTracks } from "@/lib/mock-data";


export const Route = createFileRoute("/trilhas")({
  head: () => ({
    meta: [
      { title: "Trilhas de estudo — EcoJampa" },
      { name: "description", content: "Conteúdo educativo sobre descarte correto, reciclagem e cuidado com a cidade." },
    ],
  }),
  component: TracksPage,
});


function TracksPage() {
  return (
    <AppShell title="Trilhas de Estudo" showBell showHelp>
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
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
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
