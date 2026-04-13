import { useEffect, useState } from "react";
import { Eye, MessageSquare } from "lucide-react";
import { getNews, deleteNews } from "../services/newsService copy";
import type { News } from "../services/newsService copy";

const fallbackImage =
  "https://images.unsplash.com/photo-1543357480-c60d40007a3f?auto=format&fit=crop&w=1200&q=80";

export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews();
      setNews(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

 
  const handleDelete = async (id: string) => {
  try {
    const deletedRows = await deleteNews(id);

    if (!deletedRows || deletedRows.length === 0) {
      console.warn("No se eliminó ninguna noticia en Supabase");
      return;
    }

    setNews((prev) => prev.filter((item) => item.id !== id));
    setOpenMenuId(null);
  } catch (error) {
    console.error("Error al eliminar noticia:", error);
  }
  };


  if (loading) return <p className="news-loading">Cargando noticias...</p>;

  return (
    <div className="news-grid">
      {news.map((item, i) => (
        <article key={item.id} className="news-card">
          <button
            className="news-card-menu-btn"
            onClick={() =>
              setOpenMenuId(openMenuId === item.id ? null : item.id)
            }
          >
            ⋮
          </button>

          {openMenuId === item.id && (
            <div className="news-card-actions">
              <button>Editar noticia</button>

              {/* CAMBIO 5: conectamos el botón con handleDelete */}
              <button onClick={() => handleDelete(item.id)}>
                Eliminar noticia
              </button>
            </div>
          )}

          <div className="news-image-wrapper">
            <img
              src={item.imagen || fallbackImage}
              alt={item.titulo}
              className="news-card-image"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />

            <div className="news-image-overlay"></div>

            <span className="news-category-badge">
              {item.categoria ||
                (i % 3 === 0 ? "EQUIPO" : i % 3 === 1 ? "PARTIDO" : "CLUB")}
            </span>
          </div>

          <div className="news-card-body">
            <h2 className="news-card-title">{item.titulo}</h2>

            <p className="news-card-content">{item.contenido}</p>

            <div className="news-card-footer">
              <span className="news-card-date">
                {item.fecha || `Hace ${i + 1} horas`}
              </span>

              <span className="news-dot">•</span>

              <span className="news-card-views">
                <Eye size={15} />
                {item.vistas ?? 0}
              </span>

              <span className="news-dot">•</span>

              <span className="news-card-comments">
                <MessageSquare size={15} />
                {item.comentarios ?? 0}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}