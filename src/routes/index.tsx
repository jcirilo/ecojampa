import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthBackdrop } from "@/components/AuthBackdrop";
import { EcoJampaLogo } from "@/components/EcoJampaLogo";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrar — EcoJampa" },
      { name: "description", content: "Acesse sua conta EcoJampa para registrar e acompanhar ocorrências em João Pessoa." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
    navigate({ to: "/mapa" });
  };

  return (
    <div className="relative isolate mx-auto flex min-h-screen w-full max-w-md flex-col justify-center overflow-hidden bg-background px-6 py-10 shadow-xl">
      <AuthBackdrop />
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="eco-rise">
          <span className="grid h-20 w-20 place-items-center">
            <EcoJampaLogo className="h-20 w-20" />
          </span>
        </div>
        <h1
          className="eco-rise mt-5 font-display text-3xl font-extrabold text-primary"
          style={{ animationDelay: "120ms" }}
        >
          EcoJampa
        </h1>
        <p
          className="eco-rise mt-1.5 text-sm text-muted-foreground"
          style={{ animationDelay: "220ms" }}
        >
          Registre. Acompanhe. Transforme João Pessoa.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="eco-rise space-y-4"
        style={{ animationDelay: "320ms" }}
      >
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
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="senha">Senha</Label>
            <Link
              to="/recuperar-senha"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>
          <PasswordInput id="senha" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Entrar
        </Button>
      </form>

      <div
        className="eco-rise my-6 flex items-center gap-3 text-xs text-muted-foreground"
        style={{ animationDelay: "400ms" }}
      >
        <span className="h-px flex-1 bg-border" />
        ou
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="eco-rise w-full"
        style={{ animationDelay: "460ms" }}
      >
        <Link to="/cadastro">Criar conta</Link>
      </Button>

      <button
        onClick={() => navigate({ to: "/mapa" })}
        className="eco-rise mt-6 text-center text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        style={{ animationDelay: "540ms" }}
      >
        Explorar sem entrar
      </button>
    </div>
  );
}
