import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { RegisterFab } from "@/components/RegisterFab";
import { myOccurrences } from "@/lib/mock-data";

export const Route = createFileRoute("/minhas-ocorrencias")({
  head: () => ({
    meta: [{ title: "Minhas Ocorrências — EcoJampa" }],
  }),
  component: () => (
    <AuthGate title="Minhas Ocorrências">
      <MyOccurrencesPage />
    </AuthGate>
  ),
});

function MyOccurrencesPage() {
  return (
    <AppShell title="Minhas Ocorrências" showBell showHelp>
      <div className="space-y-2.5 pb-24">
        {myOccurrences.map((o) => (
          <OccurrenceCard key={o.id} occurrence={o} />
        ))}
        {myOccurrences.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Você ainda não registrou ocorrências.
          </p>
        )}
      </div>
      <RegisterFab />
    </AppShell>
  );
}
