"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { createSupabaseBrowserClient, hasSupabaseConfig } from "@/lib/supabase";
import { defaultSuperadmin, loginLocalUser } from "@/lib/local-auth";

export function AuthForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const supabase = createSupabaseBrowserClient();
    if (supabase && hasSupabaseConfig()) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push("/dashboard");
      return;
    }

    const user = loginLocalUser(email, password);
    if (!user) {
      setMessage("Correo o contraseña incorrectos.");
      return;
    }

    setMessage("");
    router.push("/dashboard");
  }

  return (
    <form className="card auth-card" onSubmit={handleLogin}>
      <div>
        <span className="eyebrow">Acceso privado</span>
        <h2>Entrar al centro de control</h2>
      </div>
      <div className="field">
        <label>Email</label>
        <div className="search" style={{ width: "100%" }}>
          <Mail size={18} />
          <input
            name="email"
            type="email"
            placeholder="nombre@correo.com"
            defaultValue={defaultSuperadmin.email}
            style={{ border: 0, outline: 0, width: "100%" }}
          />
        </div>
      </div>
      <div className="field">
        <label>Contraseña</label>
        <div className="search" style={{ width: "100%" }}>
          <Lock size={18} />
          <input name="password" type="password" placeholder="••••••••" style={{ border: 0, outline: 0, width: "100%" }} />
        </div>
      </div>
      <button className="button" type="submit">Entrar</button>
      <Link className="muted" href="/forgot-password">Recuperar contraseña</Link>
      {message && <p className="muted">{message}</p>}
    </form>
  );
}
