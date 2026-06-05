import { createSupabaseBrowserClient } from "@/lib/supabase";

export type SkillType = "Técnicas" | "Estratégicas" | "Relacionales" | "Diferenciales";

export type SkillQuadrant = Record<SkillType, string[]>;

export type SharedWorldTrait = "Motivaciones" | "Dolores" | "Creencias limitantes";

export type SharedWorldTraits = Record<SharedWorldTrait, string[]>;

export type IkigaiData = {
  yo: {
    profile: {
      fullName: string;
      currentRole: string;
    };
    lovesDoing: string[];
    nonNegotiables: string[];
    skillsByType: SkillQuadrant;
  };
  oferta: {
    worldNeeds: string[];
    paidFor: string[];
    productsServices: string[];
  };
  mundo: {
    solvableProblems: string[];
    impactWorlds: string[];
    sharedTraits: SharedWorldTraits;
    valuePropositions: string[];
  };
  medio: {
    currentAssets: string[];
    effectiveSalesMedia: string[];
    consideredMedia: string[];
  };
  updatedAt: string | null;
};

const STORAGE_KEY = "centro-control-ikigai";
const PROJECT_NAME = "Centro de Control Estratégico";

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createEmptyIkigaiData(): IkigaiData {
  return {
    yo: {
      profile: {
        fullName: "",
        currentRole: ""
      },
      lovesDoing: [],
      nonNegotiables: [],
      skillsByType: {
        Técnicas: [],
        Estratégicas: [],
        Relacionales: [],
        Diferenciales: []
      }
    },
    oferta: {
      worldNeeds: [],
      paidFor: [],
      productsServices: []
    },
    mundo: {
      solvableProblems: [],
      impactWorlds: [],
      sharedTraits: {
        Motivaciones: [],
        Dolores: [],
        "Creencias limitantes": []
      },
      valuePropositions: []
    },
    medio: {
      currentAssets: [],
      effectiveSalesMedia: [],
      consideredMedia: []
    },
    updatedAt: null
  };
}

export function loadIkigaiData(): IkigaiData {
  if (typeof window === "undefined") return createEmptyIkigaiData();

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return createEmptyIkigaiData();

  try {
    return mergeIkigaiData(createEmptyIkigaiData(), JSON.parse(stored) as Partial<IkigaiData>);
  } catch {
    return createEmptyIkigaiData();
  }
}

export function saveIkigaiData(data: IkigaiData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }));
}

export function resetIkigaiData() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export async function loadIkigaiDataRemote(): Promise<IkigaiData> {
  const localData = loadIkigaiData();
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return localData;

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return localData;

  const projectId = await getProjectId();
  if (!projectId) return localData;

  const { data, error } = await supabase
    .from("ikigai_clarity")
    .select("data, updated_at")
    .eq("project_id", projectId)
    .maybeSingle();

  if (error || !data?.data) return localData;

  return mergeIkigaiData(createEmptyIkigaiData(), data.data as Partial<IkigaiData>);
}

export async function saveIkigaiDataRemote(data: IkigaiData): Promise<boolean> {
  const updatedData = { ...data, updatedAt: new Date().toISOString() };
  saveIkigaiData(updatedData);

  const supabase = createSupabaseBrowserClient();
  if (!supabase) return false;

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return false;

  const projectId = await getProjectId();
  if (!projectId) return false;

  const { error } = await supabase
    .from("ikigai_clarity")
    .upsert(
      {
        project_id: projectId,
        data: updatedData,
        updated_by: user.id,
        updated_at: updatedData.updatedAt
      },
      { onConflict: "project_id" }
    );

  return !error;
}

export async function resetIkigaiDataRemote(): Promise<boolean> {
  resetIkigaiData();

  const supabase = createSupabaseBrowserClient();
  if (!supabase) return false;

  const projectId = await getProjectId();
  if (!projectId) return false;

  const { error } = await supabase.from("ikigai_clarity").delete().eq("project_id", projectId);
  return !error;
}

