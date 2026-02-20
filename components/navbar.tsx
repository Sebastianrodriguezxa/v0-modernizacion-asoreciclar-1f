"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X, Phone, Mail, MapPin } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Impacto", href: "#impacto" },
  { label: "Servicios", href: "#servicios" },
  { label: "Accion Social", href: "#responsabilidad" },
  { label: "Transparencia", href: "#transparencia" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleNavClick = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      {/* Top bar - fixed on desktop */}
      <div className={`hidden lg:block fixed top-0 left-0 right-0 z-[60] bg-green-dark text-primary-foreground transition-all duration-500 ${
        scrolled ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}>
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 select-text">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <span>Cr 43 # 27 - 103, Monteria</span>
            </span>
            <a href="tel:+573005312462" className="flex items-center gap-2 hover:text-amber-warm transition-colors select-text">
              <Phone className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <span>300 531 2462</span>
            </a>
            <a href="mailto:pqrs@asorecicladoresp.com" className="flex items-center gap-2 hover:text-amber-warm transition-colors select-text">
              <Mail className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <span>pqrs@asorecicladoresp.com</span>
            </a>
          </div>
          <span className="text-primary-foreground/70 text-xs tracking-wider uppercase">
            Organizacion Gremial de Recicladores
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        role="navigation"
        aria-label="Navegacion principal"
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 bg-green-dark/95 backdrop-blur-md shadow-xl py-3"
            : "top-0 lg:top-9 bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group flex-shrink-0">
            <div className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-serif font-bold text-base sm:text-lg transition-all duration-300 ${
              scrolled ? "bg-amber-warm text-green-dark" : "bg-primary-foreground text-primary"
            }`}>
              AR
            </div>
            <div className="hidden sm:block">
              <span className="block font-serif font-bold text-lg leading-tight text-primary-foreground">
                ASO-RECICLADOR
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">
                E.S.P.
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 xl:px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-warm transition-all duration-300 group-hover:w-3/4 rounded-full" />
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href="#contacto"
              className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 bg-amber-warm text-green-dark hover:bg-amber-warm/90 shadow-lg"
            >
              Ser Aliado
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-green-dark backdrop-blur-lg border-t border-primary-foreground/10 px-4 sm:px-6 py-6 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 px-4 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-primary-foreground/10 flex flex-col gap-3">
              <a href="tel:+573005312462" className="flex items-center gap-3 text-primary-foreground/70 text-sm select-text active:text-amber-warm">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>300 531 2462</span>
              </a>
              <a href="mailto:pqrs@asorecicladoresp.com" className="flex items-center gap-3 text-primary-foreground/70 text-sm select-text active:text-amber-warm">
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>pqrs@asorecicladoresp.com</span>
              </a>
              <a
                href="https://wa.me/573005312462?text=Hola%2C%20me%20gustaria%20obtener%20mas%20informacion%20sobre%20ASO-RECICLADOR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary-foreground/70 text-sm select-text active:text-amber-warm"
              >
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href="#contacto"
                onClick={handleNavClick}
                className="mt-3 inline-flex items-center justify-center px-6 py-3 bg-amber-warm text-green-dark font-bold rounded-xl text-center"
              >
                Ser Aliado
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
