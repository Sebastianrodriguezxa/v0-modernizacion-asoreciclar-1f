"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowDown, Leaf, Recycle, Users } from "lucide-react"

const marqueeItems = [
  "Recoleccion",
  "Transporte",
  "Aprovechamiento",
  "Reciclaje en la Fuente",
  "Gestion Ambiental",
  "Economia Circular",
  "Inclusion Social",
  "Monteria",
  "Cerete",
  "Planeta Rica",
  "Lorica",
  "Sahagun",
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-recyclers.jpg"
          alt="Recicladores de ASO-RECICLADOR trabajando en Monteria"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-dark via-green-dark/60 to-green-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-dark/80 via-transparent to-transparent" />
      </div>

      {/* Organic decorative shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-amber-warm/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-green-light/10 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 w-full pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            {/* Left content */}
            <div className="lg:col-span-8">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
                }`}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-warm/20 backdrop-blur-sm border border-amber-warm/30 rounded-full text-amber-warm text-sm font-medium mb-6">
                  <Leaf className="h-4 w-4" />
                  Desde 2017 transformando Monteria
                </span>
              </div>

              <h1
                className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-primary-foreground leading-[0.9] tracking-tight mb-6 transition-all duration-1000 delay-200 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
                }`}
              >
                <span className="block text-balance">Unidos por el</span>
                <span className="block text-amber-warm italic">cuidado</span>
                <span className="block text-balance">ambiental</span>
              </h1>

              <p
                className={`text-primary-foreground/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8 transition-all duration-1000 delay-400 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
                }`}
              >
                Somos la organizacion gremial de recicladores de oficio que dignifica
                el reciclaje y transforma vidas en la region caribe colombiana.
              </p>

              <div
                className={`flex flex-wrap gap-4 mb-12 transition-all duration-1000 delay-500 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
                }`}
              >
                <a
                  href="#nosotros"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-amber-warm text-green-dark font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-amber-warm/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Conoce nuestra historia
                  <ArrowDown className="h-5 w-5" />
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-bold text-lg rounded-2xl hover:bg-primary-foreground/10 transition-all duration-300"
                >
                  Nuestros servicios
                </a>
              </div>
            </div>

            {/* Right side - mini stats */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-4 pb-4">
              {[
                { icon: Users, number: "300+", label: "Familias recicladores" },
                { icon: Recycle, number: "5", label: "Municipios activos" },
                { icon: Leaf, number: "2017", label: "Ano de fundacion" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-center gap-4 px-5 py-4 bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10 rounded-2xl transition-all duration-1000 ${
                    isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-10"
                  }`}
                  style={{ animationDelay: `${600 + i * 150}ms` }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-warm/20 rounded-xl">
                    <stat.icon className="h-6 w-6 text-amber-warm" />
                  </div>
                  <div>
                    <span className="block font-serif text-2xl font-bold text-primary-foreground">
                      {stat.number}
                    </span>
                    <span className="block text-primary-foreground/60 text-sm">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee ticker */}
        <div className="mt-8 border-t border-primary-foreground/10 pt-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="mx-6 text-primary-foreground/40 text-sm uppercase tracking-[0.25em] font-medium flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 bg-amber-warm rounded-full" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
