# PDR / Documento Funcional  
# Centro de Control Estratégico | Diana Boldizar

**Proyecto:** Plataforma modular de gestión estratégica, diagnóstico, construcción e implementación  
**Cliente:** Diana Boldizar  
**Consultora:** Laura Salazar / Vena Digital  
**Versión:** 1.0  
**Fecha:** 4 de junio de 2026  
**Formato:** Documento funcional base para diseño, desarrollo e implementación

---

## 1. Resumen ejecutivo

El **Centro de Control Estratégico | Diana Boldizar** será una plataforma web modular para centralizar el proceso de diagnóstico, estrategia, construcción e implementación del proyecto vendido a Diana Boldizar.

La plataforma funcionará como un **sistema operativo del proyecto**: un lugar único para consultar avances, completar ejercicios, registrar decisiones, visualizar entregables, revisar sesiones, gestionar tareas y evolucionar cada fase del proceso.

El primer módulo a desarrollar en profundidad será **Ikigai Clarity**, porque corresponde a la fase inicial del trabajo. Los demás módulos deberán existir desde el inicio como estructura de navegación y roadmap, pero podrán evolucionar progresivamente a medida que el proyecto avance.

La plataforma deberá estar optimizada principalmente para **desktop**, pero deberá funcionar correctamente en **responsive/mobile**, porque la realidad insiste en que la gente abre cosas importantes desde el celular mientras hace fila o responde WhatsApp. Una maravilla de la civilización moderna.

---

## 2. Objetivo del producto

Construir una plataforma privada, modular e interactiva que permita a Laura y Diana gestionar el proyecto estratégico completo desde un solo lugar.

### 2.1 Objetivo general

Diseñar y desarrollar un centro de control digital donde se pueda:

- Capturar información estratégica de Diana.
- Organizar el proceso por módulos y etapas.
- Consultar avances del proyecto.
- Registrar sesiones, tareas, decisiones y entregables.
- Visualizar mapas, dashboards, matrices y gráficas.
- Evolucionar desde diagnóstico hacia implementación comercial.
- Mantener trazabilidad del proceso estratégico completo.

### 2.2 Objetivos específicos

- Desarrollar el módulo **Ikigai Clarity** como primera unidad funcional completa.
- Crear una arquitectura modular que soporte futuros módulos: Business, Marca Personal, Sistema de Ventas, Medios e Implementación.
- Implementar autenticación privada para Laura y Diana.
- Usar **Supabase** como base de datos, autenticación y almacenamiento.
- Crear una interfaz alineada al sistema de diseño de **Vena Digital**.
- Permitir animaciones, dashboards, gráficas y visualizaciones dinámicas.
- Garantizar experiencia responsive en desktop, tablet y mobile.

---

## 3. Principios estratégicos de la plataforma

La plataforma debe construirse sobre seis principios:

### 3.1 Modularidad

Cada fase del proyecto debe tener su propio módulo, con objetivos, entregables, ejercicios, sesiones y decisiones asociadas.

### 3.2 Progresividad

No todos los módulos deben estar desarrollados desde el inicio. La plataforma debe permitir liberar una primera versión funcional centrada en Ikigai Clarity y expandirse por fases.

### 3.3 Claridad

Diana debe entender siempre:

- En qué fase está.
- Qué se está trabajando.
- Qué debe completar.
- Qué entregables existen.
- Qué decisiones se han tomado.
- Qué sigue.

### 3.4 Trazabilidad

Cada sesión, decisión, avance, tarea y entregable debe quedar registrado. Esto evita depender de memoria, chats sueltos o audios perdidos en WhatsApp, que es básicamente arqueología empresarial.

### 3.5 Interactividad

La plataforma no debe ser una carpeta estática. Debe permitir:

- Dashboards.
- Gráficas.
- Barras de progreso.
- Matrices interactivas.
- Estados visuales.
- Mapas de proceso.
- Animaciones suaves.
- Componentes dinámicos.

### 3.6 Reutilización metodológica

Aunque esta versión será para Diana, la estructura debe pensarse como un prototipo replicable de una futura metodología de Vena Digital para procesos de consultoría estratégica.

---

## 4. Usuarios y permisos

### 4.1 Usuarios iniciales

| Usuario | Rol | Nivel de acceso |
|---|---|---|
| Laura Salazar | Consultora / Vena Digital | Superadministradora |
| Diana Boldizar | Clienta | Superadministradora |

### 4.2 Regla de permisos inicial

En la primera versión, **Laura y Diana tendrán acceso completo a todos los módulos, vistas, documentos y entregables**.

Aunque ambos perfiles tendrán el mismo nivel de acceso, se recomienda mantener técnicamente una tabla de perfiles y roles para permitir una evolución futura.

### 4.3 Roles recomendados en base de datos

Aunque en esta versión solo se usará `superadmin`, se recomienda estructurar roles así:

| Rol | Uso actual | Uso futuro |
|---|---|---|
| superadmin | Laura y Diana | Acceso completo |
| editor | No usado en MVP | Equipo de apoyo |
| viewer | No usado en MVP | Consultas externas o invitados |

### 4.4 Consideración importante

Aunque Diana tenga acceso total, se recomienda definir desde diseño qué secciones son realmente visibles en navegación principal y cuáles pueden quedar como espacios internos de Laura si más adelante se requiere. Dar acceso total no significa necesariamente llenar la interfaz de todo. El caos también puede tener contraseña.

---

## 5. Arquitectura modular

La plataforma se organizará en siete espacios principales: un dashboard general y seis módulos estratégicos.

