// Vena Digital — Landing page components

const Nav = () => (
  <nav style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 56px', borderBottom: '1px solid var(--border-subtle)',
    background: 'var(--vena-marfil-digital)', position: 'sticky', top: 0, zIndex: 10,
  }}>
    <LogoLockup mascotSize={44} wordSize={20} />
    <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0,
                 fontFamily: 'DM Sans', fontSize: 15, fontWeight: 500, color: 'var(--vena-azul-noche)' }}>
      <li><a href="#" style={{ color: 'inherit', fontWeight: 500 }}>Inicio</a></li>
      <li><a href="#" style={{ color: 'inherit', fontWeight: 500 }}>Academia</a></li>
      <li><a href="#" style={{ color: 'inherit', fontWeight: 500 }}>Recursos</a></li>
      <li><a href="#" style={{ color: 'inherit', fontWeight: 500 }}>Contenido</a></li>
      <li><a href="#" style={{ color: 'inherit', fontWeight: 500 }}>Contacto</a></li>
    </ul>
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <button className="btn btn-tertiary" style={{ padding: '10px 18px' }}>Ingresar</button>
      <button className="btn btn-primary" style={{ padding: '12px 22px' }}>
        Quiero un sistema <IconArrowRight size={16}/>
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section style={{ padding: '64px 56px 96px', background: 'var(--vena-marfil-digital)' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }}>
      <div>
        <span className="eyebrow-row" style={{ marginBottom: 24, display: 'inline-flex' }}>HOLA, SOY LAURA</span>
        <h1 style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '12px 0 24px' }}>
          IA práctica que <br/>funciona para <span style={{ color: 'var(--vena-coral-accion)' }}>negocios reales</span>.
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--fg-secondary)', maxWidth: 540, marginBottom: 32 }}>
          Clara, ingeniosa y sin drama técnico. Para emprendedores que quieren resultados, no teoría.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
          <button className="btn btn-primary" style={{ padding: '16px 28px', fontSize: 16 }}>
            Quiero un sistema <IconArrowRight size={18}/>
          </button>
          <button className="btn btn-secondary" style={{ padding: '16px 28px', fontSize: 16 }}>
            Ver academia
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span className="tag-mono">PROMPT LISTO</span>
          <span className="tag-mono azul">NEGOCIO REAL</span>
          <span className="tag-mono amarillo">IA SIN DRAMA</span>
        </div>
      </div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          background: '#fff', border: '1.5px solid var(--border-subtle)',
          borderRadius: 32, padding: 32, boxShadow: 'var(--shadow-2)',
          display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center',
        }}>
          <div style={{
            width: 280, height: 280, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ECE9E2, #F7F5EF)',
            border: '4px solid var(--vena-azul-noche)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fg-muted)', fontFamily: 'IBM Plex Mono', fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>FOTO LAURA</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 22, color: 'var(--vena-azul-noche)' }}>Laura · Vena Digital</div>
            <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: 'var(--fg-muted)', marginTop: 4 }}>Guía práctica de IA para emprendedores</div>
          </div>
        </div>
        <div style={{
          position: 'absolute', top: 12, right: -12,
          background: 'var(--vena-amarillo-energia)', color: 'var(--vena-azul-noche)',
          padding: '10px 16px', borderRadius: 999, transform: 'rotate(6deg)',
          fontFamily: 'IBM Plex Mono', fontWeight: 600, fontSize: 12,
          letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: 6,
          border: '2px solid var(--vena-azul-noche)',
        }}>
          <IconSparkle size={14}/> CLARO &gt; COMPLICADO
        </div>
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, body, color = 'coral' }) => {
  const colors = {
    coral:    { bg: 'var(--vena-coral-12)',    fg: 'var(--vena-coral-accion)' },
    azul:     { bg: 'var(--vena-azul-noche-08)', fg: 'var(--vena-azul-noche)' },
    amarillo: { bg: 'var(--vena-amarillo-20)',   fg: 'var(--vena-azul-noche)' },
  }[color];
  return (
    <div className="card interactive" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: colors.bg, color: colors.fg,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.55 }}>{body}</p>
      <a style={{ marginTop: 'auto', color: 'var(--vena-coral-accion)', fontWeight: 700,
                  fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        Explorar <IconArrowRight size={14}/>
      </a>
    </div>
  );
};

