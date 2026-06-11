import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, Clock, BookOpen, Target, BarChart2, CheckCircle, XCircle, Minus } from "lucide-react";
import { simulacrosMock, resultadosMock } from "@/lib/data/simulacros.mock";
import { calcularNotaMIR, formatTiempo, cn } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SimulacroDetailPage({ params }: Props) {
  const { id } = await params;
  const sim = simulacrosMock.find((s) => s.id === id);
  if (!sim) notFound();

  const resultado = resultadosMock.find((r) => r.simulacroId === id);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <Link
        href="/simulacros"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Simulacros
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "badge text-xs",
              sim.tipo === "oficial" ? "badge-blue" :
              sim.tipo === "tematico" ? "bg-purple-50 text-purple-700" : "badge-green"
            )}>
              {sim.tipo === "oficial" ? "Oficial" : sim.tipo === "tematico" ? "Temático" : "Personalizado"}
            </span>
            {sim.estado === "completado" && (
              <span className="badge badge-green text-xs">Completado</span>
            )}
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900">{sim.nombre}</h1>
          <p className="text-gray-500 mt-1">{sim.descripcion}</p>
        </div>
        {sim.estado !== "completado" && (
          <button className="btn-primary text-sm shrink-0">
            <Play className="h-4 w-4" />
            {sim.estado === "en_progreso" ? "Continuar" : "Empezar examen"}
          </button>
        )}
      </div>

      {/* Config cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, label: "Preguntas", value: sim.config.totalPreguntas.toString() },
          { icon: Clock,    label: "Tiempo",    value: `${sim.config.tiempoLimiteMinutos} min` },
          { icon: Target,   label: "Formato",   value: "MIR (-0.25)" },
          { icon: BarChart2, label: "Tipo",     value: sim.config.modoRevision ? "Revisión" : "Examen" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card text-center py-4">
              <Icon className="h-5 w-5 mx-auto mb-2 text-brand-500" />
              <p className="text-lg font-display font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Results section */}
      {resultado ? (
        <div className="space-y-6">
          {/* Score summary */}
          <div className="card bg-brand-950 text-white border-0">
            <h2 className="text-sm font-semibold text-brand-300 mb-4">Resultado</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-4xl font-display font-bold text-white">{resultado.nota.toFixed(2)}</p>
                <p className="text-xs text-brand-300 mt-0.5">Nota MIR</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-green-400">{resultado.correctas}</p>
                <p className="text-xs text-brand-300 mt-0.5">Correctas</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-red-400">{resultado.incorrectas}</p>
                <p className="text-xs text-brand-300 mt-0.5">Incorrectas</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-gray-400">{resultado.enBlanco}</p>
                <p className="text-xs text-brand-300 mt-0.5">En blanco</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-brand-400">
              Tiempo: {formatTiempo(resultado.tiempoEmpleadoSegundos)} ·
              Acierto: {Math.round((resultado.correctas / resultado.totalPreguntas) * 100)}%
            </div>
          </div>

          {/* By specialty */}
          <div className="card">
            <h2 className="text-base font-bold text-gray-900 mb-5">Resultados por especialidad</h2>
            <div className="space-y-4">
              {resultado.porEspecialidad.map((esp) => (
                <div key={esp.especialidadId}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{esp.especialidadNombre}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3.5 w-3.5" />{esp.correctas}
                      </span>
                      <span className="flex items-center gap-1 text-red-500">
                        <XCircle className="h-3.5 w-3.5" />{esp.incorrectas}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Minus className="h-3.5 w-3.5" />{esp.enBlanco}
                      </span>
                      <span className="font-bold text-gray-900 w-10 text-right">{esp.porcentajeAcierto}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${esp.porcentajeAcierto}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-center py-16">
          <Play className="h-12 w-12 mx-auto mb-4 text-gray-200" />
          <h3 className="font-bold text-gray-900 mb-2">Listo para empezar</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            Tendrás {sim.config.tiempoLimiteMinutos} minutos para responder {sim.config.totalPreguntas} preguntas.
            Recuerda que las respuestas incorrectas penalizan -0.25.
          </p>
          <button className="btn-primary mx-auto">
            <Play className="h-4 w-4" />
            Comenzar simulacro
          </button>
        </div>
      )}
    </div>
  );
}
