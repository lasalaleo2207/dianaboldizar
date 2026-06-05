"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, LogOut, Search, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { navPrimary } from "@/lib/data";
import { getCurrentUser, logoutLocalUser, type LocalUser } from "@/lib/local-auth";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type CurrentUser = Pick<LocalUser, "fullName" | "email" | "role" | "status">;

const moduleNav = [
  { href: "/modules/business", label: "Business / Oferta" },
  { href: "/modules/marca-personal", label: "Marca Personal" },
  { href: "/modules/sistema-ventas", label: "Sistema de Ventas" },
  { href: "/modules/medios", label: "Medios" },
  { href: "/modules/implementacion", label: "Implementación" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const supabase = createSupabaseBrowserClient();

      if (supabase) {
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = "/login";
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, email, role, status")
          .eq("id", user.id)
          .maybeSingle();

        setCurrentUser({
          fullName: String(profile?.full_name ?? user.email ?? "Usuario"),
          email: String(profile?.email ?? user.email ?? ""),
          role: (profile?.role as CurrentUser["role"]) ?? "superadmin",
          status: (profile?.status as CurrentUser["status"]) ?? "active"
        });
        setReady(true);
        return;
      }

      const user = getCurrentUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }

      setCurrentUser(user);
      setReady(true);
    }

    loadUser();
  }, []);

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    logoutLocalUser();
    window.location.href = "/login";
  }

  if (!ready || !currentUser) {
    return null;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand-lockup" href="/dashboard">
          <Image src="/brand/logo-horizontal-cropped.png" alt="Vena Digital" width={471} height={215} priority />
        </Link>

        <nav className="nav-group" aria-label="Principal">
          <div className="nav-title">Centro</div>
          <ul className="nav-list">
            {navPrimary.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link className={`nav-item ${active ? "active" : ""}`} href={item.href}>
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav className="nav-group" aria-label="Roadmap">
          <div className="nav-title">Roadmap</div>
          <ul className="nav-list">
            {moduleNav.map((item) => (
              <li key={item.href}>
                <Link className={`nav-item ${pathname === item.href ? "active" : ""}`} href={item.href}>
                  <FolderOpen size={18} />
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className={`nav-item ${pathname === "/files" ? "active" : ""}`} href="/files">
                <FolderOpen size={18} />
                Archivos
              </Link>
            </li>
            <li>
              <Link className={`nav-item ${pathname === "/settings" ? "active" : ""}`} href="/settings">
                <Settings size={18} />
                Ajustes
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <Image className="mobile-brand" src="/brand/logo-horizontal-cropped.png" alt="Vena Digital" width={471} height={215} style={{ height: "auto" }} />
          <div className="search">
            <Search size={18} />
            Buscar tareas, decisiones o entregables
          </div>
          <div className="user-pill">
            <span className="avatar">{currentUser.fullName.charAt(0)}</span>
            {currentUser.fullName}
          </div>
          <button className="icon-button" type="button" onClick={handleLogout} title="Cerrar sesión">
            <LogOut size={18} />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
