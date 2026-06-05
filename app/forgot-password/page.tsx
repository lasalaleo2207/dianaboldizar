import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <form className="card auth-card">
          <div>
            <span className="eyebrow">Acceso privado</span>
            <h2>Recuperar contraseña</h2>
          </div>
          <div className="field">
            <label>Email</label>
            <input className="input" type="email" placeholder="nombre@correo.com" />
          </div>
          <button className="button" type="button">Enviar enlace</button>
          <Link className="muted" href="/login">Volver al login</Link>
        </form>
      </section>
    </main>
  );
}
