"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import {
  Heart,
  Gift,
  ShoppingBasket,
  GraduationCap,
  Users,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  HandHeart,
  Baby,
  Sparkles,
} from "lucide-react"

const programas = [
  {
    icon: ShoppingBasket,
    title: "Entrega de Mercados",
    description:
      "Realizamos jornadas de entrega de mercados y paquetes alimentarios a nuestros recicladores y sus familias, garantizando que quienes cuidan el medio ambiente cada dia no pasen necesidades basicas. Porque reciclar no debe significar pasar hambre.",
    image: "/images/entrega-mercados.jpg",
    stats: { value: "200+", label: "Mercados entregados anualmente" },
    color: "bg-primary",
  },
  {
    icon: Gift,
    title: "Celebracion de Navidad",
    description:
      "Cada diciembre organizamos una gran celebracion navidena para los recicladores y sus hijos. Regalos, comida, musica y alegria para quienes trabajan dia a dia en las calles. Porque nuestros recicladores y sus familias tambien merecen la magia de la Navidad.",
    image: "/images/navidad-recicladores.jpg",
    stats: { value: "150+", label: "Ninos beneficiados en Navidad" },
    color: "bg-amber-warm",
  },
  {
    icon: HandHeart,
    title: "Jornadas de Bienestar",
    description:
      "Organizamos jornadas de salud, bienestar y atencion integral donde nuestros recicladores reciben chequeos medicos, kits de higiene, asesoria legal y apoyo emocional. Porque su dignidad y salud son nuestra prioridad.",
    image: "/images/jornada-social.jpg",
    stats: { value: "300+", label: "Familias atendidas por jornada" },
    color: "bg-green-mid",
  },
  {
    icon: GraduationCap,
    title: "Capacitacion y Derechos",
    description:
      "Formamos a nuestros recicladores en sus derechos laborales, seguridad en el trabajo y habilidades tecnicas. Les damos herramientas para que sean reconocidos y valorados como los trabajadores esenciales que son.",
    image: "/images/capacitacion-social.jpg",
    stats: { value: "50+", label: "Talleres realizados al ano" },
    color: "bg-green-light",
  },
]

const testimonios = [
  {
    nombre: "Maria del Carmen",
    rol: "Recicladora desde hace 12 anos",
    texto:
      "Antes de la asociacion yo reciclaba sola, sin proteccion, sin ayuda. Ahora tengo mis guantes, mi chaleco, y cuando llega diciembre mis hijos reciben regalos. Eso no tiene precio.",
  },
  {
    nombre: "Jose Luis Mercado",
    rol: "Reciclador y padre de familia",
    texto:
      "El mercado que nos dan cada mes es una bendicion. Hay dias que lo que uno recoge no alcanza, pero saber que la asociacion esta ahi para uno le da fuerzas para seguir.",
  },
  {
    nombre: "Luz Dary Padilla",
    rol: "Recicladora y lider comunitaria",
    texto:
      "Gracias a las capacitaciones aprendi que tenemos derechos, que nuestro trabajo tiene dignidad. Ahora ayudo a otros recicladores a que conozcan sus derechos tambien.",
  },
]

