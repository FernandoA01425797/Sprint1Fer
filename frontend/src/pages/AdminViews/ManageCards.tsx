import { useState, useEffect } from "react";
import type { Card, } from "../../services/cardsService"
import { getCards, addCard } from "../../services/cardsService"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Upload,
} from "lucide-react";

export function ManageCards(){

    const [showForm, setShowForm] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
          const data = await getCards();
          setCards(data);
          setLoading(false);
        };
    
        fetchCards();
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        
        await addCard(
            form.nombre,
            form.rareza,
            form.tipo,
            form.temporada,
            form.numero,
            selectedFile
            );
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-content py-8">
            <div className="max-w-[1600px] mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
                    GESTIONAR <span className="text-vcf-orange">CARTAS</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                    Administra el catálogo completo de cartas coleccionables
                </p>
                </div>


                <div className="bg-card border-2 border-border rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    
                        {/* Agregar Carta */}
                        <button
                        onClick={() => setShowForm(true)}
                        className="w-full md:w-auto px-6 py-3 bg-black border-2 border-black text-white rounded-lg font-black hover:bg-gray-900 hover:border-gray-900 transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                        >
                        <Plus size={20} />
                        AGREGAR CARTA
                        </button>
                    </div>

                </div>
            </div>

            {/* Add Card Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-card border-2 border-vcf-orange rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-card border-b-2 border-border p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-foreground">
                        AGREGAR NUEVA <span className="text-vcf-orange">CARTA</span>
                    </h2>
                    <button
                        onClick={() => setShowForm(false)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                        <X size={24} className="text-foreground" />
                    </button>
                    </div>

                    {/* Modal Content */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Card Name */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                        Nombre de la Carta *
                        </label>
                        <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Ej: Hugo Duro"
                        className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-lg focus:border-vcf-orange outline-none transition-all text-foreground"
                        />
                    </div>

                    {/* Card Value */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                        Valor (Puntos) *
                        </label>
                        <input
                        type="number"
                        required
                        min="0"
                        value={formData.value}
                        onChange={(e) =>
                            setFormData({ ...formData, value: e.target.value })
                        }
                        placeholder="Ej: 100"
                        className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-lg focus:border-vcf-orange outline-none transition-all text-foreground"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                        Categoría *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                        {categories.slice(1).map((cat) => {
                            const Icon = cat.icon;
                            return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() =>
                                setFormData({ ...formData, category: cat.id })
                                }
                                className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                                formData.category === cat.id
                                    ? `${cat.color} border-transparent text-white shadow-lg`
                                    : "bg-muted border-border text-muted-foreground hover:border-vcf-orange"
                                }`}
                            >
                                <Icon size={20} />
                                <span className="font-bold">{cat.label}</span>
                            </button>
                            );
                        })}
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                        URL de la Imagen
                        </label>
                        <div className="flex gap-2">
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) =>
                            setFormData({ ...formData, image: e.target.value })
                            }
                            placeholder="figma:asset/... o URL de imagen"
                            className="flex-1 px-4 py-3 bg-muted border-2 border-transparent rounded-lg focus:border-vcf-orange outline-none transition-all text-foreground"
                        />
                        <button
                            type="button"
                            className="px-4 py-3 bg-muted border-2 border-border rounded-lg hover:border-vcf-orange transition-all"
                        >
                            <Upload size={20} className="text-foreground" />
                        </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                        Deja vacío para usar imagen por defecto
                        </p>
                    </div>

                    {/* Preview */}
                    {formData.name && (
                        <div className="bg-muted rounded-lg p-4">
                        <p className="text-sm font-bold text-foreground mb-3">
                            Vista Previa:
                        </p>
                        <div className="bg-card border-2 border-border rounded-lg p-4 max-w-xs">
                            <div
                            className={`w-12 h-12 ${getCategoryColor(formData.category)} rounded-lg flex items-center justify-center mb-3`}
                            >
                            {React.createElement(
                                getCategoryIcon(formData.category),
                                { size: 24, className: "text-white" }
                            )}
                            </div>
                            <h4 className="font-black text-lg mb-2 text-foreground">
                            {formData.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                            <span className="font-bold">Valor:</span>{" "}
                            {formData.value || "0"} pts
                            </p>
                            <p className="text-sm text-muted-foreground">
                            <span className="font-bold">Categoría:</span>{" "}
                            {categories.find((c) => c.id === formData.category)
                                ?.label || "Común"}
                            </p>
                        </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4 border-t-2 border-border">
                        <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 px-6 py-3 bg-muted border-2 border-border text-foreground rounded-lg font-bold hover:bg-card transition-all"
                        >
                        CANCELAR
                        </button>
                        <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-black border-2 border-black text-white rounded-lg font-bold hover:bg-gray-900 hover:border-gray-900 transition-all shadow-md hover:shadow-lg hover:scale-105"
                        >
                        AGREGAR CARTA
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            )}
        </div>
    );
}