import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { getTrack } from "@/lib/mock-data";

export const Route = createFileRoute("/trilhas/$slug")({
  head: () => ({
    meta: [{ title: "Trilha de estudo — EcoJampa" }],
  }),
  component: TrackPage,
  notFoundComponent: () => (
    <AppShell title="Trilha" showBack showNav={false}>
      <p className="py-16 text-center text-muted-foreground">Conteúdo não encontrado.</p>
    </AppShell>
  ),
});

function TrackPage() {
  const { slug } = Route.useParams();
  const track = getTrack(slug);

  if (!track) {
    return (
      <AppShell title="Trilha" showBack showNav={false}>
        <p className="py-16 text-center text-muted-foreground">Conteúdo não encontrado.</p>
      </AppShell>
    );
  }

  const Icon = track.icon;

  return (
    <AppShell title={track.title} showBack showNav={false}>
      <div className="space-y-5">
        <button className="group relative grid aspect-video w-full place-items-center overflow-hidden rounded-2xl bg-foreground/85 text-background">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-background/20 backdrop-blur transition-transform group-hover:scale-110">
            <Play className="h-7 w-7 translate-x-0.5" />
          </span>
        </button>

        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </span>
          <h2 className="font-display text-xl font-bold">{track.title}</h2>
        </div>

        <div>
          <h3 className="mb-2 font-display text-base font-bold">Resumo</h3>
          <ul className="space-y-3">
            {track.summary.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button asChild variant="outline" className="w-full">
          <Link to="/trilhas">Ver outras trilhas</Link>
        </Button>
      </div>
    </AppShell>
  );
}
