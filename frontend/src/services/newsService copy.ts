import { supabase } from "./supabaseClient";

export type News = {
  id: string;
  titulo: string;
  contenido: string;
  autor?: string;
  vistas?: number;
  imagen?: string;
  categoria?: string;
  fecha?: string;
  comentarios?: number;
};

export const getNews = async (): Promise<News[]> => {
  const { data, error } = await supabase.from("News").select("*");

  if (error) {
    console.error("Error al obtener las noticias:", error);
    return [];
  }

  return data as News[];
};

export const deleteNews = async (id: string) => {
  const { data, error } = await supabase
    .from("News")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error al eliminar noticia:", error);
    throw error;
  }

  console.log("Noticia eliminada en base:", data);

  return data;
};