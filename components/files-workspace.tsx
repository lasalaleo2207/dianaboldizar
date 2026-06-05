"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Eye, Trash2, Upload } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type FileRecord = {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  file_size: number;
  created_at: string;
};

const projectName = "Centro de Control Estratégico";
const bucketName = "project-files";
const maxFileSize = 100 * 1024 * 1024;

export function FilesWorkspace() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [fileDisplayName, setFileDisplayName] = useState("");
  const [message, setMessage] = useState("Cargando archivos...");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const totalSize = useMemo(() => files.reduce((sum, file) => sum + file.file_size, 0), [files]);

  async function loadFiles() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Supabase no está configurado.");
      return;
    }

    const [{ data: authData }, { data: project, error: projectError }] = await Promise.all([
      supabase.auth.getUser(),
      supabase.from("projects").select("id").eq("name", projectName).limit(1).maybeSingle()
    ]);

    if (projectError || !project?.id) {
      setMessage("No se encontró el proyecto base en Supabase.");
      return;
    }

    setProjectId(project.id as string);
    setUserId(authData.user?.id ?? null);

    const { data, error } = await supabase
      .from("files")
      .select("id, file_name, file_path, file_type, file_size, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setFiles((data ?? []).map(normalizeFile));
    setMessage((data ?? []).length === 0 ? "Todavía no hay archivos cargados." : "Archivos cargados desde Supabase.");
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!selectedFiles.length || !projectId) return;

    const displayName = fileDisplayName.trim();
    if (!displayName) {
      setMessage("Escribe el nombre del archivo antes de cargar.");
      return;
    }

    const oversized = selectedFiles.find((file) => file.size > maxFileSize);
    if (oversized) {
      setMessage(`El archivo ${oversized.name} supera el límite de 100 MB.`);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    setIsUploading(true);

    for (const [index, file] of selectedFiles.entries()) {
      const path = `${projectId}/${Date.now()}-${sanitizeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "application/octet-stream"
      });

      if (uploadError) {
        setMessage(uploadError.message);
        setIsUploading(false);
        return;
      }

      const { error: insertError } = await supabase.from("files").insert({
        project_id: projectId,
        uploaded_by: userId,
        file_name: selectedFiles.length === 1 ? displayName : `${displayName} ${index + 1}`,
        file_path: path,
        file_type: file.type || null,
        file_size: file.size
      });

      if (insertError) {
        await supabase.storage.from(bucketName).remove([path]);
        setMessage(insertError.message);
        setIsUploading(false);
        return;
      }
    }

    setIsUploading(false);
    setFileDisplayName("");
    setMessage("Archivo cargado.");
    await loadFiles();
  }

  async function openFile(file: FileRecord, download = false) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(file.file_path, 60 * 10, download ? { download: file.file_name } : undefined);

    if (error || !data?.signedUrl) {
      setMessage(error?.message ?? "No se pudo abrir el archivo.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  async function deleteFile(file: FileRecord) {
    const confirmed = window.confirm("¿Eliminar este archivo?");
    if (!confirmed) return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const [{ error: storageError }, { error: dbError }] = await Promise.all([
      supabase.storage.from(bucketName).remove([file.file_path]),
      supabase.from("files").delete().eq("id", file.id)
    ]);

    if (storageError || dbError) {
      setMessage(storageError?.message ?? dbError?.message ?? "No se pudo eliminar el archivo.");
      return;
    }

    setFiles((current) => current.filter((item) => item.id !== file.id));
    setMessage("Archivo eliminado.");
  }

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Storage"
        title="Archivos"
        description="Carga, visualiza y descarga documentos del proyecto en un espacio centralizado."
        status={files.length > 0 ? "En proceso" : "No iniciado"}
        progress={files.length > 0 ? 100 : 0}
      />

      <section className="grid cols-3">
        <article className="metric-card card">
          <span className="metric-label">Archivos</span>
          <strong className="metric-value">{files.length}</strong>
        </article>
        <article className="metric-card card">
          <span className="metric-label">Peso total</span>
          <strong className="metric-value">{formatFileSize(totalSize)}</strong>
        </article>
        <article className="metric-card card">
          <span className="metric-label">Límite por archivo</span>
          <strong className="metric-value">100 MB</strong>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Carga</span>
            <h2>Subir archivos</h2>
          </div>
          <span className="chip yellow">{message}</span>
        </div>
        <div className="field" style={{ marginBottom: 16 }}>
          <label>Nombre del archivo</label>
          <input
            className="input"
            value={fileDisplayName}
            placeholder="Ej. Diagnóstico inicial"
            onChange={(event) => setFileDisplayName(event.target.value)}
          />
        </div>
        <label className="upload-dropzone">
          <Upload size={22} />
          <span>{isUploading ? "Cargando..." : "Seleccionar archivos"}</span>
          <small>Excel, imágenes, PDF y otros documentos. Máximo 100 MB por archivo.</small>
          <input
            type="file"
            multiple
            disabled={isUploading}
            onChange={handleUpload}
            accept=".xls,.xlsx,.csv,.pdf,.png,.jpg,.jpeg,.webp,.gif,.doc,.docx,.ppt,.pptx,.txt,image/*,application/pdf"
          />
        </label>
      </section>

      <section className="card">
        <span className="eyebrow">Biblioteca</span>
        <h2>Archivos cargados</h2>
        {files.length === 0 ? (
          <p className="empty-state">Todavía no hay archivos cargados.</p>
        ) : (
          <div className="file-list">
            {files.map((file) => (
              <article className="file-item" key={file.id}>
                <div>
                  <h3>{file.file_name}</h3>
                  <p>{formatFileSize(file.file_size)} · {formatFileType(file.file_type)} · {formatDate(file.created_at)}</p>
                </div>
                <div className="session-actions">
                  <button className="icon-button" type="button" title="Visualizar" onClick={() => openFile(file)}>
                    <Eye size={18} />
                  </button>
                  <button className="icon-button" type="button" title="Descargar" onClick={() => openFile(file, true)}>
                    <Download size={18} />
                  </button>
                  <button className="icon-button danger" type="button" title="Eliminar" onClick={() => deleteFile(file)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function normalizeFile(value: Record<string, unknown>): FileRecord {
  return {
    id: String(value.id),
    file_name: String(value.file_name),
    file_path: String(value.file_path),
    file_type: value.file_type ? String(value.file_type) : null,
    file_size: Number(value.file_size ?? 0),
    created_at: String(value.created_at)
  };
}

function sanitizeFileName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "-");
}

function formatFileSize(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function formatFileType(value: string | null) {
  if (!value) return "Archivo";
  if (value.includes("pdf")) return "PDF";
  if (value.startsWith("image/")) return "Imagen";
  if (value.includes("spreadsheet") || value.includes("excel") || value.includes("csv")) return "Excel";
  return value;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
}
