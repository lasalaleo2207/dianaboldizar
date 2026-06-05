"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ImageDown } from "lucide-react";
import { ModuleCard } from "@/components/module-card";
import { PageHero } from "@/components/page-hero";
import { ikigaiSubmodules } from "@/lib/data";
import {
  calculateIkigaiProgress,
  calculateSectionProgress,
  createEmptyIkigaiData,
  loadIkigaiDataRemote,
  type IkigaiData
} from "@/lib/ikigai-store";

export function IkigaiOverview() {
  const [data, setData] = useState<IkigaiData>(createEmptyIkigaiData);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadIkigaiDataRemote().then(setData);
  }, []);

  const progress = useMemo(() => calculateIkigaiProgress(data), [data]);
  const sectionProgress = {
    "Yo / Persona": calculateSectionProgress(data.yo),
    Oferta: calculateSectionProgress(data.oferta),
    "Mundo / Nicho": calculateSectionProgress(data.mundo),
    Medio: calculateSectionProgress(data.medio)
  };
  const isComplete = Object.values(sectionProgress).every((value) => value === 100);

  async function generateIkigaiImage() {
    setIsGenerating(true);
    setMessage("Generando imagen...");
    setImageUrl(null);

    const response = await fetch("/api/ikigai/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    setIsGenerating(false);

    if (!response.ok) {
      setMessage(result?.error ?? "No se pudo generar la imagen.");
      return;
    }

    setImageUrl(`data:image/png;base64,${result.imageBase64}`);
    setMessage("Imagen generada.");
  }

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Módulo 01"
        title="Ikigai Clarity"
        description="Claridad profunda sobre quién es Diana, qué sabe hacer, qué quiere sostener, qué problemas puede resolver, qué nichos puede impactar y por dónde transmitir su mensaje."
        image="/assets/ikigai-clarity.png"
        imageFit="contain"
        status={progress > 0 ? "En proceso" : "No iniciado"}
        progress={progress}
        actions={
          <>
            <Link className="button" href="/modules/ikigai-clarity/yo">Trabajar Yo / Persona</Link>
            <button
              className="button ghost"
              type="button"
              disabled={!isComplete || isGenerating}
              title={isComplete ? "Generar resumen visual" : "Completa las 4 etapas para habilitar este botón"}
              onClick={generateIkigaiImage}
            >
              <ImageDown size={18} />
              {isGenerating ? "Generando..." : "Generar Ikigai en imagen"}
            </button>
          </>
        }
      />

      <section className="grid cols-4">
        {ikigaiSubmodules.map((item) => {
          const calculated = sectionProgress[item.name as keyof typeof sectionProgress] ?? 0;
          return (
            <ModuleCard
              key={item.slug}
              name={item.name}
              description={item.description}
              status={calculated > 0 ? "En proceso" : "No iniciado"}
              progress={calculated}
              href={item.slug}
              icon={item.icon}
            />
          );
        })}
      </section>

      {(message || imageUrl) && (
        <section className="card">
          <div className="card-header">
            <div>
              <span className="eyebrow">Resumen visual</span>
              <h2>Ikigai en imagen</h2>
            </div>
            {message && <span className="chip yellow">{message}</span>}
          </div>
          {imageUrl && (
            <div className="generated-image-preview">
              <img src={imageUrl} alt="Infografía generada de Ikigai Clarity" />
              <a className="button compact" href={imageUrl} download="ikigai-clarity-diana-boldizar.png">Descargar imagen</a>
            </div>
          )}
        </section>
      )}

    </div>
  );
}
