// Vena Digital — Instagram post templates (1080 × 1350 portrait)

const PostFrame = ({ children, bg = 'var(--vena-marfil-digital)' }) => (
  <div style={{
    width: 540, height: 675, // displayed at 50% — design at 1080×1350
    background: bg, borderRadius: 20, overflow: 'hidden', position: 'relative',
    boxShadow: 'var(--shadow-2)', border: '1px solid var(--border-subtle)',
    display: 'flex', flexDirection: 'column',
  }}>{children}</div>
);

// 1. Educativo — clear background, big headline, one keyword in coral, mascot small
const PostEducativo = () => (
  <PostFrame>
    <div style={{ padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="tag-mono">PROMPT LISTO</span>
      <Mascot size={44}/>
    </div>
    <div style={{ flex: 1, padding: '8px 36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 56, lineHeight: 1.0,
                   letterSpacing: '-0.03em', color: 'var(--vena-azul-noche)' }}>
        3 prompts <br/>de IA para <br/><span style={{ color: 'var(--vena-coral-accion)' }}>vender más.</span>
      </h2>
      <p style={{ fontFamily: 'DM Sans', fontSize: 17, color: 'var(--fg-secondary)', marginTop: 18, lineHeight: 1.45, maxWidth: 380 }}>
        Listos para copiar. Probados con negocios reales. Sin teoría.
      </p>
    </div>
    <div style={{ padding: '0 32px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{
        background: 'var(--vena-azul-noche)', color: '#fff',
        padding: '12px 20px', borderRadius: 999,
        fontFamily: 'IBM Plex Mono', fontWeight: 600, fontSize: 12,
        letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        <IconBookmark size={14}/> GUARDA ESTE POST
      </span>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.12em' }}>
        @VENA.DIGITAL · 1/3
      </span>
    </div>
  </PostFrame>
);

// 2. Opinión — dark blue, photo of Laura, sharp opinion line
const PostOpinion = () => (
  <PostFrame bg="var(--vena-azul-noche)">
    <div style={{ padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, fontWeight: 600,
                     letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vena-coral-suave)',
                     display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid var(--vena-coral-suave)' }}/>
        OPINIÓN
      </span>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em' }}>
        VENA DIGITAL · 042
      </span>
    </div>
    <div style={{ flex: 1, padding: '20px 36px', display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
      <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 50, lineHeight: 1.05,
                   letterSpacing: '-0.02em', color: '#fff' }}>
        La IA no <br/>arregla un negocio <br/><span style={{ color: 'var(--vena-coral-accion)' }}>desordenado.</span>
      </h2>
      <p style={{ fontFamily: 'DM Sans', fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5, maxWidth: 380 }}>
        Primero ordenas. Luego automatizas. No al revés.
      </p>
    </div>
    <div style={{ padding: '20px 32px 28px', display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid var(--vena-coral-accion)',
                    background: 'var(--vena-gris-niebla)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Manrope', fontWeight: 800, color: 'var(--vena-azul-noche)', fontSize: 22 }}>L</div>
      <div>
        <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, color: '#fff' }}>Laura · Vena Digital</div>
        <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Guía práctica de IA</div>
      </div>
    </div>
  </PostFrame>
);

// 3. Lanzamiento — yellow energy, mascot prominent, big CTA
const PostLanzamiento = () => (
  <PostFrame bg="var(--vena-marfil-digital)">
    <div style={{ padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="tag-mono amarillo">LANZAMIENTO</span>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.12em' }}>15·MAY</span>
    </div>
    <div style={{ flex: 1, padding: '10px 36px 16px', display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
      <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
        <Mascot size={104}/>
        <span style={{ position: 'absolute', top: -8, right: -36, transform: 'rotate(8deg)',
                       background: 'var(--vena-amarillo-energia)', color: 'var(--vena-azul-noche)',
                       border: '2px solid var(--vena-azul-noche)', padding: '6px 12px', borderRadius: 999,
                       fontFamily: 'IBM Plex Mono', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em' }}>
          NUEVO
        </span>
      </div>
      <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 52, lineHeight: 1.02,
                   letterSpacing: '-0.03em', color: 'var(--vena-azul-noche)' }}>
        Academia IA <br/>para <span style={{ color: 'var(--vena-coral-accion)' }}>Emprendedores.</span>
      </h2>
      <p style={{ fontFamily: 'DM Sans', fontSize: 16, color: 'var(--fg-secondary)', lineHeight: 1.5, maxWidth: 380 }}>
        12 módulos. 40+ prompts. Plantillas listas. Sin drama técnico.
      </p>
    </div>
    <div style={{ padding: '0 32px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <button className="btn btn-primary" style={{ padding: '14px 22px', fontSize: 15 }}>
        Ver academia <IconArrowRight size={16}/>
      </button>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.12em' }}>
        @VENA.DIGITAL
      </span>
    </div>
  </PostFrame>
);

// Stories template — 1080 x 1920 (shown at smaller scale)
const Story = () => (
  <div style={{
    width: 270, height: 480, borderRadius: 20, overflow: 'hidden',
    background: 'var(--vena-coral-accion)', position: 'relative',
    display: 'flex', flexDirection: 'column', padding: 22,
    boxShadow: 'var(--shadow-2)',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <LogoLockup mascotSize={28} wordSize={14} inverse/>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 9, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em' }}>STORY</span>
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <h3 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 32, lineHeight: 1.05,
                   color: '#fff', letterSpacing: '-0.02em' }}>
        Menos <br/>caos. <br/><span style={{ color: 'var(--vena-amarillo-energia)' }}>Más sistema.</span>
      </h3>
    </div>
    <div style={{
      background: '#fff', borderRadius: 999, padding: '10px 16px',
      fontFamily: 'IBM Plex Mono', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
      color: 'var(--vena-azul-noche)', alignSelf: 'flex-start',
      display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      DESLIZA ARRIBA <IconArrowRight size={12}/>
    </div>
  </div>
);

Object.assign(window, { PostEducativo, PostOpinion, PostLanzamiento, Story });
