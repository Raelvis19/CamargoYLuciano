import { supabase } from "../supabase/supabaseClient";

export async function registrarPaciente(paciente) {
  const { data, error } = await supabase
    .from("registrar_paciente")
    .insert([paciente])
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function actualizarPaciente(id, paciente) {
  const { data, error } = await supabase
    .from("registrar_paciente")
    .update(paciente)
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}
