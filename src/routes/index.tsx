import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Leaf } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center bg-background px-6 py-10 shadow-xl">
      <div className="mb-10 flex flex-col items-center text-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <Leaf className="h-10 w-10" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-extrabold text-primary">EcoJampa</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sua cidade mais limpa e segura, juntos.
        </p>
      </div>

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
        <div className="space-y-1.5">
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Entrar
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        ou
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button asChild variant="outline" size="lg" className="w-full">
        <Link to="/cadastro">Criar conta</Link>
      </Button>

      <button
        onClick={() => navigate({ to: "/mapa" })}
        className="mt-6 text-center text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Explorar sem entrar
      </button>
    </div>
  );
}
