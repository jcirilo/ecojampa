import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, MapPin, Camera, ShieldCheck, Trophy, Mail } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/ajuda")({
  head: () => ({
    meta: [
      { title: "Ajuda — EcoJampa" },
      { name: "description", content: "Dúvidas frequentes e instruções de uso do EcoJampa." },
    ],
  }),
  component: HelpPage,
});

const steps = [
  { icon: Camera, title: "Registrar", text: "Toque em Registrar Ocorrência, tire ou anexe uma foto, escolha a categoria e envie." },
  { icon: MapPin, title: "Acompanhar", text: "Veja o andamento em Minhas Ocorrências e receba notificações a cada atualização." },
  { icon: ShieldCheck, title: "Auditar", text: "Confirme ocorrências próximas no mapa para ajudar a validar denúncias reais." },
  { icon: Trophy, title: "Ganhar pontos", text: "Contribua para subir no ranking do bairro e desbloquear emblemas." },
];

const faqs = [
  {
    q: "Como registro uma ocorrência?",
    a: "Na tela do Mapa ou em Minhas Ocorrências, toque no botão Registrar Ocorrência. Anexe uma foto (câmera ou galeria), selecione a categoria, confira o endereço e envie.",
  },
  {
    q: "Quais tipos de irregularidade posso registrar?",
    a: "Atualmente: Iluminação pública, Descarte irregular de resíduos e Vandalismo ao patrimônio público.",
  },
  {
    q: "O que significa auditar uma ocorrência?",
    a: "É confirmar que uma ocorrência registrada por outro morador realmente existe. Quanto mais confirmações, maior a prioridade junto aos órgãos públicos.",
  },
  {
    q: "Como funcionam os pontos e emblemas?",
    a: "Você acumula XP ao registrar e auditar ocorrências. Com o tempo desbloqueia emblemas e sobe no ranking do seu bairro.",
  },
  {
    q: "Minhas fotos e localização são públicas?",
    a: "As ocorrências aparecem no mapa colaborativo para toda a comunidade. Evite incluir dados pessoais nas fotos e descrições.",
  },
  {
    q: "Como contato os órgãos responsáveis?",
    a: "Nas Trilhas de Estudo você encontra orientações de como acionar a prefeitura, a concessionária de energia e a Guarda Municipal.",
  },
];

function HelpPage() {
  return (
    <AppShell title="Ajuda" showBack showNav={false}>
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-2xl bg-primary px-4 py-4 text-primary-foreground">
          <LifeBuoy className="h-6 w-6 shrink-0" />
          <p className="text-sm font-medium">
            Precisa de ajuda? Veja como usar o EcoJampa e tire suas dúvidas.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-base font-bold">Como funciona</h2>
          <div className="grid grid-cols-2 gap-3">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="rounded-2xl border bg-card p-3 shadow-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-2 text-sm font-semibold">{s.title}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-display text-base font-bold">Dúvidas frequentes</h2>
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-4">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="last:border-0">
                <AccordionTrigger className="text-left text-sm font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
          <Mail className="h-5 w-5 shrink-0 text-primary" />
          <div className="text-sm">
            <p className="font-semibold">Ainda precisa de ajuda?</p>
            <p className="text-muted-foreground">Fale com a gente: suporte@ecojampa.com.br</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
