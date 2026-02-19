import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { eventoSchema } from "@/lib/validations"

// GET /api/eventos/[id] - Get single event with images
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventoId = parseInt(id)
    if (isNaN(eventoId)) {
      return NextResponse.json({ error: "ID invalido" }, { status: 400 })
    }

    const eventos = await query<Array<Record<string, unknown>>>(
      "SELECT * FROM eventos WHERE id = ?",
      [eventoId]
    )

    if (eventos.length === 0) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 })
    }

    const imagenes = await query<Array<Record<string, unknown>>>(
      "SELECT * FROM evento_imagenes WHERE evento_id = ? ORDER BY orden ASC",
      [eventoId]
    )

    return NextResponse.json({
      evento: eventos[0],
      imagenes,
    })
  } catch (error) {
    console.error("Error fetching evento:", error)
    return NextResponse.json(
      { error: "Error al obtener evento" },
      { status: 500 }
    )
  }
}

// PUT /api/eventos/[id] - Update event (admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { id } = await params
    const eventoId = parseInt(id)
    if (isNaN(eventoId)) {
      return NextResponse.json({ error: "ID invalido" }, { status: 400 })
    }

    const body = await request.json()
    const parsed = eventoSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { titulo, descripcion, fecha_evento, categoria, ubicacion, destacado, publicado } = parsed.data

    await query(
      `UPDATE eventos SET titulo = ?, descripcion = ?, fecha_evento = ?, categoria = ?, 
       ubicacion = ?, destacado = ?, publicado = ? WHERE id = ?`,
      [titulo, descripcion, fecha_evento, categoria, ubicacion || "", destacado ? 1 : 0, publicado ? 1 : 0, eventoId]
    )

    return NextResponse.json({ success: true, message: "Evento actualizado" })
  } catch (error) {
    console.error("Error updating evento:", error)
    return NextResponse.json(
      { error: "Error al actualizar evento" },
      { status: 500 }
    )
  }
}

// DELETE /api/eventos/[id] - Delete event (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { id } = await params
    const eventoId = parseInt(id)
    if (isNaN(eventoId)) {
      return NextResponse.json({ error: "ID invalido" }, { status: 400 })
    }

    // Images are deleted by CASCADE constraint
    await query("DELETE FROM eventos WHERE id = ?", [eventoId])

    return NextResponse.json({ success: true, message: "Evento eliminado" })
  } catch (error) {
    console.error("Error deleting evento:", error)
    return NextResponse.json(
      { error: "Error al eliminar evento" },
      { status: 500 }
    )
  }
}
