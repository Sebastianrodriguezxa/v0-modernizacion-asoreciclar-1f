import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"

// POST /api/upload - Proxy image upload to Hostinger PHP script
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const eventoId = formData.get("evento_id") as string | null
    const altText = (formData.get("alt_text") as string) || ""
    const orden = parseInt((formData.get("orden") as string) || "0")

    if (!file) {
      return NextResponse.json({ error: "No se envio archivo" }, { status: 400 })
    }

    if (!eventoId) {
      return NextResponse.json({ error: "evento_id requerido" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Solo se permiten imagenes JPG, PNG o WebP" },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "La imagen no puede pesar mas de 5MB" },
        { status: 400 }
      )
    }

    const uploadUrl = process.env.HOSTINGER_UPLOAD_URL
    const uploadKey = process.env.UPLOAD_API_KEY

    if (!uploadUrl || !uploadKey) {
      return NextResponse.json(
        { error: "Configuracion de upload no disponible" },
        { status: 500 }
      )
    }

    // Forward to Hostinger PHP
    const phpFormData = new FormData()
    phpFormData.append("file", file)

    const phpResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "X-Upload-Key": uploadKey,
      },
      body: phpFormData,
    })

    if (!phpResponse.ok) {
      const errorText = await phpResponse.text()
      console.error("PHP upload error:", errorText)
      return NextResponse.json(
        { error: "Error al subir imagen al servidor" },
        { status: 500 }
      )
    }

    const phpResult = await phpResponse.json()

    if (!phpResult.success || !phpResult.url) {
      return NextResponse.json(
        { error: phpResult.error || "Error desconocido al subir" },
        { status: 500 }
      )
    }

    // Save image reference in database
    const result = await query<{ insertId: number }>(
      `INSERT INTO evento_imagenes (evento_id, imagen_url, alt_text, orden) VALUES (?, ?, ?, ?)`,
      [parseInt(eventoId), phpResult.url, altText, orden]
    )

    return NextResponse.json({
      success: true,
      imagen: {
        id: (result as unknown as { insertId: number }).insertId,
        url: phpResult.url,
        alt_text: altText,
        orden,
      },
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Error al procesar la subida" },
      { status: 500 }
    )
  }
}
