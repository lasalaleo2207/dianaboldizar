"use client";

import { useEffect, useMemo, useState } from "react";
import { Save } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { FieldListEditor } from "@/components/ikigai/field-list-editor";
import {
  calculateSectionProgress,
  createEmptyIkigaiData,
  loadIkigaiDataRemote,
  saveIkigaiDataRemote,
  type IkigaiData,
  type SharedWorldTrait
} from "@/lib/ikigai-store";

export function MundoWorkspace() {
  const [data, setData] = useState<IkigaiData>(createEmptyIkigaiData);
  const [savedMessage, setSavedMessage] = useState("Sin guardar");
  const progress = useMemo(() => calculateSectionProgress(data.mundo), [data.mundo]);

  useEffect(() => {
    loadIkigaiDataRemote().then(setData);
  }, []);

  function updateMundoList(key: "solvableProblems" | "impactWorlds" | "valuePropositions", values: string[]) {
    setData((current) => ({
      ...current,
      mundo: {
        ...current.mundo,
        [key]: values
      }
    }));
  }

  function updateTrait(trait: SharedWorldTrait, values: string[]) {
    setData((current) => ({
      ...current,
      mundo: {
        ...current.mundo,
        sharedTraits: {
          ...current.mundo.sharedTraits,
          [trait]: values
        }
      }
    }));
  }

  async function save() {
    setSavedMessage("Guardando...");
    const savedRemote = await saveIkigaiDataRemote(data);
    const target = savedRemote ? "Supabase" : "local";
    setSavedMessage(`Guardado en ${target} ${new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`);
  }

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Ikigai Clarity / 01.3"
        title="Mundo / Nicho"
        description="Espacio para identificar problemas que Diana puede resolver, mundos que puede impactar y rasgos comunes de esas personas."
        status={progress > 0 ? "En proceso" : "No iniciado"}
        progress={progress}
        actions={
          <button className="button" type="button" onClick={save}>
            <Save size={18} />
            Guardar Mundo / Nicho
          </button>
        }
      />

      <section className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Problemas</span>
            <h2>Qué problemas puedo resolver</h2>
          </div>
          <span className="chip yellow">{savedMessage}</span>
        </div>
        <FieldListEditor
          label="Problemas, tensiones o necesidades que puede resolver"
          placeholder="Ej. Falta de claridad para decidir el siguiente paso profesional"
          values={data.mundo.solvableProblems}
          onChange={(values) => updateMundoList("solvableProblems", values)}
        />
      </section>

      <section className="card">
        <span className="eyebrow">Territorios de impacto</span>
        <h2>Qué mundos puedo impactar</h2>
        <FieldListEditor
          label="Mundos, audiencias o territorios"
          placeholder="Ej. Mujeres profesionales en transición"
          values={data.mundo.impactWorlds}
          onChange={(values) => updateMundoList("impactWorlds", values)}
        />
      </section>

      <section className="card">
        <span className="eyebrow">Características compartidas</span>
        <h2>Personas de los mundos que puedo impactar</h2>
        <p style={{ marginTop: 8 }}>Organiza los rasgos comunes de esas personas según motivaciones, dolores y creencias limitantes.</p>
        <div className="skill-quadrant world-traits">
          {sharedTraits.map((item) => (
            <article className="skill-card" key={item.type}>
              <div>
                <span className="chip blue">{item.type}</span>
                <h3>{item.question}</h3>
              </div>
              <FieldListEditor
                label={item.type}
                placeholder={item.placeholder}
                values={data.mundo.sharedTraits[item.type]}
                onChange={(values) => updateTrait(item.type, values)}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <span className="eyebrow">Propuesta de valor</span>
        <h2>Declaraciones del Yo para los mundos que puedo impactar</h2>
        <FieldListEditor
          label="Mi propuesta de valor"
          placeholder="Ej. Ayudo a [mundo] a [resultado] sin [dolor/fricción]."
          values={data.mundo.valuePropositions}
          onChange={(values) => updateMundoList("valuePropositions", values)}
        />
      </section>
    </div>
  );
}

const sharedTraits: Array<{ type: SharedWorldTrait; question: string; placeholder: string }> = [
  {
    type: "Motivaciones",
    question: "¿Qué desean lograr o cambiar?",
    placeholder: "Ej. Sentirse más seguras al tomar decisiones"
  },
  {
    type: "Dolores",
    question: "¿Qué les duele, frustra o bloquea?",
    placeholder: "Ej. Sentirse estancadas profesionalmente"
  },
  {
    type: "Creencias limitantes",
    question: "¿Qué creen que no pueden hacer o sostener?",
    placeholder: "Ej. Creer que ya es tarde para cambiar de camino"
  }
];
