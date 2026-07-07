import { type ReactNode } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bell, HelpCircle, Leaf } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface AppShellProps {
  title?: string;
  children: ReactNode;
  showBack?: boolean;
  showBell?: boolean;
  showNav?: boolean;
  showHelp?: boolean;
  /** remove default content padding (e.g. for full-bleed map) */
  flush?: boolean;
}

export function AppShell({
  title,
  children,
  showBack = false,
  showBell = false,
  showNav = true,
  showHelp = false,
  flush = false,
}: AppShellProps) {
  const router = useRouter();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background shadow-xl sm:my-0">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-card/95 px-4 py-3 backdrop-blur">
        {showBack ? (
          <button
            onClick={() => router.history.back()}
            aria-label="Voltar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link
            to="/mapa"
            aria-label="EcoJampa"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
          >
            <Leaf className="h-5 w-5" />
          </Link>
        )}
        <h1 className="min-w-0 flex-1 truncate font-display text-lg font-bold text-foreground">
          {title}
        </h1>
        {showHelp && (
          <Link
            to="/ajuda"
            aria-label="Ajuda"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <HelpCircle className="h-5 w-5" />
          </Link>
        )}
        {showBell && (
          <Link
            to="/notificacoes"
            aria-label="Notificações"
            className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[0.6rem] font-bold text-destructive-foreground">
                {unread}
              </span>
            )}
          </Link>
        )}
      </header>

      <main className={cn("flex-1", flush ? "" : "px-4 py-4")}>{children}</main>

      {showNav && <BottomNav />}
    </div>
  );
}
