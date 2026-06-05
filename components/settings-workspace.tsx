"use client";

import { useEffect, useState } from "react";
import { Save, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { UserAdmin } from "@/components/user-admin";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type ProfileForm = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
};

type ProjectForm = {
  id: string;
  name: string;
  clientName: string;
  currentPhase: string;
  status: string;
  progress: number;
};

type IntegrationStatus = {
  supabase: boolean;
  resend: boolean;
  googleCalendar: boolean;
  googleCalendarId: string | null;
  timeZone: string;
  canCreateAuthUsers: boolean;
};

const projectName = "Centro de Control Estratégico";

export function SettingsWorkspace() {
  const [profile, setProfile] = useState<ProfileForm | null>(null);
  const [project, setProject] = useState<ProjectForm | null>(null);
  const [integrations, setIntegrations] = useState<IntegrationStatus | null>(null);
  const [message, setMessage] = useState("Cargando ajustes...");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Supabase no está configurado.");
      return;
    }

    const [{ data: authData }, integrationResponse] = await Promise.all([
      supabase.auth.getUser(),
      fetch("/api/settings/status")
    ]);

    const integrationData = (await integrationResponse.json()) as IntegrationStatus;
    setIntegrations(integrationData);

    if (!authData.user) {
      setMessage("No hay sesión activa.");
      return;
    }

    const [{ data: profileData, error: profileError }, { data: projectData, error: projectError }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, full_name, email, role, status")
        .eq("id", authData.user.id)
        .maybeSingle(),
      supabase
        .from("projects")
        .select("id, name, client_name, current_phase, status, progress")
        .eq("name", projectName)
        .limit(1)
        .maybeSingle()
    ]);

    if (profileError || projectError) {
      setMessage(profileError?.message ?? projectError?.message ?? "No se pudieron cargar los ajustes.");
      return;
    }

    if (profileData) {
      setProfile({
        id: String(profileData.id),
        fullName: String(profileData.full_name),
        email: String(profileData.email),
        role: String(profileData.role),
        status: String(profileData.status)
      });
    }

    if (projectData) {
      setProject({
        id: String(projectData.id),
        name: String(projectData.name),
        clientName: String(projectData.client_name),
        currentPhase: String(projectData.current_phase ?? ""),
        status: String(projectData.status),
        progress: Number(projectData.progress ?? 0)
      });
    }

    setMessage("Ajustes cargados.");
  }

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: profile.fullName.trim() })
      .eq("id", profile.id);

    setMessage(error ? error.message : "Perfil actualizado.");
  }

  async function saveProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!project) return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase
      .from("projects")
      .update({
        name: project.name.trim(),
        client_name: project.clientName.trim(),
        current_phase: project.currentPhase.trim() || null,
        status: project.status,
        progress: project.progress
      })
      .eq("id", project.id);

    setMessage(error ? error.message : "Proyecto actualizado.");
  }

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Configuración"
        title="Ajustes"
        description="Administra la información base del centro de control, usuarios e integraciones conectadas."
        status={integrations?.supabase ? "En proceso" : "No iniciado"}
        progress={integrations?.supabase ? 75 : 0}
      />

      <section className="grid cols-2">
        <article className="card">
          <div className="card-header">
            <div>
              <span className="eyebrow">Mi perfil</span>
              <h2>Usuario actual</h2>
            </div>
            <span className="chip yellow">{message}</span>
          </div>
          {profile && (
            <form className="form-grid" onSubmit={saveProfile}>
              <div className="field full">
                <label>Nombre</label>
                <input className="input" value={profile.fullName} onChange={(event) => setProfile((current) => current ? { ...current, fullName: event.target.value } : current)} />
              </div>
              <div className="field">
                <label>Email</label>
                <input className="input" value={profile.email} disabled />
              </div>
              <div className="field">
                <label>Rol</label>
                <input className="input" value={profile.role} disabled />
              </div>
              <div className="field full">
                <button className="button" type="submit">
                  <Save size={18} />
                  Guardar perfil
                </button>
              </div>
            </form>
          )}
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <span className="eyebrow">Proyecto</span>
              <h2>Centro de control</h2>
            </div>
            <ShieldCheck />
          </div>
          {project && (
            <form className="form-grid" onSubmit={saveProject}>
              <div className="field full">
                <label>Nombre del proyecto</label>
                <input className="input" value={project.name} onChange={(event) => setProject((current) => current ? { ...current, name: event.target.value } : current)} />
              </div>
              <div className="field">
                <label>Cliente</label>
                <input className="input" value={project.clientName} onChange={(event) => setProject((current) => current ? { ...current, clientName: event.target.value } : current)} />
              </div>
              <div className="field">
                <label>Fase actual</label>
                <input className="input" value={project.currentPhase} onChange={(event) => setProject((current) => current ? { ...current, currentPhase: event.target.value } : current)} />
              </div>
              <div className="field">
                <label>Estado</label>
                <select className="select" value={project.status} onChange={(event) => setProject((current) => current ? { ...current, status: event.target.value } : current)}>
                  <option>No iniciado</option>
                  <option>En proceso</option>
                  <option>En revisión</option>
                  <option>Validado</option>
                  <option>Cerrado</option>
                </select>
              </div>
              <div className="field">
                <label>Avance</label>
                <input className="input" type="number" min={0} max={100} value={project.progress} onChange={(event) => setProject((current) => current ? { ...current, progress: Number(event.target.value) } : current)} />
              </div>
              <div className="field full">
                <button className="button" type="submit">
                  <Save size={18} />
                  Guardar proyecto
                </button>
              </div>
            </form>
          )}
        </article>
      </section>

      <section className="grid cols-3">
        <IntegrationCard label="Supabase" active={Boolean(integrations?.supabase)} detail="Base de datos y autenticación" />
        <IntegrationCard label="Resend" active={Boolean(integrations?.resend)} detail="Correos de tareas y sesiones" />
        <IntegrationCard label="Google Calendar" active={Boolean(integrations?.googleCalendar)} detail={integrations?.googleCalendarId ?? "Pendiente de credenciales"} />
      </section>

      <UserAdmin />
    </div>
  );
}

function IntegrationCard({ label, active, detail }: { label: string; active: boolean; detail: string }) {
  return (
    <article className="card metric-card">
      <span className="metric-label">{label}</span>
      <strong className={`chip ${active ? "green" : "yellow"}`}>{active ? "Conectado" : "Pendiente"}</strong>
      <p>{detail}</p>
    </article>
  );
}
