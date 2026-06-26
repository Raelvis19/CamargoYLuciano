import { supabase } from '../supabase/supabaseClient';

export async function  buscarPacientes(busqueda) {
    const { data, error } = await supabase
      .from("registrar_paciente")
      .select("*")
        .or(`nombre.ilike.%${busqueda}%,matricula.ilike.%${busqueda}%,cedula.ilike.%${busqueda}%`,);
    
    if (error) {
      throw error;
    }

    return data;
}