const Pillars = () => (
  <section style={{ padding: '80px 56px', background: '#fff' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
      <div>
        <span className="eyebrow-row" style={{ marginBottom: 12, display: 'inline-flex' }}>QUÉ HACEMOS</span>
        <h2 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: 620 }}>
          Menos caos. <span style={{ color: 'var(--vena-coral-accion)' }}>Más sistema.</span>
        </h2>
      </div>
      <p style={{ maxWidth: 360, color: 'var(--fg-secondary)', fontSize: 16, lineHeight: 1.55 }}>
        Cuatro frentes para volver la IA accionable. Sin teoría. Sin humo. Con plantillas listas para usar hoy.
      </p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <FeatureCard color="coral"    icon={<IconBriefcase size={22}/>}   title="Negocio real"          body="Estrategia y acciones con IA adaptadas a tu negocio, no a un caso de Silicon Valley." />
      <FeatureCard color="azul"     icon={<IconChat size={22}/>}        title="Prompts listos"        body="Una librería de prompts probados para vender, escribir y ordenar tu día a día." />
      <FeatureCard color="amarillo" icon={<IconBolt size={22}/>}        title="Automatiza con criterio" body="Primero ordenas, luego automatizas. Eligiendo qué vale la pena y qué no." />
      <FeatureCard color="coral"    icon={<IconUsers size={22}/>}       title="Comunidad"             body="Resuelve dudas con otros emprendedores y con Laura. Sin gurús, sin drama técnico." />
    </div>
  </section>
);

