"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { AlertTriangle, TrendingDown, Globe, Droplets } from "lucide-react"

const stats = [
  {
    icon: AlertTriangle,
    value: "12M",
    suffix: " ton",
    label: "De residuos solidos generados anualmente en Colombia",
  },
  {
    icon: TrendingDown,
    value: "17",
    suffix: "%",
    label: "Se recicla efectivamente del total de residuos",
  },
  {
    icon: Globe,
    value: "40K+",
    suffix: "",
    label: "Recicladores de oficio en condiciones precarias",
  },
  {
    icon: Droplets,
    value: "83",
    suffix: "%",
    label: "De materiales reciclables terminan en rellenos sanitarios",
  },
]

export function ProblemaSocial() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-green-dark overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/problema-social.jpg"
          alt="Crisis ambiental de residuos"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-green-dark/80" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-amber-warm" />
      <div className="absolute top-20 right-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
      <div className="absolute bottom-20 left-20 w-60 h-60 border border-primary-foreground/5 rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: narrative */}
          <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">El problema</span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-8 leading-[0.95] text-balance">
              Una crisis que <span className="italic text-amber-warm">no puede esperar</span>
            </h2>
            <div className="flex flex-col gap-5 text-primary-foreground/80 text-lg leading-relaxed">
              <p>
                Colombia genera millones de toneladas de residuos solidos cada ano. La mayoria termina en rellenos sanitarios, contaminando suelos, fuentes hidricas y el aire que respiramos.
              </p>
              <p>
                Detras de cada tonelada de material reciclable hay familias recicladoras que trabajan en condiciones precarias, sin reconocimiento formal, sin seguridad social y sin los recursos minimos para dignificar su labor.
              </p>
              <p className="text-amber-warm font-bold text-xl font-serif italic">
                {"\"El reciclaje no es solo un tema ambiental, es un tema de justicia social.\""}
              </p>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className={`grid grid-cols-2 gap-3 sm:gap-5 transition-all duration-1000 delay-300 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative p-4 sm:p-6 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl group hover:bg-primary-foreground/10 transition-all duration-500"
                style={{ animationDelay: `${400 + i * 150}ms` }}
              >
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-amber-warm mb-3 sm:mb-4" />
                <span className="block font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
                  {stat.value}
                  <span className="text-amber-warm">{stat.suffix}</span>
                </span>
                <span className="block text-primary-foreground/60 text-xs sm:text-sm mt-2 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