```text
Centro de Control Estratégico | Diana Boldizar
│
├── 00. Dashboard General
├── 01. Ikigai Clarity
├── 02. Business / Oferta
├── 03. Marca Personal
├── 04. Sistema de Ventas
├── 05. Medios & Posicionamiento
└── 06. Implementación & Seguimiento
```

---

## 6. Módulo 00: Dashboard General

### 6.1 Propósito

Ser la página principal del centro de control. Debe mostrar de forma clara el estado general del proyecto y permitir acceder a todos los módulos.

### 6.2 Componentes principales

#### 6.2.1 Header del proyecto

Debe mostrar:

- Nombre del proyecto.
- Nombre de la clienta.
- Fase actual.
- Estado general.
- Progreso global.

Ejemplo:

```text
Centro de Control Estratégico | Diana Boldizar
Fase actual: Ikigai Clarity
Estado: En proceso
Progreso global: 12%
```

#### 6.2.2 Tarjetas de módulos

Cada módulo debe mostrarse como una tarjeta.

| Campo | Descripción |
|---|---|
| Nombre del módulo | Ej: Ikigai Clarity |
| Descripción breve | Qué resuelve ese módulo |
| Estado | No iniciado / En proceso / En revisión / Validado / Cerrado |
| Progreso | Porcentaje o barra visual |
| CTA | Entrar al módulo |

#### 6.2.3 Próximas sesiones

Debe mostrar:

- Fecha.
- Tema.
- Módulo asociado.
- Objetivo.
- Preparación requerida.

#### 6.2.4 Tareas pendientes

Tabla o tablero con:

| Tarea | Responsable | Módulo | Fecha límite | Estado |
|---|---|---|---|---|

#### 6.2.5 Decisiones estratégicas recientes

Debe mostrar las decisiones más importantes tomadas hasta el momento.

| Decisión | Módulo | Fecha | Estado |
|---|---|---|---|

#### 6.2.6 Entregables recientes

Debe mostrar los últimos entregables publicados o actualizados.

| Entregable | Módulo | Estado | Fecha |
|---|---|---|---|

---

## 7. Módulo 01: Ikigai Clarity

### 7.1 Propósito

El módulo **Ikigai Clarity** busca construir claridad profunda sobre Diana antes de entrar en oferta, marca, ventas o medios.

Este módulo permite entender:

- Quién es Diana.
- Qué sabe hacer.
- Qué ama hacer.
- Qué no está dispuesta a negociar.
- Qué problemas puede resolver.
- Qué nichos puede impactar.
- Cómo puede transmitir su mensaje.

### 7.2 Estructura del módulo

```text
01. Ikigai Clarity
│
├── 01.1 Yo / Persona
├── 01.2 Oferta
├── 01.3 Mundo / Nicho
├── 01.4 Medio
└── Síntesis Ikigai Clarity
```

---

## 8. Submódulo 01.1: Yo / Persona

### 8.1 Objetivo

Conocer a profundidad a Diana para construir una estrategia alineada con su identidad, energía, capacidades y límites.

### 8.2 Secciones funcionales

#### 8.2.1 Perfil base

Campos sugeridos:

- Nombre completo.
- Rol actual.
- Trayectoria profesional.
- Momentos clave.
- Experiencias relevantes.
- Logros.
- Frustraciones.
- Cambios que quiere provocar.
- Qué quiere dejar atrás.

#### 8.2.2 Historia profesional

Preguntas sugeridas:

- ¿Qué momentos marcaron tu trayectoria profesional?
- ¿Qué decisiones te trajeron hasta aquí?
- ¿Qué experiencias te cambiaron la forma de trabajar?
- ¿Qué logros te representan?
- ¿Qué parte de tu historia todavía no has sabido contar?

#### 8.2.3 Matriz de habilidades

Clasificación recomendada:

| Tipo de habilidad | Descripción |
|---|---|
| Técnicas | Lo que sabe ejecutar |
| Estratégicas | Lo que sabe pensar, ordenar o decidir |
| Relacionales | Lo que sabe facilitar en personas o equipos |
| Diferenciales | Lo que hace de manera natural y distintiva |

Campos de la base:

| Campo | Tipo |
|---|---|
| habilidad | Texto |
| tipo | Select |
| evidencia | Texto largo |
| nivel | Número / escala 1-5 |
| energía_asociada | Alta / media / baja |
| monetizable | Sí / No / Por validar |

#### 8.2.4 Mapa de energía

Debe permitir clasificar actividades según energía y valor estratégico.

| Actividad | Me da energía | Me drena | Tiene valor comercial | Debe estar en mi modelo |
|---|---|---|---|---|

#### 8.2.5 No negociables

Categorías:

| Categoría | Ejemplos |
|---|---|
| Tiempo | Horarios, disponibilidad, carga semanal |
| Energía | Actividades que no quiere sostener |
| Clientes | Tipos de cliente que no acepta |
| Dinero | Mínimos, descuentos, condiciones de pago |
| Estilo de vida | Viajes, familia, descanso, libertad |
| Ética | Límites profesionales y personales |

#### 8.2.6 Declaraciones del yo

Campos sugeridos:

- Yo soy una persona que...
- Yo trabajo mejor cuando...
- Yo no estoy dispuesta a...
- Yo quiero ser reconocida por...
- Yo puedo ayudar especialmente a...
- Yo no quiero construir un negocio que...
- Mi trabajo debe permitirme...

### 8.3 Entregables del submódulo

- Mapa de identidad estratégica.
- Matriz de habilidades.
- Mapa de energía.
- Lista de no negociables.
- Declaraciones del yo.
- Síntesis de hallazgos personales.

---

## 9. Submódulo 01.2: Oferta

### 9.1 Objetivo

Identificar qué puede construir Diana con valor comercial a partir de sus habilidades, intereses, experiencia y límites.

