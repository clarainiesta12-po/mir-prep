import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { especialidades } from "@/lib/data/especialidades.mock";

export default function EspecialidadesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Especialidades</h1>
        <p className="text-gray-500 mt-1">
          {especialidades.length} especialidades · Estudia por área y detecta tus puntos débiles
        </p>
      </div>

      {/* Distribution bar */}
      <div className="card mb-8">
        <h2 className="text-sm font-bold text-gray-900 mb-3">Distribución histórica MIR</h2>
        <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
          {especialidades.map((esp) => (
            <div
              key={esp.id}
              title={`${esp.nombre}: ${esp.porcentajeMIR}%`}
              className="transition-all hover:opacity-80"
              style={{
                width: `${esp.porcentajeMIR}%`,
                backgroundColor: esp.color,
              }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {especialidades.map((esp) => (
            <div key={esp.id} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: esp.color }} />
              <span className="text-xs text-gray-500">{esp.nombre} ({esp.porcentajeMIR}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {especialidades.map((esp) => {
          const progressPct = Math.floor(Math.random() * 50) + 30; // Mock progress
          return (
            <Link
              key={esp.id}
              href={`/especialidades/${esp.slug}`}
              className="card group hover:border-brand-200 hover:-translate-y-0.5 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${esp.color}18` }}
                >
                  <BookOpen className="h-5 w-5" style={{ color: esp.color }} />
                </div>
                <span
                  className="badge text-xs"
                  style={{ backgroundColor: `${esp.color}15`, color: esp.color }}
                >
                  {esp.porcentajeMIR}% MIR
                </span>
              </div>

              {/* Info */}
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-700 transition-colors">
                {esp.nombre}
              </h3>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2">{esp.descripcion}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">{esp.totalPreguntas} preguntas</span>
                  <span className="text-xs font-semibold text-gray-700">{progressPct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progressPct}%`, backgroundColor: esp.color }}
                  />
                </div>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5">
                {esp.temas.slice(0, 2).map((t) => (
                  <span key={t.id} className="badge bg-gray-100 text-gray-600 text-[10px]">
                    {t.nombre}
                  </span>
                ))}
                {esp.temas.length > 2 && (
                  <span className="badge bg-gray-100 text-gray-400 text-[10px]">
                    +{esp.temas.length - 2} más
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 mt-4 text-xs text-brand-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Estudiar <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
