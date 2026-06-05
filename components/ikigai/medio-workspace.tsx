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
  type IkigaiData
} from "@/lib/ikigai-store";

export function MedioWorkspace() {
  const [data, setData] = useState<IkigaiData>(createEmptyIkigaiData);
  const [savedMessage, setSavedMessage] = useState("Sin guardar");
  const progress = useMemo(() => calculateSectionProgress(data.medio), [data.medio]);

  useEffect(() => {
    loadIkigaiDataRemote().then(setData);
  }, []);

  function updateMedioList(key: keyof IkigaiData["medio"], values: string[]) {
    setData((current) => ({
      ...current,
      medio: {
        ...current.medio,
        [key]: values
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
        eyebrow="Ikigai Clarity / 01.4"
        title="Medio"
        description="Espacio para mapear los activos actuales, los medios que ya han vendido de forma efectiva y los canales considerados pero no implementados."
        status={progress > 0 ? "En proceso" : "No iniciado"}
        progress={progress}
        actions={
          <button className="button" type="button" onClick={save}>
            <Save size={18} />
            Guardar Medio
          </button>
        }
      />

      <section className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Inventario actual</span>
            <h2>Cuáles son mis activos hoy</h2>
          </div>
          <span className="chip yellow">{savedMessage}</span>
        </div>
        <FieldListEditor
          label="Activos digitales / físicos"
          placeholder="Ej. Página web, base de datos, charlas, comunidad, Instagram"
          values={data.medio.currentAssets}
          onChange={(values) => updateMedioList("currentAssets", values)}
        />
      </section>

      <section className="grid cols-2">
        <article className="card">
          <span className="eyebrow">Venta validada</span>
          <h2>Cómo y por qué medios he vendido de manera efectiva mi oferta</h2>
          <FieldListEditor
            label="Medios o dinámicas que ya han vendido"
            placeholder="Ej. Referidos, conversaciones 1:1, talleres presenciales"
            values={data.medio.effectiveSalesMedia}
            onChange={(values) => updateMedioList("effectiveSalesMedia", values)}
          />
        </article>

        <article className="card">
          <span className="eyebrow">Pendiente por explorar</span>
          <h2>Qué medios he considerado pero no he implementado y por qué</h2>
          <FieldListEditor
            label="Medios considerados y razón de no implementación"
            placeholder="Ej. Newsletter - no he definido frecuencia ni tema central"
            values={data.medio.consideredMedia}
            onChange={(values) => updateMedioList("consideredMedia", values)}
          />
        </article>
      </section>
    </div>
  );
}