### 9.2 Secciones funcionales

#### 9.2.1 Problemas que puede resolver

Campos:

| Campo | Descripción |
|---|---|
| Problema | Dolor o necesidad detectada |
| Persona afectada | Quién lo vive |
| Resultado deseado | Qué quiere lograr |
| Urgencia | Baja / media / alta |
| Disposición de pago | Baja / media / alta |
| Relación con habilidades de Diana | Texto |

#### 9.2.2 Oportunidades de oferta

Tipos posibles:

| Tipo | Ejemplos |
|---|---|
| Servicio 1:1 | Consultoría, mentoría, diagnóstico, acompañamiento |
| Servicio grupal | Talleres, programas, comunidades |
| Producto digital | Curso, guía, plantilla, recurso descargable |
| Conferencia | Charlas, eventos, empresas |
| Contenido monetizable | Newsletter, membresía, patrocinios |

#### 9.2.3 Matriz de priorización de oferta

| Idea de oferta | Deseo de Diana | Demanda del mercado | Facilidad de ejecución | Rentabilidad | Prioridad |
|---|---:|---:|---:|---:|---:|

### 9.3 Entregables del submódulo

- Mapa de oportunidades de oferta.
- Lista de productos y servicios potenciales.
- Matriz de priorización.
- Hipótesis de oferta principal.
- Hipótesis de escalera de valor.

---

## 10. Submódulo 01.3: Mundo / Nicho

### 10.1 Objetivo

Identificar qué mundos o nichos puede impactar Diana y cuáles tienen mayor potencial estratégico y comercial.

### 10.2 Concepto de “mundo”

En esta plataforma, “mundo” significa **nicho, audiencia o territorio de impacto**.

### 10.3 Secciones funcionales

#### 10.3.1 Mapa de mundos posibles

| Mundo / Nicho | Descripción | Por qué tiene sentido | Riesgos | Potencial |
|---|---|---|---|---|

#### 10.3.2 Ficha de nicho

Cada nicho deberá tener una ficha individual.

| Campo | Descripción |
|---|---|
| Nombre del nicho | Nombre interno |
| Perfil de la persona | Quién es |
| Situación actual | Qué está viviendo |
| Dolor principal | Qué le duele |
| Dolores secundarios | Otros problemas |
| Motivaciones | Qué desea lograr |
| Miedos | Qué teme |
| Objeciones | Por qué no compraría |
| Lenguaje real | Cómo habla de su problema |
| Nivel de conciencia | Bajo / medio / alto |
| Capacidad de pago | Baja / media / alta |
| Urgencia | Baja / media / alta |
| Canales donde está | Digitales y físicos |
| Oportunidad para Diana | Cómo puede ayudar |

#### 10.3.3 Dolores, motivaciones y objeciones

| Nicho | Dolor | Motivación | Objeción | Respuesta estratégica |
|---|---|---|---|---|

#### 10.3.4 Declaraciones del yo hacia el mundo

Plantillas:

- Ayudo a [nicho] a [resultado] sin [dolor/fricción].
- Acompaño a [tipo de persona] que quiere [deseo] pero se siente [bloqueo].
- Mi trabajo existe para que [nicho] pueda [transformación].
- Soy la persona indicada para [nicho] porque [diferencial].
- Mi enfoque combina [habilidad 1] + [habilidad 2] + [visión personal].

### 10.4 Entregables del submódulo

- Mapa de nichos.
- Fichas de nicho.
- Priorización de nichos.
- Primeras declaraciones de propuesta de valor.
- Hipótesis de posicionamiento.

---

## 11. Submódulo 01.4: Medio

### 11.1 Objetivo

Definir por dónde Diana va a transmitir su mensaje, construir autoridad, generar confianza y activar oportunidades comerciales.

### 11.2 Secciones funcionales

#### 11.2.1 Ecosistema de medios

| Tipo de medio | Ejemplos |
|---|---|
| Propios | Web, newsletter, blog, comunidad, base de datos |
| Sociales | Instagram, LinkedIn, YouTube, TikTok |
| Ganados | Entrevistas, podcasts, prensa, colaboraciones |
| Pagados | Ads, pauta, patrocinios |
| Físicos | Eventos, charlas, networking, talleres |

#### 11.2.2 Rol estratégico por canal

| Canal | Rol | Objetivo | Frecuencia | Tipo de contenido | Métrica |
|---|---|---|---|---|---|

#### 11.2.3 Funnel preliminar

| Etapa | Objetivo | Activo necesario |
|---|---|---|
| Descubrimiento | Que la conozcan | Contenido, colaboraciones, charlas |
| Interés | Que entiendan su enfoque | Lead magnet, newsletter, casos |
| Confianza | Que crean en su capacidad | Historias, testimonios, metodología |
| Conversión | Que compren o agenden | Página de venta, llamada, propuesta |
| Seguimiento | Que recompren o recomienden | Email, WhatsApp, CRM, comunidad |

### 11.3 Entregables del submódulo

- Mapa de medios.
- Rol estratégico por canal.
- Funnel preliminar.
- Activos mínimos necesarios.
- Roadmap inicial de implementación.

---

## 12. Módulo 02: Business / Oferta

### 12.1 Propósito

Construir en detalle la oferta comercial de Diana, incluyendo productos, servicios, pricing, promesa, entregables y modelo operativo.

### 12.2 Estado inicial

En el MVP este módulo puede aparecer como estructura inicial, sin estar desarrollado por completo.

### 12.3 Secciones futuras

- Arquitectura de productos y servicios.
- Escalera de valor.
- Oferta principal.
- Ofertas secundarias.
- Pricing.
- Promesa.
- Entregables.
- Bonos.
- Garantías.
- Objeciones.
- Proceso de entrega.
- Modelo operativo.
- Matriz de rentabilidad.

