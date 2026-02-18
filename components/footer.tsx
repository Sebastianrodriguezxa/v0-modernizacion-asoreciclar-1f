import { MapPin, Phone, Mail, ArrowUp } from "lucide-react"

const footerLinks = {
  organizacion: [
    { label: "Quienes Somos", href: "#nosotros" },
    { label: "Mision y Vision", href: "#nosotros" },
    { label: "Valores", href: "#nosotros" },
    { label: "Historia", href: "#nosotros" },
  ],
  servicios: [
    { label: "Recoleccion", href: "#servicios" },
    { label: "Aprovechamiento", href: "#servicios" },
    { label: "Capacitacion", href: "#servicios" },
    { label: "Gestion integral", href: "#servicios" },
  ],
  transparencia: [
    { label: "Informes de gestion", href: "#transparencia" },
    { label: "Rendicion de cuentas", href: "#transparencia" },
    { label: "PQRS", href: "mailto:pqrs@asorecicladoresp.com" },
    { label: "Politica de privacidad", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-card pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main footer grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-card/10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-warm text-green-dark font-serif font-bold text-lg">
                AR
              </div>
              <div>
                <span className="block font-serif font-bold text-lg text-card leading-tight">ASO-RECICLADOR</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-card/60">E.S.P.</span>
              </div>
            </div>
            <p className="text-card/60 leading-relaxed mb-6 max-w-sm">
              Organizacion gremial de recicladores de oficio. Dignificamos el reciclaje y transformamos vidas en la region caribe colombiana desde 2017.
            </p>
            <div className="flex flex-col gap-3">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-card/60 hover:text-amber-warm transition-colors text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Cr 43 # 27 - 103, Monteria, Cordoba
              </a>
              <a href="tel:3005312462" className="flex items-center gap-3 text-card/60 hover:text-amber-warm transition-colors text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                300 531 2462
              </a>
              <a href="mailto:pqrs@asorecicladoresp.com" className="flex items-center gap-3 text-card/60 hover:text-amber-warm transition-colors text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                pqrs@asorecicladoresp.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h4 className="font-serif font-bold text-card mb-4 text-sm uppercase tracking-wider">Organizacion</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.organizacion.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-card/60 hover:text-amber-warm transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-card mb-4 text-sm uppercase tracking-wider">Servicios</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-card/60 hover:text-amber-warm transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-card mb-4 text-sm uppercase tracking-wider">Transparencia</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.transparencia.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-card/60 hover:text-amber-warm transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-card/40 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} ASO-RECICLADOR E.S.P. Todos los derechos reservados.
          </p>
          <a
            href="#inicio"
            className="flex items-center gap-2 text-card/40 hover:text-amber-warm transition-colors text-sm group"
          >
            Volver al inicio
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  )
}
