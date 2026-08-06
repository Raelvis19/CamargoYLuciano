import { supabase } from "../supabase/supabaseClient";

export async function guardarReceta(receta) {
  const { data, error } = await supabase
    .from("recetas")
    .insert([receta])
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function obtenerRecetas() {
  const { data, error } = await supabase
    .from("recetas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function eliminarReceta(id) {
  const { error } = await supabase
    .from("recetas")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}