### 12.4 Entregables futuros

- Mapa de oferta.
- Ficha de cada producto o servicio.
- Argumentario comercial.
- Matriz de precios.
- Página base de oferta.

---

## 13. Módulo 03: Marca Personal

### 13.1 Propósito

Definir cómo Diana debe ser percibida y qué narrativa debe sostener en el mercado.

### 13.2 Secciones futuras

- Territorio de marca.
- Arquetipo.
- Tono de voz.
- Narrativa personal.
- Pilares de contenido.
- Temas no prioritarios.
- Mensajes clave.
- Bio profesional.
- Manifiesto.
- Storytelling personal.
- Sistema visual básico.
- Declaración de posicionamiento.

### 13.3 Entregables futuros

- Manual de marca personal.
- Mensajes clave.
- Pilares de contenido.
- Bio corta, media y larga.
- Narrativa fundacional.

---

## 14. Módulo 04: Sistema de Ventas

### 14.1 Propósito

Diseñar el sistema comercial que permitirá convertir visibilidad y autoridad en oportunidades reales de venta.

### 14.2 Secciones futuras

- Funnel por etapas.
- Lead magnets.
- Secuencia de nutrición.
- CRM.
- Proceso de llamada.
- Guion comercial.
- Propuestas.
- Seguimiento.
- Objeciones.
- Métricas comerciales.

### 14.3 Entregables futuros

- Mapa de funnel.
- Pipeline comercial.
- Guion de venta.
- Sistema de seguimiento.
- Dashboard de métricas comerciales.

---

## 15. Módulo 05: Medios & Posicionamiento

### 15.1 Propósito

Diseñar la presencia de Diana en medios digitales y físicos para sostener su posicionamiento y generar demanda.

### 15.2 Secciones futuras

- Estrategia de contenido.
- Redes sociales.
- Web.
- Newsletter.
- PR.
- Colaboraciones.
- Eventos.
- Charlas.
- Podcast / entrevistas.
- Calendario editorial.

### 15.3 Entregables futuros

- Estrategia de medios.
- Calendario de contenido.
- Mapa de colaboraciones.
- Plan de autoridad.
- Sistema de distribución.

---

## 16. Módulo 06: Implementación & Seguimiento

### 16.1 Propósito

Activar el sistema construido, ejecutar acciones, medir resultados y optimizar.

### 16.2 Secciones futuras

- Roadmap de implementación.
- Sprints semanales.
- Actividades por responsable.
- Métricas.
- Resultados.
- Aprendizajes.
- Ajustes.
- Riesgos.
- Decisiones pendientes.

### 16.3 Entregables futuros

- Tablero de implementación.
- Reporte de avance.
- Dashboard de ventas.
- Registro de experimentos.
- Plan de optimización.

---

## 17. Sistema de autenticación

### 17.1 Requisito general

La plataforma debe tener un sistema de login privado para Laura y Diana.

### 17.2 Tecnología recomendada

Usar **Supabase Auth**.

Supabase Auth permite autenticación con email y contraseña, magic links, OTP, login social y SSO. Para este proyecto se recomienda iniciar con **email + contraseña**, por simplicidad, control y baja fricción.

### 17.3 Flujo de login

```text
Usuario entra a la plataforma
↓
Ve pantalla de login
↓
Ingresa email y contraseña
↓
Supabase valida credenciales
↓
Se crea sesión segura
↓
Usuario entra al Dashboard General
```

### 17.4 Pantallas necesarias

- Login.
- Recuperar contraseña.
- Crear contraseña / invitación inicial.
- Dashboard después del login.

### 17.5 Usuarios iniciales

| Usuario | Email | Rol |
|---|---|---|
| Laura Salazar | Definir | superadmin |
| Diana Boldizar | Definir | superadmin |

### 17.6 Consideración técnica

Aunque ambos usuarios tendrán el mismo acceso, la base debe guardar:

- `user_id` de Supabase Auth.
- Nombre.
- Email.
- Rol.
- Estado.
- Fecha de creación.

Esto evita rehacer la arquitectura si luego se agregan asistentes, diseñadores, copywriters, implementadores o clientes con acceso parcial. Porque sí, eso va a pasar si el sistema funciona.

---

## 18. Arquitectura técnica recomendada

### 18.1 Stack recomendado

| Capa | Tecnología recomendada | Motivo |
|---|---|---|
| Frontend | Next.js + React + TypeScript | Aplicación web moderna, escalable y mantenible |
| Routing | Next.js App Router | Estructura moderna por rutas y layouts |
| UI | Tailwind CSS + shadcn/ui | Sistema visual flexible, componentes accesibles y personalizables |
| Animaciones | Motion for React | Animaciones suaves, layout animations, gestos y microinteracciones |
| Gráficas | Recharts | Gráficas declarativas integrables en React |
| Base de datos | Supabase Postgres | Base relacional robusta y flexible |
| Autenticación | Supabase Auth | Login integrado con usuarios y políticas |
| Almacenamiento | Supabase Storage | Archivos, PDFs, entregables y assets |
| Seguridad | Supabase RLS | Control de acceso a nivel de filas |
| Deploy | Vercel | Despliegue simple para Next.js |

### 18.2 Justificación del stack

**Next.js App Router** es recomendable porque permite construir una aplicación web organizada por rutas, layouts y componentes modernos. La documentación oficial indica que App Router usa características actuales de React como Server Components, Suspense y Server Functions.

**Supabase** es recomendable porque integra base de datos Postgres, autenticación, almacenamiento y seguridad mediante Row Level Security. Supabase recomienda combinar Auth con RLS para proteger datos desde la base de datos.

