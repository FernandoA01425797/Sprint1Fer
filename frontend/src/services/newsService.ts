import { supabase } from "./supabaseClient";

export type News = {
  id?: string;
  titulo: string;
  contenido: string;
  autor?: string;
  vistas?: number;
  Imagen?: string | null;
  categoria?: string;
  published_at?: string | null;
  comentarios?: number;
  destacada?: boolean;
};

export const getNews = async (): Promise<News[]> => {
  const { data, error } = await supabase
    .from("News")
    .select("*");

  if (error) {
    console.error("NEWS ERROR message:", error.message);
    console.error("NEWS ERROR details:", error.details);
    console.error("NEWS ERROR hint:", error.hint);
    console.error("NEWS ERROR code:", error.code);
    return [];
  }

  console.log("NEWS DATA:", data);
  return (data ?? []) as News[];
};