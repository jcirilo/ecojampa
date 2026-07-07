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
import occ1 from "@/assets/occ-1.jpg";
import occ2 from "@/assets/occ-2.jpg";
import occ3 from "@/assets/occ-3.jpg";
import occ4 from "@/assets/occ-4.jpg";
import occ5 from "@/assets/occ-5.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";

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
    image: occ1,
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
    image: occ2,
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
    image: occ3,
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
    image: occ4,
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
    image: occ5,
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
  id: string;
  name: string;
  xp: number;
  avatar: string;
  neighborhood: string;
  occurrencesCount: number;
  auditedCount: number;
  /** ids of earned badges */
  earnedBadges: string[];
  isCurrentUser?: boolean;
}

export const ranking: RankingEntry[] = [
  { position: 1, id: "marina", name: "Marina Souza", xp: 1000, avatar: avatar1, neighborhood: "Tambaú", occurrencesCount: 14, auditedCount: 32, earnedBadges: ["first", "guardian", "recycler", "eco", "auditor"] },
  { position: 2, id: "carlos", name: "Carlos Eduardo", xp: 900, avatar: avatar2, neighborhood: "Tambaú", occurrencesCount: 11, auditedCount: 25, earnedBadges: ["first", "guardian", "recycler", "auditor"] },
  { position: 3, id: "voce", name: "Você", xp: 800, avatar: avatar3, neighborhood: "Tambaú", occurrencesCount: 2, auditedCount: 8, earnedBadges: ["first", "guardian", "recycler"], isCurrentUser: true },
  { position: 4, id: "barbara", name: "Bárbara Alves", xp: 700, avatar: avatar4, neighborhood: "Tambaú", occurrencesCount: 7, auditedCount: 19, earnedBadges: ["first", "guardian", "recycler"] },
  { position: 5, id: "igor", name: "Igor Wanderley", xp: 600, avatar: avatar5, neighborhood: "Tambaú", occurrencesCount: 6, auditedCount: 14, earnedBadges: ["first", "guardian"] },
  { position: 6, id: "gisele", name: "Gisele Menezes", xp: 540, avatar: avatar6, neighborhood: "Tambaú", occurrencesCount: 4, auditedCount: 10, earnedBadges: ["first", "recycler"] },
  { position: 7, id: "joao", name: "João Victor", xp: 480, avatar: avatar7, neighborhood: "Tambaú", occurrencesCount: 3, auditedCount: 7, earnedBadges: ["first"] },
];

export function getRankingEntry(id: string): RankingEntry | undefined {
  return ranking.find((r) => r.id === id);
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
  /** how the badge is unlocked */
  criteria: string;
  /** date the badge was earned (only when earned) */
  earnedAt?: string;
}

export const badges: Badge[] = [
  { id: "first", label: "Primeira Denúncia", description: "Registrou sua primeira ocorrência na plataforma.", criteria: "Registre 1 ocorrência.", icon: Sparkles, earned: true, earnedAt: "2026-06-05" },
  { id: "guardian", label: "Guardião do Bairro", description: "Reconhecido por manter o bairro sob vigilância ativa.", criteria: "Tenha 10 ocorrências confirmadas pela comunidade.", icon: ShieldCheck, earned: true, earnedAt: "2026-06-12" },
  { id: "recycler", label: "Reciclador", description: "Atuante na causa do descarte correto de resíduos.", criteria: "Registre 5 denúncias da categoria Descarte.", icon: Recycle, earned: true, earnedAt: "2026-06-16" },
  { id: "eco", label: "Eco Herói", description: "O nível máximo de engajamento ambiental.", criteria: "Alcance 1000 XP.", icon: Leaf, earned: false },
  { id: "auditor", label: "Auditor", description: "Especialista em validar ocorrências de outros moradores.", criteria: "Audite 20 ocorrências.", icon: Award, earned: false },
];

export function getBadge(id: string): Badge | undefined {
  return badges.find((b) => b.id === id);
}

export interface NotificationItem {
  id: string;
  text: string;
  date: string;
  unread: boolean;
  /** related occurrence, used for thumbnail + deep link */
  occurrenceId?: string;
}

export const notifications: NotificationItem[] = [
  { id: "1", occurrenceId: "4", text: "Sua ocorrência “Lâmpada queimada na praça” foi resolvida! 🎉", date: "Hoje", unread: true },
  { id: "2", occurrenceId: "4", text: "250 moradores marcaram “Lâmpada queimada na praça” como resolvida.", date: "Ontem", unread: true },
  { id: "3", occurrenceId: "5", text: "46 moradores confirmaram sua ocorrência “Lixo acumulado na orla”.", date: "2 dias atrás", unread: false },
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
  avatar: avatar3,
};
