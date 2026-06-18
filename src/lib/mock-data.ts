import {
  Lightbulb,
  Trash2,
  Ban,
  Recycle,
  Zap,
  Waves,
  Award,
  Sparkles,
  ShieldCheck,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export type CategoryId = "iluminacao" | "descarte" | "vandalismo";

export type OccurrenceStatus = "aberta" | "em_analise" | "resolvida";

export interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  /** semantic color token name */
  color: string;
}

export const categories: Category[] = [
  { id: "iluminacao", label: "Iluminação", icon: Lightbulb, color: "status-lighting" },
  { id: "descarte", label: "Descarte", icon: Trash2, color: "status-waste" },
  { id: "vandalismo", label: "Vandalismo", icon: Ban, color: "status-vandalism" },
];

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id) ?? categories[0];
}

export const statusLabels: Record<OccurrenceStatus, string> = {
  aberta: "Aberta",
  em_analise: "Em análise",
  resolvida: "Resolvida",
};

export interface Occurrence {
  id: string;
  title: string;
  category: CategoryId;
  status: OccurrenceStatus;
  address: string;
  neighborhood: string;
  description: string;
  createdAt: string;
  distanceKm: number;
  lat: number;
  lng: number;
  confirmations: number;
  mine?: boolean;
  image?: string;
}

// João Pessoa center
export const JP_CENTER: [number, number] = [-7.1195, -34.845];

export const occurrences: Occurrence[] = [
  {
    id: "1",
    title: "Poste apagado na esquina",
    category: "iluminacao",
    status: "em_analise",
    address: "Av. Epitácio Pessoa, 1240",
    neighborhood: "Tambaú",
    description:
      "Poste de iluminação pública apagado há mais de uma semana, deixando a calçada perigosa à noite.",
    createdAt: "2026-06-15",
    distanceKm: 0.4,
    lat: -7.1135,
    lng: -34.838,
    confirmations: 12,
  },
  {
    id: "2",
    title: "Descarte irregular de entulho",
    category: "descarte",
    status: "aberta",
    address: "Rua das Trincheiras, 88",
    neighborhood: "Centro",
    description:
      "Acúmulo de entulho e lixo doméstico em terreno baldio atraindo insetos e mau cheiro.",
    createdAt: "2026-06-16",
    distanceKm: 1.1,
    lat: -7.1208,
    lng: -34.881,
    confirmations: 27,
  },
  {
    id: "3",
    title: "Pichação em ponto de ônibus",
    category: "vandalismo",
    status: "aberta",
    address: "Av. Cabo Branco, 500",
    neighborhood: "Cabo Branco",
    description: "Ponto de ônibus pichado e com vidro quebrado, prejudicando o uso pelos passageiros.",
    createdAt: "2026-06-17",
    distanceKm: 2.3,
    lat: -7.135,
    lng: -34.795,
    confirmations: 5,
  },
  {
    id: "4",
    title: "Lâmpada queimada na praça",
    category: "iluminacao",
    status: "resolvida",
    address: "Praça da Independência",
    neighborhood: "Tambauzinho",
    description: "Iluminação da praça restaurada após denúncia da comunidade.",
    createdAt: "2026-06-05",
    distanceKm: 0.9,
    lat: -7.124,
    lng: -34.86,
    confirmations: 18,
    mine: true,
  },
  {
    id: "5",
    title: "Lixo acumulado na orla",
    category: "descarte",
    status: "em_analise",
    address: "Orla de Manaíra",
    neighborhood: "Manaíra",
    description: "Sacos de lixo deixados fora do horário de coleta na orla.",
    createdAt: "2026-06-14",
    distanceKm: 1.6,
    lat: -7.0985,
    lng: -34.834,
    confirmations: 9,
    mine: true,
  },
];

export function getOccurrence(id: string): Occurrence | undefined {
  return occurrences.find((o) => o.id === id);
}

export const myOccurrences = occurrences.filter((o) => o.mine);

export interface RankingEntry {
  position: number;
  name: string;
  xp: number;
  isCurrentUser?: boolean;
}

export const ranking: RankingEntry[] = [
  { position: 1, name: "Marina Souza", xp: 1000 },
  { position: 2, name: "Carlos Eduardo", xp: 900 },
  { position: 3, name: "Você", xp: 800, isCurrentUser: true },
  { position: 4, name: "Bárbara Alves", xp: 700 },
  { position: 5, name: "Igor Wanderley", xp: 600 },
  { position: 6, name: "Gisele Menezes", xp: 540 },
  { position: 7, name: "João Victor", xp: 480 },
];

