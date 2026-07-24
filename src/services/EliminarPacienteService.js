import { supabase } from "../supabase/supabaseClient";

export async function eliminarPaciente(id) {
  const { error } = await supabase
    .from("registrar_paciente")
    .update({ activo: false }) 
    .eq("id", id);

  if (error) {
    throw error;
  }
}