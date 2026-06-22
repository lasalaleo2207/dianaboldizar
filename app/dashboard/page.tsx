"use client";

import Link from "next/link";
import { CalendarDays, CheckCircle2, Files, ListTodo } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { ModuleCard } from "@/components/module-card";
import { PageHero } from "@/components/page-hero";
import { decisions, deliverables, modules, project, sessions, tasks, type Status } from "@/lib/data";
import { calculateIkigaiProgress, loadIkigaiDataRemote } from "@/lib/ikigai-store";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function DashboardPage() {
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({});
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProgress() {
      try {
        const ikigaiData = await loadIkigaiDataRemote();
        const nextProgress: Record<string, number> = {
          "/modules/ikigai-clarity": calculateIkigaiProgress(ikigaiData)
        };

        const supabase = createSupabaseBrowserClient();
        if (supabase) {
          const {
            data: { user }
          } = await supabase.auth.getUser();

          if (user) {
            const { data: currentProject } = await supabase
              .from("projects")
              .select("id")
              .eq("name", project.name)
              .maybeSingle();

            if (currentProject?.id) {
              const { data: methodology } = await supabase
                .from("diagnostic_answers")
                .select("answer")
                .eq("project_id", currentProject.id)
                .is("submodule_id", null)
                .eq("question_key", "business_methodology_extraction")
                .order("updated_at", { ascending: false })
                .limit(1)
                .maybeSingle();

              nextProgress["/modules/business"] = calculateBusinessProgress(methodology?.answer);
            }
          }
        }

        if (active) setModuleProgress(nextProgress);
      } catch (error) {
        console.error("Dashboard progress load failed", error);
      } finally {
        if (active) setProgressLoaded(true);
      }
    }

    void loadProgress();
    return () => {
      active = false;
    };
  }, []);

  const roadmapModules = useMemo(
    () => modules.map((module) => {
      const progress = moduleProgress[module.slug] ?? module.progress;
      return { ...module, progress, status: getProgressStatus(progress) };
    }),
    [moduleProgress]
  );
  const globalProgress = Math.round(
    roadmapModules.reduce((total, module) => total + module.progress, 0) / roadmapModules.length
  );
  const completedModules = roadmapModules.filter((module) => module.progress === 100).length;
  const currentModuleIndex = roadmapModules.findIndex((module) => module.progress < 100);
  const currentModule = currentModuleIndex === -1 ? null : roadmapModules[currentModuleIndex];
  const currentPhaseNumber = currentModule
    ? String(currentModuleIndex + 1).padStart(2, "0")
    : String(roadmapModules.length).padStart(2, "0");
  const projectStatus = getProgressStatus(globalProgress);

  return (
    <AppShell>
      <div className="page-stack">
        <PageHero
          eyebrow="Sistema operativo del proyecto"
          title={`Centro de Control ${project.client}`}
          description="Un lugar único para consultar avances, completar ejercicios, registrar decisiones, visualizar entregables y mantener trazabilidad de la estrategia."
          image="/assets/banner.png"
          variant="banner"
          status={projectStatus}
          progress={globalProgress}
          actions={
            <>
              <Link className="button" href="/modules/ikigai-clarity">Entrar a Ikigai</Link>
              <Link className="button ghost" href="/tasks">Ver pendientes</Link>
            </>
          }
        />

        <section className="grid cols-4">
          <article className="card metric-card">
            <span className="metric-label">Fase actual</span>
            <div className="metric-value">{currentPhaseNumber}</div>
            <p>{currentModule?.name ?? "Proyecto completado"}</p>
          </article>
          <article className="card metric-card">
            <span className="metric-label">Progreso global</span>
            <div className="metric-value">{globalProgress}%</div>
            <p>{progressLoaded ? `${completedModules} de ${roadmapModules.length} módulos completados.` : "Sincronizando avance..."}</p>
          </article>
          <article className="card metric-card">
            <span className="metric-label">Tareas abiertas</span>
            <div className="metric-value">{tasks.length}</div>
            <p>Sin tareas registradas todavía.</p>
          </article>
          <article className="card metric-card">
            <span className="metric-label">Entregables</span>
            <div className="metric-value">{deliverables.length}</div>
            <p>Sin entregables publicados todavía.</p>
          </article>
        </section>

        <section className="section-title">
          <div>
            <span className="eyebrow">Módulos estratégicos</span>
            <h2>Roadmap del proceso</h2>
          </div>
        </section>
        <section className="grid cols-3">
          {roadmapModules.map((module) => (
            <ModuleCard
              key={module.slug}
              name={module.name}
              description={module.description}
              status={module.status}
              progress={module.progress}
              href={module.slug}
              icon={module.icon}
            />
          ))}
        </section>

        <section className="grid cols-2">
          <article className="card">
            <div className="card-header">
              <div>
                <span className="eyebrow">Agenda</span>
                <h2>Próximas sesiones</h2>
              </div>
              <CalendarDays />
            </div>
            {sessions.length === 0 ? (
              <p className="empty-state">Todavía no hay sesiones programadas.</p>
            ) : (
              <div className="timeline">
                {sessions.map((session) => (
                <div className="timeline-item" key={session.title}>
                  <strong>{session.date}</strong>
                  <div>
                    <h3>{session.title}</h3>
                    <p>{session.objective}</p>
                    <span className="chip yellow">{session.prep}</span>
                  </div>
                </div>
                ))}
              </div>
            )}
          </article>

          <article className="card">
            <div className="card-header">
              <div>
                <span className="eyebrow">Pendientes</span>
                <h2>Tareas activas</h2>
              </div>
              <ListTodo />
            </div>
            <DataTable
              columns={["Tarea", "Responsable", "Módulo", "Fecha límite", "Estado"]}
              rows={tasks.map((task) => ({
                Tarea: task.title,
                Responsable: task.assignee,
                Módulo: task.module,
                "Fecha límite": task.due,
                Estado: task.status
              }))}
              emptyMessage="Todavía no hay tareas registradas."
            />
          </article>
        </section>

        <section className="grid cols-2">
          <article className="card">
            <div className="card-header">
              <div>
                <span className="eyebrow">Trazabilidad</span>
                <h2>Decisiones recientes</h2>
              </div>
              <CheckCircle2 />
            </div>
            <DataTable
              columns={["Decisión", "Módulo", "Fecha", "Estado"]}
              rows={decisions.map((decision) => ({
                Decisión: decision.title,
                Módulo: decision.module,
                Fecha: decision.date,
                Estado: decision.status
              }))}
              emptyMessage="Todavía no hay decisiones registradas."
            />
          </article>

          <article className="card">
            <div className="card-header">
              <div>
                <span className="eyebrow">Biblioteca</span>
                <h2>Entregables recientes</h2>
              </div>
              <Files />
            </div>
            <DataTable
              columns={["Entregable", "Módulo", "Estado", "Fecha"]}
              rows={deliverables.map((item) => ({
                Entregable: item.title,
                Módulo: item.module,
                Estado: item.status,
                Fecha: item.date
              }))}
              emptyMessage="Todavía no hay entregables publicados."
            />
          </article>
        </section>
      </div>
    </AppShell>
  );
}

function getProgressStatus(progress: number): Status {
  if (progress === 100) return "Completado";
  if (progress > 0) return "En proceso";
  return "No iniciado";
}

function calculateBusinessProgress(answer: string | null | undefined) {
  if (!answer) return 0;

  try {
    const data = JSON.parse(answer) as Record<string, unknown>;
    const completed = Array.from({ length: 7 }, (_, index) => data[`done_${index + 1}`] === 1)
      .filter(Boolean)
      .length;
    return Math.round((completed / 7) * 100);
  } catch {
    return 0;
  }
}
