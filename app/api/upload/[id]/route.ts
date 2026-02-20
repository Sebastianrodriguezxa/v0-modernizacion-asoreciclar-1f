import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"

// DELETE /api/upload/[id] - Delete an image
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
    const imageId = parseInt(id)
    if (isNaN(imageId)) {
      return NextResponse.json({ error: "ID invalido" }, { status: 400 })
    }

    // Get image URL before deleting from DB
    const images = await query<Array<{ id: number; imagen_url: string }>>(
      "SELECT id, imagen_url FROM evento_imagenes WHERE id = ?",
      [imageId]
    )

    if (images.length === 0) {
      return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 })
    }

    const imageUrl = images[0].imagen_url

    // Try to delete from Hostinger
    const deleteUrl = process.env.HOSTINGER_UPLOAD_URL?.replace("upload.php", "delete.php")
    const uploadKey = process.env.UPLOAD_API_KEY

    if (deleteUrl && uploadKey) {
      try {
        await fetch(deleteUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Upload-Key": uploadKey,
          },
          body: JSON.stringify({ url: imageUrl }),
        })
      } catch (err) {
        console.error("Error deleting file from Hostinger:", err)
        // Continue anyway - remove from DB even if physical delete fails
      }
    }

    // Delete from database
    await query("DELETE FROM evento_imagenes WHERE id = ?", [imageId])

    return NextResponse.json({ success: true, message: "Imagen eliminada" })
  } catch (error) {
    console.error("Delete image error:", error)
    return NextResponse.json(
      { error: "Error al eliminar imagen" },
      { status: 500 }
    )
  }
}