**Motion for React** es recomendable porque permite crear animaciones de interfaz, transiciones, gestos, animaciones de layout y experiencias más dinámicas.

**Recharts** es adecuado para dashboards porque permite construir gráficas usando componentes declarativos en React.

**Tailwind CSS** permite construir interfaces responsive de forma eficiente mediante clases utilitarias y breakpoints.

**shadcn/ui** es útil porque no funciona como una librería cerrada tradicional, sino como una base de componentes personalizables que se pueden adaptar al sistema de diseño de Vena Digital.

---

## 19. Sistema de diseño Vena Digital

La plataforma debe aplicar el sistema visual de **Vena Digital**.

### 19.1 Concepto visual

**Interfaz humana.**

Debe sentirse como una plataforma estratégica, clara, cálida, profesional y accionable. No debe parecer dashboard corporativo frío ni startup genérica con gradientes que gritan “levanté capital imaginario”.

### 19.2 Paleta de color

| Color | Uso | Hex |
|---|---|---|
| Azul noche | Estructura, navegación, títulos principales | `#0A2142` |
| Coral acción | CTAs, estados activos, énfasis | `#FF6B5E` |
| Amarillo energía | Alertas suaves, highlights, indicadores | `#F5C935` |
| Marfil digital | Fondo base cálido | `#F7F5EF` |
| Gris niebla | Bordes, fondos secundarios | `#ECE9E2` |
| Blanco | Superficies y cards | `#FFFFFF` |
| Azul suave | Fondos de apoyo | `#BFD7EA` |
| Gris carbón | Texto principal | `#2D2D2D` |
| Verde sistema | Estados completados | `#5FAE8B` |
| Coral suave | Fondos de énfasis suaves | `#F4A299` |

### 19.3 Tipografías

| Uso | Fuente |
|---|---|
| Títulos y jerarquías | Manrope |
| Cuerpo de texto | DM Sans |
| Etiquetas, estados y notas técnicas | IBM Plex Mono |

### 19.4 Componentes visuales base

- Cards redondeadas.
- Bordes suaves.
- Sombras sutiles.
- Chips de estado.
- Barras de progreso.
- Botones tipo pill.
- Inputs limpios.
- Ventanas tipo UI.
- Iconos lineales.
- Módulos en tarjetas.
- Secciones con mucho aire.

### 19.5 Reglas visuales

- Una idea principal por bloque.
- Máximo dos colores protagonistas por pantalla.
- Coral solo para activar o enfatizar.
- Amarillo solo como energía puntual.
- Azul para estructura.
- Evitar saturación visual.
- Evitar estética futurista fría.
- Evitar brutalismo.
- Evitar dashboards densos imposibles de leer.

---

## 20. Diseño responsive y mobile

### 20.1 Prioridad

La experiencia principal será desktop, pero la plataforma debe funcionar correctamente en mobile.

### 20.2 Breakpoints sugeridos

| Dispositivo | Ancho sugerido | Comportamiento |
|---|---:|---|
| Mobile | 320-767 px | Navegación simplificada, cards apiladas |
| Tablet | 768-1023 px | Layout mixto, 2 columnas cuando aplique |
| Desktop | 1024-1439 px | Layout completo |
| Wide desktop | 1440 px o más | Dashboard amplio con mayor densidad visual |

### 20.3 Reglas para mobile

En mobile:

- El sidebar debe convertirse en menú colapsable.
- Las tablas deben convertirse en cards o permitir scroll horizontal controlado.
- Las tarjetas de módulos deben apilarse verticalmente.
- Los CTAs deben ser grandes y fáciles de tocar.
- Los formularios deben dividirse por bloques cortos.
- Los dashboards deben priorizar datos clave, no intentar mostrar todo.
- Las gráficas deben simplificarse.
- Las matrices densas deben tener modo lectura resumida.

### 20.4 Componentes críticos responsive

| Componente | Desktop | Mobile |
|---|---|---|
| Sidebar | Fijo lateral | Menú hamburguesa / drawer |
| Cards de módulos | Grid 2-3 columnas | Una columna |
| Tablas | Tabla completa | Cards / scroll horizontal |
| Formularios | Dos columnas si aplica | Una columna |
| Dashboards | Varios widgets | Widgets apilados |
| Roadmap | Timeline horizontal | Timeline vertical |
| Funnel | Diagrama horizontal | Pasos verticales |

### 20.5 Requisito de accesibilidad táctil

En mobile, todos los botones y elementos clicables deben tener área táctil cómoda. No se deben usar botones minúsculos tipo “haz clic aquí con una aguja”.

---

## 21. Interactividad, animaciones y dashboards

### 21.1 Propósito

La plataforma debe sentirse viva, pero no ruidosa. Las animaciones deben ayudar a entender el proceso, no convertirse en fuegos artificiales para distraer de que no hay estrategia.

### 21.2 Tipos de animaciones permitidas

| Tipo | Uso |
|---|---|
| Transiciones de página | Cambio suave entre módulos |
| Microinteracciones | Hover, click, estados activos |
| Animaciones de progreso | Barras, porcentajes, hitos |
| Layout animations | Reordenamiento de cards o tableros |
| Animaciones de gráficos | Entrada progresiva de datos |
| Estados vacíos animados | Cuando un módulo aún no tiene contenido |

### 21.3 Componentes dinámicos deseados

- Dashboard de progreso general.
- Gráfica de avance por módulo.
- Funnel visual.
- Timeline del proyecto.
- Matriz de priorización interactiva.
- Mapa de nichos.
- Cards con estados animados.
- Indicadores de completitud.
- Visualización de tareas por estado.
- Roadmap modular.

