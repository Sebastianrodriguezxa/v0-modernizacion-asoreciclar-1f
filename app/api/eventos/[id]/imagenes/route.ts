import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/auth"

// PUT /api/eventos/[id]/imagenes - Reorder images
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
    const { order } = body as { order: Array<{ id: number; orden: number }> }

    if (!Array.isArray(order)) {
      return NextResponse.json({ error: "Formato invalido" }, { status: 400 })
    }

    // Update order for each image
    for (const item of order) {
      await query(
        "UPDATE evento_imagenes SET orden = ? WHERE id = ? AND evento_id = ?",
        [item.orden, item.id, eventoId]
      )
    }

    return NextResponse.json({ success: true, message: "Orden actualizado" })
  } catch (error) {
    console.error("Error reordering images:", error)
    return NextResponse.json(
      { error: "Error al reordenar imagenes" },
      { status: 500 }
    )
  }
}

// GET /api/eventos/[id]/imagenes - Get all images for an event
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

    const imagenes = await query<Array<Record<string, unknown>>>(
      "SELECT * FROM evento_imagenes WHERE evento_id = ? ORDER BY orden ASC",
      [eventoId]
    )

    return NextResponse.json({ imagenes })
  } catch (error) {
    console.error("Error fetching images:", error)
    return NextResponse.json(
      { error: "Error al obtener imagenes" },
      { status: 500 }
    )
  }
}
