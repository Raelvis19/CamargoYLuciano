import { supabase } from "../supabase/supabaseClient";

export async function obtenerInventario() {
  const { data, error } = await supabase
    .from("inventario")
    .select("*")
    .eq("activo", true) 
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


export async function eliminarMedicamentoLogico(id) {
  const { data, error } = await supabase
    .from("inventario")
    .update({ activo: false })
    .eq("id", id);

  if (error) {
    throw error;
  }
  return data;
}