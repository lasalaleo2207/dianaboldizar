"use client";

import { useEffect, useMemo, useState } from "react";
import { FilePenLine, Trash2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type DecisionStatus = "Provisional" | "Validada";

type DecisionRecord = {
  id: string;
  title: string;
  context: string | null;
  status: DecisionStatus;
  created_at: string;
};

type DecisionForm = {
  title: string;
  stage: string;
};

const initialForm: DecisionForm = {
  title: "",
  stage: "Ikigai Clarity"
};

const projectName = "Centro de Control Estratégico";
const stages = ["Ikigai Clarity", "Business", "Marca Personal", "Sistema de Ventas", "Medios", "Implementación"];

export function DecisionsWorkspace() {
  const [decisions, setDecisions] = useState<DecisionRecord[]>([]);
  const [form, setForm] = useState<DecisionForm>(initialForm);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [message, setMessage] = useState("Cargando decisiones...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadDecisions();
  }, []);

  const progress = useMemo(() => (decisions.length > 0 ? 100 : 0), [decisions.length]);

  async function loadDecisions() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Supabase no está configurado.");
      return;
    }

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("name", projectName)
      .limit(1)
      .maybeSingle();

    if (projectError || !project?.id) {
      setMessage("No se encontró el proyecto base en Supabase.");
      return;
    }

    setProjectId(project.id as string);

    const { data, error } = await supabase
      .from("decisions")
      .select("id, title, context, status, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setDecisions((data ?? []).map(normalizeDecision));
    setMessage((data ?? []).length === 0 ? "Todavía no hay decisiones registradas." : "Decisiones cargadas desde Supabase.");
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!projectId) {
      setMessage("No se puede guardar hasta cargar el proyecto.");
      return;
    }

    setIsSaving(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase.from("decisions").insert({
      project_id: projectId,
      title: form.title.trim(),
      context: form.stage,
      status: "Provisional",
      decided_at: new Date().toISOString().slice(0, 10)
    });

    setIsSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setForm(initialForm);
    setMessage("Decisión registrada.");
    await loadDecisions();
  }

  async function deleteDecision(decisionId: string) {
    const confirmed = window.confirm("¿Eliminar esta decisión?");
    if (!confirmed) return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase.from("decisions").delete().eq("id", decisionId);
    if (error) {
      setMessage(error.message);
      return;
    }

    setDecisions((current) => current.filter((decision) => decision.id !== decisionId));
    setMessage("Decisión eliminada.");
  }

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Trazabilidad estratégica"
        title="Decisiones"
        description="Registra decisiones tomadas y la etapa del proyecto a la que pertenecen."
        status={decisions.length > 0 ? "En proceso" : "No iniciado"}
        progress={progress}
      />

      <section className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Nueva decisión</span>
            <h2>Registrar decisión</h2>
          </div>
          <span className="chip yellow">{message}</span>
        </div>

        <form className="form-grid" onSubmit={handleCreate}>
          <div className="field full">
            <label>Decisión tomada</label>
            <textarea className="textarea" value={form.title} required placeholder="Escribe la decisión concreta" onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          </div>
          <div className="field full">
            <label>Etapa</label>
            <select className="select" value={form.stage} onChange={(event) => setForm((current) => ({ ...current, stage: event.target.value }))}>
              {stages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
          <div className="field full">
            <button className="button" type="submit" disabled={isSaving}>
              <FilePenLine size={18} />
              {isSaving ? "Guardando..." : "Registrar decisión"}
            </button>
          </div>
        </form>
      </section>

      {decisions.length > 0 && <DecisionList decisions={decisions} onDelete={deleteDecision} />}
    </div>
  );
}

function DecisionList({
  decisions,
  onDelete
}: {
  decisions: DecisionRecord[];
  onDelete: (decisionId: string) => void;
}) {
  return (
    <article className="card">
      <span className="eyebrow">Registro</span>
      <h2>Decisiones registradas</h2>
      <div className="decision-list">
        {decisions.map((decision) => (
          <div className="decision-item" key={decision.id}>
            <div className="decision-item-main">
              <div className="session-title-row">
                <h3>{decision.title}</h3>
                <span className="chip blue">{decision.context ?? "Sin etapa"}</span>
              </div>
            </div>
            <div className="session-actions">
              <button className="icon-button danger" type="button" title="Eliminar" onClick={() => onDelete(decision.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function normalizeDecision(value: Record<string, unknown>): DecisionRecord {
  return {
    id: String(value.id),
    title: String(value.title),
    context: value.context ? String(value.context) : null,
    status: (value.status as DecisionStatus) ?? "Provisional",
    created_at: String(value.created_at)
  };
}
