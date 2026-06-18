import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, LogOut, ImageIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { badges, currentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [{ title: "Meu perfil — EcoJampa" }],
  }),
  component: () => (
    <AuthGate title="Meu perfil">
      <ProfilePage />
    </AuthGate>
  ),
});

function ProfilePage() {
  const { name, logout } = useAuth();

  return (
    <AppShell title="Meu perfil" showBell>
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-24 w-24 place-items-center rounded-full bg-muted text-muted-foreground ring-4 ring-primary/20">
            <ImageIcon className="h-8 w-8" />
          </span>
          <h2 className="mt-3 font-display text-xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{currentUser.neighborhood} · João Pessoa</p>
        </div>

        <div className="grid grid-cols-3 overflow-hidden rounded-2xl bg-primary text-primary-foreground">
          <Stat value={currentUser.occurrencesCount} label="Ocorrências" />
          <Stat value={`${currentUser.neighborhoodRank}º`} label="No bairro" border />
          <Stat value={currentUser.auditedCount} label="Auditadas" />
        </div>

        <Button asChild variant="outline" className="w-full gap-2">
          <Link to="/ranking">
            <Trophy className="h-4 w-4 text-gold" /> Visualizar ranking
          </Link>
        </Button>

        <div>
          <h3 className="mb-3 font-display text-base font-bold">Emblemas</h3>
          <div className="grid grid-cols-5 gap-2">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.id} className="flex flex-col items-center gap-1.5 text-center">
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-xl",
                      b.earned ? "bg-gold/20 text-gold-foreground" : "bg-muted text-muted-foreground/40",
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

        <Button variant="ghost" className="w-full gap-2 text-destructive hover:text-destructive" onClick={logout}>
          <LogOut className="h-4 w-4" /> Sair
        </Button>
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