export interface Badge {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
}

export const badges: Badge[] = [
  { id: "first", label: "Primeira Denúncia", description: "Registrou sua primeira ocorrência", icon: Sparkles, earned: true },
  { id: "guardian", label: "Guardião do Bairro", description: "10 ocorrências confirmadas", icon: ShieldCheck, earned: true },
  { id: "recycler", label: "Reciclador", description: "5 denúncias de descarte", icon: Recycle, earned: true },
  { id: "eco", label: "Eco Herói", description: "Alcançou 1000 XP", icon: Leaf, earned: false },
  { id: "auditor", label: "Auditor", description: "Auditou 20 ocorrências", icon: Award, earned: false },
];

export interface NotificationItem {
  id: string;
  text: string;
  date: string;
  unread: boolean;
}

export const notifications: NotificationItem[] = [
  { id: "1", text: "Sua denúncia do dia 05/06/2026 foi resolvida! 🎉", date: "Hoje", unread: true },
  { id: "2", text: "250 usuários marcaram sua denúncia de 05/06/2026 como resolvida.", date: "Ontem", unread: true },
  { id: "3", text: "46 usuários confirmaram sua denúncia do dia 05/06/2026.", date: "2 dias atrás", unread: false },
  { id: "4", text: "Você ganhou o emblema “Guardião do Bairro”!", date: "3 dias atrás", unread: false },
];

export interface StudyTrack {
  slug: string;
  title: string;
  icon: LucideIcon;
  color: string;
  summary: string[];
}

export const studyTracks: StudyTrack[] = [
  {
    slug: "lixo-urbano",
    title: "Lixo urbano",
    icon: Trash2,
    color: "status-waste",
    summary: [
      "Separe resíduos recicláveis (papel, plástico, vidro, metal) dos orgânicos antes da coleta.",
      "Respeite os dias e horários de coleta do seu bairro para evitar acúmulo nas ruas.",
      "Entulho e volumosos devem ser destinados a ecopontos, não à calçada.",
    ],
  },
  {
    slug: "eletronicos",
    title: "Eletrônicos",
    icon: Zap,
    color: "status-lighting",
    summary: [
      "Pilhas, baterias e eletrônicos contêm metais pesados e não vão no lixo comum.",
      "Procure pontos de coleta de lixo eletrônico em supermercados e lojas parceiras.",
      "Doe ou conserte aparelhos antigos antes de descartá-los.",
    ],
  },
  {
    slug: "praias",
    title: "Praias",
    icon: Waves,
    color: "status-vandalism",
    summary: [
      "Leve seu lixo de volta — nada deve ficar na areia ou no mar.",
      "Evite plásticos de uso único em dias de praia.",
      "Denuncie descarte irregular e esgoto na orla pelos canais oficiais.",
    ],
  },
  {
    slug: "iluminacao-publica",
    title: "Iluminação pública",
    icon: Lightbulb,
    color: "status-lighting",
    summary: [
      "Problemas de iluminação podem ser reportados à concessionária e à prefeitura.",
      "Informe o número do poste (etiqueta) para agilizar o reparo.",
      "Iluminação adequada reduz acidentes e aumenta a sensação de segurança.",
    ],
  },
  {
    slug: "vandalismo",
    title: "Vandalismo",
    icon: Ban,
    color: "status-vandalism",
    summary: [
      "Registre fotos e localização do dano ao patrimônio público.",
      "Acione a Guarda Municipal em casos em andamento.",
      "Mobilize a vizinhança: ambientes cuidados sofrem menos vandalismo.",
    ],
  },
  {
    slug: "reciclagem",
    title: "Reciclagem",
    icon: Recycle,
    color: "primary",
    summary: [
      "Lave e seque embalagens antes de reciclar.",
      "Conheça as cooperativas de catadores da sua região.",
      "Reduzir e reutilizar vêm antes de reciclar.",
    ],
  },
];

export function getTrack(slug: string): StudyTrack | undefined {
  return studyTracks.find((t) => t.slug === slug);
}

export const currentUser = {
  name: "Você",
  email: "voce@email.com",
  neighborhood: "Tambaú",
  occurrencesCount: 2,
  neighborhoodRank: 3,
  auditedCount: 8,
  xp: 800,
};
