"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, usePathname, useParams } from "next/navigation"
import {
  LayoutDashboard,
  CalendarDays,
  Plus,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"

interface AdminUser {
  id: number
  email: string
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const secret = params.secret as string
  const [user, setUser] = useState<AdminUser | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me")
      if (!res.ok) {
        router.push(`/admin-panel/${secret}/login`)
        return
      }
      const data = await res.json()
      setUser(data.user)
    } catch {
      router.push(`/admin-panel/${secret}/login`)
    } finally {
      setLoading(false)
    }
  }, [router, secret])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push(`/admin-panel/${secret}/login`)
  }

  const navItems = [
    {
      label: "Dashboard",
      href: `/admin-panel/${secret}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      label: "Eventos",
      href: `/admin-panel/${secret}/eventos`,
      icon: CalendarDays,
    },
    {
      label: "Nuevo Evento",
      href: `/admin-panel/${secret}/eventos/nuevo`,
      icon: Plus,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground text-sm">Verificando acceso...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-green-dark text-primary-foreground flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-5 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-warm text-green-dark flex items-center justify-center font-serif font-bold text-sm">
              AR
            </div>
            <div>
              <span className="block font-serif font-bold text-sm leading-tight">
                Admin Panel
              </span>
              <span className="block text-primary-foreground/50 text-[10px] uppercase tracking-wider">
                ASO-RECICLADOR
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            aria-label="Cerrar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-foreground/15 text-primary-foreground"
                    : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
              </a>
            )
          })}
        </nav>

        {/* User info & logout */}
        <div className="p-4 border-t border-primary-foreground/10">
          {user && (
            <div className="mb-3 px-4">
              <span className="block text-primary-foreground/50 text-xs">
                Conectado como
              </span>
              <span className="block text-primary-foreground text-sm font-medium truncate">
                {user.email}
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-destructive/20 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span>Cerrar sesion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#f8f7f4]/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex-1" />
          {user && (
            <span className="hidden sm:block text-muted-foreground text-sm">
              {user.email}
            </span>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
