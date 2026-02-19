"use client"

import { AdminShell } from "@/components/admin/admin-shell"
import { EventoForm } from "@/components/admin/evento-form"

export default function NuevoEventoPage() {
  return (
    <AdminShell>
      <EventoForm />
    </AdminShell>
  )
}
