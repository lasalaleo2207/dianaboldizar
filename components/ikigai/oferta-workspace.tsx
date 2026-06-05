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

export function OfertaWorkspace() {
  const [data, setData] = useState<IkigaiData>(createEmptyIkigaiData);
  const [savedMessage, setSavedMessage] = useState("Sin guardar");
  const progress = useMemo(() => calculateSectionProgress(data.oferta), [data.oferta]);

  useEffect(() => {
    loadIkigaiDataRemote().then(setData);
  }, []);

  function updateOfertaList(key: keyof IkigaiData["oferta"], values: string[]) {
    setData((current) => ({
      ...current,
      oferta: {
        ...current.oferta,
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
        eyebrow="Ikigai Clarity / 01.2"
        title="Oferta"
        description="Espacio para ordenar lo que el mundo necesita, aquello por lo que pueden pagarle a Diana y sus posibles productos o servicios."
        status={progress > 0 ? "En proceso" : "No iniciado"}
        progress={progress}
        actions={
          <button className="button" type="button" onClick={save}>
            <Save size={18} />
            Guardar Oferta
          </button>
        }
      />

      <section className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Lectura del mercado</span>
            <h2>Lo que el mundo necesita</h2>
          </div>
          <span className="chip yellow">{savedMessage}</span>
        </div>
        <FieldListEditor
          label="Necesidades, dolores o demandas detectadas"
          placeholder="Ej. Claridad para tomar decisiones profesionales"
          values={data.oferta.worldNeeds}
          onChange={(values) => updateOfertaList("worldNeeds", values)}
        />
      </section>

      <section className="grid cols-2">
        <article className="card">
          <span className="eyebrow">Valor monetizable</span>
          <h2>Por lo que me pueden pagar</h2>
          <FieldListEditor
            label="Resultados o soluciones pagables"
            placeholder="Ej. Diagnóstico estratégico personalizado"
            values={data.oferta.paidFor}
            onChange={(values) => updateOfertaList("paidFor", values)}
          />
        </article>

        <article className="card">
          <span className="eyebrow">Inventario comercial</span>
          <h2>Mis productos / servicios</h2>
          <FieldListEditor
            label="Productos, servicios o formatos posibles"
            placeholder="Ej. Mentoría 1:1"
            values={data.oferta.productsServices}
            onChange={(values) => updateOfertaList("productsServices", values)}
          />
        </article>
      </section>
    </div>
  );
}
