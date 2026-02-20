import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { QuienesSomos } from "@/components/quienes-somos"
import { ProblemaSocial } from "@/components/problema-social"
import { Impacto } from "@/components/impacto"
import { Servicios } from "@/components/servicios"
import { ResponsabilidadSocial } from "@/components/responsabilidad-social"
import { Transparencia } from "@/components/transparencia"
import { Manifiesto } from "@/components/manifiesto"
import { Contacto } from "@/components/contacto"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuienesSomos />
      <ProblemaSocial />
      <Impacto />
      <Servicios />
      <ResponsabilidadSocial />
      <Transparencia />
      <Manifiesto />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