### 21.4 Librerías recomendadas

| Necesidad | Librería |
|---|---|
| Animaciones UI | Motion for React |
| Gráficas | Recharts |
| Mapas de flujo / funnel | React Flow o componentes custom SVG |
| Iconografía | Lucide React |
| Componentes UI | shadcn/ui |

### 21.5 Regla de sobriedad

Toda animación debe cumplir al menos una función:

- Guiar la atención.
- Mostrar cambio de estado.
- Reforzar progreso.
- Facilitar comprensión.
- Mejorar navegación.

Si una animación solo existe porque “se ve cool”, se elimina. La interfaz no está aplicando para festival de luces.

---

## 22. Modelo de datos en Supabase

### 22.1 Principios de base de datos

La base de datos debe permitir:

- Gestionar usuarios.
- Organizar proyectos.
- Crear módulos y submódulos.
- Registrar sesiones.
- Guardar respuestas de diagnóstico.
- Crear tareas.
- Registrar decisiones.
- Gestionar entregables.
- Almacenar archivos.
- Consultar métricas y progreso.

### 22.2 Tablas recomendadas

#### 22.2.1 profiles

Guarda información pública del usuario autenticado.

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Relación con auth.users |
| full_name | text | Nombre completo |
| email | text | Email |
| role | text | superadmin / editor / viewer |
| avatar_url | text | Imagen opcional |
| created_at | timestamp | Fecha de creación |

#### 22.2.2 projects

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID del proyecto |
| name | text | Nombre del proyecto |
| client_name | text | Nombre de cliente |
| description | text | Descripción |
| status | text | Estado general |
| current_phase | text | Fase actual |
| progress | int | Progreso 0-100 |
| created_at | timestamp | Fecha de creación |

#### 22.2.3 modules

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID del módulo |
| project_id | uuid | Proyecto asociado |
| name | text | Nombre del módulo |
| slug | text | URL interna |
| description | text | Descripción |
| order_index | int | Orden |
| status | text | Estado |
| progress | int | Progreso |

#### 22.2.4 submodules

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID del submódulo |
| module_id | uuid | Módulo asociado |
| name | text | Nombre |
| description | text | Descripción |
| order_index | int | Orden |
| status | text | Estado |
| progress | int | Progreso |

#### 22.2.5 sessions

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID de sesión |
| project_id | uuid | Proyecto |
| module_id | uuid | Módulo |
| title | text | Título de sesión |
| session_date | date | Fecha |
| objective | text | Objetivo |
| notes | text | Notas |
| insights | text | Hallazgos |
| decisions_summary | text | Resumen de decisiones |
| next_steps | text | Próximos pasos |

#### 22.2.6 tasks

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID de tarea |
| project_id | uuid | Proyecto |
| module_id | uuid | Módulo |
| title | text | Tarea |
| description | text | Descripción |
| assignee_id | uuid | Responsable |
| due_date | date | Fecha límite |
| status | text | Pendiente / en proceso / en revisión / completada |
| priority | text | Baja / media / alta |

#### 22.2.7 decisions

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID de decisión |
| project_id | uuid | Proyecto |
| module_id | uuid | Módulo |
| title | text | Decisión |
| context | text | Contexto |
| rationale | text | Justificación |
| status | text | Provisional / validada / descartada |
| decided_at | date | Fecha |
| validated_by | uuid | Usuario que valida |

#### 22.2.8 deliverables

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID de entregable |
| project_id | uuid | Proyecto |
| module_id | uuid | Módulo |
| title | text | Nombre |
| description | text | Descripción |
| type | text | PDF / doc / link / imagen / dashboard |
| status | text | Borrador / revisión / aprobado |
| file_url | text | Link a Supabase Storage o externo |
| version | text | Versión |
| created_at | timestamp | Fecha |

#### 22.2.9 diagnostic_answers

Para almacenar respuestas del módulo Ikigai Clarity.

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID |
| project_id | uuid | Proyecto |
| submodule_id | uuid | Submódulo |
| question_key | text | Identificador de pregunta |
| question_label | text | Pregunta visible |
| answer | text | Respuesta |
| answer_type | text | text / select / scale / matrix |
| created_by | uuid | Usuario |
| updated_at | timestamp | Última actualización |

#### 22.2.10 niche_profiles

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID |
| project_id | uuid | Proyecto |
| name | text | Nombre del nicho |
| description | text | Descripción |
| pain_points | jsonb | Dolores |
| motivations | jsonb | Motivaciones |
| objections | jsonb | Objeciones |
| channels | jsonb | Canales |
| payment_capacity | text | Baja / media / alta |
| urgency | text | Baja / media / alta |
| opportunity_score | int | Puntaje |

#### 22.2.11 offers

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID |
| project_id | uuid | Proyecto |
| name | text | Nombre de oferta |
| type | text | Servicio / producto / charla / programa |
| description | text | Descripción |
| target_niche_id | uuid | Nicho asociado |
| value_proposition | text | Propuesta de valor |
| price_hypothesis | text | Hipótesis de precio |
| priority_score | int | Prioridad |

#### 22.2.12 files

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | ID |
| project_id | uuid | Proyecto |
| uploaded_by | uuid | Usuario |
| file_name | text | Nombre |
| file_path | text | Ruta en Storage |
| file_type | text | Tipo |
| module_id | uuid | Módulo asociado |
| created_at | timestamp | Fecha |

---

## 23. Seguridad y Row Level Security

### 23.1 Principio

Aunque inicialmente solo existan dos usuarios con acceso total, la base debe tener políticas de seguridad desde el inicio.

### 23.2 Recomendación

