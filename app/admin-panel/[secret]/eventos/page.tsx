"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import { CATEGORIAS, type CategoriaKey } from "@/lib/validations"
import {
  Plus,
  Search,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Calendar,
  CalendarDays,
  Filter,
  Loader2,
} from "lucide-react"

interface Evento {
  id: number
  titulo: string
  descripcion: string
  fecha_evento: string
  categoria: CategoriaKey
  ubicacion: string
  destacado: number
  publicado: number
  total_imagenes: number
  imagen_principal: string | null
}

export default function EventosListPage() {
  const params = useParams()
  const secret = params.secret as string
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("todos")
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchEventos = useCallback(async () => {
    setLoading(true)
    try {
      const url = `/api/eventos?admin=true&limit=50${
        categoriaFilter !== "todos" ? `&categoria=${categoriaFilter}` : ""
      }`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setEventos(data.eventos || [])
      }
    } catch (err) {
      console.error("Error fetching eventos:", err)
    } finally {
      setLoading(false)
    }
  }, [categoriaFilter])

  useEffect(() => {
    fetchEventos()
  }, [fetchEventos])

  const togglePublicado = async (evento: Evento) => {
    try {
      const res = await fetch(`/api/eventos/${evento.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: evento.titulo,
          descripcion: evento.descripcion,
          fecha_evento: evento.fecha_evento.split("T")[0],
          categoria: evento.categoria,
          ubicacion: evento.ubicacion,
          destacado: !!evento.destacado,
          publicado: !evento.publicado,
        }),
      })
      if (res.ok) {
        setEventos((prev) =>
          prev.map((e) =>
            e.id === evento.id ? { ...e, publicado: e.publicado ? 0 : 1 } : e
          )
        )
      }
    } catch (err) {
      console.error("Error toggling publicado:", err)
    }
  }

  const handleDelete = async (id: number) => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/eventos/${id}`, { method: "DELETE" })
      if (res.ok) {
        setEventos((prev) => prev.filter((e) => e.id !== id))
        setDeleteId(null)
      }
    } catch (err) {
      console.error("Error deleting evento:", err)
    } finally {
      setDeleting(false)
    }
  }

  const filteredEventos = eventos.filter((e) =>
    e.titulo.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Eventos
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona los eventos de responsabilidad social
            </p>
          </div>
          <a
            href={`/admin-panel/${secret}/eventos/nuevo`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-green-mid transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nuevo Evento</span>
          </a>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar eventos..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            {/* Category filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={categoriaFilter}
                onChange={(e) => setCategoriaFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none cursor-pointer"
              >
                <option value="todos">Todas las categorias</option>
                {Object.entries(CATEGORIAS).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredEventos.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-bold text-foreground text-lg mb-1">
              No hay eventos
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {search
                ? "No se encontraron eventos con ese criterio"
                : "Crea tu primer evento para comenzar"}
            </p>
            <a
              href={`/admin-panel/${secret}/eventos/nuevo`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-green-mid transition-colors"
            >
              <Plus className="h-4 w-4" />
              Crear evento
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="hidden sm:block w-20 h-20 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                    {evento.imagen_principal ? (
                      <img
                        src={evento.imagen_principal}
                        alt={evento.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-foreground truncate">
                          {evento.titulo}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                              CATEGORIAS[evento.categoria]?.color ||
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {CATEGORIAS[evento.categoria]?.label || evento.categoria}
                          </span>
                          <span className="text-muted-foreground text-xs flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(evento.fecha_evento)}
                          </span>
                          <span className="text-muted-foreground text-xs flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            {evento.total_imagenes} fotos
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium ${
                              evento.publicado
                                ? "text-green-light"
                                : "text-muted-foreground"
                            }`}
                          >
                            {evento.publicado ? (
                              <>
                                <Eye className="h-3 w-3" /> Publicado
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3" /> Borrador
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => togglePublicado(evento)}
                          className={`p-2 rounded-lg transition-colors ${
                            evento.publicado
                              ? "text-green-light hover:bg-green-light/10"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                          title={
                            evento.publicado ? "Despublicar" : "Publicar"
                          }
                        >
                          {evento.publicado ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                        <a
                          href={`/admin-panel/${secret}/eventos/${evento.id}`}
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => setDeleteId(evento.id)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete confirmation modal */}
        {deleteId !== null && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-foreground/30 backdrop-blur-sm">
            <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full shadow-xl">
              <h3 className="font-bold text-foreground text-lg mb-2">
                Eliminar evento
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Esta accion no se puede deshacer. Se eliminaran tambien
                todas las imagenes asociadas.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-bold hover:bg-destructive/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
