"use client";

import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { createLocalUser, getCurrentUser, getUsers, type LocalUser } from "@/lib/local-auth";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { DataTable } from "@/components/data-table";

export function UserAdmin() {
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [message, setMessage] = useState("Todos los usuarios activos tienen acceso completo al contenido.");
  const [canManage, setCanManage] = useState(false);
  const [usesSupabase, setUsesSupabase] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      const supabase = createSupabaseBrowserClient();

      if (supabase) {
        setUsesSupabase(true);
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data: currentProfile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        setCanManage(currentProfile?.role === "superadmin");

        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name, email, role, status, created_at")
          .order("created_at", { ascending: true });

        setUsers(
          (profiles ?? []).map((profile) => ({
            id: String(profile.id),
            fullName: String(profile.full_name),
            email: String(profile.email),
            password: "",
            role: profile.role as LocalUser["role"],
            status: profile.status as LocalUser["status"],
            createdAt: String(profile.created_at).slice(0, 10)
          }))
        );
        setMessage("Usuarios cargados desde Supabase.");
        return;
      }

      const currentUser = getCurrentUser();
      setCanManage(currentUser?.role === "superadmin");
      setUsers(getUsers());
    }

    loadUsers();
  }, []);

  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canManage) {
      setMessage("Tu usuario no tiene permiso para crear usuarios.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName"));
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    if (usesSupabase) {
      const supabase = createSupabaseBrowserClient();
      const { data: sessionData } = supabase ? await supabase.auth.getSession() : { data: { session: null } };
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionData.session?.access_token ? { Authorization: `Bearer ${sessionData.session.access_token}` } : {})
        },
        body: JSON.stringify({ fullName, email, password })
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result?.error ?? "No se pudo crear el usuario.");
        return;
      }

      const emailMessage = result?.emailStatus?.id
        ? "Correo de acceso enviado."
        : result?.emailStatus?.error
          ? `Usuario creado, pero no se pudo enviar el correo: ${result.emailStatus.error}`
          : "Usuario creado. Correo de acceso no enviado porque Resend no está configurado.";
      setMessage(`Usuario creado: ${email}. ${emailMessage}`);
      event.currentTarget.reset();
      await refreshSupabaseUsers();
      return;
    }

    try {
      const user = createLocalUser({ fullName, email, password });
      setUsers(getUsers());
      setMessage(`Usuario creado: ${user.fullName}.`);
      event.currentTarget.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo crear el usuario.");
    }
  }

  async function refreshSupabaseUsers() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email, role, status, created_at")
      .order("created_at", { ascending: true });

    setUsers(
      (profiles ?? []).map((profile) => ({
        id: String(profile.id),
        fullName: String(profile.full_name),
        email: String(profile.email),
        password: "",
        role: profile.role as LocalUser["role"],
        status: profile.status as LocalUser["status"],
        createdAt: String(profile.created_at).slice(0, 10)
      }))
    );
  }

  return (
    <section className="grid cols-2">
      <article className="card">
        <div className="card-header">
          <div>
            <span className="eyebrow">Usuarios</span>
            <h2>Crear usuario</h2>
          </div>
          <UserPlus />
        </div>
        <form className="form-grid" onSubmit={handleCreateUser}>
          <div className="field">
            <label>Nombre</label>
            <input className="input" name="fullName" placeholder="Diana Boldizar" required />
          </div>
          <div className="field">
            <label>Email</label>
            <input className="input" name="email" type="email" placeholder="diana@correo.com" required />
          </div>
          <div className="field full">
            <label>Contraseña inicial</label>
            <input className="input" name="password" type="password" placeholder="Mínimo 6 caracteres" required />
          </div>
          <div className="field full">
            <button className="button" type="submit" disabled={!canManage}>Crear usuario</button>
          </div>
        </form>
        <p className="muted" style={{ marginTop: 14 }}>{message}</p>
      </article>

      <article className="card">
        <span className="eyebrow">Accesos activos</span>
        <h2>Usuarios de la plataforma</h2>
        <div style={{ marginTop: 16 }}>
          <DataTable
            columns={["Nombre", "Email", "Rol", "Estado"]}
            rows={users.map((user) => ({
              Nombre: user.fullName,
              Email: user.email,
              Rol: user.role,
              Estado: user.status === "active" ? "Activo" : "Inactivo"
            }))}
          />
        </div>
      </article>
    </section>
  );
}
