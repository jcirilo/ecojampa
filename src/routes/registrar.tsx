import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, ImagePlus, Images, MapPin, Send, Search, Check, X, Info } from "lucide-react";
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

const MAX_MEDIA = 5;

export const Route = createFileRoute("/registrar")({
  head: () => ({
    meta: [
      { title: "Registrar Ocorrência — EcoJampa" },
      { name: "description", content: "Registre uma irregularidade urbana com foto, localização e categoria." },
    ],
  }),
  component: () => (
    <AuthGate title="Registrar Ocorrência">
      <RegisterPage />
    </AuthGate>
  ),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [media, setMedia] = useState<string[]>([]);
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [address, setAddress] = useState("Av. Epitácio Pessoa, 1240 — Tambaú");
  const captureRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const replaceIndex = useRef<number | null>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setMedia((prev) => {
      const next = [...prev, ...urls].slice(0, MAX_MEDIA);
      if (prev.length + urls.length > MAX_MEDIA) {
        toast.warning(`Máximo de ${MAX_MEDIA} mídias por ocorrência.`);
      }
      return next;
    });
  };

  const onCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const before = media.length;
    addFiles(e.target.files);
    if (e.target.files?.length && before === 0) setStep(1);
    e.target.value = "";
  };

  const onReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && replaceIndex.current !== null) {
      const url = URL.createObjectURL(file);
      const idx = replaceIndex.current;
      setMedia((prev) => prev.map((m, i) => (i === idx ? url : m)));
    }
    replaceIndex.current = null;
    e.target.value = "";
  };

  const removeMedia = (idx: number) => setMedia((prev) => prev.filter((_, i) => i !== idx));

  const useSample = () => {
    setMedia((prev) => (prev.length ? prev : [sampleMedia]));
    setStep(1);
  };

  const submit = () => {
    toast.success("Ocorrência registrada!", {
      description: "Acompanhe o andamento em Minhas Ocorrências.",
    });
    navigate({ to: "/minhas-ocorrencias" });
  };

  return (
    <AppShell title="Registrar Ocorrência" showBack showNav={false}>
      <div className="space-y-5 pb-6">
        <Stepper step={step} />

        <input ref={captureRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onCapture} />
        <input ref={galleryRef} type="file" accept="image/*,video/mp4" multiple className="hidden" onChange={onCapture} />
        <input ref={replaceRef} type="file" accept="image/*,video/mp4" className="hidden" onChange={onReplace} />

        {step === 0 && (
          <div className="space-y-4">
            <div className="relative grid aspect-[3/4] w-full place-items-center overflow-hidden rounded-2xl bg-foreground/90 text-background">
              {media[0] ? (
                <img src={media[0]} alt="Mídia capturada" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Camera className="h-12 w-12 opacity-80" />
                  <p className="text-sm opacity-80">Aponte para a irregularidade</p>
                </div>
              )}
            </div>

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5" /> Até {MAX_MEDIA} mídias · JPG, PNG ou MP4
            </p>

            <Button className="w-full gap-2" size="lg" onClick={() => captureRef.current?.click()}>
              <Camera className="h-5 w-5" /> Capturar mídia
            </Button>
            <Button variant="outline" className="w-full gap-2" size="lg" onClick={() => galleryRef.current?.click()}>
              <Images className="h-5 w-5" /> Escolher da Galeria
            </Button>
            <Button variant="ghost" className="w-full gap-2" onClick={useSample}>
              <ImagePlus className="h-5 w-5" /> Usar foto de exemplo
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="rounded-2xl border bg-card p-3 shadow-sm">
              <div className="relative grid h-36 place-items-center overflow-hidden rounded-xl bg-muted">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Buscar endereço no mapa..."
                  className="h-9 border-0 bg-muted/60 focus-visible:ring-1"
                  aria-label="Buscar endereço"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold">Mídias anexadas</p>
                <span className="text-xs text-muted-foreground">
                  {media.length}/{MAX_MEDIA} · JPG, PNG, MP4
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {media.map((m, i) => (
                  <div key={i} className="group relative h-16 w-16">
                    <img src={m} alt={`Mídia ${i + 1}`} className="h-16 w-16 rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() => removeMedia(i)}
                      aria-label="Remover mídia"
                      className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-destructive text-destructive-foreground shadow"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        replaceIndex.current = i;
                        replaceRef.current?.click();
                      }}
                      className="absolute inset-x-0 bottom-0 rounded-b-lg bg-foreground/60 py-0.5 text-[0.55rem] font-medium text-background"
                    >
                      Substituir
                    </button>
                  </div>
                ))}
                {media.length < MAX_MEDIA && (
                  <button
                    onClick={() => galleryRef.current?.click()}
                    className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-[0.6rem] text-muted-foreground"
                  >
                    <ImagePlus className="h-5 w-5" />
                    Adicionar
                  </button>
                )}
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

            <Button className="w-full" size="lg" disabled={!category} onClick={() => setStep(2)}>
              Confirmar
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary">
              <Info className="h-4 w-4 shrink-0" /> Confira as informações antes de registrar.
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {media.map((m, i) => (
                <img key={i} src={m} alt={`Mídia ${i + 1}`} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              ))}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc">Descrição</Label>
              <Textarea
                id="desc"
                placeholder="Descreva o problema: o que é, há quanto tempo, riscos... (opcional)"
                rows={4}
                className="bg-muted/40 placeholder:italic placeholder:text-muted-foreground/70"
              />
            </div>
            <Button className="w-full gap-2" size="lg" onClick={submit}>
              <Send className="h-5 w-5" /> Registrar Ocorrência
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
