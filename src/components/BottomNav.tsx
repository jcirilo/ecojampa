import { Link, useRouterState } from "@tanstack/react-router";
import { MapPin, Clock, BookOpen, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/mapa", label: "Mapa", icon: MapPin },
  { to: "/minhas-ocorrencias", label: "Histórico", icon: Clock },
  { to: "/trilhas", label: "Trilhas", icon: BookOpen },
  { to: "/perfil", label: "Perfil", icon: User },
  { to: "/configuracoes", label: "Ajustes", icon: Settings },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="sticky bottom-0 z-30 border-t bg-card/95 backdrop-blur">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
