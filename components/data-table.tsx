import { StatusChip } from "@/components/status";

export function DataTable({
  columns,
  rows,
  emptyMessage = "Todavía no hay registros."
}: {
  columns: string[];
  rows: Array<Record<string, string | number>>;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${Object.values(row)[0]}-${index}`}>
              {columns.map((column) => {
                const value = row[column];
                const isStatus = ["Estado", "status", "Estatus"].includes(column);
                return <td key={column}>{isStatus ? <StatusChip status={String(value)} /> : value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
