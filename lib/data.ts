import {
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckSquare,
  FileText,
  Megaphone,
  Network,
  Palette,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users
} from "lucide-react";

export type Status = "No iniciado" | "En proceso" | "En revisión" | "Validado" | "Cerrado" | "Completado";

export const project = {
  name: "Centro de Control Estratégico",
  client: "Diana Boldizar",
  currentPhase: "Ikigai Clarity",
  status: "No iniciado",
  progress: 0,
  updatedAt: "4 de junio de 2026"
};

export const modules = [
  {
    name: "Ikigai Clarity",
    slug: "/modules/ikigai-clarity",
    description: "Claridad profunda sobre identidad, oferta, nicho y medios antes de construir el sistema comercial.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: Sparkles
  },
  {
    name: "Business / Oferta",
    slug: "/modules/business",
    description: "Arquitectura comercial, productos, servicios, pricing, promesa y modelo operativo.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: BriefcaseBusiness
  },
  {
    name: "Marca Personal",
    slug: "/modules/marca-personal",
    description: "Narrativa, territorio, tono, bio, mensajes clave y percepción deseada en el mercado.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: Palette
  },
  {
    name: "Sistema de Ventas",
    slug: "/modules/sistema-ventas",
    description: "Funnel, CRM, llamadas, propuestas, seguimiento, objeciones y métricas comerciales.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: TrendingUp
  },
  {
    name: "Medios & Posicionamiento",
    slug: "/modules/medios",
    description: "Estrategia de contenido, newsletter, web, colaboraciones, PR, eventos y autoridad.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: Megaphone
  },
  {
    name: "Implementación & Seguimiento",
    slug: "/modules/implementacion",
    description: "Roadmap, sprints, métricas, aprendizajes, riesgos, resultados y optimización.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: Rocket
  }
];

export const ikigaiSubmodules = [
  {
    name: "Yo / Persona",
    slug: "/modules/ikigai-clarity/yo",
    description: "Perfil base, historia profesional, habilidades, energía, límites y declaraciones del yo.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: Users
  },
  {
    name: "Oferta",
    slug: "/modules/ikigai-clarity/oferta",
    description: "Problemas que puede resolver, oportunidades de oferta y matriz de priorización.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: Target
  },
  {
    name: "Mundo / Nicho",
    slug: "/modules/ikigai-clarity/mundo",
    description: "Mapas de nichos, fichas, dolores, motivaciones, objeciones y oportunidad.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: Network
  },
  {
    name: "Medio",
    slug: "/modules/ikigai-clarity/medio",
    description: "Ecosistema de medios, rol por canal, funnel preliminar y activos mínimos.",
    status: "No iniciado" as Status,
    progress: 0,
    icon: Megaphone
  }
];

export const sessions: Array<{
  date: string;
  title: string;
  module: string;
  objective: string;
  prep: string;
}> = [];

export const tasks: Array<{
  title: string;
  assignee: string;
  module: string;
  due: string;
  status: string;
  priority: string;
}> = [];

export const decisions: Array<{
  title: string;
  module: string;
  date: string;
  status: string;
}> = [];

export const deliverables: Array<{
  title: string;
  module: string;
  type: string;
  status: string;
  version: string;
  date: string;
}> = [];

export const skillsRows: Array<{
  skill: string;
  type: string;
  evidence: string;
  level: number;
  energy: string;
  monetizable: string;
}> = [];

export const energyRows: Array<{
  activity: string;
  gives: string;
  drains: string;
  commercial: string;
  model: string;
}> = [];

export const nonNegotiables: string[] = [];

export const offerIdeas: Array<{
  idea: string;
  desire: number;
  demand: number;
  ease: number;
  profit: number;
  priority: number;
}> = [];

export const niches: Array<{
  name: string;
  description: string;
  potential: string;
  risk: string;
}> = [];

export const channels: Array<{
  channel: string;
  role: string;
  objective: string;
  frequency: string;
  metric: string;
}> = [];

export const navPrimary = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/modules/ikigai-clarity", label: "Ikigai Clarity", icon: Sparkles },
  { href: "/sessions", label: "Sesiones", icon: CalendarDays },
  { href: "/tasks", label: "Tareas", icon: CheckSquare },
  { href: "/decisions", label: "Decisiones", icon: BookOpenCheck },
  { href: "/deliverables", label: "Entregables", icon: FileText }
];
