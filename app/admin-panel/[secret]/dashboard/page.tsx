"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import {
  CalendarDays,
  Image as ImageIcon,
  Eye,
  FileEdit,
  Plus,
} from "lucide-react"

interface DashboardStats {
  totalEventos: number
  publicados: number
  borradores: number
  totalImagenes: number
}

export default function DashboardPage() {
  const params = useParams()
  const secret = params.secret as string
  const [stats, setStats] = useState<DashboardStats>({
    totalEventos: 0,
    publicados: 0,
    borradores: 0,
    totalImagenes: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/eventos?admin=true&limit=50")
        if (res.ok) {
          const data = await res.json()
          const eventos = data.eventos || []
          const publicados = eventos.filter((e: Record<string, unknown>) => e.publicado).length
          const totalImagenes = eventos.reduce(
            (acc: number, e: Record<string, unknown>) => acc + (Number(e.total_imagenes) || 0),
            0
          )
          setStats({
            totalEventos: data.pagination?.total || eventos.length,
            publicados,
            borradores: eventos.length - publicados,
            totalImagenes,
          })
        }
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      label: "Total Eventos",
      value: stats.totalEventos,
      icon: CalendarDays,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Publicados",
      value: stats.publicados,
      icon: Eye,
      color: "bg-green-light/10 text-green-light",
    },
    {
      label: "Borradores",
      value: stats.borradores,
      icon: FileEdit,
      color: "bg-amber-warm/10 text-amber-warm",
    },
    {
      label: "Imagenes",
      value: stats.totalImagenes,
      icon: ImageIcon,
      color: "bg-blue-500/10 text-blue-600",
    },
  ]

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Resumen general de eventos y contenido
            </p>
          </div>
          <a
            href={`/admin-panel/${secret}/eventos/nuevo`}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-green-mid transition-colors self-start sm:self-auto flex-shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Evento</span>
          </a>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.color} mb-3`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              {loading ? (
                <div className="h-9 w-16 bg-muted rounded-lg animate-pulse" />
              ) : (
                <span className="block font-serif text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
              )}
              <span className="block text-muted-foreground text-sm mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-bold text-foreground text-lg mb-4">
            Acciones rapidas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <a
              href={`/admin-panel/${secret}/eventos/nuevo`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Plus className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <span className="block font-bold text-foreground text-sm">
                  Crear evento
                </span>
                <span className="block text-muted-foreground text-xs">
                  Nuevo evento con fotos
                </span>
              </div>
            </a>
            <a
              href={`/admin-panel/${secret}/eventos`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-warm/10 flex items-center justify-center group-hover:bg-amber-warm transition-all">
                <CalendarDays className="h-5 w-5 text-amber-warm group-hover:text-green-dark" />
              </div>
              <div>
                <span className="block font-bold text-foreground text-sm">
                  Ver eventos
                </span>
                <span className="block text-muted-foreground text-xs">
                  Gestionar todos los eventos
                </span>
              </div>
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-all">
                <Eye className="h-5 w-5 text-blue-600 group-hover:text-primary-foreground" />
              </div>
              <div>
                <span className="block font-bold text-foreground text-sm">
                  Ver sitio
                </span>
                <span className="block text-muted-foreground text-xs">
                  Abrir pagina publica
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
