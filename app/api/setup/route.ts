import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"
import { setupSchema } from "@/lib/validations"

// POST /api/setup - Create tables and first admin user (one-time use)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = setupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password, setupKey } = parsed.data

    // Verify setup key matches JWT_SECRET (only the person who configured env vars can setup)
    if (setupKey !== process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Clave de configuracion incorrecta" }, { status: 403 })
    }

    // Create tables
    await query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    await query(`
      CREATE TABLE IF NOT EXISTS eventos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        descripcion TEXT NOT NULL,
        fecha_evento DATE NOT NULL,
        categoria ENUM('mercados', 'navidad', 'jornada', 'capacitacion', 'otro') NOT NULL DEFAULT 'otro',
        ubicacion VARCHAR(300) DEFAULT '',
        destacado TINYINT(1) DEFAULT 0,
        publicado TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_publicado (publicado),
        INDEX idx_categoria (categoria),
        INDEX idx_fecha (fecha_evento)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    await query(`
      CREATE TABLE IF NOT EXISTS evento_imagenes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        evento_id INT NOT NULL,
        imagen_url VARCHAR(500) NOT NULL,
        alt_text VARCHAR(300) DEFAULT '',
        orden INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
        INDEX idx_evento (evento_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    // Check if admin already exists
    const existing = await query<Array<{ id: number }>>(
      "SELECT id FROM admin_users WHERE email = ?",
      [email]
    )

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Las tablas fueron creadas. El usuario admin ya existia." },
        { status: 200 }
      )
    }

    // Create admin user
    const passwordHash = await bcrypt.hash(password, 12)
    await query(
      "INSERT INTO admin_users (email, password_hash) VALUES (?, ?)",
      [email, passwordHash]
    )

    return NextResponse.json({
      message: "Configuracion completada. Tablas creadas y usuario admin registrado.",
      success: true,
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      { error: "Error en la configuracion. Verifica las variables de entorno de MySQL." },
      { status: 500 }
    )
  }
}
