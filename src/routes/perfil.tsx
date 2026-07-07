import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Trophy, LogOut, Camera, Pencil, CalendarCheck, Target, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { badges, currentUser, type Badge } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string>(currentUser.avatar);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <AppShell title="Meu perfil" showBell showHelp>
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Alterar foto de perfil"
            className="group relative h-24 w-24 overflow-hidden rounded-full bg-muted ring-4 ring-primary/20"
          >
            <img src={photo} alt={name} className="h-full w-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 grid place-items-center bg-foreground/55 py-1.5 text-background">
              <Camera className="h-4 w-4" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-xs font-medium text-primary hover:underline"
          >
            Alterar foto de perfil
          </button>
          <h2 className="mt-3 font-display text-xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{currentUser.neighborhood} · João Pessoa</p>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => toast.info("Edição de perfil em breve neste protótipo.")}
        >
          <Pencil className="h-4 w-4" /> Editar Perfil
        </Button>

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
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBadge(b)}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-xl transition-transform hover:scale-105",
                      b.earned ? "bg-gold/20 text-gold-foreground" : "bg-muted text-muted-foreground/40",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[0.6rem] leading-tight text-muted-foreground">{b.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Button variant="ghost" className="w-full gap-2 text-destructive hover:text-destructive" onClick={logout}>
          <LogOut className="h-4 w-4" /> Sair
        </Button>
      </div>

      <BadgeDialog badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </AppShell>
  );
}

function BadgeDialog({ badge, onClose }: { badge: Badge | null; onClose: () => void }) {
  const Icon = badge?.icon;
  return (
    <Dialog open={!!badge} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xs">
        {badge && Icon && (
          <>
            <DialogHeader className="items-center text-center">
              <span
                className={cn(
                  "mb-2 grid h-16 w-16 place-items-center rounded-2xl",
                  badge.earned ? "bg-gold/20 text-gold-foreground" : "bg-muted text-muted-foreground/50",
                )}
              >
                <Icon className="h-8 w-8" />
              </span>
              <DialogTitle className="font-display">{badge.label}</DialogTitle>
              <DialogDescription>{badge.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="font-medium text-foreground">Critério: </span>
                  {badge.criteria}
                </span>
              </p>
              {badge.earned ? (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <CalendarCheck className="h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="font-medium text-foreground">Conquistado em: </span>
                    {badge.earnedAt
                      ? new Date(badge.earnedAt).toLocaleDateString("pt-BR")
                      : "—"}
                  </span>
                </p>
              ) : (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-4 w-4 shrink-0" /> Ainda não conquistado
                </p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
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