export function calculateSectionProgress(value: unknown) {
  const allValues = flattenValues(value);
  if (allValues.length === 0) return 0;
  const filled = allValues.filter((item) => String(item).trim().length > 0).length;
  return Math.round((filled / allValues.length) * 100);
}

export function calculateIkigaiProgress(data: IkigaiData) {
  const sections = [
    calculateSectionProgress(data.yo),
    calculateSectionProgress(data.oferta),
    calculateSectionProgress(data.mundo),
    calculateSectionProgress(data.medio)
  ];
  return Math.round(sections.reduce((sum, item) => sum + item, 0) / sections.length);
}

function flattenValues(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenValues(item));
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !["id", "updatedAt"].includes(key))
      .flatMap(([, item]) => flattenValues(item));
  }

  if (value === null || value === undefined) return [""];
  return [String(value)];
}

async function getProjectId(): Promise<string | null> {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("id")
    .eq("name", PROJECT_NAME)
    .limit(1)
    .maybeSingle();

  if (error || !data?.id) return null;
  return data.id as string;
}

function mergeIkigaiData(base: IkigaiData, stored: Partial<IkigaiData>): IkigaiData {
  const storedYo = stored.yo as Partial<IkigaiData["yo"]> & {
    skills?: Array<{ skill?: string; type?: string }>;
    energy?: unknown;
    statements?: unknown;
  } | undefined;
  const storedOferta = stored.oferta as Partial<IkigaiData["oferta"]> & {
    problems?: Array<{ problem?: string }>;
    offers?: Array<{ name?: string }>;
    priorities?: Array<{ idea?: string }>;
  } | undefined;
  const storedMundo = stored.mundo as Partial<IkigaiData["mundo"]> & {
    worlds?: Array<{ name?: string }>;
    niches?: Array<{
      name?: string;
      motivations?: string;
      mainPain?: string;
      objections?: string;
    }>;
    statements?: string[];
  } | undefined;
  const storedMedio = stored.medio as Partial<IkigaiData["medio"]> & {
    channels?: Array<{ channel?: string; objective?: string }>;
    funnel?: Array<{ stage?: string; asset?: string }>;
    assets?: string[];
    roadmap?: string;
  } | undefined;
  const migratedSkills = migrateSkills(storedYo);
  const migratedOferta = migrateOferta(storedOferta);
  const migratedMundo = migrateMundo(storedMundo);
  const migratedMedio = migrateMedio(storedMedio);

  return {
    ...base,
    ...stored,
    yo: {
      profile: { ...base.yo.profile, ...storedYo?.profile },
      lovesDoing: storedYo?.lovesDoing ?? [],
      nonNegotiables: storedYo?.nonNegotiables ?? [],
      skillsByType: {
        ...base.yo.skillsByType,
        ...migratedSkills,
        ...storedYo?.skillsByType
      }
    },
    oferta: {
      ...base.oferta,
      ...migratedOferta,
      worldNeeds: storedOferta?.worldNeeds ?? migratedOferta.worldNeeds,
      paidFor: storedOferta?.paidFor ?? migratedOferta.paidFor,
      productsServices: storedOferta?.productsServices ?? migratedOferta.productsServices
    },
    mundo: {
      ...base.mundo,
      ...migratedMundo,
      solvableProblems: storedMundo?.solvableProblems ?? migratedMundo.solvableProblems,
      impactWorlds: storedMundo?.impactWorlds ?? migratedMundo.impactWorlds,
      sharedTraits: {
        ...base.mundo.sharedTraits,
        ...migratedMundo.sharedTraits,
        ...storedMundo?.sharedTraits
      },
      valuePropositions: storedMundo?.valuePropositions ?? migratedMundo.valuePropositions
    },
    medio: {
      ...base.medio,
      ...migratedMedio,
      currentAssets: storedMedio?.currentAssets ?? migratedMedio.currentAssets,
      effectiveSalesMedia: storedMedio?.effectiveSalesMedia ?? migratedMedio.effectiveSalesMedia,
      consideredMedia: storedMedio?.consideredMedia ?? migratedMedio.consideredMedia
    }
  };
}

