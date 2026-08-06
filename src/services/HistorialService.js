import { supabase } from "../supabase/supabaseClient";

export async function obtenerHistorialPaciente(pacienteId) {
  const { data, error } = await supabase
    .from("atenciones")
    .select("*")
    .eq("paciente_id", pacienteId)
    .order("fecha", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}



export async function obtenerDetalleAtencion(atencionId) {
  const { data, error } = await supabase
    .from("detalle_atencion")
    .select(
      `
      *,
      inventario (
        id,
        nombre,
        codigo
      )
    `,
    )
    .eq("atencion_id", atencionId);

  if (error) {
    throw error;
  }

  return data;
}