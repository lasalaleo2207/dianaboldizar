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
  type SkillType
} from "@/lib/ikigai-store";

export function YoWorkspace() {
  const [data, setData] = useState<IkigaiData>(createEmptyIkigaiData);
  const [savedMessage, setSavedMessage] = useState("Sin guardar");
  const progress = useMemo(() => calculateSectionProgress(data.yo), [data.yo]);

  useEffect(() => {
    loadIkigaiDataRemote().then(setData);
  }, []);

  function updateProfile(key: keyof IkigaiData["yo"]["profile"], value: string) {
    setData((current) => ({
      ...current,
      yo: {
        ...current.yo,
        profile: { ...current.yo.profile, [key]: value }
      }
    }));
  }

  function updateSkillType(type: SkillType, skills: string[]) {
    setData((current) => ({
      ...current,
      yo: {
        ...current.yo,
        skillsByType: {
          ...current.yo.skillsByType,
          [type]: skills
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
        eyebrow="Ikigai Clarity / 01.1"
        title="Yo / Persona"
        description="Espacio para capturar identidad base, lo que Diana ama hacer, límites claros y habilidades organizadas por tipo."
        status={progress > 0 ? "En proceso" : "No iniciado"}
        progress={progress}
        actions={
          <button className="button" type="button" onClick={save}>
            <Save size={18} />
            Guardar Yo / Persona
          </button>
        }
      />

      <section className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Formulario vivo</span>
            <h2>Perfil base</h2>
          </div>
          <span className="chip yellow">{savedMessage}</span>
        </div>
        <form className="form-grid">
          <TextField label="Nombre completo" value={data.yo.profile.fullName} onChange={(value) => updateProfile("fullName", value)} />
          <TextField label="Rol actual" value={data.yo.profile.currentRole} onChange={(value) => updateProfile("currentRole", value)} />
        </form>
      </section>

      <section className="grid cols-2">
        <article className="card">
          <span className="eyebrow">Deseo y energía</span>
          <h2>Lo que amo hacer</h2>
          <FieldListEditor
            label="Actividades, temas o dinámicas que ama hacer"
            placeholder="Ej. Facilitar conversaciones profundas"
            values={data.yo.lovesDoing}
            onChange={(lovesDoing) => setData((current) => ({ ...current, yo: { ...current.yo, lovesDoing } }))}
          />
        </article>

        <article className="card">
          <span className="eyebrow">Límites</span>
          <h2>No negociables</h2>
          <FieldListEditor
            label="Lista de no negociables"
            placeholder="Ej. No sostener disponibilidad permanente"
            values={data.yo.nonNegotiables}
            onChange={(nonNegotiables) => setData((current) => ({ ...current, yo: { ...current.yo, nonNegotiables } }))}
          />
        </article>

      </section>

      <section className="card">
        <span className="eyebrow">Cuadrante</span>
        <h2>Habilidades</h2>
        <p style={{ marginTop: 8 }}>Clasifica las habilidades según el tipo de valor que representan para Diana.</p>
        <div className="skill-quadrant">
          {skillTypes.map((item) => (
            <article className="skill-card" key={item.type}>
              <div>
                <span className="chip blue">{item.type}</span>
                <h3>{item.question}</h3>
              </div>
              <FieldListEditor
                label="Habilidades"
                placeholder="Agregar habilidad"
                values={data.yo.skillsByType[item.type]}
                onChange={(skills) => updateSkillType(item.type, skills)}
              />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const skillTypes: Array<{ type: SkillType; question: string }> = [
  { type: "Técnicas", question: "¿Qué sabe hacer concretamente?" },
  { type: "Estratégicas", question: "¿Qué sabe pensar, ordenar o decidir?" },
  { type: "Relacionales", question: "¿Cómo conecta, acompaña o lidera personas?" },
  { type: "Diferenciales", question: "¿Qué hace de manera natural que otros no hacen igual?" }
];

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input className="input" value={value} placeholder="Completar" onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
