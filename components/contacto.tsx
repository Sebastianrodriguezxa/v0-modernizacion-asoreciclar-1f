"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"

export function Contacto() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { threshold: 0.1 })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {}
    const nombre = formData.get("nombre") as string
    const email = formData.get("email") as string
    const telefono = formData.get("telefono") as string
    const mensaje = formData.get("mensaje") as string

    if (!nombre || nombre.trim().length < 2) newErrors.nombre = "Nombre requerido (minimo 2 caracteres)"
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email valido requerido"
    if (!telefono || telefono.trim().length < 7) newErrors.telefono = "Telefono requerido"
    if (!mensaje || mensaje.trim().length < 10) newErrors.mensaje = "Mensaje requerido (minimo 10 caracteres)"

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const validationErrors = validate(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  return (
    <section id="contacto" ref={sectionRef} className="relative py-24 lg:py-32 bg-cream overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 right-0 w-64 h-64 bg-amber-warm/10 rounded-full blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-amber-warm font-bold uppercase tracking-[0.3em] text-sm">Hablemos</span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mt-4 leading-[0.95]">
            <span className="italic text-primary">Contacta</span> con nosotros
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Ya seas empresa, aliado potencial o ciudadano comprometido, queremos escucharte. Escribenos y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Direccion</h4>
                    <p className="text-muted-foreground text-sm">Cr 43 # 27 - 103</p>
                    <p className="text-muted-foreground text-sm">Monteria, Cordoba, Colombia</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Telefono</h4>
                    <a href="tel:3005312462" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      300 531 2462
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email / PQRS</h4>
                    <a href="mailto:pqrs@asorecicladoresp.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      pqrs@asorecicladoresp.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-amber-warm/10 rounded-xl">
                    <Clock className="h-6 w-6 text-amber-warm" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Horario de atencion</h4>
                    <p className="text-muted-foreground text-sm">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                    <p className="text-muted-foreground text-sm">Sabados: 8:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-300 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-card rounded-3xl border border-border">
                <div className="w-20 h-20 flex items-center justify-center bg-primary/10 rounded-full mb-6">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-3">Mensaje enviado</h3>
                <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                  Gracias por contactarnos. Nuestro equipo revisara tu mensaje y te responderemos lo mas pronto posible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 lg:p-10 bg-card rounded-3xl border border-border shadow-lg" noValidate>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-bold text-foreground mb-2">
                      Nombre completo <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Tu nombre"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.nombre ? "border-destructive" : "border-border"} bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all`}
                      onChange={() => setErrors((prev) => ({ ...prev, nombre: "" }))}
                    />
                    {errors.nombre && <span className="text-destructive text-xs mt-1 block">{errors.nombre}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
                      Correo electronico <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-destructive" : "border-border"} bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all`}
                      onChange={() => setErrors((prev) => ({ ...prev, email: "" }))}
                    />
                    {errors.email && <span className="text-destructive text-xs mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  {/* Telefono */}
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-bold text-foreground mb-2">
                      Telefono <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="300 000 0000"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.telefono ? "border-destructive" : "border-border"} bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all`}
                      onChange={() => setErrors((prev) => ({ ...prev, telefono: "" }))}
                    />
                    {errors.telefono && <span className="text-destructive text-xs mt-1 block">{errors.telefono}</span>}
                  </div>

                  {/* Perfil */}
                  <div>
                    <label htmlFor="perfil" className="block text-sm font-bold text-foreground mb-2">
                      Soy...
                    </label>
                    <select
                      id="perfil"
                      name="perfil"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      <option value="">Seleccionar perfil</option>
                      <option value="empresa">Empresa / Corporacion</option>
                      <option value="aliado">Aliado potencial</option>
                      <option value="donante">Donante</option>
                      <option value="voluntario">Voluntario</option>
                      <option value="ciudadano">Ciudadano interesado</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div className="mb-6">
                  <label htmlFor="mensaje" className="block text-sm font-bold text-foreground mb-2">
                    Mensaje <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    placeholder="Cuentanos como podemos ayudarte o como te gustaria colaborar..."
                    className={`w-full px-4 py-3 rounded-xl border ${errors.mensaje ? "border-destructive" : "border-border"} bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none`}
                    onChange={() => setErrors((prev) => ({ ...prev, mensaje: "" }))}
                  />
                  {errors.mensaje && <span className="text-destructive text-xs mt-1 block">{errors.mensaje}</span>}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-2xl hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
