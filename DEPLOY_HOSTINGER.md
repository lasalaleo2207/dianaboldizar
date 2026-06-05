# Despliegue en Hostinger

Esta app es Next.js con API routes, por lo que debe desplegarse como **Node.js Web App**, no como sitio estático.

## Requisitos

- Node.js 20.9 o superior. Recomendado: Node 22.
- Repositorio GitHub: `https://github.com/lasalaleo2207/dianaboldizar.git`
- Dominio/subdominio: `diana.venadigital.com.co`
- Variables de entorno configuradas en Hostinger.

## Configuración en Hostinger

En hPanel crea una **Node.js Web App** conectada al repositorio de GitHub.

Valores recomendados:

- Branch: `main`
- Install command: `npm ci`
- Build command: `npm run build`
- Start command: `npm run start`
- Build/output directory: `.next`
- App URL: `https://diana.venadigital.com.co`

El script `start` ya toma el puerto de Hostinger con `PORT`:

```bash
next start -p ${PORT:-3000}
```

## Variables de entorno

Configura estas variables en Hostinger. No subas `.env.local` al repo.

```env
NEXT_PUBLIC_SUPABASE_URL=https://syjexvmokbxtrcxlhbhb.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM="Vena Digital <agenda@venadigital.com.co>"
APP_LOGIN_URL=https://diana.venadigital.com.co
OPENAI_API_KEY=
GOOGLE_CALENDAR_ID=vena.digital.2207@gmail.com
GOOGLE_CALENDAR_TIME_ZONE=America/Bogota
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_IMPERSONATE=
```

`GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY` y `GOOGLE_CALENDAR_IMPERSONATE` pueden quedar vacías mientras Google Calendar directo siga pendiente. Resend + archivos `.ics` funciona sin esas variables.

## Build local de verificación

Antes de desplegar:

```bash
npm ci
npm run build
```

## Supabase

La base, Auth y Storage ya están externos en Supabase. En producción no necesitas base de datos en Hostinger.

Verifica que exista:

- Tabla `profiles`
- Tabla `projects`
- Tabla `ikigai_clarity`
- Tabla `sessions`
- Tabla `tasks`
- Tabla `decisions`
- Tabla `files`
- Bucket privado `project-files`

## Después del despliegue

1. Abre `https://diana.venadigital.com.co/login`.
2. Ingresa con Laura.
3. Prueba:
   - Crear usuario.
   - Crear tarea y correo.
   - Programar sesión y correo.
   - Cargar archivo.
   - Guardar una sección de Ikigai.

## Notas

- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` y `OPENAI_API_KEY` son secretas.
- Ninguna llave secreta debe tener prefijo `NEXT_PUBLIC_`.
- Si Hostinger no permite procesos Node persistentes en tu plan, este proyecto no debe publicarse como hosting estático.
