"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Image as ImageIcon } from "lucide-react"
import { CATEGORIAS, type CategoriaKey } from "@/lib/validations"

interface EventoImage {
  id: number
  imagen_url: string
  alt_text: string
}

interface EventoDetail {
  id: number
  titulo: string
  descripcion: string
  fecha_evento: string
  categoria: CategoriaKey
  ubicacion: string
}

interface EventoLightboxProps {
  evento: EventoDetail
  onClose: () => void
}

export function EventoLightbox({ evento, onClose }: EventoLightboxProps) {
  const [images, setImages] = useState<EventoImage[]>([])
  const [currentImage, setCurrentImage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`/api/eventos/${evento.id}/imagenes`)
        if (res.ok) {
          const data = await res.json()
          setImages(data.imagenes || [])
        }
      } catch (err) {
        console.error("Error fetching images:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [evento.id])

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation and focus trap
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"

    // Set focus to the dialog for screen readers
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement
    dialog?.focus()

    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose, nextImage, prevImage])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const cat = CATEGORIAS[evento.categoria]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Evento: ${evento.titulo}`}
      tabIndex={-1}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-card rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-foreground/50 text-primary-foreground hover:bg-foreground/70 transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image gallery */}
        <div className="relative aspect-[16/9] bg-muted flex-shrink-0">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : images.length > 0 ? (
            <>
              <img
                src={images[currentImage].imagen_url}
                alt={images[currentImage].alt_text || evento.titulo}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-foreground/40 text-primary-foreground hover:bg-foreground/60 transition-colors"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-foreground/40 text-primary-foreground hover:bg-foreground/60 transition-colors"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-foreground/50 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {currentImage + 1} / {images.length}
                  </div>
                </>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 flex gap-1">
                  {images.slice(0, 6).map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-8 h-8 rounded-md overflow-hidden border-2 transition-all ${
                        currentImage === idx
                          ? "border-primary-foreground scale-110"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.imagen_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  {images.length > 6 && (
                    <div className="w-8 h-8 rounded-md bg-foreground/50 text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                      +{images.length - 6}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">Sin imagenes</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 overflow-y-auto flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {cat && (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${cat.color}`}
              >
                {cat.label}
              </span>
            )}
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(evento.fecha_evento)}
            </span>
            {evento.ubicacion && (
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {evento.ubicacion}
              </span>
            )}
          </div>

          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4 text-balance">
            {evento.titulo}
          </h2>

          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {evento.descripcion}
          </p>
        </div>
      </div>
    </div>
  )
}
