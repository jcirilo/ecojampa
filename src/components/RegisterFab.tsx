import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

/**
 * Floating action button anchored to the bottom-right of the centered
 * app column, sitting just above the bottom navigation.
 */
export function RegisterFab() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md">
      <Link
        to="/registrar"
        aria-label="Registrar Ocorrência"
        className="pointer-events-auto absolute bottom-20 right-4 flex h-14 items-center gap-2 rounded-full bg-coral px-5 font-semibold text-coral-foreground shadow-lg shadow-coral/40 transition-transform hover:scale-105"
      >
        <Plus className="h-6 w-6 shrink-0" />
        <span className="text-sm">Registrar</span>
      </Link>
    </div>
  );
}
