import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres"),
})

export const eventoSchema = z.object({
  titulo: z.string().min(3, "El titulo debe tener al menos 3 caracteres").max(200),
  descripcion: z.string().min(10, "La descripcion debe tener al menos 10 caracteres").max(5000),
  fecha_evento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha invalido (YYYY-MM-DD)"),
  categoria: z.enum(["mercados", "navidad", "jornada", "capacitacion", "otro"]),
  ubicacion: z.string().max(300).optional().default(""),
  destacado: z.boolean().optional().default(false),
  publicado: z.boolean().optional().default(false),
})

export const setupSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres"),
  setupKey: z.string(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type EventoInput = z.infer<typeof eventoSchema>
export type SetupInput = z.infer<typeof setupSchema>

export const CATEGORIAS = {
  mercados: { label: "Entrega de Mercados", color: "bg-primary text-primary-foreground" },
  navidad: { label: "Navidad", color: "bg-red-600 text-white" },
  jornada: { label: "Jornada de Bienestar", color: "bg-blue-600 text-white" },
  capacitacion: { label: "Capacitacion", color: "bg-amber-warm text-foreground" },
  otro: { label: "Otro", color: "bg-muted text-muted-foreground" },
} as const

export type CategoriaKey = keyof typeof CATEGORIAS
