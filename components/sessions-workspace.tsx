"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Check, Clock, Mail, RotateCcw, Trash2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type SessionStatus = "Programada" | "Realizada" | "Cancelada";

type SessionRecord = {
  id: string;
  project_id: string;
  title: string;
  session_date: string | null;
  start_at: string | null;
  end_at: string | null;
  objective: string | null;
  prep_required: string | null;
  location: string | null;
  meeting_url: string | null;
  attendees: string[];
  status: SessionStatus;
  notes: string | null;
};

type SessionForm = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  objective: string;
  prepRequired: string;
  attendees: string;
  sendInvite: boolean;
};

const initialForm: SessionForm = {
  title: "",
  date: "",
  startTime: "",
  endTime: "",
  objective: "",
  prepRequired: "",
  attendees: "",
  sendInvite: true
};

const projectName = "Centro de Control Estratégico";

export function SessionsWorkspace() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [form, setForm] = useState<SessionForm>(initialForm);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [message, setMessage] = useState("Cargando sesiones...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const upcomingSessions = useMemo(
    () =>
      sessions
        .filter((session) => session.status === "Programada" && getSessionTime(session) >= startOfToday())
        .sort((a, b) => getSessionTime(a).getTime() - getSessionTime(b).getTime()),
    [sessions]
  );

  const pastSessions = useMemo(
    () =>
      sessions
        .filter((session) => session.status !== "Programada" || getSessionTime(session) < startOfToday())
        .sort((a, b) => getSessionTime(b).getTime() - getSessionTime(a).getTime()),
    [sessions]
  );

  const progress = sessions.length === 0 ? 0 : Math.round((pastSessions.filter((session) => session.status === "Realizada").length / sessions.length) * 100);

  async function loadSessions() {
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
      .from("sessions")
      .select("id, project_id, title, session_date, start_at, end_at, objective, prep_required, location, meeting_url, attendees, status, notes")
      .eq("project_id", project.id)
      .order("start_at", { ascending: true, nullsFirst: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setSessions((data ?? []).map(normalizeSession));
    setMessage((data ?? []).length === 0 ? "Todavía no hay sesiones programadas." : "Sesiones cargadas desde Supabase.");
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

    const startAt = combineDateTime(form.date, form.startTime);
    const endAt = combineDateTime(form.date, form.endTime);

    const { error } = await supabase.from("sessions").insert({
      project_id: projectId,
      title: form.title.trim(),
      session_date: form.date || null,
      start_at: startAt,
      end_at: endAt,
      objective: form.objective.trim() || null,
      prep_required: form.prepRequired.trim() || null,
      location: null,
      meeting_url: null,
      attendees: parseAttendees(form.attendees),
      notes: null,
      status: "Programada"
    });

    setIsSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (form.sendInvite && parseAttendees(form.attendees).length > 0 && startAt && endAt) {
      const inviteResult = await sendInvite({
        title: form.title.trim(),
        objective: form.objective.trim() || null,
        prepRequired: form.prepRequired.trim() || null,
        location: null,
        meetingUrl: null,
        attendees: parseAttendees(form.attendees),
        startAt,
        endAt,
        timeZone: "America/Bogota"
      });

      setMessage(inviteResult);
    } else {
      setMessage("Sesión programada.");
    }

    setForm(initialForm);
    await loadSessions();
  }

  async function updateStatus(sessionId: string, status: SessionStatus) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase.from("sessions").update({ status }).eq("id", sessionId);
    if (error) {
      setMessage(error.message);
      return;
    }
    setSessions((current) => current.map((session) => (session.id === sessionId ? { ...session, status } : session)));
    setMessage(`Sesión marcada como ${status.toLowerCase()}.`);
  }

  async function deleteSession(sessionId: string) {
    const confirmed = window.confirm("¿Eliminar esta sesión?");
    if (!confirmed) return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase.from("sessions").delete().eq("id", sessionId);
    if (error) {
      setMessage(error.message);
      return;
    }
    setSessions((current) => current.filter((session) => session.id !== sessionId));
    setMessage("Sesión eliminada.");
  }

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Registro global"
        title="Sesiones"
        description="Programa, visualiza y da seguimiento a las conversaciones del proceso con Diana."
        status={sessions.length > 0 ? "En proceso" : "No iniciado"}
        progress={progress}
      />

      <section className="grid cols-3">
        <article className="metric-card card">
          <span className="metric-label">Próximas</span>
          <strong className="metric-value">{upcomingSessions.length}</strong>
        </article>
        <article className="metric-card card">
          <span className="metric-label">Realizadas</span>
          <strong className="metric-value">{sessions.filter((session) => session.status === "Realizada").length}</strong>
        </article>
        <article className="metric-card card">
          <span className="metric-label">Total</span>
          <strong className="metric-value">{sessions.length}</strong>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Agenda</span>
            <h2>Programar nueva sesión</h2>
          </div>
          <span className="chip yellow">{message}</span>
        </div>

        <form className="form-grid" onSubmit={handleCreate}>
          <div className="field">
            <label>Título de la sesión</label>
            <input className="input" value={form.title} required placeholder="Ej. Sesión Ikigai Clarity 01" onChange={(event) => updateForm("title", event.target.value)} />
          </div>
          <div className="field">
            <label>Asistentes</label>
            <input className="input" value={form.attendees} placeholder="laura@..., diana@..." onChange={(event) => updateForm("attendees", event.target.value)} />
          </div>
          <div className="field">
            <label>Fecha</label>
            <input className="input" type="date" value={form.date} required onChange={(event) => updateForm("date", event.target.value)} />
          </div>
          <div className="field sessions-time-grid">
            <div>
              <label>Inicio</label>
              <input className="input" type="time" value={form.startTime} required onChange={(event) => updateForm("startTime", event.target.value)} />
            </div>
            <div>
              <label>Fin</label>
              <input className="input" type="time" value={form.endTime} required onChange={(event) => updateForm("endTime", event.target.value)} />
            </div>
          </div>
          <div className="field full">
            <label>Objetivo</label>
            <textarea className="textarea" value={form.objective} placeholder="Qué se quiere resolver o decidir en esta sesión" onChange={(event) => updateForm("objective", event.target.value)} />
          </div>
          <div className="field full">
            <label>Preparación requerida</label>
            <textarea className="textarea" value={form.prepRequired} placeholder="Qué debe revisar, llevar o completar cada persona antes de la sesión" onChange={(event) => updateForm("prepRequired", event.target.value)} />
          </div>
          <label className="check-field full">
            <input
              type="checkbox"
              checked={form.sendInvite}
              onChange={(event) => setForm((current) => ({ ...current, sendInvite: event.target.checked }))}
            />
            Enviar invitación por correo a los asistentes
          </label>
          <div className="field full">
            <button className="button" type="submit" disabled={isSaving}>
              <CalendarPlus size={18} />
              {isSaving ? "Guardando..." : "Programar sesión"}
            </button>
          </div>
        </form>
      </section>

      <section className="grid cols-2">
        <SessionList
          title="Próximas sesiones"
          eyebrow="Agenda activa"
          sessions={upcomingSessions}
          emptyMessage="No hay próximas sesiones programadas."
          onDone={(sessionId) => updateStatus(sessionId, "Realizada")}
          onCancel={(sessionId) => updateStatus(sessionId, "Cancelada")}
          onDelete={deleteSession}
        />
        <SessionList
          title="Historial"
          eyebrow="Seguimiento"
          sessions={pastSessions}
          emptyMessage="No hay sesiones en historial."
          onDone={(sessionId) => updateStatus(sessionId, "Realizada")}
          onCancel={(sessionId) => updateStatus(sessionId, "Cancelada")}
          onDelete={deleteSession}
        />
      </section>
    </div>
  );

  function updateForm(key: keyof SessionForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }
}

