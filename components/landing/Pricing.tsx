import Link from "next/link";
import { CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Para empezar a explorar",
    cta: "Empezar gratis",
    featured: false,
    features: [
      "100 preguntas al mes",
      "Simulacro de práctica (30 preguntas)",
      "Estadísticas básicas",
      "Acceso a 3 especialidades",
    ],
    notIncluded: [
      "Explicaciones con IA",
      "Simulacros oficiales completos",
      "Plan de estudio personalizado",
    ],
  },
  {
    name: "Pro",
    price: "19",
    description: "La elección de los que aprueban",
    cta: "Empezar ahora",
    featured: true,
    badge: "Más popular",
    features: [
      "Preguntas ilimitadas",
      "Todos los simulacros oficiales",
      "Explicaciones con IA incluidas",
      "Plan de estudio personalizado",
      "Analítica avanzada por especialidad",
      "Ranking competitivo",
      "Modo flashcard ilimitado",
      "Acceso a todas las especialidades",
    ],
  },
  {
    name: "Premium",
    price: "35",
    description: "Para los que no dejan nada al azar",
    cta: "Contactar",
    featured: false,
    features: [
      "Todo lo de Pro",
      "Tutoría semanal 1:1 con médico MIR",
      "Feedback personalizado de simulacros",
      "Acceso anticipado a nuevas funciones",
      "Soporte prioritario 24h",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Precios</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4 text-balance">
            Invierte en tu futuro, no en tu academia
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Por menos que un libro de texto al mes, accedes a toda la plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl p-8 flex flex-col",
                plan.featured
                  ? "bg-brand-950 text-white shadow-2xl shadow-brand-900/30 scale-105 ring-2 ring-brand-600"
                  : "bg-white border border-gray-200 shadow-sm"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                    <Zap className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn("text-lg font-bold mb-1", plan.featured ? "text-white" : "text-gray-900")}>
                  {plan.name}
                </h3>
                <p className={cn("text-sm mb-4", plan.featured ? "text-brand-300" : "text-gray-500")}>
                  {plan.description}
                </p>
                <div className="flex items-end gap-1">
                  <span className={cn("text-5xl font-display font-bold", plan.featured ? "text-white" : "text-gray-900")}>
                    {plan.price}€
                  </span>
                  <span className={cn("text-sm mb-1.5", plan.featured ? "text-brand-300" : "text-gray-500")}>
                    /mes
                  </span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className={cn("h-4 w-4 mt-0.5 shrink-0", plan.featured ? "text-brand-400" : "text-green-500")} />
                    <span className={cn("text-sm", plan.featured ? "text-brand-100" : "text-gray-700")}>{f}</span>
                  </li>
                ))}
                {plan.notIncluded?.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 opacity-40">
                    <div className="h-4 w-4 mt-0.5 shrink-0 rounded-full border border-gray-300" />
                    <span className="text-sm text-gray-500">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/inicio"
                className={cn(
                  "text-center py-3 rounded-xl text-sm font-semibold transition-all",
                  plan.featured
                    ? "bg-white text-brand-700 hover:bg-brand-50"
                    : "bg-brand-600 text-white hover:bg-brand-700"
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          Sin permanencia. Cancela cuando quieras. Garantía de devolución 7 días.
        </p>
      </div>
    </section>
  );
}
