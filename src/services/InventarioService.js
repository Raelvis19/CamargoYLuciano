import { supabase } from "../supabase/supabaseClient";


export async function obtenerInventario() {
  const { data, error } = await supabase
    .from("inventario")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) {
    throw error;
  }
  return data;
}

export async function registrarMedicamento(medicamento) {
  const { data, error } = await supabase
    .from("inventario")
    .insert([medicamento])
    .select();

  if (error) {
    throw error;
  }
  return data;
}


export async function actualizarMedicamento(id, medicamento) {
  const { data, error } = await supabase
    .from("inventario")
    .update(medicamento)
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }
  return data;
}