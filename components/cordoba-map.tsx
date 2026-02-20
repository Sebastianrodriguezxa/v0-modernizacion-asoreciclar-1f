"use client"

import { useState, useCallback } from "react"
import { MapPin } from "lucide-react"

interface MunicipioPin {
  name: string
  desc: string
  x: number
  y: number
  isSede: boolean
}

// Coordinates adjusted to better represent the actual geographic positions
// within the simplified Cordoba department outline
const municipios: MunicipioPin[] = [
  { name: "Monteria", desc: "Sede principal - Centro de operaciones", x: 36, y: 56, isSede: true },
  { name: "Cerete", desc: "Sucursal activa de recoleccion", x: 40, y: 62, isSede: false },
  { name: "Lorica", desc: "Presencia costera del rio Sinu", x: 38, y: 38, isSede: false },
  { name: "Planeta Rica", desc: "Expansion estrategica sur", x: 54, y: 50, isSede: false },
  { name: "Sahagun", desc: "Cobertura region sabanas", x: 60, y: 38, isSede: false },
]

export function CordobaMap() {
  const [active, setActive] = useState<string | null>("Monteria")

  const activeMuni = municipios.find((m) => m.name === active)

  const handleSelect = useCallback((name: string) => {
    setActive(name)
  }, [])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Map container */}
      <div className="relative aspect-[4/3] sm:aspect-square max-h-[500px] mx-auto">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full touch-none"
          role="img"
          aria-label="Mapa del departamento de Cordoba mostrando los municipios donde opera ASO-RECICLADOR"
        >
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background glow */}
          <rect width="100" height="100" fill="url(#mapGlow)" />

          {/* Simplified Cordoba department shape */}
          <path
            d="M 25 15 C 28 12, 35 10, 42 12 C 48 14, 55 11, 62 13 C 68 15, 73 18, 75 22 C 78 28, 80 35, 78 42 C 76 48, 73 52, 70 56 C 67 60, 65 65, 63 70 C 60 75, 56 78, 52 80 C 48 82, 44 83, 40 82 C 36 81, 32 78, 28 74 C 24 70, 22 65, 20 60 C 18 55, 17 50, 18 45 C 19 40, 20 35, 22 30 C 23 25, 24 20, 25 15 Z"
            fill="var(--primary)"
            fillOpacity="0.06"
            stroke="var(--primary)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />

          {/* River lines (Sinu river) */}
          <path
            d="M 30 25 C 33 32, 35 40, 37 48 C 38 54, 38 60, 40 68 C 41 72, 43 76, 45 79"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.4"
            strokeOpacity="0.12"
            strokeDasharray="2 2"
          />
          <path
            d="M 48 20 C 50 30, 53 38, 55 45 C 56 50, 56 55, 55 60"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.3"
            strokeOpacity="0.10"
            strokeDasharray="2 2"
          />

          {/* Connection lines between municipalities */}
          {municipios.map((muni) => {
            if (muni.name === "Monteria") return null
            const monteria = municipios[0]
            return (
              <line
                key={`line-${muni.name}`}
                x1={monteria.x}
                y1={monteria.y}
                x2={muni.x}
                y2={muni.y}
                stroke="var(--amber-warm)"
                strokeWidth={active === muni.name ? "0.7" : "0.35"}
                strokeOpacity={active === muni.name ? 0.7 : 0.25}
                strokeDasharray="1.5 1.5"
                className="transition-all duration-500"
              />
            )
          })}

          {/* Municipality pins */}
          {municipios.map((muni) => {
            const isActive = active === muni.name
            const pinColor = muni.isSede ? "var(--amber-warm)" : "var(--primary)"
            return (
              <g key={muni.name}>
                {/* Pulse ring for active */}
                {isActive && (
                  <>
                    <circle cx={muni.x} cy={muni.y} r="4" fill="none" stroke={pinColor} strokeWidth="0.4" opacity="0.3">
                      <animate attributeName="r" from="3" to="7" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={muni.x} cy={muni.y} r="3" fill="none" stroke={pinColor} strokeWidth="0.3" opacity="0.2">
                      <animate attributeName="r" from="2.5" to="5.5" dur="2s" begin="0.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Larger invisible touch target for mobile */}
                <circle
                  cx={muni.x}
                  cy={muni.y}
                  r="6"
                  fill="transparent"
                  className="cursor-pointer"
                  onPointerDown={() => handleSelect(muni.name)}
                  onMouseEnter={() => handleSelect(muni.name)}
                />

                {/* Visible pin circle */}
                <circle
                  cx={muni.x}
                  cy={muni.y}
                  r={isActive ? "2.8" : "2"}
                  fill={pinColor}
                  stroke="white"
                  strokeWidth="0.7"
                  className="pointer-events-none transition-all duration-300"
                  filter={isActive ? "url(#glow)" : undefined}
                />

                {/* Label */}
                <text
                  x={muni.x}
                  y={muni.y - (isActive ? 5 : 4.5)}
                  textAnchor="middle"
                  fill="currentColor"
                  className={`text-foreground select-none pointer-events-none ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                  fontSize={isActive ? "3.2" : "2.5"}
                  opacity={isActive ? 1 : 0.7}
                >
                  {muni.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Info card below map */}
      {activeMuni && (
        <div
          key={activeMuni.name}
          className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-card rounded-2xl border border-border shadow-sm animate-fade-in-up"
        >
          <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl ${
            activeMuni.isSede ? "bg-amber-warm/10" : "bg-primary/10"
          }`}>
            <MapPin className={`h-5 w-5 sm:h-6 sm:w-6 ${activeMuni.isSede ? "text-amber-warm" : "text-primary"}`} />
          </div>
          <div className="min-w-0">
            <h4 className="font-serif text-base sm:text-lg font-bold text-foreground flex flex-wrap items-center gap-2">
              {activeMuni.name}
              {activeMuni.isSede && (
                <span className="text-[10px] sm:text-xs font-sans font-bold text-amber-warm bg-amber-warm/10 px-2 py-0.5 rounded-full">
                  SEDE PRINCIPAL
                </span>
              )}
            </h4>
            <p className="text-muted-foreground text-xs sm:text-sm">{activeMuni.desc}</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-warm flex-shrink-0" />
          <span>Sede principal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
          <span>Sucursal activa</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 border-t border-dashed border-amber-warm/40 flex-shrink-0" />
          <span>Red de operacion</span>
        </div>
      </div>
    </div>
  )
}
