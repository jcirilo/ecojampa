import { createFileRoute } from "@tanstack/react-router";
import { User, Bell, ShieldCheck, KeyRound, HelpCircle, Info, ChevronRight, LogOut } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [{ title: "Configurações — EcoJampa" }],
  }),
  component: SettingsPage,
});

const items = [
  { icon: User, label: "Informações de usuário" },
  { icon: ShieldCheck, label: "Privacidade" },
  { icon: KeyRound, label: "Permissões" },
  { icon: HelpCircle, label: "Ajuda" },
  { icon: Info, label: "Sobre" },
];

function SettingsPage() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppShell title="Configurações" showBell>
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <Bell className="h-5 w-5 text-primary" />
          <span className="flex-1 font-medium">Notificações</span>
          <Switch defaultChecked />
        </div>

        <ul className="divide-y overflow-hidden rounded-xl border bg-card">
          {items.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="flex-1 font-medium">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>

        {isAuthenticated && (
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-left font-medium text-destructive transition-colors hover:bg-destructive/5"
          >
            <LogOut className="h-5 w-5" /> Sair da conta
          </button>
        )}

        <p className="pt-2 text-center text-xs text-muted-foreground">EcoJampa · versão 1.0.0</p>
      </div>
    </AppShell>
  );
}