Activar **Row Level Security** en todas las tablas sensibles.

### 23.3 Política MVP

Como Laura y Diana serán superadministradoras, la política inicial puede ser:

```sql
-- Ejemplo conceptual, no definitivo
create policy "Superadmins can access all project data"
on projects
for all
using (
  exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
    and profiles.role = 'superadmin'
  )
);
```

### 23.4 Advertencia

Las políticas finales deben ser revisadas por un desarrollador antes de producción. Copiar y pegar SQL de un documento estratégico directo a producción es una forma elegante de invitar al desastre con café.

---

## 24. Requisitos funcionales

### RF01. Login privado

La plataforma debe permitir que Laura y Diana ingresen con email y contraseña.

### RF02. Recuperación de contraseña

Debe existir flujo de recuperación de contraseña mediante email.

### RF03. Dashboard general

Debe existir una página principal con estado del proyecto, módulos, tareas, sesiones, decisiones y entregables.

### RF04. Navegación modular

Debe existir navegación hacia todos los módulos del proyecto.

### RF05. Estado por módulo

Cada módulo debe mostrar estado y progreso.

Estados:

- No iniciado.
- En proceso.
- En revisión.
- Validado.
- Cerrado.

### RF06. Módulo Ikigai Clarity completo

La primera versión debe incluir las cuatro etapas:

- Yo.
- Oferta.
- Mundo / Nicho.
- Medio.

### RF07. Formularios de diagnóstico

La plataforma debe permitir capturar respuestas estratégicas mediante formularios.

### RF08. Matrices editables

Debe permitir registrar y visualizar matrices de habilidades, energía, oferta, nicho y canales.

### RF09. Registro de sesiones

Cada sesión debe tener una ficha con objetivo, notas, hallazgos, decisiones y próximos pasos.

### RF10. Registro de tareas

Debe permitir crear tareas, asignar responsables, fechas y estados.

### RF11. Registro de decisiones

Debe permitir documentar decisiones estratégicas con contexto, justificación y estado.

### RF12. Biblioteca de entregables

Debe permitir centralizar entregables por módulo, tipo, estado y versión.

### RF13. Carga de archivos

Debe permitir cargar archivos relacionados con entregables o recursos del proyecto.

### RF14. Visualización de progreso

Debe mostrar barras de progreso, estados y avances por módulo.

### RF15. Dashboards dinámicos

Debe permitir dashboards con gráficas y componentes dinámicos.

### RF16. Responsive design

La plataforma debe funcionar correctamente en desktop, tablet y mobile.

### RF17. Sistema visual Vena Digital

Toda la interfaz debe aplicar el sistema de diseño de Vena Digital.

---

## 25. Requisitos no funcionales

### RNF01. Rendimiento

La plataforma debe cargar rápido y evitar componentes pesados innecesarios.

### RNF02. Seguridad

Debe proteger rutas privadas, datos y archivos.

### RNF03. Escalabilidad

Debe permitir agregar más módulos, proyectos y usuarios en el futuro.

### RNF04. Mantenibilidad

El código debe organizarse por componentes, módulos, rutas y servicios.

### RNF05. Accesibilidad

Debe mantener contraste suficiente, tamaños legibles y navegación clara.

### RNF06. Responsive real

No basta con que “no se rompa” en mobile. Debe ser usable.

### RNF07. Consistencia visual

Todos los módulos deben usar los mismos patrones de diseño.

### RNF08. Trazabilidad

Toda información clave debe quedar registrada con fecha y usuario.

---

## 26. Rutas sugeridas de la aplicación

```text
/login
/forgot-password
/dashboard
/modules/ikigai-clarity
/modules/ikigai-clarity/yo
/modules/ikigai-clarity/oferta
/modules/ikigai-clarity/mundo
/modules/ikigai-clarity/medio
/modules/business
/modules/marca-personal
/modules/sistema-ventas
/modules/medios
/modules/implementacion
/sessions
/tasks
/decisions
/deliverables
/files
/settings
```

---

## 27. Componentes UI principales

### 27.1 Componentes globales

- AppShell.
- Sidebar.
- Topbar.
- UserMenu.
- ModuleCard.
- StatusChip.
- ProgressBar.
- SectionHeader.
- EmptyState.
- DataTable.
- FormBlock.
- DashboardWidget.
- Timeline.
- FunnelStep.
- DecisionCard.
- DeliverableCard.

### 27.2 Componentes específicos de Ikigai Clarity

- IdentityMap.
- SkillsMatrix.
- EnergyMatrix.
- NonNegotiablesList.
- YoStatementsEditor.
- OfferOpportunityMatrix.
- NicheProfileCard.
- NichePrioritizationTable.
- ChannelRoleTable.
- PreliminaryFunnelMap.

---

## 28. MVP recomendado

### 28.1 MVP funcional inicial

Debe incluir:

- Login.
- Dashboard general.
- Módulo Ikigai Clarity completo.
- Estructura visible de módulos futuros.
- Registro de sesiones.
- Registro de tareas.
- Registro de decisiones.
- Biblioteca de entregables.
- Supabase como base de datos.
- Responsive básico bien resuelto.
- Sistema visual Vena Digital.

### 28.2 No incluir en MVP

- CRM avanzado.
- Automatizaciones complejas.
- Métricas reales de ventas.
- Integraciones externas.
- Roles granulares.
- Portal multi-cliente.
- Edición colaborativa en tiempo real.
- Notificaciones avanzadas.

Meter todo desde el inicio sería construir un avión para cruzar la calle.

---

## 29. Roadmap de desarrollo sugerido

### Fase 1: Diseño funcional

- Validar estructura modular.
- Definir flujos de usuario.
- Diseñar wireframes.
- Confirmar campos de base de datos.
- Definir visual UI base.

