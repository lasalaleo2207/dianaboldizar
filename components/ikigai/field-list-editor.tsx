"use client";

import { Plus, Trash2 } from "lucide-react";

export function FieldListEditor({
  label,
  placeholder,
  values,
  onChange
}: {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  function updateValue(index: number, value: string) {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function removeValue(index: number) {
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="field full">
      <label>{label}</label>
      <div className="editable-list">
        {values.length === 0 && <p className="empty-state">Todavía no hay registros.</p>}
        {values.map((value, index) => (
          <div className="inline-editor" key={`${label}-${index}`}>
            <input className="input" value={value} placeholder={placeholder} onChange={(event) => updateValue(index, event.target.value)} />
            <button className="icon-button danger" type="button" onClick={() => removeValue(index)} title="Eliminar">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button className="button ghost compact" type="button" onClick={() => onChange([...values, ""])}>
        <Plus size={16} />
        Agregar
      </button>
    </div>
  );
}
