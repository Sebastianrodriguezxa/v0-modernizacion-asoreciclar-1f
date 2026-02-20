"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import {
  Truck,
  Recycle,
  GraduationCap,
  ShieldCheck,
  Package,
  Leaf,
  ArrowRight,
} from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Recoleccion y Transporte",
    description:
      "Servicio de recoleccion puerta a puerta de material reciclable en los municipios donde operamos. Rutas optimizadas y frecuencias establecidas.",
    features: ["Rutas programadas", "Cobertura municipal", "Servicio puntual"],
    color: "bg-primary",
  },
  {
    icon: Recycle,
    title: "Aprovechamiento de Reciclaje",
    description:
      "Clasificacion, procesamiento y aprovechamiento de materiales reciclables en la fuente. Contribuimos a la economia circular de la region.",
    features: ["Clasificacion en fuente", "Procesamiento integral", "Economia circular"],
    color: "bg-green-mid",
  },
  {
    icon: GraduationCap,
    title: "Capacitacion Gratuita",
    description:
      "Programas de formacion para recicladores de oficio y comunidades. Educacion ambiental y desarrollo de habilidades tecnicas.",
    features: ["Formacion tecnica", "Educacion ambiental", "Certificaciones"],
    color: "bg-green-light",
  },
  {
    icon: ShieldCheck,
    title: "Equipamiento de Seguridad",
    description:
      "Dotacion de elementos de proteccion personal para todos nuestros recicladores. Garantizamos condiciones dignas de trabajo.",
    features: ["Dotacion completa", "Renovacion periodica", "Normas SST"],
    color: "bg-amber-warm",
  },
  {
    icon: Package,
    title: "Gestion Integral de Residuos",
    description:
      "Asesoria y gestion completa del ciclo de residuos solidos para empresas, instituciones y hogares en Cordoba.",
    features: ["Diagnostico inicial", "Plan de manejo", "Seguimiento continuo"],
    color: "bg-primary",
  },
  {
    icon: Leaf,
    title: "Formalizacion Gremial",
    description:
      "Apoyo en la organizacion y formalizacion de recicladores de oficio. Fortalecimiento de redes de apoyo y representacion.",
    features: ["Asesoria legal", "Redes de apoyo", "Representacion gremial"],
    color: "bg-green-mid",
  },
]

export function Servicios() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.05 })

  return (
    <section id="servicios" ref={sectionRef} className="relative py-24 lg:py-32 bg-cream overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 left-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full -translate-x-1/2" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">Lo que hacemos</span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mt-4 leading-[0.95]">
            Nuestros <span className="italic text-primary">servicios</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Ofrecemos soluciones integrales de reciclaje, desde la recoleccion hasta el aprovechamiento, siempre con compromiso social y ambiental.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`w-16 h-16 flex items-center justify-center rounded-2xl ${service.color} text-primary-foreground mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{service.description}</p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feat) => (
                  <span key={feat} className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                    {feat}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a href="#contacto" className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all duration-300">
                <span>Conocer mas</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
