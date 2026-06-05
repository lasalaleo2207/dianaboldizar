// Vena Digital — Academia (course player) components

const Sidebar = ({ active = 'home' }) => {
  const items = [
    { id: 'home', label: 'Inicio', icon: <IconHome size={18}/> },
    { id: 'curso', label: 'Mi curso', icon: <IconBookOpen size={18}/> },
    { id: 'recursos', label: 'Recursos', icon: <IconFolder size={18}/> },
    { id: 'comunidad', label: 'Comunidad', icon: <IconUsers size={18}/> },
    { id: 'ajustes', label: 'Ajustes', icon: <IconSettings size={18}/> },
  ];
  return (
    <aside style={{
      width: 240, background: '#fff', borderRight: '1px solid var(--border-subtle)',
      padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 28, height: '100vh', position: 'sticky', top: 0,
    }}>
      <div style={{ padding: '0 8px' }}><LogoLockup mascotSize={36} wordSize={16}/></div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map(it => (
          <li key={it.id}>
            <a style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
              borderRadius: 14, fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14,
              color: active === it.id ? 'var(--vena-coral-accion)' : 'var(--vena-azul-noche)',
              background: active === it.id ? 'var(--vena-coral-12)' : 'transparent',
            }}>{it.icon}{it.label}</a>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 'auto', background: 'var(--vena-amarillo-20)', borderRadius: 18, padding: 16 }}>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
                       textTransform: 'uppercase', color: 'var(--vena-azul-noche)', marginBottom: 6 }}>RECURSO LISTO</div>
        <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 14, lineHeight: 1.3, color: 'var(--vena-azul-noche)', marginBottom: 12 }}>
          Checklist: ordena tu negocio antes de usar IA
        </div>
        <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13 }}>Descargar</button>
      </div>
    </aside>
  );
};

const Topbar = () => (
  <header style={{
    display: 'flex', alignItems: 'center', gap: 16, padding: '18px 32px',
    borderBottom: '1px solid var(--border-subtle)', background: '#fff',
  }}>
    <label className="input" style={{ flex: 1, maxWidth: 420 }}>
      <IconSearch size={18} className="input-icon"/>
      <input style={{ border: 0, background: 'transparent', outline: 0, width: '100%', font: 'inherit' }} placeholder="Busca un módulo, prompt o recurso…"/>
    </label>
    <span style={{ marginLeft: 'auto' }}/>
    <button style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid var(--border-subtle)',
                     background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <IconBell size={18}/>
    </button>
    <div className="avatar" style={{ background: 'var(--vena-amarillo-energia)' }}>L</div>
  </header>
);

const ProgressCard = () => (
  <div style={{ background: 'var(--vena-azul-noche)', color: '#fff', borderRadius: 28, padding: 32,
                display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'center' }}>
    <div>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, fontWeight: 600,
                     letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vena-coral-suave)' }}>
        ACADEMIA · MÓDULO 03
      </span>
      <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1, color: '#fff', margin: '12px 0 16px' }}>
        Cómo escribir copies <br/>que conviertan.
      </h2>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontFamily: 'DM Sans', fontSize: 14, color: 'rgba(255,255,255,0.78)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IconClock size={14}/> 17 min</span>
        <span>·</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IconBookOpen size={14}/> 6 lecciones</span>
      </div>
      <button className="btn btn-primary" style={{ marginTop: 22 }}>
        <IconPlay size={14}/> Continuar
      </button>
    </div>
    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>PROGRESO</span>
        <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 28 }}>42%</span>
      </div>
      <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: '42%', height: '100%', background: 'var(--vena-coral-accion)', borderRadius: 999 }}/>
      </div>
      <div style={{ marginTop: 16, fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>
        Llevas <b style={{ color: '#fff' }}>5 de 12</b> módulos. Sigue así.
      </div>
    </div>
  </div>
);

const ClassCard = ({ tag, title, dur, locked = false, done = false }) => (
  <div className="card interactive" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12, opacity: locked ? 0.6 : 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="tag-mono">{tag}</span>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--fg-muted)' }}>{dur}</span>
    </div>
    <div style={{ height: 130, background: 'var(--vena-gris-niebla)', borderRadius: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.12em' }}>
      MINIATURA · 16:9
    </div>
    <h4 style={{ fontFamily: 'Manrope', fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{title}</h4>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {done ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans', fontWeight: 700,
                       fontSize: 13, color: 'var(--vena-verde-sistema)' }}>
          <IconCheckCircle size={16}/> Completado
        </span>
      ) : locked ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans', fontWeight: 600,
                       fontSize: 13, color: 'var(--fg-muted)' }}>
          <IconLock size={14}/> Bloqueado
        </span>
      ) : (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans', fontWeight: 700,
                       fontSize: 13, color: 'var(--vena-coral-accion)' }}>
          <IconPlay size={14}/> Empezar
        </span>
      )}
      <IconArrowRight size={16} style={{ color: 'var(--fg-muted)' }}/>
    </div>
  </div>
);

const ModulesGrid = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <h3 style={{ fontFamily: 'Manrope', fontSize: 24, fontWeight: 700 }}>Tu camino</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <span className="tag-mono outline">TODOS</span>
        <span className="tag-mono">EN CURSO</span>
        <span className="tag-mono outline">COMPLETADOS</span>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <ClassCard tag="MÓDULO 01" title="Ordena tu negocio antes de automatizar" dur="14 min" done/>
      <ClassCard tag="MÓDULO 02" title="Tus 5 primeros prompts útiles" dur="11 min" done/>
      <ClassCard tag="MÓDULO 03" title="Cómo escribir copies que conviertan" dur="17 min"/>
      <ClassCard tag="MÓDULO 04" title="Automatiza con criterio" dur="21 min" locked/>
      <ClassCard tag="MÓDULO 05" title="IA para vender por WhatsApp" dur="19 min" locked/>
      <ClassCard tag="MÓDULO 06" title="Decisiones más rápidas con IA" dur="15 min" locked/>
    </div>
  </div>
);

Object.assign(window, { Sidebar, Topbar, ProgressCard, ClassCard, ModulesGrid });
