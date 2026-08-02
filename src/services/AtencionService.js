import { supabase } from "../supabase/supabaseClient";

export async function registrarAtencion(atencion) {
  const { data, error } = await supabase
    .from("atenciones")
    .insert([atencion])
    .select();

  if (error) {
    throw error;
  }

  return data;
}
