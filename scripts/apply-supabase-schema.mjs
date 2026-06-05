import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const password = process.env.SUPABASE_DB_PASSWORD;

if (!password) {
  console.error("Falta SUPABASE_DB_PASSWORD.");
  process.exit(1);
}

const policyDrops = [
  ["public.profiles", "Profiles can read own profile"],
  ["public.profiles", "Superadmins manage profiles"],
  ["public.projects", "Superadmins manage projects"],
  ["public.modules", "Superadmins manage modules"],
  ["public.submodules", "Superadmins manage submodules"],
  ["public.sessions", "Superadmins manage sessions"],
  ["public.tasks", "Superadmins manage tasks"],
  ["public.decisions", "Superadmins manage decisions"],
  ["public.deliverables", "Superadmins manage deliverables"],
  ["public.diagnostic_answers", "Superadmins manage diagnostic answers"],
  ["public.niche_profiles", "Superadmins manage niche profiles"],
  ["public.offers", "Superadmins manage offers"],
  ["public.files", "Superadmins manage files"],
  ["public.ikigai_clarity", "Superadmins manage ikigai clarity"],
  ["storage.objects", "Authenticated users can read project files"],
  ["storage.objects", "Authenticated users can upload project files"],
  ["storage.objects", "Authenticated users can update project files"],
  ["storage.objects", "Authenticated users can delete project files"]
];

const dropSql = `
drop trigger if exists on_auth_user_created on auth.users;
do $$
declare
  item text[];
begin
  foreach item slice 1 in array array[
    ${policyDrops.map(([table, policy]) => `array['${table}', '${policy.replaceAll("'", "''")}']`).join(",\n    ")}
  ]
  loop
    if to_regclass(item[1]) is not null then
      execute format('drop policy if exists %I on %s', item[2], item[1]);
    end if;
  end loop;
end $$;
`;

const schemaSql = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");
const seedSql = fs.readFileSync(path.join(root, "supabase", "seed.sql"), "utf8");

const client = new Client({
  host: "db.syjexvmokbxtrcxlhbhb.supabase.co",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password,
  ssl: { rejectUnauthorized: false }
});

await client.connect();

try {
  await client.query("begin");
  await client.query(dropSql);
  await client.query(schemaSql);
  await client.query(`
    create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function private.handle_new_user();
  `);
  await client.query(seedSql);
  await client.query("commit");
  console.log("Esquema y seed aplicados correctamente.");
} catch (error) {
  await client.query("rollback");
  throw error;
} finally {
  await client.end();
}
