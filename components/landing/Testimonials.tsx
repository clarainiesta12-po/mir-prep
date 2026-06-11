import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Laura Martínez",
    role: "MIR 2024 · Cardiología · Nº 312",
    avatar: "LM",
    color: "from-pink-400 to-rose-500",
    quote:
      "Las explicaciones de la IA marcaron la diferencia. Entendía el por qué de cada respuesta, no solo la memorización. Aprobé con el número que quería.",
    stars: 5,
  },
  {
    name: "Carlos Ruiz",
    role: "MIR 2024 · Medicina Interna · Nº 891",
    avatar: "CR",
    color: "from-blue-400 to-brand-500",
    quote:
      "El plan de estudio adaptativo me ahorró cientos de horas. Sabía exactamente qué estudiar cada día y me sentí preparado el día del examen.",
    stars: 5,
  },
  {
    name: "Ana Vega",
    role: "MIR 2023 · Pediatría · Nº 445",
    avatar: "AV",
    color: "from-green-400 to-teal-500",
    quote:
      "Los simulacros son idénticos al real. La presión del tiempo, la forma de las preguntas... el día del examen fue como uno más de los que había hecho aquí.",
    stars: 5,
  },
  {
    name: "Diego Fernández",
    role: "MIR 2023 · Neurología · Nº 678",
    avatar: "DF",
    color: "from-purple-400 to-violet-500",
    quote:
      "El ranking me mantuvo motivado. Saber que otros estudiaban tanto o más que yo me daba el empuje para seguir en los momentos difíciles.",
    stars: 5,
  },
  {
    name: "Sara López",
    role: "MIR 2024 · Cirugía · Nº 1.203",
    avatar: "SL",
    color: "from-orange-400 to-amber-500",
    quote:
      "Usé otras plataformas antes, pero MIRPrep tiene la mejor analítica. Podía ver exactamente en qué especialidades perdía puntos y centrarme allí.",
    stars: 5,
  },
  {
    name: "Pablo Jiménez",
    role: "MIR 2023 · Psiquiatría · Nº 534",
    avatar: "PJ",
    color: "from-cyan-400 to-blue-500",
    quote:
      "El modo flashcard para repasar en el metro fue un game changer. Llegué a acumular una racha de 85 días. Recomendado al 100%.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Testimonios</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4 text-balance">
            Los que ya aprobaron confían en nosotros
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Más de 12.000 médicos residentes se prepararon con MIRPrep.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div
                  className={`h-9 w-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