async function sendInvite(input: {
  title: string;
  objective: string | null;
  prepRequired: string | null;
  location: string | null;
  meetingUrl: string | null;
  attendees: string[];
  startAt: string;
  endAt: string;
  timeZone: string;
}) {
  try {
    const response = await fetch("/api/sessions/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
    const result = await response.json();

    if (!response.ok) {
      return result?.email?.error ?? result?.error ?? "La sesión se guardó, pero no se pudo enviar la invitación.";
    }

    const googleMessage = result.googleEvent?.skipped ? "Google Calendar pendiente de credenciales" : "evento creado en Google Calendar";
    const emailMessage = result.email?.id ? "correo enviado" : "correo no enviado";
    return `Sesión programada: ${emailMessage}; ${googleMessage}.`;
  } catch {
    return "La sesión se guardó, pero no se pudo enviar la invitación.";
  }
}

function SessionList({
  eyebrow,
  title,
  sessions,
  emptyMessage,
  onDone,
  onCancel,
  onDelete
}: {
  eyebrow: string;
  title: string;
  sessions: SessionRecord[];
  emptyMessage: string;
  onDone: (sessionId: string) => void;
  onCancel: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
}) {
  return (
    <article className="card">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sessions.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : (
        <div className="session-list">
          {sessions.map((session) => (
            <div className="session-item" key={session.id}>
              <div className="session-item-main">
                <div className="session-title-row">
                  <h3>{session.title}</h3>
                  <span className={`chip ${session.status === "Realizada" ? "green" : session.status === "Cancelada" ? "" : "blue"}`}>{session.status}</span>
                </div>
                <p>
                  <Clock size={16} />
                  {formatSessionDate(session)}
                </p>
                {session.objective && <p>{session.objective}</p>}
                {session.prep_required && <p><strong>Preparación:</strong> {session.prep_required}</p>}
                {session.meeting_url && (
                  <a className="session-link" href={session.meeting_url} target="_blank" rel="noreferrer">
                    Abrir enlace de reunión
                  </a>
                )}
                {session.attendees.length > 0 && (
                  <p>
                    <Mail size={16} />
                    {session.attendees.join(", ")}
                  </p>
                )}
              </div>
              <div className="session-actions">
                <button className="icon-button" type="button" title="Marcar realizada" onClick={() => onDone(session.id)}>
                  <Check size={18} />
                </button>
                <button className="icon-button" type="button" title="Cancelar" onClick={() => onCancel(session.id)}>
                  <RotateCcw size={18} />
                </button>
                <button className="icon-button danger" type="button" title="Eliminar" onClick={() => onDelete(session.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function normalizeSession(value: Record<string, unknown>): SessionRecord {
  return {
    id: String(value.id),
    project_id: String(value.project_id),
    title: String(value.title),
    session_date: value.session_date ? String(value.session_date) : null,
    start_at: value.start_at ? String(value.start_at) : null,
    end_at: value.end_at ? String(value.end_at) : null,
    objective: value.objective ? String(value.objective) : null,
    prep_required: value.prep_required ? String(value.prep_required) : null,
    location: value.location ? String(value.location) : null,
    meeting_url: value.meeting_url ? String(value.meeting_url) : null,
    attendees: Array.isArray(value.attendees) ? value.attendees.map(String) : [],
    status: (value.status as SessionStatus) ?? "Programada",
    notes: value.notes ? String(value.notes) : null
  };
}

function parseAttendees(value: string) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function combineDateTime(date: string, time: string) {
  if (!date || !time) return null;
  return new Date(`${date}T${time}:00`).toISOString();
}

function getSessionTime(session: SessionRecord) {
  if (session.start_at) return new Date(session.start_at);
  if (session.session_date) return new Date(`${session.session_date}T00:00:00`);
  return new Date(0);
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function formatSessionDate(session: SessionRecord) {
  const start = getSessionTime(session);
  const date = start.toLocaleDateString("es-CO", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  if (!session.start_at) return date;

  const startTime = start.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
  const endTime = session.end_at ? new Date(session.end_at).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }) : null;
  return `${date} · ${startTime}${endTime ? ` - ${endTime}` : ""}`;
}
