"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { EventoLightbox } from "@/components/evento-lightbox"
import { CATEGORIAS, type CategoriaKey } from "@/lib/validations"
import {
  Calendar,
  Image as ImageIcon,
  MapPin,
  Loader2,
  Filter,
} from "lucide-react"

interface Evento {
  id: number
  titulo: string
  descripcion: string
  fecha_evento: string
  categoria: CategoriaKey
  ubicacion: string
  imagen_principal: string | null
  total_imagenes: number
}

export function EventosGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.05 })
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategoria, setActiveCategoria] = useState("todos")
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null)

  useEffect(() => {
    async function fetchEventos() {
      setLoading(true)
      try {
        const url = `/api/eventos?limit=50${
          activeCategoria !== "todos" ? `&categoria=${activeCategoria}` : ""
        }`
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setEventos(data.eventos || [])
        } else {
          // API failed (possibly no DB), silently fallback
          setEventos([])
        }
      } catch {
        // Network or DB error, silently fallback
        setEventos([])
      } finally {
        setLoading(false)
      }
    }
    fetchEventos()
  }, [activeCategoria])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Group events by year for the timeline
  const eventsByYear = eventos.reduce<Record<string, Evento[]>>((acc, evento) => {
    const year = new Date(evento.fecha_evento).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(evento)
    return acc
  }, {})

  const years = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a))

  const categorias = [
    { key: "todos", label: "Todos" },
    ...Object.entries(CATEGORIAS).map(([key, cat]) => ({
      key,
      label: cat.label,
    })),
  ]

  if (loading && eventos.length === 0) {
    return (
      <div ref={sectionRef} className="py-24 lg:py-32 bg-cream">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  // If no events in DB yet, don't render this section
  if (!loading && eventos.length === 0) {
    return null
  }

  return (
    <>
      <div ref={sectionRef} className="relative py-24 lg:py-32 bg-cream overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-primary/3 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-amber-warm/5 rounded-full" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2 mb-6">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                Galeria de Eventos
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-[0.95] max-w-4xl mx-auto text-balance">
              Nuestros eventos en{" "}
              <span className="italic text-primary">accion</span>
            </h3>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Explora las jornadas, entregas y celebraciones que realizamos
              para nuestros recicladores y sus familias.
            </p>
          </div>

          {/* Category filters */}
          <div
            className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {categorias.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategoria(cat.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeCategoria === cat.key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border border-border text-foreground hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                {cat.key === "todos" && <Filter className="h-3.5 w-3.5" />}
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            /* Timeline grouped by year */
            <div className="space-y-16">
              {years.map((year) => (
                <div key={year}>
                  {/* Year header */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-serif text-5xl lg:text-7xl font-bold text-primary/15">
                      {year}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-muted-foreground text-sm font-medium">
                      {eventsByYear[year].length} evento{eventsByYear[year].length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Events grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventsByYear[year].map((evento, idx) => (
                      <button
                        key={evento.id}
                        onClick={() => setSelectedEvento(evento)}
                        className={`group text-left bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-500 ${
                          isVisible
                            ? "animate-fade-in-up"
                            : "opacity-0"
                        }`}
                        style={{ animationDelay: `${300 + idx * 100}ms` }}
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                          {evento.imagen_principal ? (
                            <img
                              src={evento.imagen_principal}
                              alt={evento.titulo}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-10 w-10 text-muted-foreground" />
                            </div>
                          )}
                          {/* Category badge */}
                          <div className="absolute top-3 left-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                                CATEGORIAS[evento.categoria]?.color || "bg-muted text-muted-foreground"
                              }`}
                            >
                              {CATEGORIAS[evento.categoria]?.label || evento.categoria}
                            </span>
                          </div>
                          {/* Photo count */}
                          {evento.total_imagenes > 0 && (
                            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-foreground/60 text-primary-foreground rounded-lg px-2 py-1 text-xs font-medium">
                              <ImageIcon className="h-3 w-3" />
                              {evento.total_imagenes}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(evento.fecha_evento)}</span>
                            {evento.ubicacion && (
                              <>
                                <span className="text-border">|</span>
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{evento.ubicacion}</span>
                              </>
                            )}
                          </div>
                          <h4 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {evento.titulo}
                          </h4>
                          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                            {evento.descripcion}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedEvento && (
        <EventoLightbox
          evento={selectedEvento}
          onClose={() => setSelectedEvento(null)}
        />
      )}
    </>
  )
}
