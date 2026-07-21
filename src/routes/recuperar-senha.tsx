import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MailCheck, ArrowLeft } from "lucide-react";
import { AuthBackdrop } from "@/components/AuthBackdrop";
import { EcoJampaLogo } from "@/components/EcoJampaLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — EcoJampa" },
      { name: "description", content: "Recupere o acesso à sua conta EcoJampa." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <div className="relative isolate mx-auto flex min-h-screen w-full max-w-md flex-col justify-center overflow-hidden bg-background px-6 py-10 shadow-xl">
      <AuthBackdrop />
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center text-primary">
          {sent ? <MailCheck className="h-10 w-10" /> : <EcoJampaLogo className="h-16 w-16" />}
        </span>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-primary">
          {sent ? "Verifique seu e-mail" : "Esqueci minha senha"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {sent
            ? `Enviamos um link de redefinição para ${email}.`
            : "Informe seu e-mail e enviaremos um link para redefinir sua senha."}
        </p>
      </div>

      {sent ? (
        <div className="space-y-4">
          <p className="rounded-xl bg-muted/60 p-4 text-center text-sm text-muted-foreground">
            Não recebeu? Verifique a caixa de spam ou tente novamente em alguns minutos.
          </p>
          <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
            Reenviar link
          </Button>
          <Button asChild className="w-full" size="lg">
            <Link to="/">Voltar para o login</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Enviar link de recuperação
          </Button>
        </form>
      )}

      <Link
        to="/"
        className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar para o login
      </Link>
    </div>
  );
}
