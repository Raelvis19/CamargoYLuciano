import { supabase } from "../supabase/supabaseClient";

export async function eliminarPaciente(id) {
  const { error } = await supabase
    .from("registrar_paciente")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
