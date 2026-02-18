"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone, Mail, MapPin } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Impacto", href: "#impacto" },
  { label: "Servicios", href: "#servicios" },
  { label: "Transparencia", href: "#transparencia" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-green-dark text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Cr 43 # 27 - 103, Monteria
            </span>
            <a href="tel:3005312462" className="flex items-center gap-2 hover:text-amber-warm transition-colors">
              <Phone className="h-3.5 w-3.5" />
              300 531 2462
            </a>
            <a href="mailto:pqrs@asorecicladoresp.com" className="flex items-center gap-2 hover:text-amber-warm transition-colors">
              <Mail className="h-3.5 w-3.5" />
              pqrs@asorecicladoresp.com
            </a>
          </div>
          <span className="text-primary-foreground/70 text-xs tracking-wider uppercase">
            Organizacion Gremial de Recicladores
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-green-dark/95 backdrop-blur-md shadow-xl py-3 lg:top-0"
            : "bg-transparent py-5 lg:top-10"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className={`flex items-center justify-center w-11 h-11 rounded-xl font-serif font-bold text-lg transition-all duration-300 ${
              scrolled ? "bg-amber-warm text-green-dark" : "bg-primary-foreground text-primary"
            }`}>
              AR
            </div>
            <div className="hidden sm:block">
              <span className={`block font-serif font-bold text-lg leading-tight transition-colors duration-300 ${
                scrolled ? "text-primary-foreground" : "text-primary-foreground"
              }`}>
                ASO-RECICLADOR
              </span>
              <span className={`block text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                scrolled ? "text-primary-foreground/70" : "text-primary-foreground/70"
              }`}>
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
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group ${
                  scrolled
                    ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-warm transition-all duration-300 group-hover:w-3/4 rounded-full" />
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className={`hidden md:inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                scrolled
                  ? "bg-amber-warm text-green-dark hover:bg-amber-warm/90 shadow-lg"
                  : "bg-amber-warm text-green-dark hover:bg-amber-warm/90 shadow-lg"
              }`}
            >
              Ser Aliado
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-green-dark/98 backdrop-blur-lg border-t border-primary-foreground/10 px-6 py-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 px-4 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-primary-foreground/10 flex flex-col gap-3">
              <a href="tel:3005312462" className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Phone className="h-4 w-4" />
                300 531 2462
              </a>
              <a href="mailto:pqrs@asorecicladoresp.com" className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Mail className="h-4 w-4" />
                pqrs@asorecicladoresp.com
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileOpen(false)}
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
