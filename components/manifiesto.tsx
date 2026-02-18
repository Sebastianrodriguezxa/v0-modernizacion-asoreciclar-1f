"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ArrowRight, Building2, Heart, HandCoins } from "lucide-react"

const perfiles = [
  {
    icon: Building2,
    label: "Empresas",
    title: "Se aliado corporativo",
    description: "Cumple tu responsabilidad ambiental con nosotros. Gestionamos tus residuos reciclables con certificacion.",
    cta: "Programa corporativo",
    href: "#contacto",
  },
  {
    icon: Heart,
    label: "Voluntarios",
    title: "Dona tu tiempo",
    description: "Unete como voluntario en nuestras jornadas de recoleccion y educacion ambiental en comunidades.",
    cta: "Ser voluntario",
    href: "#contacto",
  },
  {
    icon: HandCoins,
    label: "Donantes",
    title: "Apoya la causa",
    description: "Tu donacion fortalece a las familias recicladoras con equipamiento, capacitacion y seguridad social.",
    cta: "Hacer donacion",
    href: "#contacto",
  },
]

export function Manifiesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-40 bg-green-dark overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary-foreground/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-foreground/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-amber-warm/10 rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Manifiesto text */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">Nuestro manifiesto</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-primary-foreground mt-6 leading-[0.9] max-w-5xl mx-auto text-balance">
            El reciclaje es{" "}
            <span className="italic text-amber-warm">dignidad</span>,{" "}
            es <span className="italic text-amber-warm">futuro</span>,{" "}
            es <span className="italic text-amber-warm">vida</span>
          </h2>
          <p className="text-primary-foreground/70 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            Cada material que rescatamos del olvido es una oportunidad para una familia, un respiro para el planeta y un paso hacia una sociedad mas justa. No somos solo recicladores, somos constructores de futuro.
          </p>
        </div>

        {/* CTA cards by profile */}
        <div className="grid md:grid-cols-3 gap-6">
          {perfiles.map((perfil, i) => (
            <a
              key={perfil.label}
              href={perfil.href}
              className={`group relative overflow-hidden rounded-3xl p-8 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-amber-warm/30 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${400 + i * 150}ms` }}
            >
              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-warm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-14 h-14 flex items-center justify-center bg-amber-warm/20 rounded-2xl mb-5 group-hover:bg-amber-warm group-hover:text-green-dark transition-all duration-300">
                <perfil.icon className="h-7 w-7 text-amber-warm group-hover:text-green-dark transition-colors" />
              </div>

              <span className="block text-amber-warm text-xs font-bold uppercase tracking-[0.2em] mb-2">{perfil.label}</span>
              <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-3">{perfil.title}</h3>
              <p className="text-primary-foreground/60 leading-relaxed mb-6">{perfil.description}</p>

              <div className="inline-flex items-center gap-2 text-amber-warm font-bold text-sm group-hover:gap-3 transition-all duration-300">
                <span>{perfil.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
