import { cn } from "@/lib/utils";

/**
 * EcoJampa brand mark — "Selo Costeiro": a coastal seal combining a leaf
 * (environment) and a wave (João Pessoa's shoreline) inside a ring.
 * Single-color glyph (currentColor) so it works on the gradient badge,
 * in the header, and as a favicon.
 */
export function EcoJampaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {/* border/ring in coral, inner leaf + wave in teal */}
      <circle cx="12" cy="12" r="9.2" stroke="var(--coral)" />
      <path d="M8.2 12.6C8.2 9.3 10.4 7 14 7C14 10.3 11.8 12.6 8.2 12.6Z" stroke="var(--primary)" />
      <path d="M6.6 15.7C7.7 14.9 8.8 16.5 9.9 15.7C11 14.9 12.1 16.5 13.2 15.7C14.3 14.9 15.4 16.5 16.5 15.7" stroke="var(--primary)" />
    </svg>
  );
}
