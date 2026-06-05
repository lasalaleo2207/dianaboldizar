import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHero } from "@/components/page-hero";

export function RoadmapPage({ title, description }: { title: string; description: string }) {
  return (
    <AppShell>
      <div className="page-stack">
        <PageHero
          eyebrow="Módulo futuro"
          title={title}
          description={`${description} Este espacio queda visible desde el MVP para sostener el roadmap y crecer por fases.`}
          status="No iniciado"
          progress={0}
          actions={<Link className="button ghost" href="/dashboard">Volver al dashboard</Link>}
        />
        <section className="card">
          <span className="eyebrow">Próxima iteración</span>
          <h2>Estructura preparada</h2>
          <p style={{ marginTop: 12 }}>Cuando Ikigai Clarity avance, este módulo puede recibir formularios, matrices, entregables y dashboards propios sin cambiar la navegación central.</p>
        </section>
      </div>
    </AppShell>
  );
}
