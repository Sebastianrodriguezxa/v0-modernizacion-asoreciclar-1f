"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { CATEGORIAS, type CategoriaKey } from "@/lib/validations"
import {
  Save,
  Eye,
  Upload,
  X,
  GripVertical,
  Loader2,
  AlertCircle,
  Check,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react"

interface EventoData {
  id?: number
  titulo: string
  descripcion: string
  fecha_evento: string
  categoria: CategoriaKey
  ubicacion: string
  destacado: boolean
  publicado: boolean
}

interface ImageData {
  id: number
  imagen_url: string
  alt_text: string
  orden: number
}

interface EventoFormProps {
  initialData?: EventoData
  initialImages?: ImageData[]
  isEditing?: boolean
}

export function EventoForm({
  initialData,
  initialImages = [],
  isEditing = false,
}: EventoFormProps) {
  const router = useRouter()
  const params = useParams()
  const secret = params.secret as string
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<EventoData>({
    titulo: initialData?.titulo || "",
    descripcion: initialData?.descripcion || "",
    fecha_evento: initialData?.fecha_evento?.split("T")[0] || "",
    categoria: initialData?.categoria || "otro",
    ubicacion: initialData?.ubicacion || "",
    destacado: initialData?.destacado || false,
    publicado: initialData?.publicado || false,
  })

  const [images, setImages] = useState<ImageData[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [uploadProgress, setUploadProgress] = useState<string>("")

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSave = async (publish?: boolean) => {
    setError("")
    setSuccess("")
    setSaving(true)

    const payload = {
      ...formData,
      publicado: publish !== undefined ? publish : formData.publicado,
    }

    try {
      const url = isEditing
        ? `/api/eventos/${initialData?.id}`
        : "/api/eventos"
      const method = isEditing ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Error al guardar")
        setSaving(false)
        return
      }

      if (!isEditing && data.id) {
        // Redirect to edit page so user can add images
        setSuccess("Evento creado. Redirigiendo para agregar fotos...")
        setTimeout(() => {
          router.push(`/admin-panel/${secret}/eventos/${data.id}`)
        }, 1000)
      } else {
        setSuccess("Evento guardado exitosamente")
        setFormData((prev) => ({
          ...prev,
          publicado: payload.publicado,
        }))
      }
    } catch {
      setError("Error de conexion")
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      if (!isEditing || !initialData?.id) {
        setError("Primero guarda el evento para poder subir imagenes")
        return
      }

      setUploading(true)
      setError("")
      const totalFiles = files.length

      for (let i = 0; i < totalFiles; i++) {
        const file = files[i]
        setUploadProgress(`Subiendo ${i + 1} de ${totalFiles}...`)

        const fd = new FormData()
        fd.append("file", file)
        fd.append("evento_id", String(initialData.id))
        fd.append("alt_text", formData.titulo)
        fd.append("orden", String(images.length + i))

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: fd,
          })
          const data = await res.json()

          if (res.ok && data.imagen) {
            setImages((prev) => [
              ...prev,
              {
                id: data.imagen.id,
                imagen_url: data.imagen.url,
                alt_text: data.imagen.alt_text,
                orden: data.imagen.orden,
              },
            ])
          } else {
            setError(data.error || `Error al subir ${file.name}`)
          }
        } catch {
          setError(`Error de conexion al subir ${file.name}`)
        }
      }

      setUploading(false)
      setUploadProgress("")
    },
    [isEditing, initialData?.id, formData.titulo, images.length]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files)
      }
    },
    [handleFileUpload]
  )

  const removeImage = async (imageId: number) => {
    try {
      const res = await fetch(`/api/upload/${imageId}`, { method: "DELETE" })
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== imageId))
      }
    } catch {
      setError("Error al eliminar imagen")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <a
        href={`/admin-panel/${secret}/eventos`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a eventos
      </a>

      <h1 className="font-serif text-3xl font-bold text-foreground mb-8">
        {isEditing ? "Editar Evento" : "Nuevo Evento"}
      </h1>

      {/* Status messages */}
      {error && (
        <div className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-xl p-4 mb-6 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError("")} className="ml-auto">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-light/10 text-green-mid rounded-xl p-4 mb-6 text-sm">
          <Check className="h-4 w-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info card */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-bold text-foreground mb-4">
              Informacion del evento
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="titulo"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Titulo *
                </label>
                <input
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="Ej: Entrega de mercados - Marzo 2024"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Descripcion *
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-y"
                  placeholder="Describe el evento en detalle..."
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fecha_evento"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Fecha del evento *
                  </label>
                  <input
                    id="fecha_evento"
                    name="fecha_evento"
                    type="date"
                    value={formData.fecha_evento}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="categoria"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Categoria *
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none cursor-pointer"
                  >
                    {Object.entries(CATEGORIAS).map(([key, cat]) => (
                      <option key={key} value={key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="ubicacion"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Ubicacion
                </label>
                <input
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="Ej: Sede principal, Monteria"
                />
              </div>
            </div>
          </div>

          {/* Images section (only for editing) */}
          {isEditing && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-bold text-foreground mb-4">
                Imagenes del evento
              </h2>

              {/* Drop zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleFileUpload(e.target.files)
                    e.target.value = ""
                  }}
                />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="text-muted-foreground text-sm">
                      {uploadProgress}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-foreground font-medium">
                      Arrastra imagenes aqui o haz click para seleccionar
                    </span>
                    <span className="text-muted-foreground text-xs">
                      JPG, PNG o WebP. Maximo 5MB por imagen.
                    </span>
                  </div>
                )}
              </div>

              {/* Image grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {images.map((img, index) => (
                    <div
                      key={img.id}
                      className="relative group rounded-xl overflow-hidden aspect-square bg-muted"
                    >
                      <img
                        src={img.imagen_url}
                        alt={img.alt_text || "Imagen del evento"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => removeImage(img.id)}
                          className="p-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                          title="Eliminar imagen"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-foreground/70 text-primary-foreground rounded-md px-2 py-0.5 text-xs">
                        <GripVertical className="h-3 w-3" />
                        {index + 1}
                      </div>
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-amber-warm text-green-dark rounded-md px-2 py-0.5 text-xs font-bold">
                          Principal
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && !uploading && (
                <div className="text-center py-6 mt-4 rounded-xl bg-muted/50">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">
                    Aun no hay imagenes. Sube la primera.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish card */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-bold text-foreground mb-4">Publicacion</h2>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">
                  Marcar como destacado
                </span>
              </label>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 border border-border text-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Guardar borrador
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-bold hover:bg-green-mid transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                Publicar evento
              </button>
            </div>
          </div>

          {/* Status card */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-bold text-foreground mb-3">Estado</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Visibilidad</span>
                <span
                  className={`font-medium ${
                    formData.publicado ? "text-green-light" : "text-amber-warm"
                  }`}
                >
                  {formData.publicado ? "Publicado" : "Borrador"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Imagenes</span>
                <span className="font-medium text-foreground">
                  {images.length}
                </span>
              </div>
              {formData.categoria && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Categoria</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold ${
                      CATEGORIAS[formData.categoria]?.color || ""
                    }`}
                  >
                    {CATEGORIAS[formData.categoria]?.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Help */}
          {!isEditing && (
            <div className="bg-amber-warm/10 rounded-2xl border border-amber-warm/20 p-6">
              <h3 className="font-bold text-foreground text-sm mb-2">
                Nota sobre imagenes
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Primero guarda el evento como borrador. Luego podras subir
                todas las imagenes desde la pantalla de edicion.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