function migrateMedio(storedMedio: (Partial<IkigaiData["medio"]> & {
  channels?: Array<{ channel?: string; objective?: string }>;
  funnel?: Array<{ stage?: string; asset?: string }>;
  assets?: string[];
  roadmap?: string;
}) | undefined): IkigaiData["medio"] {
  return {
    currentAssets: storedMedio?.assets?.filter(Boolean) ?? [],
    effectiveSalesMedia: storedMedio?.channels?.map((row) => [row.channel, row.objective].filter(Boolean).join(" - ")).filter(Boolean) ?? [],
    consideredMedia: [
      ...(storedMedio?.funnel?.map((row) => [row.stage, row.asset].filter(Boolean).join(" - ")).filter(Boolean) ?? []),
      ...(storedMedio?.roadmap ? [storedMedio.roadmap] : [])
    ]
  };
}

function migrateMundo(storedMundo: (Partial<IkigaiData["mundo"]> & {
  worlds?: Array<{ name?: string }>;
  niches?: Array<{
    name?: string;
    motivations?: string;
    mainPain?: string;
    objections?: string;
  }>;
  statements?: string[];
}) | undefined): IkigaiData["mundo"] {
  return {
    solvableProblems: storedMundo?.statements?.filter(Boolean) ?? [],
    impactWorlds: [
      ...(storedMundo?.worlds?.map((row) => row.name ?? "").filter(Boolean) ?? []),
      ...(storedMundo?.niches?.map((row) => row.name ?? "").filter(Boolean) ?? [])
    ],
    sharedTraits: {
      Motivaciones: storedMundo?.niches?.map((row) => row.motivations ?? "").filter(Boolean) ?? [],
      Dolores: storedMundo?.niches?.map((row) => row.mainPain ?? "").filter(Boolean) ?? [],
      "Creencias limitantes": storedMundo?.niches?.map((row) => row.objections ?? "").filter(Boolean) ?? []
    },
    valuePropositions: storedMundo?.statements?.filter(Boolean) ?? []
  };
}

function migrateOferta(storedOferta: (Partial<IkigaiData["oferta"]> & {
  problems?: Array<{ problem?: string }>;
  offers?: Array<{ name?: string }>;
  priorities?: Array<{ idea?: string }>;
}) | undefined): IkigaiData["oferta"] {
  return {
    worldNeeds: storedOferta?.problems?.map((row) => row.problem ?? "").filter(Boolean) ?? [],
    paidFor: storedOferta?.priorities?.map((row) => row.idea ?? "").filter(Boolean) ?? [],
    productsServices: storedOferta?.offers?.map((row) => row.name ?? "").filter(Boolean) ?? []
  };
}

function migrateSkills(storedYo: (Partial<IkigaiData["yo"]> & { skills?: Array<{ skill?: string; type?: string }> }) | undefined) {
  const migrated = createEmptyIkigaiData().yo.skillsByType;
  if (!storedYo?.skills) return migrated;

  storedYo.skills.forEach((row) => {
    const skill = row.skill?.trim();
    if (!skill) return;
    const type = normalizeSkillType(row.type);
    migrated[type] = [...migrated[type], skill];
  });

  return migrated;
}

function normalizeSkillType(type: string | undefined): SkillType {
  if (type === "Técnica") return "Técnicas";
  if (type === "Estratégica") return "Estratégicas";
  if (type === "Relacional") return "Relacionales";
  if (type === "Diferencial") return "Diferenciales";
  if (type === "Técnicas" || type === "Estratégicas" || type === "Relacionales" || type === "Diferenciales") return type;
  return "Técnicas";
}
