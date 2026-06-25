import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, ImagePlus, MapPin, Send, Search, Check, RotateCcw, Video } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories, type CategoryId } from "@/lib/mock-data";
import sampleMedia from "@/assets/occ-2.jpg";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/registrar")({
  head: () => ({
    meta: [
      { title: "Registrar ocorrência — EcoJampa" },
      { name: "description", content: "Registre uma irregularidade urbana com foto, localização e categoria." },
    ],
  }),
  component: () => (
    <AuthGate title="Registrar ocorrência">
      <RegisterPage />
    </AuthGate>
  ),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [hasMedia, setHasMedia] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string>(sampleMedia);
  const [category, setCategory] = useState<CategoryId | null>(null);
  const captureRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLInputElement>(null);

  const onPickMedia = (advance: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaUrl(URL.createObjectURL(file));
      setHasMedia(true);
      if (advance) setStep(1);
    }
  };

  const submit = () => {
    toast.success("Ocorrência enviada!", {
      description: "Acompanhe o andamento em Minhas Ocorrências.",
    });
    navigate({ to: "/minhas-ocorrencias" });
  };

  return (
    <AppShell title="Registrar ocorrência" showBack showNav={false}>
      <div className="space-y-5">
        <Stepper step={step} />

        <input
          ref={captureRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={onPickMedia(true)}
        />
        <input
          ref={addRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPickMedia(false)}
        />

        {step === 0 && (
          <div className="space-y-4">
            <div className="relative grid aspect-[3/4] w-full place-items-center overflow-hidden rounded-2xl bg-foreground/90 text-background">
              {hasMedia ? (
                <img src={mediaUrl} alt="Mídia capturada" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Camera className="h-12 w-12 opacity-80" />
                  <p className="text-sm opacity-80">Aponte para a irregularidade</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>Imagem</span>
              <span className="flex items-center gap-1"><Video className="h-3.5 w-3.5" /> Vídeo</span>
              <span className="flex items-center gap-1"><RotateCcw className="h-3.5 w-3.5" /> Virar</span>
            </div>
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={() => captureRef.current?.click()}
            >
              <Camera className="h-5 w-5" /> Capturar mídia
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              size="lg"
              onClick={() => {
                setHasMedia(true);
                setStep(1);
              }}
            >
              <ImagePlus className="h-5 w-5" /> Usar foto de exemplo
            </Button>
          </div>
        )}


        {step === 1 && (
          <div className="space-y-5">
            <div className="rounded-2xl border bg-card p-3 shadow-sm">
              <div className="relative grid h-36 place-items-center overflow-hidden rounded-xl bg-muted">
                <MapPin className="h-8 w-8 text-primary" />
                <button className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card shadow">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" /> Localização atual
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold">Mídias anexadas</p>
              <div className="flex gap-2">
                {hasMedia && (
                  <img src={mediaUrl} alt="Mídia" className="h-16 w-16 rounded-lg object-cover" />
                )}
                <button
                  onClick={() => addRef.current?.click()}
                  className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-[0.6rem] text-muted-foreground"
                >
                  <ImagePlus className="h-5 w-5" />
                  Adicionar
                </button>
              </div>

            </div>

            <div>
              <p className="mb-2 text-sm font-semibold">Categoria</p>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const selected = category === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-colors",
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!category}
              onClick={() => setStep(2)}
            >
              Confirmar
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="flex gap-2">
              <img src={mediaUrl} alt="Mídia" className="h-28 flex-1 rounded-xl object-cover" />
              <div className="grid h-28 w-20 place-items-center rounded-xl bg-muted text-muted-foreground">
                <Video className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" defaultValue="Av. Epitácio Pessoa, 1240 — Tambaú" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc">Descrição</Label>
              <Textarea id="desc" placeholder="Texto opcional descrevendo o problema..." rows={4} />
            </div>
            <Button className="w-full gap-2" size="lg" onClick={submit}>
              <Send className="h-5 w-5" /> Enviar
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Mídia", "Detalhes", "Enviar"];
  return (
    <div className="flex items-center gap-2">
      {labels.map((label, i) => (
        <div key={label} className="flex flex-1 items-center gap-2">
          <span
            className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold",
              i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {i < step ? <Check className="h-4 w-4" /> : i + 1}
          </span>
          <span className={cn("text-xs font-medium", i <= step ? "text-foreground" : "text-muted-foreground")}>
            {label}
          </span>
          {i < labels.length - 1 && <span className="h-px flex-1 bg-border" />}
        </div>
      ))}
    </div>
  );
}