export function ResponsabilidadSocial() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.05 })
  const [activePrograma, setActivePrograma] = useState(0)
  const [activeTestimonio, setActiveTestimonio] = useState(0)

  const nextTestimonio = () => {
    setActiveTestimonio((prev) => (prev + 1) % testimonios.length)
  }
  const prevTestimonio = () => {
    setActiveTestimonio((prev) => (prev - 1 + testimonios.length) % testimonios.length)
  }

  return (
    <section
      id="responsabilidad"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* ===== PART 1: Intro emocional ===== */}
      <div className="relative py-24 lg:py-32 bg-cream overflow-hidden">
        {/* Organic decorative shapes */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-amber-warm/5 rounded-full" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2 mb-6">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                Responsabilidad Social
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-[0.95] max-w-5xl mx-auto text-balance">
              Mas que reciclar,{" "}
              <span className="italic text-primary">transformamos vidas</span>
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
              Somos una organizacion sin animo de lucro. Nuestros recicladores
              trabajan dia a dia en las calles para llevar el sustento a sus
              familias. A traves de nuestros programas sociales les brindamos
              dignidad, apoyo y la visibilidad que merecen ante la sociedad y los
              organismos que nos vigilan.
            </p>
          </div>

          {/* Emotional stats strip */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 transition-all duration-1000 delay-200 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {[
              { icon: Heart, value: "Sin animo", label: "de lucro", sublabel: "100% social" },
              { icon: Users, value: "300+", label: "Familias", sublabel: "Beneficiadas directamente" },
              { icon: Baby, value: "150+", label: "Ninos", sublabel: "Celebran Navidad con nosotros" },
              { icon: Sparkles, value: "8", label: "Anos", sublabel: "Transformando comunidades" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="relative group rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-xl transition-all duration-500"
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <stat.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="block font-serif text-3xl lg:text-4xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="block font-bold text-foreground text-sm mt-1">
                  {stat.label}
                </span>
                <span className="block text-muted-foreground text-xs mt-0.5">
                  {stat.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PART 2: Programs showcase ===== */}
      <div className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-border" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div
            className={`mb-16 transition-all duration-1000 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">
              Nuestros programas
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mt-4 leading-[0.95]">
              Acciones que{" "}
              <span className="italic text-primary">generan esperanza</span>
            </h3>
          </div>

          {/* Program selector tabs */}
          <div
            className={`flex flex-wrap gap-3 mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {programas.map((prog, i) => (
              <button
                key={prog.title}
                onClick={() => setActivePrograma(i)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activePrograma === i
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border border-border text-foreground hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                <prog.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{prog.title}</span>
                <span className="sm:hidden">
                  {prog.title.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active program display */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image side */}
            <div
              className={`relative overflow-hidden rounded-3xl aspect-[4/3] transition-all duration-700 ${
                isVisible ? "animate-slide-in-left" : "opacity-0"
              }`}
            >
              <Image
                src={programas[activePrograma].image}
                alt={programas[activePrograma].title}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-dark/60 via-transparent to-transparent" />
              {/* Stats badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-3 bg-card/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl">
                  <Star className="h-5 w-5 text-amber-warm flex-shrink-0" />
                  <div>
                    <span className="block font-serif text-2xl font-bold text-foreground">
                      {programas[activePrograma].stats.value}
                    </span>
                    <span className="block text-muted-foreground text-xs">
                      {programas[activePrograma].stats.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? "animate-slide-in-right" : "opacity-0"
              }`}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${programas[activePrograma].color} text-primary-foreground mb-6 transition-all duration-500`}
              >
                {(() => {
                  const IconComp = programas[activePrograma].icon
                  return <IconComp className="h-8 w-8" />
                })()}
              </div>

              <h4 className="font-serif text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {programas[activePrograma].title}
              </h4>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {programas[activePrograma].description}
              </p>

              {/* Visual separator */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-border" />
                <Heart className="h-4 w-4 text-primary" />
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Why it matters callout */}
              <div className="relative rounded-2xl bg-cream border border-border p-6">
                <span className="block font-bold text-foreground text-sm uppercase tracking-wider mb-2">
                  Por que importa
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestros recicladores no son personas de grandes recursos
                  economicos. Trabajan cada dia en las calles, bajo el sol y la
                  lluvia, para lograr el pan de cada dia. Esta asociacion existe
                  para darles visibilidad, dignidad y el apoyo que merecen como
                  trabajadores esenciales de nuestra sociedad.
                </p>
              </div>

              <a
                href="#contacto"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-2xl font-bold hover:bg-green-mid transition-all duration-300 hover:gap-3 shadow-lg shadow-primary/20"
              >
                <span>Quiero apoyar</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PART 3: Testimonios de recicladores ===== */}
      <div className="relative py-24 lg:py-32 bg-green-dark overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-primary-foreground/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-amber-warm/5 rounded-full" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">
              Sus voces
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-primary-foreground mt-4 leading-[0.95] max-w-4xl mx-auto text-balance">
              Lo que dicen{" "}
              <span className="italic text-amber-warm">
                nuestros recicladores
              </span>
            </h3>
          </div>

          {/* Testimonial carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-3xl p-8 lg:p-12">
              {/* Quote mark */}
              <div className="absolute -top-4 left-8 lg:left-12 text-amber-warm text-8xl font-serif leading-none select-none">
                {'"'}
              </div>

              <div className="pt-8">
                <p className="font-serif text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed italic mb-8">
                  {testimonios[activeTestimonio].texto}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-primary-foreground text-lg">
                      {testimonios[activeTestimonio].nombre}
                    </span>
                    <span className="block text-primary-foreground/50 text-sm">
                      {testimonios[activeTestimonio].rol}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevTestimonio}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-primary-foreground/20 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all duration-300"
                      aria-label="Testimonio anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextTestimonio}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-primary-foreground/20 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all duration-300"
                      aria-label="Testimonio siguiente"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Dots */}
                <div className="flex items-center gap-2 mt-6">
                  {testimonios.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonio(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeTestimonio === i
                          ? "w-8 bg-amber-warm"
                          : "w-3 bg-primary-foreground/20 hover:bg-primary-foreground/40"
                      }`}
                      aria-label={`Ver testimonio ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-primary-foreground/60 text-lg mb-6 max-w-2xl mx-auto">
              Detras de cada tonelada reciclada hay una familia que lucha.
              Tu apoyo cambia sus vidas.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-amber-warm text-green-dark px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-amber-warm/20 transition-all duration-300 hover:gap-3"
            >
              <span>Sumate a la causa</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
