"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { Recycle, Users, MapPin, TreePine, TrendingUp } from "lucide-react"
import { CordobaMap } from "@/components/cordoba-map"

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref as React.RefObject<HTMLElement>, { threshold: 0.5 })

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true)
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, started, target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const metrics = [
  {
    icon: Recycle,
    value: 1500,
    suffix: "+",
    label: "Toneladas recicladas",
    sublabel: "Material aprovechado anualmente",
  },
  {
    icon: Users,
    value: 300,
    suffix: "+",
    label: "Familias beneficiadas",
    sublabel: "Recicladores y sus familias",
  },
  {
    icon: MapPin,
    value: 5,
    suffix: "",
    label: "Municipios activos",
    sublabel: "Presencia en Cordoba",
  },
  {
    icon: TreePine,
    value: 2400,
    suffix: "+",
    label: "Arboles salvados",
    sublabel: "Equivalente ambiental anual",
  },
  {
    icon: TrendingUp,
    value: 8,
    suffix: "",
    label: "Anos de operacion",
    sublabel: "Servicio continuo desde 2017",
  },
]

const municipios = [
  { name: "Monteria", desc: "Sede principal - Centro de operaciones" },
  { name: "Cerete", desc: "Sucursal activa de recoleccion" },
  { name: "Planeta Rica", desc: "Expansion estrategica sur" },
  { name: "Lorica", desc: "Presencia costera del San Jorge" },
  { name: "Sahagun", desc: "Cobertura region sabanas" },
]

export function Impacto() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.05 })

  return (
    <section id="impacto" ref={sectionRef} className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Background image subtle */}
      <div className="absolute inset-0 opacity-5">
        <Image src="/images/impacto.jpg" alt="" fill className="object-cover" sizes="100vw" aria-hidden="true" />
      </div>

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">Nuestro impacto</span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mt-4 leading-[0.95]">
            Cifras que <span className="italic text-primary">transforman</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Cada numero representa vidas mejoradas, toneladas de material rescatado del olvido y municipios mas limpios.
          </p>
        </div>

        {/* Metrics grid - maximalista large numbers */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-16 sm:mb-24 transition-all duration-1000 delay-200 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`relative group p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                i === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <metric.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <span className="block font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-4 mb-1 sm:mb-2">
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </span>
              <span className="block font-bold text-foreground text-xs sm:text-sm">{metric.label}</span>
              <span className="block text-muted-foreground text-[10px] sm:text-xs mt-1">{metric.sublabel}</span>
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 h-1 bg-primary/0 group-hover:bg-primary rounded-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Municipios - Where we operate */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl lg:text-5xl font-bold text-foreground">
              Hacemos presencia en <span className="text-primary italic">5 municipios</span>
            </h3>
            <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              Llevamos a cabo un exhaustivo trabajo en 5 municipios de nuestro hermoso departamento de Cordoba para hacer de este un lugar mas limpio.
            </p>
          </div>

          {/* Interactive Map */}
          <div className="mb-16">
            <CordobaMap />
          </div>

          {/* Municipios cards below map */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {municipios.map((muni, i) => (
              <div
                key={muni.name}
                className={`relative group overflow-hidden rounded-2xl bg-primary p-4 sm:p-6 text-primary-foreground hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
                style={{ animationDelay: `${500 + i * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-warm/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <MapPin className="h-6 w-6 text-amber-warm mb-3" />
                <h4 className="font-serif text-2xl font-bold mb-1">{muni.name}</h4>
                <p className="text-primary-foreground/70 text-sm">{muni.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
