"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { FileText, Download, Calendar, ExternalLink, Shield } from "lucide-react"

const informes = [
  {
    title: "Informe de Gestion 2024",
    description: "Resultados operativos, financieros y de impacto social del ano 2024.",
    date: "Marzo 2025",
    type: "PDF",
    size: "2.4 MB",
  },
  {
    title: "Informe de Gestion 2023",
    description: "Balance completo de operaciones y logros alcanzados durante 2023.",
    date: "Febrero 2024",
    type: "PDF",
    size: "3.1 MB",
  },
  {
    title: "Informe de Gestion 2022",
    description: "Resumen de actividades, metricas de impacto y estados financieros.",
    date: "Enero 2023",
    type: "PDF",
    size: "2.8 MB",
  },
  {
    title: "Informe de Gestion 2021",
    description: "Primer informe integral de operaciones y crecimiento de la organizacion.",
    date: "Enero 2022",
    type: "PDF",
    size: "1.9 MB",
  },
]

export function Transparencia() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section id="transparencia" ref={sectionRef} className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">Rendicion de cuentas</span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mt-4 leading-[0.95]">
              <span className="italic text-primary">Transparencia</span> total
            </h2>
          </div>
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Creemos en la rendicion de cuentas como pilar de confianza. Todos nuestros informes de gestion estan disponibles para descarga publica. La transparencia no es opcional, es nuestro compromiso.
            </p>
          </div>
        </div>

        {/* Trust badge */}
        <div className={`flex items-center gap-4 p-5 bg-primary/5 border border-primary/10 rounded-2xl mb-10 max-w-xl transition-all duration-1000 delay-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <Shield className="h-8 w-8 text-primary flex-shrink-0" />
          <div>
            <span className="block font-bold text-foreground">Compromiso con la integridad</span>
            <span className="block text-muted-foreground text-sm">Todos los documentos son verificados y cumplen con la normativa colombiana vigente.</span>
          </div>
        </div>

        {/* Informes grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {informes.map((informe, i) => (
            <div
              key={informe.title}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-6 lg:p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${400 + i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {informe.date}
                    </span>
                    <span className="text-xs text-muted-foreground">{informe.type} - {informe.size}</span>
                  </div>
                </div>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300"
                  aria-label={`Descargar ${informe.title}`}
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>

              <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {informe.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{informe.description}</p>

              <button className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300">
                <span>Ver documento</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
