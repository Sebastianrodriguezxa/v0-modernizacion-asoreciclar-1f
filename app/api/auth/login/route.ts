import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query } from "@/lib/db"
import { createToken, setSessionCookie } from "@/lib/auth"
import { loginSchema } from "@/lib/validations"
import { checkRateLimit } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() || "unknown"
    const rateCheck = checkRateLimit(ip)

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Demasiados intentos. Intenta de nuevo mas tarde.",
          resetIn: Math.ceil(rateCheck.resetIn / 1000),
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos invalidos" },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    // Find user
    const users = await query<Array<{ id: number; email: string; password_hash: string }>>(
      "SELECT id, email, password_hash FROM admin_users WHERE email = ?",
      [email]
    )

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      )
    }

    const user = users[0]
    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      )
    }

    // Create session
    const token = await createToken({ id: user.id, email: user.email })
    await setSessionCookie(token)

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
