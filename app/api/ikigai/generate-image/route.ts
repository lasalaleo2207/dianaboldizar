import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { calculateSectionProgress, type IkigaiData } from "@/lib/ikigai-store";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
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

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = buildPrompt(data);
  const characterImage = readCharacterImage();

  const response = await client.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          ...(characterImage ? [{ type: "input_image" as const, image_url: characterImage, detail: "high" as const }] : [])
        ]
      }
    ],
    tools: [
      {
        type: "image_generation",
        size: "1536x1024",
        quality: "high"
      }
    ],
    tool_choice: { type: "image_generation" }
  });

  const imageBase64 = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result)
    .find(Boolean);

  if (!imageBase64) {
    return NextResponse.json({ error: "OpenAI no devolvió una imagen." }, { status: 502 });
  }

  return NextResponse.json({ imageBase64 });
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

Evita saturar la imagen. Sintetiza contenido largo en frases cortas, usa máximo 3 bullets por bloque si hay demasiada información.
`;
}

function formatList(values: string[]) {
  return values.filter(Boolean).slice(0, 6).join("; ");
}

function readCharacterImage() {
  const candidates = [
    path.join(process.cwd(), "public", "assets", "diana-dibujo.png"),
    path.join(process.cwd(), "Assets", "Diana_dibujo.png")
  ];
  const imagePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!imagePath) return null;
  const base64 = fs.readFileSync(imagePath).toString("base64");
  return `data:image/png;base64,${base64}`;
}