### Fase 2: Setup técnico

- Crear proyecto Next.js.
- Configurar TypeScript.
- Configurar Tailwind.
- Integrar shadcn/ui.
- Configurar Supabase.
- Configurar Auth.
- Configurar rutas protegidas.

### Fase 3: MVP Dashboard + Login

- Pantalla login.
- Recuperar contraseña.
- Dashboard general.
- Sidebar.
- Cards de módulos.
- Estado general.

### Fase 4: Ikigai Clarity

- Página principal del módulo.
- Submódulo Yo.
- Formularios.
- Matriz de habilidades.
- Mapa de energía.
- No negociables.
- Declaraciones del yo.
- Submódulos Oferta, Mundo y Medio en estructura base.

### Fase 5: Bases globales

- Sesiones.
- Tareas.
- Decisiones.
- Entregables.
- Archivos.

### Fase 6: Interactividad y visualización

- Gráficas.
- Progreso animado.
- Funnel visual.
- Timeline.
- Matrices interactivas.

### Fase 7: QA y entrega

- Pruebas desktop.
- Pruebas mobile.
- Pruebas de login.
- Pruebas de permisos.
- Pruebas de carga de datos.
- Ajustes visuales.

---

## 30. Criterios de aceptación

### 30.1 Login

- Laura puede iniciar sesión.
- Diana puede iniciar sesión.
- Ambas acceden al dashboard.
- Ambas tienen acceso completo.
- La sesión se mantiene correctamente.
- Existe recuperación de contraseña.

### 30.2 Dashboard

- Muestra todos los módulos.
- Muestra fase actual.
- Muestra progreso general.
- Muestra tareas pendientes.
- Muestra decisiones recientes.
- Muestra entregables recientes.

### 30.3 Ikigai Clarity

- Tiene página principal.
- Tiene las cuatro etapas: Yo, Oferta, Mundo, Medio.
- Permite registrar información de la etapa Yo.
- Permite visualizar matrices.
- Permite guardar respuestas.
- Permite crear entregables asociados.

### 30.4 Responsive

- El dashboard se ve correctamente en mobile.
- El sidebar se adapta.
- Las cards se apilan.
- Las tablas no rompen el layout.
- Los formularios son usables desde celular.

### 30.5 Diseño

- Usa paleta Vena Digital.
- Usa estilo de cards, bordes suaves y aire visual.
- No se siente como plantilla genérica.
- Mantiene consistencia entre módulos.

---

## 31. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Sobrecargar el MVP | Alto | Desarrollar primero dashboard + Ikigai Clarity |
| Crear demasiadas secciones vacías | Medio | Mostrar módulos futuros como roadmap, no como cementerio de páginas |
| Responsive mal resuelto | Alto | Diseñar mobile desde wireframes, no como parche final |
| Permisos demasiado simples | Medio | Crear estructura de roles aunque solo se use superadmin |
| Base de datos rígida | Alto | Usar tablas relacionales + JSONB donde convenga |
| Animaciones innecesarias | Medio | Usarlas solo para progreso, navegación y comprensión |
| Falta de adopción por Diana | Alto | Interfaz clara, tareas visibles y pocos clics |

---

## 32. Recomendación estratégica final

La plataforma no debe construirse como un simple “portal para Diana”.

Debe construirse como el primer prototipo de un sistema propio de Vena Digital:

```text
Vena Growth OS
Diagnóstico → Oferta → Marca → Ventas → Medios → Implementación
```

La versión de Diana sería:

```text
Centro de Control Estratégico | Diana Boldizar
Powered by Vena Digital
```

Esto permite que el trabajo no se quede como un desarrollo aislado, sino como un activo metodológico replicable para futuros clientes.

---

## 33. Decisión recomendada de stack

La recomendación técnica final es:

```text
Frontend: Next.js + React + TypeScript
UI: Tailwind CSS + shadcn/ui
Animaciones: Motion for React
Gráficas: Recharts
Base de datos: Supabase Postgres
Auth: Supabase Auth
Storage: Supabase Storage
Seguridad: Supabase RLS
Deploy: Vercel
```

Esta combinación permite construir una plataforma:

- moderna,
- privada,
- modular,
- visual,
- responsive,
- animada,
- escalable,
- conectada a base de datos,
- y reutilizable como metodología propia.

---

## 34. Fuentes técnicas consultadas

- Next.js Docs - App Router: https://nextjs.org/docs/app
- Next.js Docs - Getting Started: https://nextjs.org/docs/app/getting-started
- Supabase Docs - Auth: https://supabase.com/docs/guides/auth
- Supabase Docs - Password-based Auth: https://supabase.com/docs/guides/auth/passwords
- Supabase Docs - Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Docs - Database Webhooks: https://supabase.com/docs/guides/database/webhooks
- Motion for React Docs: https://motion.dev/docs/react
- Recharts Docs: https://recharts.org/
- Tailwind CSS Responsive Design: https://tailwindcss.com/docs/responsive-design
- shadcn/ui Docs: https://ui.shadcn.com/docs

---

## 35. Próximo paso recomendado

El siguiente paso no debería ser programar de inmediato.

El siguiente paso debería ser construir un **wireframe funcional** del MVP con estas pantallas:

1. Login.
2. Dashboard general.
3. Página principal de Ikigai Clarity.
4. Submódulo Yo.
5. Registro de sesiones.
6. Registro de tareas.
7. Registro de decisiones.
8. Biblioteca de entregables.

Después de eso, sí se puede pasar a desarrollo. Porque diseñar después de programar es como ponerle frenos al carro después de estrellarlo: técnicamente posible, emocionalmente costoso.
