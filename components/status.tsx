import type { Status } from "@/lib/data";

const statusClass: Record<string, string> = {
  "No iniciado": "blue",
  "En proceso": "",
  "En revisión": "yellow",
  Validado: "green",
  Cerrado: "green",
  Pendiente: "yellow",
  "Borrador": "blue",
  "Provisional": "yellow",
  "Completada": "green"
};

export function StatusChip({ status }: { status: Status | string }) {
  return <span className={`chip ${statusClass[status] ?? ""}`}>{status}</span>;
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress" aria-label={`Progreso ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
