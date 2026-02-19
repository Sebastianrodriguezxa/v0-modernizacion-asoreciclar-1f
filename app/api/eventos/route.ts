import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { eventoSchema } from "@/lib/validations"

// GET /api/eventos - List events (public: only published, admin: all)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoria = searchParams.get("categoria")
    const admin = searchParams.get("admin") === "true"
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")))
    const offset = (page - 1) * limit

    // If requesting admin view, verify session
    if (admin) {
      const session = await getSession()
      if (!session) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 })
      }
    }

    let whereClause = admin ? "1=1" : "e.publicado = 1"
    const params: unknown[] = []

    if (categoria && categoria !== "todos") {
      whereClause += " AND e.categoria = ?"
      params.push(categoria)
    }

    // Get total count
    const countResult = await query<Array<{ total: number }>>(
      `SELECT COUNT(*) as total FROM eventos e WHERE ${whereClause}`,
      params
    )
    const total = countResult[0]?.total || 0

    // Get events with first image
    const eventos = await query<Array<Record<string, unknown>>>(
      `SELECT e.*, 
        (SELECT imagen_url FROM evento_imagenes WHERE evento_id = e.id ORDER BY orden ASC LIMIT 1) as imagen_principal,
        (SELECT COUNT(*) FROM evento_imagenes WHERE evento_id = e.id) as total_imagenes
      FROM eventos e 
      WHERE ${whereClause}
      ORDER BY e.fecha_evento DESC
      LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    )

    return NextResponse.json({
      eventos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching eventos:", error)
    return NextResponse.json(
      { error: "Error al obtener eventos" },
      { status: 500 }
    )
  }
}

// POST /api/eventos - Create event (admin only)
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
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

    const result = await query<{ insertId: number }>(
      `INSERT INTO eventos (titulo, descripcion, fecha_evento, categoria, ubicacion, destacado, publicado) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, descripcion, fecha_evento, categoria, ubicacion || "", destacado ? 1 : 0, publicado ? 1 : 0]
    )

    return NextResponse.json({
      success: true,
      id: (result as unknown as { insertId: number }).insertId,
      message: "Evento creado exitosamente",
    })
  } catch (error) {
    console.error("Error creating evento:", error)
    return NextResponse.json(
      { error: "Error al crear evento" },
      { status: 500 }
    )
  }
}
