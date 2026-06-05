"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ListTodo, Mail, Trash2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type PlatformUser = {
  id: string;
  fullName: string;
  email: string;
  status: "active" | "inactive";
};

type TaskRecord = {
  id: string;
  title: string;
  description: string | null;
  assignee_ids: string[];
  status: string;
  created_at: string;
};

type TaskForm = {
  title: string;
  description: string;
  assigneeIds: string[];
};

const initialForm: TaskForm = {
  title: "",
  description: "",
  assigneeIds: []
};

const projectName = "Centro de Control Estratégico";

export function TasksWorkspace() {
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [form, setForm] = useState<TaskForm>(initialForm);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [message, setMessage] = useState("Cargando tareas...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const openTasks = useMemo(() => tasks.filter((task) => task.status !== "Completada"), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((task) => task.status === "Completada"), [tasks]);
  const progress = tasks.length === 0 ? 0 : Math.round((completedTasks.length / tasks.length) * 100);

  async function loadData() {
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

    const [{ data: profiles, error: profilesError }, { data: taskRows, error: tasksError }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, email, status").eq("status", "active").order("full_name"),
      supabase
        .from("tasks")
        .select("id, title, description, assignee_ids, status, created_at")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false })
    ]);

    if (profilesError || tasksError) {
      setMessage(profilesError?.message ?? tasksError?.message ?? "No se pudo cargar la información.");
      return;
    }

    setUsers(
      (profiles ?? []).map((profile) => ({
        id: String(profile.id),
        fullName: String(profile.full_name),
        email: String(profile.email),
        status: profile.status as PlatformUser["status"]
      }))
    );
    setTasks((taskRows ?? []).map(normalizeTask));
    setMessage((taskRows ?? []).length === 0 ? "Todavía no hay tareas registradas." : "Tareas cargadas desde Supabase.");
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!projectId) {
      setMessage("No se puede guardar hasta cargar el proyecto.");
      return;
    }

    if (form.assigneeIds.length === 0) {
      setMessage("Selecciona al menos un responsable.");
      return;
    }

    setIsSaving(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const selectedAssignees = users.filter((user) => form.assigneeIds.includes(user.id));
    const { error } = await supabase.from("tasks").insert({
      project_id: projectId,
      title: form.title.trim(),
      description: form.description.trim() || null,
      assignee_id: form.assigneeIds[0] ?? null,
      assignee_ids: form.assigneeIds,
      status: "Pendiente",
      priority: "Media"
    });

    if (error) {
      setIsSaving(false);
      setMessage(error.message);
      return;
    }

    const notifyMessage = await notifyAssignees({
      title: form.title.trim(),
      description: form.description.trim() || null,
      assignees: selectedAssignees.map((user) => ({ fullName: user.fullName, email: user.email }))
    });

    setIsSaving(false);
    setForm(initialForm);
    setMessage(`Tarea creada. ${notifyMessage}`);
    await loadData();
  }

  async function completeTask(taskId: string) {
    await updateTaskStatus(taskId, "Completada");
  }

  async function deleteTask(taskId: string) {
    const confirmed = window.confirm("¿Eliminar esta tarea?");
    if (!confirmed) return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      setMessage(error.message);
      return;
    }
    setTasks((current) => current.filter((task) => task.id !== taskId));
    setMessage("Tarea eliminada.");
  }

  async function updateTaskStatus(taskId: string, status: string) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase.from("tasks").update({ status }).eq("id", taskId);
    if (error) {
      setMessage(error.message);
      return;
    }
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, status } : task)));
    setMessage("Tarea actualizada.");
  }

  function toggleAssignee(userId: string) {
    setForm((current) => ({
      ...current,
      assigneeIds: current.assigneeIds.includes(userId)
        ? current.assigneeIds.filter((id) => id !== userId)
        : [...current.assigneeIds, userId]
    }));
  }

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Tablero operativo"
        title="Tareas"
        description="Crea pendientes claros, asigna responsables de la plataforma y notifica por correo automáticamente."
        status={tasks.length > 0 ? "En proceso" : "No iniciado"}
        progress={progress}
      />

      <section className="grid cols-3">
        <article className="metric-card card">
          <span className="metric-label">Abiertas</span>
          <strong className="metric-value">{openTasks.length}</strong>
        </article>
        <article className="metric-card card">
          <span className="metric-label">Completadas</span>
          <strong className="metric-value">{completedTasks.length}</strong>
        </article>
        <article className="metric-card card">
          <span className="metric-label">Responsables</span>
          <strong className="metric-value">{users.length}</strong>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Nueva tarea</span>
            <h2>Crear tarea</h2>
          </div>
          <span className="chip yellow">{message}</span>
        </div>

        <form className="form-grid" onSubmit={handleCreate}>
          <div className="field full">
            <label>Nombre</label>
            <input className="input" value={form.title} required placeholder="Ej. Revisar mapa de nichos" onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          </div>
          <div className="field full">
            <label>Descripción</label>
            <textarea className="textarea" value={form.description} placeholder="Qué debe hacerse, contexto y resultado esperado" onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          </div>
          <div className="field full">
            <label>Responsable</label>
            <div className="assignee-grid">
              {users.length === 0 ? (
                <p className="empty-state">No hay usuarios activos para asignar.</p>
              ) : (
                users.map((user) => (
                  <label className="assignee-option" key={user.id}>
                    <input type="checkbox" checked={form.assigneeIds.includes(user.id)} onChange={() => toggleAssignee(user.id)} />
                    <span>
                      <strong>{user.fullName}</strong>
                      <small>{user.email}</small>
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
          <div className="field full">
            <button className="button" type="submit" disabled={isSaving}>
              <ListTodo size={18} />
              {isSaving ? "Creando..." : "Crear tarea"}
            </button>
          </div>
        </form>
      </section>

      <section className="grid cols-2">
        <TaskList title="Tareas abiertas" eyebrow="Pendientes" tasks={openTasks} users={users} emptyMessage="No hay tareas abiertas." onComplete={completeTask} onDelete={deleteTask} />
        <TaskList title="Tareas completadas" eyebrow="Historial" tasks={completedTasks} users={users} emptyMessage="No hay tareas completadas." onComplete={completeTask} onDelete={deleteTask} />
      </section>
    </div>
  );
}

function TaskList({
  eyebrow,
  title,
  tasks,
  users,
  emptyMessage,
  onComplete,
  onDelete
}: {
  eyebrow: string;
  title: string;
  tasks: TaskRecord[];
  users: PlatformUser[];
  emptyMessage: string;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}) {
  return (
    <article className="card">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <div className="task-item-main">
                <div className="session-title-row">
                  <h3>{task.title}</h3>
                  <span className={`chip ${task.status === "Completada" ? "green" : "blue"}`}>{task.status}</span>
                </div>
                {task.description && <p>{task.description}</p>}
                <p>
                  <Mail size={16} />
                  {formatAssignees(task.assignee_ids, users)}
                </p>
              </div>
              <div className="session-actions">
                {task.status !== "Completada" && (
                  <button className="icon-button" type="button" title="Marcar completada" onClick={() => onComplete(task.id)}>
                    <Check size={18} />
                  </button>
                )}
                <button className="icon-button danger" type="button" title="Eliminar" onClick={() => onDelete(task.id)}>
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

async function notifyAssignees(input: {
  title: string;
  description: string | null;
  assignees: Array<{ fullName: string; email: string }>;
}) {
  try {
    const response = await fetch("/api/tasks/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
    const result = await response.json();

    if (!response.ok) return result?.error ?? "No se pudo enviar el correo.";
    if (result?.skipped) return "Correo pendiente: Resend no está configurado.";
    return "Correo enviado a responsables.";
  } catch {
    return "No se pudo enviar el correo.";
  }
}

function normalizeTask(value: Record<string, unknown>): TaskRecord {
  return {
    id: String(value.id),
    title: String(value.title),
    description: value.description ? String(value.description) : null,
    assignee_ids: Array.isArray(value.assignee_ids) ? value.assignee_ids.map(String) : [],
    status: String(value.status ?? "Pendiente"),
    created_at: String(value.created_at)
  };
}

function formatAssignees(assigneeIds: string[], users: PlatformUser[]) {
  const names = assigneeIds
    .map((id) => users.find((user) => user.id === id))
    .filter(Boolean)
    .map((user) => `${user?.fullName} <${user?.email}>`);

  return names.length > 0 ? names.join(", ") : "Sin responsable";
}
