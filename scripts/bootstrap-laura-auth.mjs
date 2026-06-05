import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data, error } = await supabase.auth.signUp({
  email: "laura@venadigital.com.co",
  password: "123456",
  options: {
    data: {
      full_name: "Laura Salazar"
    }
  }
});

if (error) {
  console.error(error.message);
  process.exit(1);
}

if (data.user && !data.session) {
  console.log("Usuario Laura creado. Puede requerir confirmación de email en Supabase Auth.");
} else {
  console.log("Usuario Laura creado y listo para iniciar sesión.");
}
