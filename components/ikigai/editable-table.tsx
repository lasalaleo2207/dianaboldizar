"use client";

import { Plus, Trash2 } from "lucide-react";

export type EditableColumn<Row> = {
  key: keyof Row & string;
  label: string;
  type?: "text" | "textarea" | "number" | "select";
  options?: string[];
  placeholder?: string;
};

export function EditableTable<Row extends { id: string }>({
  columns,
  rows,
  emptyRow,
  emptyMessage,
  onChange
}: {
  columns: EditableColumn<Row>[];
  rows: Row[];
  emptyRow: () => Row;
  emptyMessage: string;
  onChange: (rows: Row[]) => void;
}) {
  function updateRow(id: string, key: keyof Row & string, value: string) {
    onChange(rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
  }

  function removeRow(id: string) {
    onChange(rows.filter((row) => row.id !== id));
  }

  return (
    <div className="editable-table-stack">
      {rows.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : (
        <div className="table-wrap">
          <table className="table editable-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.type === "textarea" ? (
                        <textarea
                          className="textarea compact-field"
                          value={String(row[column.key] ?? "")}
                          placeholder={column.placeholder}
                          onChange={(event) => updateRow(row.id, column.key, event.target.value)}
                        />
                      ) : column.type === "select" ? (
                        <select
                          className="select compact-field"
                          value={String(row[column.key] ?? "")}
                          onChange={(event) => updateRow(row.id, column.key, event.target.value)}
                        >
                          <option value="">Seleccionar</option>
                          {column.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="input compact-field"
                          type={column.type === "number" ? "number" : "text"}
                          value={String(row[column.key] ?? "")}
                          placeholder={column.placeholder}
                          onChange={(event) => updateRow(row.id, column.key, event.target.value)}
                        />
                      )}
                    </td>
                  ))}
                  <td>
                    <button className="icon-button danger" type="button" onClick={() => removeRow(row.id)} title="Eliminar fila">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button className="button ghost compact" type="button" onClick={() => onChange([...rows, emptyRow()])}>
        <Plus size={16} />
        Agregar fila
      </button>
    </div>
  );
}
