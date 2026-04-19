import { useEffect, useState } from "react";
import { Eye, MessageSquare } from "lucide-react";
import { getNews } from "../services/newsService";
import type { News } from "../services/newsService";

const fallbackImage =
  "https://images.unsplash.com/photo-1543357480-c60d40007a3f?auto=format&fit=crop&w=1200&q=80";

type Props = {
  category?: string;
};

export default function NewsList({ category = "TODAS" }: Props) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        console.log("CATEGORY ENVIADA:", category);

        // Por ahora getNews sin filtro para aislar el problema
        const data = await getNews();

        console.log("NOTICIAS RECIBIDAS EN COMPONENTE:", data);
        setNews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error en NewsList:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return <p className="news-loading">Cargando noticias...</p>;
  }

  if (news.length === 0) {
    return <p className="news-loading">No hay noticias disponibles.</p>;
  }

  return (
    <div className="news-grid">
      {news.map((item, i) => (
        <article key={item.id ?? i} className="news-card">
          <div className="news-image-wrapper">
            <img
              src={item.Imagen || fallbackImage}
              alt={item.titulo || "Noticia"}
              className="news-card-image"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />

            <div className="news-image-overlay"></div>

            <span className="news-category-badge">
              {item.categoria || "SIN CATEGORÍA"}
            </span>
          </div>

          <div className="news-card-body">
            <h2 className="news-card-title">{item.titulo}</h2>

            <p className="news-card-content">{item.contenido}</p>

            <div className="news-card-footer">
              <span className="news-card-date">
                {item.published_at || `Hace ${i + 1} horas`}
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