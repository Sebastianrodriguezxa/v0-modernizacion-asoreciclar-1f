"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { Target, Eye, Heart, Handshake, Shield, Star } from "lucide-react"

const valores = [
  {
    icon: Handshake,
    title: "Union",
    description:
      "La union es un pilar fundamental que empodera todos nuestros esfuerzos. Nos une mas alla de las diferencias para crear un impacto positivo a traves de la educacion.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description:
      "El compromiso le da proposito y direccion clara a todo lo que hacemos. Es lo que nos impulsa a dar lo mejor de nosotros mismos para cumplir nuestra mision social.",
  },
  {
    icon: Shield,
    title: "Respeto",
    description:
      "El respeto es un principio que guia todas nuestras relaciones laborales y sociales. Buscamos siempre valorar la dignidad humana en el marco de nuestra mision.",
  },
  {
    icon: Star,
    title: "Honradez",
    description:
      "La honestidad y transparencia son valores fundamentales que guian todas nuestras acciones. Estamos comprometidos con mantener la mas alta integridad.",
  },
]

export function QuienesSomos() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section id="nosotros" ref={sectionRef} className="relative py-24 lg:py-32 bg-cream overflow-hidden">
      {/* Decorative organic shape */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-warm/10 rounded-full blur-2xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">Conozca nuestra organizacion</span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mt-4 leading-[0.95] text-balance">
            Quienes <span className="italic text-primary">somos</span>
          </h2>
        </div>

        {/* Main content: Image + Text */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Image with overlap effect */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/quienes-somos.jpg"
                alt="Equipo de recicladores de ASO-RECICLADOR"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-dark/40 to-transparent" />
            </div>
            {/* Overlapping card */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl max-w-xs">
              <span className="block font-serif text-4xl font-bold text-amber-warm">2017</span>
              <span className="block text-primary-foreground/80 text-sm mt-1">
                Fundada en Monteria, Cordoba, al servicio de la comunidad recicladora
              </span>
            </div>
          </div>

          {/* Text content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              Una organizacion gremial que dignifica el oficio del reciclaje
            </h3>
            <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                ASO-RECICLADOR ESP es una organizacion gremial de recicladores de oficio. Con el animo de aportar a la gestion ambiental urbana, presenta a la ciudad de Monteria su servicio de Recoleccion, Transporte y Aprovechamiento de reciclaje en la fuente, cuyas bondades Ecologicas y Ambientales consideramos de especial interes general para la ciudad.
              </p>
              <p>
                Se formo en 2017 en Monteria, Cordoba, como una asociacion de recicladores. Su objetivo era aumentar la eficacia de su labor y mejorar sus condiciones de vida. Con el tiempo, se han establecido sucursales en Cerete, Planeta Rica, Lorica y Sahagun.
              </p>
              <p>
                Ofrecen programas gratuitos de capacitacion, equipamiento de seguridad y fortalecimiento de redes de apoyo. Implementan practicas y contratos de condiciones uniformes para garantizar transparencia y calidad en sus operaciones.
              </p>
            </div>

            {/* Mision & Vision */}
            <div className="mt-10 flex flex-col gap-6">
              <div className="flex gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-2">Mision</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Promover la organizacion gremial de los recicladores de oficio, su representacion gremial, y la formalizacion de sus bases, para la prestacion del servicio publico de reciclaje y aprovechamiento.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-amber-warm/10 rounded-xl">
                  <Eye className="h-6 w-6 text-amber-warm" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-2">Vision</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser reconocida como la organizacion de recicladores de oficio lider en la integracion gremial y la prestacion del servicio de aprovechamiento en la region caribe colombiana.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Valores Section */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h3 className="font-serif text-3xl lg:text-5xl font-bold text-foreground mb-4 text-center">
            Nuestros <span className="italic text-primary">valores</span>
          </h3>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
            Los valores son el alma de ASO-RECICLADOR E.S.P. y lo que nos hace diferentes. Estamos siempre abiertos a revisarlos y fortalecerlos para estar alineados con nuestra mision.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, i) => (
              <div
                key={valor.title}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${500 + i * 100}ms` }}
              >
                <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-2xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <valor.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="font-serif text-xl font-bold text-foreground mb-3">{valor.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
