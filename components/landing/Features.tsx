import {
  Brain, ClipboardList, BarChart3, Calendar,
  Zap, BookMarked, Target, Users,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "IA Explicativa",
    description:
      "Cada pregunta fallada recibe una explicación personalizada por IA que entiende tu nivel y tu historial de errores.",
    color: "bg-purple-50 text-purple-600",
    tag: "IA",
  },
  {
    icon: ClipboardList,
    title: "Simulacros Oficiales",
    description:
      "Todos los exámenes MIR desde 2000 en formato oficial: 210 preguntas, 270 minutos, penalización incluida.",
    color: "bg-blue-50 text-blue-600",
    tag: "Contenido",
  },
  {
    icon: BarChart3,
    title: "Analítica Detallada",
    description:
      "Visualiza tu evolución por especialidad, detecta tus puntos débiles y compara tu rendimiento con el percentil de aprobados.",
    color: "bg-green-50 text-green-600",
    tag: "Progreso",
  },
  {
    icon: Calendar,
    title: "Plan de Estudio Adaptativo",
    description:
      "Genera automáticamente un calendario de estudio personalizado según tu fecha objetivo y disponibilidad diaria.",
    color: "bg-orange-50 text-orange-600",
    tag: "Planificación",
  },
  {
    icon: Zap,
    title: "Modo Flashcard",
    description:
      "Repasa conceptos clave en sesiones cortas de 10 minutos. Perfecto para el metro o entre guardias.",
    color: "bg-yellow-50 text-yellow-600",
    tag: "Estudio",
  },
  {
    icon: BookMarked,
    title: "Banco de Preguntas Filtrado",
    description:
      "Filtra por especialidad, año, dificultad o estado. Marca preguntas para revisión y construye tu propio banco personalizado.",
    color: "bg-teal-50 text-teal-600",
    tag: "Organización",
  },
  {
    icon: Target,
    title: "Simulacros Temáticos",
    description:
      "Crea simulacros por especialidades específicas. Ideal para reforzar las áreas donde más puntuación puedes ganar.",
    color: "bg-rose-50 text-rose-600",
    tag: "Simulacros",
  },
  {
    icon: Users,
    title: "Ranking y Comunidad",
    description:
      "Compite con otros opositores, celebra rachas de estudio y comparte estrategias en nuestra comunidad privada.",
    color: "bg-indigo-50 text-indigo-600",
    tag: "Social",
  },
];

export default function Features() {
  return (
    <section id="caracteristicas" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Funcionalidades</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4 text-balance">
            Todo lo que necesitas, nada que sobre
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto text-balance">
            Diseñado con médicos que han aprobado el MIR para darte exactamente lo que funciona.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-100 transition-all"
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.color} mb-4`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  {feature.tag}
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
