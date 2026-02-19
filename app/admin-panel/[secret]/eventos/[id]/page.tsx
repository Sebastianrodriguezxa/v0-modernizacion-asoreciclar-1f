"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import { EventoForm } from "@/components/admin/evento-form"
import { Loader2 } from "lucide-react"
import type { CategoriaKey } from "@/lib/validations"

interface EventoData {
  id: number
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

export default function EditEventoPage() {
  const params = useParams()
  const eventoId = params.id as string
  const [evento, setEvento] = useState<EventoData | null>(null)
  const [imagenes, setImagenes] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchEvento() {
      try {
        const res = await fetch(`/api/eventos/${eventoId}`)
        if (!res.ok) {
          setError("Evento no encontrado")
          setLoading(false)
          return
        }
        const data = await res.json()
        setEvento({
          ...data.evento,
          destacado: !!data.evento.destacado,
          publicado: !!data.evento.publicado,
        })
        setImagenes(data.imagenes || [])
      } catch {
        setError("Error al cargar evento")
      } finally {
        setLoading(false)
      }
    }
    fetchEvento()
  }, [eventoId])

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminShell>
    )
  }

  if (error || !evento) {
    return (
      <AdminShell>
        <div className="text-center py-20">
          <p className="text-destructive font-medium">{error || "Evento no encontrado"}</p>
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell>
      <EventoForm
        initialData={evento}
        initialImages={imagenes}
        isEditing
      />
    </AdminShell>
  )
}
