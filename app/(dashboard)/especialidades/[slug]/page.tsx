import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Target, TrendingUp, ChevronRight } from "lucide-react";
import { getEspecialidadBySlug } from "@/lib/data/especialidades.mock";
import { getPreguntasByEspecialidad } from "@/lib/data/preguntas.mock";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EspecialidadDetailPage({ params }: Props) {
  const { slug } = await params;
  const esp = getEspecialidadBySlug(slug);
  if (!esp) notFound();

  const preguntas = getPreguntasByEspecialidad(slug);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Back */}
      <Link
        href="/especialidades"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Especialidades
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${esp.color}18` }}
        >
          <BookOpen className="h-7 w-7" style={{ color: esp.color }} />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">{esp.nombre}</h1>
          <p className="text-gray-500 mt-0.5">{esp.descripcion}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="badge" style={{ backgroundColor: `${esp.color}15`, color: esp.color }}>
              {esp.porcentajeMIR}% del MIR
            </span>
            <span className="text-sm text-gray-500">{esp.totalPreguntas} preguntas totales</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Target,     label: "% Acierto",      value: "71%" },
          { icon: BookOpen,   label: "Vistas",          value: `${preguntas.length}/${esp.totalPreguntas}` },
          { icon: TrendingUp, label: "Vs. media MIR",  value: "+8%" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card text-center py-4">
              <Icon className="h-5 w-5 mx-auto mb-2 text-gray-400" />
              <p className="text-xl font-display font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topics */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Temas</h2>
            <div className="space-y-3">
              {esp.temas.map((tema) => (
                <div key={tema.id} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-brand-600 transition-colors">
                      {tema.nombre}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.floor(Math.random() * 60) + 30}%`,
                          backgroundColor: esp.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{tema.totalPreguntas}p</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Questions preview */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">Preguntas recientes</h2>
              <Link
                href={`/preguntas?especialidad=${slug}`}
                className="text-xs text-brand-600 hover:underline"
              >
                Ver todas
              </Link>
            </div>
            <div className="space-y-3">
              {preguntas.length > 0 ? (
                preguntas.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-gray-700 line-clamp-2">{p.enunciado}</p>
                      <span className={`badge shrink-0 ${
                        p.dificultad === "facil" ? "badge-green" :
                        p.dificultad === "media" ? "badge-yellow" : "badge-red"
                      }`}>
                        {p.dificultad === "facil" ? "Fácil" : p.dificultad === "media" ? "Media" : "Difícil"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">{p.convocatoria} · {p.tema}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">
                  No hay preguntas de ejemplo para esta especialidad.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
