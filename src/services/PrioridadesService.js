import { supabase } from "../supabase/supabaseClient";

export async function obtenerPrioridades() {
  const { data, error } = await supabase
    .from("prioridades")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function guardarPrioridad(prioridad) {
  const { data, error } = await supabase
    .from("prioridades")
    .insert([prioridad])
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function actualizarPrioridad(id, cambios) {
  const { data, error } = await supabase
    .from("prioridades")
    .update(cambios)
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function eliminarPrioridad(id) {
  const { error } = await supabase
    .from("prioridades")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}