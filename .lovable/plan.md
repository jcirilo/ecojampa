# EcoJampa — Protótipo Visual

App web responsivo (mobile-first) de denúncias de irregularidades urbanas para João Pessoa. Esta etapa é um **protótipo visual navegável** com dados de exemplo (mock) — sem backend ainda. Todas as telas do wireframe serão construídas e conectadas pelo fluxo de navegação.

## Direção de design

- **Paleta:** Emerald Prestige — verde esmeralda `#064e3b` / `#0d7a5f`, dourado `#c9a84c`, off-white `#f5f0e0`. Pins do mapa por categoria/status (amarelo, vermelho, azul).
- **Tipografia:** Outfit (títulos) + Figtree (corpo), via @fontsource.
- **Estilo:** cívico e sólido, cantos arredondados, sombras suaves, tom ambiental.
- Tokens semânticos definidos em `src/styles.css` (sem cores hardcoded nos componentes).

## Telas e fluxo (do wireframe)

```text
Cadastro ─► Login ─► [App com nav inferior]
                          │
   ┌──────────────────────┼─────────────────────────────┐
  Mapa   Histórico   Trilhas de Estudo   Perfil   Configurações   (+ sino: Notificações)                         
             |                               |
           [cadastro/login caso não esteja logado]
```

### Autenticação (mock, sem validação real)

- **Cadastro:** logo, nome, email, senha, confirmar senha, botão Registrar.
- **Login:** logo, email, senha, Entrar / Criar Conta.

### Telas principais (com barra de navegação inferior persistente)

1. **Mapa** — mapa OpenStreetMap (react-leaflet) com pins mock por categoria, botão Filtrar, botão "Registrar ocorrência", carrossel "Ocorrências próximas", sino de notificações.
2. **Registrar ocorrência** (fluxo de 3 passos):
  - Captura/seleção de mídia (placeholder de câmera).
  - Localização atual + mídias anexadas + categoria (Iluminação, Descarte, Vandalismo).
  - Endereço + descrição opcional + Enviar.
3. **Ocorrência (detalhe)** — imagem, descrição, tipo, "Confirmar ocorrência" / "Sinalizar Resolução".
4. **Minhas Ocorrências** — lista do histórico do usuário (mock).
5. **Trilhas de Estudo** — grade de categorias → conteúdo educativo (ex. "Lixo urbano" com vídeo placeholder + resumo).
6. **Meu perfil** — stats (Ocorrências, Ranking do Bairro, Auditadas), Emblemas, "Visualizar Ranking" → **Ranking do Bairro** (lista com XP).
7. **Configurações** — Informações de usuário, Notificações, Privacidade, Permissões, Ajuda, Sobre.
8. **Notificações** — lista de atualizações das denúncias (mock).

## Arquitetura técnica

- **Rotas** (TanStack Router, `src/routes/`): `/` (login), `/cadastro`, `/mapa`, `/registrar`, `/ocorrencia/$id`, `/minhas-ocorrencias`, `/trilhas`, `/trilhas/$slug`, `/perfil`, `/ranking`, `/configuracoes`, `/notificacoes`.
- **Layout** com `<Outlet />` para as telas internas + componente `BottomNav` reutilizável.
- **Mapa:** `react-leaflet` + tiles OpenStreetMap (gratuito, sem chave de API).
- **Dados mock:** arquivo `src/lib/mock-data.ts` com ocorrências, categorias, ranking, emblemas, notificações e trilhas.
- **Componentes shadcn** (Button, Card, Input, Badge, etc.) estilizados com os tokens da paleta.
- **Fluxo:** O usuário pode explorar as telas sem login ou cadastro, sendo obrigatório apenas ao clicar em "Meu perfil", "Registrar ocorrência" ou "Minhas Ocorrências".
- Ícones via `lucide-react`.

## Fora de escopo (etapas futuras)

- Autenticação real, banco de dados, upload de fotos, notificações reais e ranking dinâmico (necessitariam Lovable Cloud).
- Câmera/geolocalização nativas reais.

Posso ajustar qualquer tela ou a paleta antes de começar. Ao aprovar, construo o protótipo completo.