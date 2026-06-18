import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { AppShell } from "./AppShell";
import { Button } from "@/components/ui/button";

export function AuthGate({ title, children }: { title: string; children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <>{children}</>;

  return (
    <AppShell title={title} showBell>
      <div className="flex flex-col items-center gap-4 px-2 py-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Lock className="h-7 w-7" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold">Entre para continuar</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Você precisa de uma conta para acessar esta área e contribuir com a cidade.
          </p>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Button asChild>
            <Link to="/">Entrar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/cadastro">Criar conta</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
