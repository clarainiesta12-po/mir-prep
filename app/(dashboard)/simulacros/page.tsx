import Link from "next/link";
import { Play, Clock, BookOpen, CheckCircle2, Circle, Loader2, BarChart2, Plus } from "lucide-react";
import { simulacrosMock, resultadosMock } from "@/lib/data/simulacros.mock";
import { formatFecha, cn } from "@/lib/utils";
import type { Simulacro } from "@/lib/types/simulacro";

function SimulacroStatusBadge({ estado }: { estado: Simulacro["estado"] }) {
  switch (estado) {
    case "completado":
      return <span className="badge badge-green gap-1"><CheckCircle2 className="h-3 w-3" />Completado</span>;
    case "en_progreso":
      return <span className="badge bg-yellow-50 text-yellow-700 gap-1"><Loader2 className="h-3 w-3 animate-spin" />En progreso</span>;
    default:
      return <span className="badge bg-gray-100 text-gray-500 gap-1"><Circle className="h-3 w-3" />Pendiente</span>;
  }
}

export default function SimulacrosPage() {
  const oficiales    = simulacrosMock.filter((s) => s.tipo === "oficial");
  const tematicos    = simulacrosMock.filter((s) => s.tipo === "tematico");
  const personalizados = simulacrosMock.filter((s) => s.tipo === "personalizado");

  const ultimo = resultadosMock[0];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Simulacros</h1>
          <p className="text-gray-500 mt-1">Practica en condiciones reales de examen</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          Nuevo simulacro
        </button>
      </div>

      {/* Last result banner */}
      {ultimo && (
        <div className="card bg-brand-950 text-white border-0 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-brand-300 font-medium mb-1">Último simulacro completado</p>
              <h3 className="font-bold text-lg">MIR 2022-2023</h3>
              <p className="text-sm text-brand-300 mt-0.5">
                {formatFecha(ultimo.fechaRealizacion)} · {ultimo.correctas}/{ultimo.totalPreguntas} correctas
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-white">{ultimo.nota.toFixed(1)}</p>
                <p className="text-xs text-brand-300">Nota MIR</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-white">
                  {Math.round((ultimo.correctas / ultimo.totalPreguntas) * 100)}%
                </p>
                <p className="text-xs text-brand-300">Acierto</p>
              </div>
              <Link
                href={`/simulacros/${ultimo.simulacroId}`}
                className="flex items-center gap-2 bg-white text-brand-700 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-brand-50 transition-colors"
              >
                <BarChart2 className="h-4 w-4" />
                Ver análisis
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Oficiales */}
      <section className="mb-10">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-brand-500" />
          Exámenes Oficiales MIR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {oficiales.map((sim) => (
            <div key={sim.id} className="card hover:border-brand-200 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <SimulacroStatusBadge estado={sim.estado} />
                <span className="text-xs text-gray-400">{sim.año}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-700 transition-colors">
                {sim.nombre}
              </h3>
              <p className="text-xs text-gray-500 mb-4">{sim.descripcion}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {sim.config.totalPreguntas} preguntas
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {sim.config.tiempoLimiteMinutos} min
                </span>
              </div>
              <Link
                href={`/simulacros/${sim.id}`}
                className={cn(
                  "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  sim.estado === "completado"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : sim.estado === "en_progreso"
                    ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                    : "bg-brand-600 text-white hover:bg-brand-700"
                )}
              >
                {sim.estado === "completado" ? (
                  <><BarChart2 className="h-4 w-4" />Ver resultados</>
                ) : sim.estado === "en_progreso" ? (
                  <><Play className="h-4 w-4" />Continuar</>
                ) : (
                  <><Play className="h-4 w-4" />Empezar</>
                )}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Temáticos */}
      <section className="mb-10">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-purple-500" />
          Simulacros Temáticos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tematicos.map((sim) => (
            <div key={sim.id} className="card hover:border-purple-200 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <SimulacroStatusBadge estado={sim.estado} />
                {sim.config.modoRevision && (
                  <span className="badge bg-purple-50 text-purple-700 text-[10px]">Modo revisión</span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{sim.nombre}</h3>
              <p className="text-xs text-gray-500 mb-4">{sim.descripcion}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {sim.config.totalPreguntas} preguntas
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {sim.config.tiempoLimiteMinutos} min
                </span>
              </div>
              <Link
                href={`/simulacros/${sim.id}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <Play className="h-4 w-4" />
                {sim.estado === "en_progreso" ? "Continuar" : "Empezar"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Personalizados */}
      <section>
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-green-500" />
          Simulacros Personalizados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalizados.map((sim) => (
            <div key={sim.id} className="card hover:border-green-200 transition-all">
              <SimulacroStatusBadge estado={sim.estado} />
              <h3 className="font-bold text-gray-900 mt-3 mb-1">{sim.nombre}</h3>
              <p className="text-xs text-gray-500 mb-4">{sim.descripcion}</p>
              <Link
                href={`/simulacros/${sim.id}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <Play className="h-4 w-4" />Empezar
              </Link>
            </div>
          ))}

          {/* Create new card */}
          <button className="card border-dashed border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all flex flex-col items-center justify-center gap-2 min-h-[200px] cursor-pointer group">
            <div className="h-10 w-10 rounded-xl bg-gray-100 group-hover:bg-green-100 flex items-center justify-center transition-colors">
              <Plus className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            <p className="text-sm font-medium text-gray-500 group-hover:text-green-700 transition-colors">
              Crear simulacro personalizado
            </p>
          </button>
        </div>
      </section>
    </div>
  );
}
