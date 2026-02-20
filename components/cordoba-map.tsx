"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface MunicipioPin {
  name: string
  desc: string
  x: number
  y: number
  isSede: boolean
}

const municipios: MunicipioPin[] = [
  { name: "Monteria", desc: "Sede principal - Centro de operaciones", x: 34, y: 58, isSede: true },
  { name: "Cerete", desc: "Sucursal activa de recoleccion", x: 38, y: 63, isSede: false },
  { name: "Lorica", desc: "Presencia costera del San Jorge", x: 42, y: 42, isSede: false },
  { name: "Planeta Rica", desc: "Expansion estrategica sur", x: 55, y: 55, isSede: false },
  { name: "Sahagun", desc: "Cobertura region sabanas", x: 62, y: 42, isSede: false },
]

export function CordobaMap() {
  const [active, setActive] = useState<string | null>("Monteria")

  const activeMuni = municipios.find((m) => m.name === active)

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Map container */}
      <div className="relative aspect-square max-h-[500px] mx-auto">
        {/* Cordoba department outline - simplified SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          role="img"
          aria-label="Mapa del departamento de Cordoba mostrando los municipios donde opera ASO-RECICLADOR"
        >
          {/* Background subtle grid */}
          <defs>
            <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-primary/10" />
            </pattern>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
            {/* Pulse animation for active pin */}
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

          {/* Inner detail lines (rivers / roads) */}
          <path
            d="M 30 30 C 35 35, 38 45, 36 55 C 34 62, 38 68, 42 72"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.3"
            strokeOpacity="0.15"
            strokeDasharray="2 2"
          />
          <path
            d="M 45 25 C 48 35, 52 42, 55 50 C 57 55, 58 60, 56 65"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.3"
            strokeOpacity="0.15"
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
                strokeWidth={active === muni.name ? "0.6" : "0.3"}
                strokeOpacity={active === muni.name ? 0.6 : 0.2}
                strokeDasharray="1.5 1.5"
                className="transition-all duration-500"
              />
            )
          })}

          {/* Municipality pins */}
          {municipios.map((muni) => {
            const isActive = active === muni.name
            return (
              <g key={muni.name}>
                {/* Pulse ring for active */}
                {isActive && (
                  <>
                    <circle
                      cx={muni.x}
                      cy={muni.y}
                      r="4"
                      fill="none"
                      stroke={muni.isSede ? "var(--amber-warm)" : "var(--primary)"}
                      strokeWidth="0.4"
                      opacity="0.3"
                    >
                      <animate attributeName="r" from="3" to="6" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      cx={muni.x}
                      cy={muni.y}
                      r="3"
                      fill="none"
                      stroke={muni.isSede ? "var(--amber-warm)" : "var(--primary)"}
                      strokeWidth="0.3"
                      opacity="0.2"
                    >
                      <animate attributeName="r" from="2.5" to="5" dur="2s" begin="0.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Pin circle */}
                <circle
                  cx={muni.x}
                  cy={muni.y}
                  r={isActive ? "2.5" : "2"}
                  fill={muni.isSede ? "var(--amber-warm)" : "var(--primary)"}
                  stroke="white"
                  strokeWidth="0.6"
                  className="cursor-pointer transition-all duration-300"
                  filter={isActive ? "url(#glow)" : undefined}
                  onMouseEnter={() => setActive(muni.name)}
                  onClick={() => setActive(muni.name)}
                />

                {/* Label */}
                <text
                  x={muni.x}
                  y={muni.y - 4}
                  textAnchor="middle"
                  fill="currentColor"
                  className={`text-foreground transition-all duration-300 select-none pointer-events-none ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                  fontSize={isActive ? "3" : "2.5"}
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
        <div className="mt-6 flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm transition-all duration-300 animate-fade-in-up">
          <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl ${
            activeMuni.isSede ? "bg-amber-warm/10" : "bg-primary/10"
          }`}>
            <MapPin className={`h-6 w-6 ${activeMuni.isSede ? "text-amber-warm" : "text-primary"}`} />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-foreground">
              {activeMuni.name}
              {activeMuni.isSede && (
                <span className="ml-2 text-xs font-sans font-bold text-amber-warm bg-amber-warm/10 px-2 py-0.5 rounded-full">
                  SEDE PRINCIPAL
                </span>
              )}
            </h4>
            <p className="text-muted-foreground text-sm">{activeMuni.desc}</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-warm" />
          <span>Sede principal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span>Sucursal activa</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 border-t border-dashed border-amber-warm/40" />
          <span>Red de operacion</span>
        </div>
      </div>
    </div>
  )
}