const AcademiaTeaser = () => (
  <section style={{ padding: '80px 56px', background: 'var(--vena-azul-noche)', color: '#fff' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'center' }}>
      <div>
        <span style={{
          fontFamily: 'IBM Plex Mono', fontSize: 13, fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vena-coral-suave)',
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid var(--vena-coral-suave)' }}/>
          ACADEMIA
        </span>
        <h2 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '16px 0 18px', color: '#fff' }}>
          Academia IA <br/>para Emprendedores.
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, maxWidth: 420, marginBottom: 24 }}>
          Clases cortas. Plantillas listas. Una metodología clara para que la IA trabaje para tu negocio, no al revés.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'DM Sans', fontSize: 15, color: 'rgba(255,255,255,0.92)' }}>
          {['12 módulos prácticos, sin relleno', '40+ prompts listos para copiar', 'Plantillas de Notion y Google', 'Acceso a la comunidad'].map(t => (
            <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--vena-coral-accion)',
                             display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <IconCheck size={14} stroke={3}/>
              </span>{t}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary">Ver academia</button>
          <button className="btn btn-highlight">Descarga gratis</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { tag: 'MÓDULO 01', title: 'Ordena tu negocio antes de automatizar', dur: '14 min', tone: 'amarillo' },
          { tag: 'MÓDULO 02', title: 'Tus 5 primeros prompts útiles',          dur: '11 min', tone: 'coral' },
          { tag: 'MÓDULO 03', title: 'Cómo escribir copies que conviertan',     dur: '17 min', tone: 'azul' },
          { tag: 'MÓDULO 04', title: 'Automatiza con criterio',                dur: '21 min', tone: 'coral' },
        ].map((m, i) => (
          <div key={i} style={{
            background: '#fff', color: 'var(--vena-azul-noche)',
            borderRadius: 24, padding: 22, display: 'flex', flexDirection: 'column', gap: 12,
            minHeight: 180,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`tag-mono ${m.tone === 'azul' ? 'azul' : m.tone === 'amarillo' ? 'amarillo' : ''}`}>{m.tag}</span>
              <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--fg-muted)' }}>{m.dur}</span>
            </div>
            <h4 style={{ fontFamily: 'Manrope', fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{m.title}</h4>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600 }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--vena-coral-12)',
                               color: 'var(--vena-coral-accion)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconPlay size={12}/>
                </span>
                Ver clase
              </div>
              <IconArrowRight size={16} style={{ color: 'var(--vena-coral-accion)' }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonial = () => (
  <section style={{ padding: '80px 56px', background: 'var(--vena-marfil-digital)' }}>
    <div style={{ background: '#fff', border: '1.5px solid var(--border-subtle)', borderRadius: 32, padding: '48px 56px',
                  display: 'grid', gridTemplateColumns: '160px 1fr', gap: 40, alignItems: 'center' }}>
      <div style={{
        width: 140, height: 140, borderRadius: '50%',
        border: '4px solid var(--vena-coral-accion)',
        background: 'var(--vena-gris-niebla)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--fg-muted)', fontFamily: 'IBM Plex Mono', fontSize: 10, letterSpacing: '0.12em',
      }}>FOTO</div>
      <div>
        <span className="eyebrow-row" style={{ marginBottom: 14, display: 'inline-flex' }}>OPINIÓN</span>
        <p style={{ fontFamily: 'Manrope', fontSize: 32, fontWeight: 700, lineHeight: 1.2,
                    color: 'var(--vena-azul-noche)', letterSpacing: '-0.02em', margin: 0, textWrap: 'balance' }}>
          “La tecnología solo tiene sentido cuando resuelve <span style={{ color: 'var(--vena-coral-accion)' }}>problemas reales</span> de las personas.”
        </p>
        <div style={{ marginTop: 18, fontFamily: 'DM Sans', fontSize: 15, color: 'var(--fg-secondary)' }}>
          <b style={{ color: 'var(--vena-azul-noche)' }}>Laura</b> · Fundadora, Vena Digital
        </div>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section style={{ padding: '72px 56px 88px', background: 'var(--vena-marfil-digital)' }}>
    <div style={{
      background: 'var(--vena-coral-accion)', color: '#fff',
      borderRadius: 40, padding: '56px 64px',
      display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'center',
    }}>
      <div>
        <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 13, fontWeight: 600,
                       letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
          ¿LISTO PARA ORDENAR EL CAOS?
        </span>
        <h2 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff', marginTop: 14 }}>
          Primero ordenas. <br/>Luego automatizas.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <button className="btn btn-secondary" style={{ background: 'var(--vena-azul-noche)' }}>
          Quiero un sistema <IconArrowRight size={16}/>
        </button>
        <button className="btn btn-tertiary" style={{ background: 'transparent', color: '#fff',
                                                     boxShadow: 'inset 0 0 0 2px #fff' }}>
          Hablar con Laura
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ padding: '36px 56px', background: 'var(--vena-azul-noche)', color: 'rgba(255,255,255,0.78)',
                   fontFamily: 'DM Sans', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <LogoLockup mascotSize={36} wordSize={16} inverse />
    <div style={{ display: 'flex', gap: 28 }}>
      <a style={{ color: 'rgba(255,255,255,0.78)', fontWeight: 500 }}>Academia</a>
      <a style={{ color: 'rgba(255,255,255,0.78)', fontWeight: 500 }}>Recursos</a>
      <a style={{ color: 'rgba(255,255,255,0.78)', fontWeight: 500 }}>Contacto</a>
      <a style={{ color: 'rgba(255,255,255,0.78)', fontWeight: 500 }}>Política</a>
    </div>
    <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
      © 2026 · VENA DIGITAL
    </span>
  </footer>
);

Object.assign(window, { Nav, Hero, Pillars, AcademiaTeaser, Testimonial, CTA, Footer });
