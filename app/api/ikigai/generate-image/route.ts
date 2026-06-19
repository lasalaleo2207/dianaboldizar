import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { calculateSectionProgress, type IkigaiData } from "@/lib/ikigai-store";

export const runtime = "nodejs";
export const maxDuration = 180;
const GENERATION_TIMEOUT_MS = 150_000;
const JOB_TTL_MS = 30 * 60_000;

type GenerationJob = {
  status: "pending" | "completed" | "failed";
  createdAt: number;
  imageBase64?: string;
  error?: string;
};

const generationJobs = new Map<string, GenerationJob>();

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as IkigaiData;

    const sectionProgress = [
      calculateSectionProgress(data.yo),
      calculateSectionProgress(data.oferta),
      calculateSectionProgress(data.mundo),
      calculateSectionProgress(data.medio)
    ];

    if (sectionProgress.some((value) => value < 100)) {
      return NextResponse.json({ error: "Completa las cuatro etapas de Ikigai Clarity antes de generar la imagen." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Falta OPENAI_API_KEY en .env.local." }, { status: 500 });
    }

    cleanupExpiredJobs();
    const jobId = randomUUID();
    generationJobs.set(jobId, { status: "pending", createdAt: Date.now() });
    void generateImage(jobId, data);

    return NextResponse.json({ jobId }, { status: 202 });
  } catch (error) {
    console.error("Ikigai image job creation error", error);
    return NextResponse.json({ error: getGenerationErrorMessage(error) }, { status: 500 });
  }
}

export async function GET(request: Request) {
  cleanupExpiredJobs();
  const jobId = new URL(request.url).searchParams.get("jobId");
  const job = jobId ? generationJobs.get(jobId) : null;

  if (!job) {
    return NextResponse.json({ error: "No se encontró la generación solicitada." }, { status: 404 });
  }

  return NextResponse.json({
    status: job.status,
    imageBase64: job.imageBase64,
    error: job.error
  });
}

async function generateImage(jobId: string, data: IkigaiData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GENERATION_TIMEOUT_MS);

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: buildPrompt(data),
        size: "1024x688",
        quality: "low",
        output_format: "png",
        n: 1
      })
    });
    const result = await response.json() as {
      data?: Array<{ b64_json?: string }>;
      error?: { message?: string; code?: string };
    };

    if (!response.ok) {
      throw new Error(result.error?.message ?? `OpenAI respondió HTTP ${response.status}.`);
    }

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      throw new Error("OpenAI no devolvió una imagen.");
    }

    generationJobs.set(jobId, {
      status: "completed",
      createdAt: Date.now(),
      imageBase64
    });
  } catch (error) {
    console.error("Ikigai image generation error", error);
    generationJobs.set(jobId, {
      status: "failed",
      createdAt: Date.now(),
      error: getGenerationErrorMessage(error)
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function cleanupExpiredJobs() {
  const cutoff = Date.now() - JOB_TTL_MS;
  for (const [jobId, job] of generationJobs) {
    if (job.createdAt < cutoff) generationJobs.delete(jobId);
  }
}

function getGenerationErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.name === "AbortError" || error.message.toLowerCase().includes("timeout")) {
      return "OpenAI tardó demasiado generando la imagen. Intenta de nuevo en unos minutos.";
    }

    return `No se pudo generar la imagen: ${error.message}`;
  }

  return "No se pudo generar la imagen por un error inesperado.";
}

function buildPrompt(data: IkigaiData) {
  return `
Genera una infografía horizontal 3:2, formato PNG, profesional y editorial, titulada "Ikigai Clarity".

Debe resumir visualmente las cuatro etapas del proceso de Diana Boldizar:
1. YO / PERSONA
2. OFERTA
3. MUNDO / NICHO
4. MEDIO

Usa el sistema visual de Vena Digital:
- azul profundo #0A2142
- coral #FF6B5E
- amarillo #F5C935
- marfil #F7F5EF
- estilo limpio, premium, consultoría estratégica
- tarjetas de borde suave, líneas finas, iconografía simple, acentos geométricos
- composición horizontal con cuatro columnas conectadas por flechas sutiles
- incluir el personaje femenino profesional ilustrado de referencia como figura lateral integrada, no dominante

La imagen debe ser un resumen visual claro, no una captura de pantalla. Debe usar texto breve, legible y bien jerarquizado.

Contenido a resumir:

YO / PERSONA
Nombre: ${data.yo.profile.fullName}
Rol actual: ${data.yo.profile.currentRole}
Lo que ama hacer: ${formatList(data.yo.lovesDoing)}
No negociables: ${formatList(data.yo.nonNegotiables)}
Habilidades técnicas: ${formatList(data.yo.skillsByType.Técnicas)}
Habilidades estratégicas: ${formatList(data.yo.skillsByType.Estratégicas)}
Habilidades relacionales: ${formatList(data.yo.skillsByType.Relacionales)}
Habilidades diferenciales: ${formatList(data.yo.skillsByType.Diferenciales)}

OFERTA
Lo que el mundo necesita: ${formatList(data.oferta.worldNeeds)}
Por lo que le pueden pagar: ${formatList(data.oferta.paidFor)}
Productos / servicios: ${formatList(data.oferta.productsServices)}

MUNDO / NICHO
Problemas que puede resolver: ${formatList(data.mundo.solvableProblems)}
Mundos que puede impactar: ${formatList(data.mundo.impactWorlds)}
Motivaciones: ${formatList(data.mundo.sharedTraits.Motivaciones)}
Dolores: ${formatList(data.mundo.sharedTraits.Dolores)}
Creencias limitantes: ${formatList(data.mundo.sharedTraits["Creencias limitantes"])}
Propuesta de valor: ${formatList(data.mundo.valuePropositions)}

MEDIO
Activos actuales: ${formatList(data.medio.currentAssets)}
Medios de venta efectivos: ${formatList(data.medio.effectiveSalesMedia)}
Medios considerados: ${formatList(data.medio.consideredMedia)}

Evita saturar la imagen. Sintetiza contenido largo en frases cortas, usa máximo 3 bullets por bloque si hay demasiada información. Crea una ilustración editorial del personaje femenino profesional como figura lateral integrada, sin depender de una imagen de referencia externa.
`;
}

function formatList(values: string[]) {
  return values.filter(Boolean).slice(0, 6).join("; ");
}
