import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { Leaf, Check, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — EcoJampa" },
      { name: "description", content: "Crie sua conta EcoJampa e comece a registrar ocorrências em João Pessoa." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const rules = useMemo(
    () => [
      { label: "Mínimo de 8 caracteres", ok: password.length >= 8 },
      { label: "Uma letra maiúscula", ok: /[A-Z]/.test(password) },
      { label: "Um número", ok: /\d/.test(password) },
      { label: "Um caractere especial", ok: /[^A-Za-z0-9]/.test(password) },
    ],
    [password],
  );

  const allRulesOk = rules.every((r) => r.ok);
  const passwordsMatch = confirm.length > 0 && password === confirm;
  const canSubmit = allRulesOk && passwordsMatch;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    login(name.trim() || "Você");
    navigate({ to: "/mapa" });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center bg-background px-6 py-10 shadow-xl">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <Leaf className="h-8 w-8" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-primary">Criar conta</h1>
        <p className="mt-1 text-sm text-muted-foreground">Junte-se ao EcoJampa</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            placeholder="Nome Sobrenome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="exemplo@email.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="senha">Senha</Label>
          <PasswordInput
            id="senha"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <ul className="space-y-1 rounded-xl bg-muted/60 p-3">
          <li className="mb-1 text-xs font-semibold text-muted-foreground">
            Sua senha deve conter:
          </li>
          {rules.map((r) => (
            <li
              key={r.label}
              className={cn(
                "flex items-center gap-2 text-xs",
                r.ok ? "text-primary" : "text-muted-foreground",
              )}
            >
              {r.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
              {r.label}
            </li>
          ))}
        </ul>

        <div className="space-y-1.5">
          <Label htmlFor="confirmar">Confirmar senha</Label>
          <PasswordInput
            id="confirmar"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {confirm.length > 0 && (
            <p
              className={cn(
                "flex items-center gap-1.5 text-xs",
                passwordsMatch ? "text-primary" : "text-destructive",
              )}
            >
              {passwordsMatch ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
              {passwordsMatch ? "As senhas coincidem" : "As senhas não coincidem"}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={!canSubmit}>
          Registrar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link to="/" className="font-semibold text-primary underline-offset-4 hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
