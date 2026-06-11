import Link from "next/link";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";

const pillars = ["10.247 preguntas MIR", "Simulacros oficiales", "IA explicativa", "Ranking en tiempo real"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      {/* Blue glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-brand-100 opacity-30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 mb-8">
            <Sparkles className="h-3.5 w-3.5 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">
              Nuevo: Explicaciones adaptativas con IA
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight leading-none mb-6">
            Prepara el{" "}
            <span className="relative">
              <span className="gradient-text">MIR</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 9C60 3 150 1 298 9" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#3068ff"/>
                    <stop offset="1" stopColor="#5891ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            con inteligencia
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto text-balance">
            La plataforma que combina{" "}
            <span className="text-gray-700 font-medium">10.000+ preguntas reales</span>,
            simulacros oficiales y un tutor de IA que te explica cada respuesta como lo haría tu mejor compañero de academia.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/inicio" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto">
              Empezar gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto">
              <Play className="h-4 w-4 text-brand-600" />
              Ver demo (2 min)
            </button>
          </div>

          {/* Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {pillars.map((p) => (
              <div key={p} className="flex items-center gap-1.5 text-sm text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Mock dashboard preview */}
        <div className="mt-20 mx-auto max-w-5xl">
          <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 max-w-xs mx-auto text-center">
                  mirprep.com/simulacros
                </div>
              </div>
            </div>
            {/* Dashboard preview */}
            <div className="bg-gray-50 p-6 min-h-[320px] flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                {[
                  { label: "Preguntas hoy", value: "47", color: "brand", trend: "+12%" },
                  { label: "% Acierto global", value: "73%", color: "green", trend: "+5%" },
                  { label: "Posición ranking", value: "#34", color: "yellow", trend: "↑8" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-3xl font-display font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">{stat.trend} esta semana</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Shadow reflection */}
          <div className="mx-8 h-4 bg-gray-200/60 rounded-b-2xl blur-sm" />
        </div>
      </div>
    </section>
  );
}
