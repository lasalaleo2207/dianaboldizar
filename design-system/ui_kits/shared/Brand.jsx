// Vena Digital — Shared mascot + logo React components used across UI kits.
// Now uses the official PNG artwork from /assets.
// Asset base: each host HTML sets window.VENA_ASSETS to the correct prefix
// before this script loads. Defaults to '' (assets/ sibling of host).
const ASSET_PREFIX = (typeof window !== 'undefined' && window.VENA_ASSETS) || '';

const Mascot = ({ size = 64 }) => (
  <img src={ASSET_PREFIX + 'assets/mascota.png'} alt="Mascota Vena Digital"
    style={{ width: size, height: size, objectFit: 'contain', display: 'inline-block' }}/>
);

const LogoHorizontal = ({ height = 56 }) => (
  <img src={ASSET_PREFIX + 'assets/logo-horizontal.png'} alt="Vena Digital"
    style={{ height, width: 'auto', display: 'inline-block' }}/>
);

// Backwards-compatible LogoLockup — uses the real horizontal logo image.
const LogoLockup = ({ mascotSize = 56, wordSize = 26, inverse = false }) => (
  <LogoHorizontal height={mascotSize}/>
);

// Wordmark kept for places we want type-only (no mascot)
const Wordmark = ({ size = 28, inverse = false }) => (
  <span style={{
    display: 'inline-flex', flexDirection: 'column', lineHeight: 0.92,
    fontFamily: "'Manrope', sans-serif", fontWeight: 800, letterSpacing: '-0.03em',
  }}>
    <span style={{ color: inverse ? '#fff' : '#0A2142', fontSize: size }}>Vena</span>
    <span style={{ color: '#FF6B5E', fontSize: size * 0.72 }}>Digital</span>
  </span>
);

// ─── Lucide-style line icons ─────────────────────────────────────────
const Icon = ({ d, size = 20, stroke = 2, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
       strokeLinejoin="round" {...rest}>{d}</svg>
);

const IconArrowRight   = (p) => <Icon {...p} d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>}/>;
const IconSearch       = (p) => <Icon {...p} d={<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>}/>;
const IconChat         = (p) => <Icon {...p} d={<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>}/>;
const IconCheck        = (p) => <Icon {...p} d={<polyline points="20 6 9 17 4 12"/>}/>;
const IconCheckCircle  = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/></>}/>;
const IconCalendar     = (p) => <Icon {...p} d={<><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>}/>;
const IconBriefcase    = (p) => <Icon {...p} d={<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>}/>;
const IconHome         = (p) => <Icon {...p} d={<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}/>;
const IconSettings     = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.8a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.4a7 7 0 0 0-2 1.2L5 5.8l-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.8a7 7 0 0 0 2 1.2L10 21h4l.5-2.4a7 7 0 0 0 2-1.2l2.4.8 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/></>}/>;
const IconSparkle      = (p) => <Icon {...p} d={<><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4"/></>}/>;
const IconBolt         = (p) => <Icon {...p} d={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>}/>;
const IconHeart        = (p) => <Icon {...p} d={<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>}/>;
const IconBookmark     = (p) => <Icon {...p} d={<path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>}/>;
const IconShare        = (p) => <Icon {...p} d={<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></>}/>;
const IconHeartPulse   = (p) => <Icon {...p} d={<><path d="M3 12h4l2-3 4 6 2-3h6"/></>}/>;
const IconPlay         = (p) => <Icon {...p} d={<polygon points="6 4 20 12 6 20 6 4"/>}/>;
const IconClock        = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>}/>;
const IconLock         = (p) => <Icon {...p} d={<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>}/>;
const IconBookOpen     = (p) => <Icon {...p} d={<><path d="M2 4h7a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-7a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h8z"/></>}/>;
const IconGrid         = (p) => <Icon {...p} d={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>}/>;
const IconBell         = (p) => <Icon {...p} d={<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>}/>;
const IconFolder       = (p) => <Icon {...p} d={<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>}/>;
const IconCopy         = (p) => <Icon {...p} d={<><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>}/>;
const IconMoreH        = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>}/>;
const IconUsers        = (p) => <Icon {...p} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>}/>;
const IconRocket       = (p) => <Icon {...p} d={<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>}/>;
const IconPeace        = (p) => <Icon {...p} d={<><path d="M12 22V8M9 8 7 4M15 8l2-4M9 8h6M9 8a3 3 0 0 0-3 3v3a6 6 0 0 0 12 0v-3a3 3 0 0 0-3-3"/></>}/>;

Object.assign(window, {
  SmartImg: undefined, Mascot, LogoHorizontal, LogoLockup, Wordmark,
  IconArrowRight, IconSearch, IconChat, IconCheck, IconCheckCircle,
  IconCalendar, IconBriefcase, IconHome, IconSettings, IconSparkle,
  IconBolt, IconHeart, IconBookmark, IconShare, IconHeartPulse,
  IconPlay, IconClock, IconLock, IconBookOpen, IconGrid, IconBell,
  IconFolder, IconCopy, IconMoreH, IconUsers, IconRocket, IconPeace,
});
