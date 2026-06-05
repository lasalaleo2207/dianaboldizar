import { AppShell } from "@/components/app-shell";
import { DataTable } from "@/components/data-table";
import { PageHero } from "@/components/page-hero";
import { deliverables } from "@/lib/data";

export default function DeliverablesPage() {
  return (
    <AppShell>
      <div className="page-stack">
        <PageHero
          eyebrow="Biblioteca"
          title="Entregables"
          description="Documentos, tableros, matrices, links y recursos versionados por módulo, estado y fecha de actualización."
          status="No iniciado"
          progress={0}
        />
        <section className="card">
          <DataTable
            columns={["Entregable", "Módulo", "Tipo", "Estado", "Versión", "Fecha"]}
            rows={deliverables.map((item) => ({
              Entregable: item.title,
              Módulo: item.module,
              Tipo: item.type,
              Estado: item.status,
              Versión: item.version,
              Fecha: item.date
            }))}
            emptyMessage="Todavía no hay entregables registrados."
          />
        </section>
      </div>
    </AppShell>
  );
}
