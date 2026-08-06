import { supabase } from "../supabase/supabaseClient";

export async function registrarDetalleAtencion(detalle) {
  const { data, error } = await supabase
    .from("detalle_atencion")
    .insert([detalle])
    .select();

  if (error) {
    throw error;
  }

  return data;
}
