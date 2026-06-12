import { Flame, Trophy, Target, Clock, TrendingUp, BookOpen, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { simulacrosMock } from "@/lib/data/simulacros.mock";
import { preguntasMock } from "@/lib/data/preguntas.mock";
import { especialidades } from "@/lib/data/especialidades.mock";
import { supabase } from "@/lib/supabase";

export default async function InicioPage() {
  const { data: perfil } = await supabase
    .from("perfil_ana")
    .select("nombre, apellidos, racha_actual, racha_mayor, fecha_mir, horas_objetivo_dia, especialidades_fuertes, especialidades_debiles, especialidades_favoritas")
    .single();

  const nombre        = perfil?.nombre      ?? "Ana";
  const rachaActual   = perfil?.racha_actual ?? 12;

  const statsCards = [
    { label: "Racha actual",     value: `${rachaActual} días`, icon: Flame,  color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Posición ranking", value: "#34",                 icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-50" },
    { label: "% Acierto global", value: "73%",                 icon: Target, color: "text-green-500",  bg: "bg-green-50"  },
    { label: "Tiempo total",     value: "142h",                icon: Clock,  color: "text-brand-500",  bg: "bg-brand-50"  },
  ];

  const pendientes = simulacrosMock.filter((s) => s.estado !== "completado");
  const recientes  = preguntasMock.slice(0, 4);
  const topEsp     = [...especialidades].sort((a, b) => b.porcentajeMIR - a.porcentajeMIR).slice(0, 4);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/assets/Ana Chang.jpeg"
          alt="Ana Chang"
          width={56}
          height={56}
          className="rounded-full object-cover shrink-0 ring-2 ring-brand-200"
        />
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Buenos días, {nombre} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Llevas <span className="font-semibold text-orange-500">{rachaActual} días</span> de racha.
            Hoy tienes 3 sesiones planificadas.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card flex items-center gap-4 py-4">
              <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-xl font-display font-bold text-gray-900">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress by specialty */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Progreso por Especialidad</h2>
              <Link href="/especialidades" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
                Ver todas <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {topEsp.map((esp, i) => {
                const pct = [73, 68, 81, 55][i];
                return (
                  <div key={esp.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{esp.nombre}</span>
                      <span className="text-sm font-semibold text-gray-900">{pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent questions */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Últimas Preguntas</h2>
              <Link href="/preguntas" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
                Ver banco <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {recientes.map((p, i) => {
                const correcta = [true, false, true, false][i];
                return (
                  <div key={p.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${correcta ? "bg-green-500" : "bg-red-400"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{p.enunciado.substring(0, 80)}…</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.convocatoria} · {p.tema}</p>
                    </div>
                    <span className={`badge shrink-0 ${correcta ? "badge-green" : "badge-red"}`}>
                      {correcta ? "Correcta" : "Incorrecta"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Next simulacro */}
          <div className="card bg-brand-950 text-white border-0">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-brand-300" />
              <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">Simulacro pendiente</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{pendientes[0]?.nombre}</h3>
            <p className="text-sm text-brand-400 mb-5">{pendientes[0]?.config.totalPreguntas} preguntas · {pendientes[0]?.config.tiempoLimiteMinutos} min</p>
            <Link
              href={`/simulacros/${pendientes[0]?.id}`}
              className="flex items-center justify-center gap-2 w-full bg-white text-brand-700 rounded-xl py-2.5 text-sm font-semibold hover:bg-brand-50 transition-colors"
            >
              <Play className="h-4 w-4" />
              Empezar
            </Link>
          </div>

          {/* Weekly goal */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Meta semanal</h3>
              <span className="text-xs text-gray-500">4/7 días</span>
            </div>
            <div className="flex gap-1 mb-3">
              {["L","M","X","J","V","S","D"].map((d, i) => (
                <div
                  key={d}
                  className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                    i < 4 ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center">200 preguntas · 147 completadas</p>
          </div>

          {/* Trending topic */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-brand-500" />
              <span className="text-xs font-semibold text-brand-600">Tema del día</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Arritmias — FA</h3>
            <p className="text-sm text-gray-500 mb-4">
              Aparece en el 6% de las últimas convocatorias. 3 preguntas sin repasar.
            </p>
            <Link href="/preguntas?tema=arritmias" className="btn-secondary text-xs py-2 w-full justify-center">
              Repasar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
