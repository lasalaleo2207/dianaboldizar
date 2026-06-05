insert into public.projects (name, client_name, description, status, current_phase, progress)
values (
  'Centro de Control Estratégico',
  'Diana Boldizar',
  'Plataforma modular de gestión estratégica, diagnóstico, construcción e implementación.',
  'No iniciado',
  'Ikigai Clarity',
  0
)
on conflict (name) do update
set
  client_name = excluded.client_name,
  description = excluded.description,
  current_phase = excluded.current_phase;

-- El usuario Auth de Laura debe crearse en Supabase Auth con:
-- email: laura@venadigital.com.co
-- contraseña inicial: 123456
-- Luego se vincula este perfil usando el id de auth.users.
