import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const desiredOptions = {
  public: false,
  fileSizeLimit: "100MB"
};

const { error } = await supabase.storage.createBucket("project-files", desiredOptions);

if (error && !isAlreadyExists(error) && !isLimitError(error)) {
  throw error;
}

if (isLimitError(error)) {
  const { error: fallbackError } = await supabase.storage.createBucket("project-files", {
    public: false
  });
  if (fallbackError && !isAlreadyExists(fallbackError)) {
    throw fallbackError;
  }
}

const { error: updateError } = await supabase.storage.updateBucket(
  "project-files",
  isLimitError(error) ? { public: false } : desiredOptions
);

if (updateError && !isLimitError(updateError)) {
  throw updateError;
}

console.log(isLimitError(error) || isLimitError(updateError)
  ? "Bucket project-files listo. El límite global de Supabase impidió fijar 100MB en el bucket."
  : "Bucket project-files listo con límite de 100MB.");

function isAlreadyExists(error) {
  return error?.message?.toLowerCase().includes("already exists");
}

function isLimitError(error) {
  return error?.statusCode === "413" || error?.message?.toLowerCase().includes("maximum allowed size");
}
