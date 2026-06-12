import Image from "next/image";
import {
  Flame, Trophy, Target, Clock, MapPin, Mail, Phone,
  GraduationCap, CalendarDays, BookOpen, Star, Award,
  ClipboardList, TrendingUp, Edit,
} from "lucide-react";
import Link from "next/link";

const ana = {
  nombre: "Ana",
  apellidos: "Chang",
  email: "ana.chang@gmail.com",
  telefono: "+34 612 345 678",
  ciudad: "Barcelona",
  pais: "España",
  universidad: "Universitat de Barcelona – Facultad de Medicina",
  añoLicenciatura: 2022,
  añoMIRObjetivo: 2026,
  especialidadInteres: "Cirugía General",
  horasEstudioSemana: 28,
  plan: "Pro",
  bio: "Médica recién licenciada con mucha ilusión por la especialización. Me apasiona la Cirugía y los retos diagnósticos complejos. Busco alcanzar el MIR 2026 con una plaza de Cirugía General en el Hospital Clínic.",
  fechaRegistro: "enero 2025",
};

const stats = [
  { label: "Racha actual",     value: "12 días", icon: Flame,         color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Ranking global",   value: "#34",      icon: Trophy,        color: "text-yellow-500", bg: "bg-yellow-50" },
  { label: "Acierto global",   value: "73%",      icon: Target,        color: "text-green-500",  bg: "bg-green-50" },
  { label: "Tiempo total",     value: "142 h",    icon: Clock,         color: "text-brand-500",  bg: "bg-brand-50" },
  { label: "Simulacros",       value: "8",        icon: ClipboardList, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Nota media",       value: "7,4",      icon: Star,          color: "text-pink-500",   bg: "bg-pink-50" },
];

const logros = [
  { icono: "🔥", titulo: "Semana perfecta",   desc: "7 días seguidos de estudio" },
  { icono: "🎯", titulo: "Francotirador",      desc: "10 aciertos seguidos" },
  { icono: "⚡", titulo: "Velocista",          desc: "Simulacro < 1 min/pregunta" },
  { icono: "📚", titulo: "Lector voraz",       desc: "100 preguntas en un día" },
];

const progresoEsp = [
  { nombre: "Cardiología",    pct: 73 },
  { nombre: "Neurología",     pct: 68 },
  { nombre: "Pediatría",      pct: 81 },
  { nombre: "Cirugía General",pct: 55 },
  { nombre: "Ginecología",    pct: 62 },
];

export default function PerfilPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="card mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative shrink-0">
            <Image
              src="/assets/Ana Chang.jpeg"
              alt="Ana Chang"
              width={96}
              height={96}
              className="rounded-2xl object-cover ring-4 ring-white shadow-md"
            />
            <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-400 ring-2 ring-white text-[10px]">✓</span>
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="text-2xl font-display font-bold text-gray-900">
                {ana.nombre} {ana.apellidos}
              </h1>
              <span className="badge bg-brand-100 text-brand-700 self-center">Plan {ana.plan}</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">{ana.bio}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{ana.ciudad}, {ana.pais}</span>
              <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{ana.universidad}</span>
              <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />Desde {ana.fechaRegistro}</span>
            </div>
          </div>

          <Link
            href="/ajustes"
            className="btn-secondary shrink-0 text-xs py-2 px-4 self-start"
          >
            <Edit className="h-3.5 w-3.5" />
            Editar
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="space-y-6">

          {/* Personal info */}
          <div className="card">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Información personal</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Correo</p>
                  <p className="text-gray-700 font-medium">{ana.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Teléfono</p>
                  <p className="text-gray-700 font-medium">{ana.telefono}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Ubicación</p>
                  <p className="text-gray-700 font-medium">{ana.ciudad}, {ana.pais}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Universidad</p>
                  <p className="text-gray-700 font-medium">{ana.universidad}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CalendarDays className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Año licenciatura</p>
                  <p className="text-gray-700 font-medium">{ana.añoLicenciatura}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* MIR goals */}
          <div className="card">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Objetivos MIR</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Award className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Convocatoria objetivo</p>
                  <p className="text-gray-700 font-medium">MIR {ana.añoMIRObjetivo}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Especialidad de interés</p>
                  <p className="text-gray-700 font-medium">{ana.especialidadInteres}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Horas de estudio / semana</p>
                  <p className="text-gray-700 font-medium">{ana.horasEstudioSemana} h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Logros */}
          <div className="card">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Logros desbloqueados</h2>
            <div className="space-y-3">
              {logros.map((l) => (
                <div key={l.titulo} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50">
                  <span className="text-xl shrink-0">{l.icono}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{l.titulo}</p>
                    <p className="text-xs text-gray-400">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right columns (2/3) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="card flex items-center gap-3 py-4">
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

          {/* Progress by specialty */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Progreso por especialidad</h2>
              <Link href="/especialidades" className="text-xs text-brand-600 hover:underline flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> Ver todo
              </Link>
            </div>
            <div className="space-y-4">
              {progresoEsp.map((e) => (
                <div key={e.nombre}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{e.nombre}</span>
                    <span className="text-sm font-semibold text-gray-900">{e.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all"
                      style={{ width: `${e.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity heatmap placeholder */}
          <div className="card">
            <h2 className="text-base font-bold text-gray-900 mb-1">Actividad reciente</h2>
            <p className="text-xs text-gray-400 mb-4">Últimas 12 semanas</p>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 84 }).map((_, i) => {
                const intensity = [0, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 3, 2, 1][i % 14];
                const colors = [
                  "bg-gray-100",
                  "bg-brand-100",
                  "bg-brand-300",
                  "bg-brand-500",
                ];
                return (
                  <div
                    key={i}
                    title={`Día ${i + 1}`}
                    className={`h-4 w-4 rounded-sm ${colors[intensity]}`}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
              <span>Menos</span>
              {["bg-gray-100","bg-brand-100","bg-brand-300","bg-brand-500"].map((c) => (
                <div key={c} className={`h-3 w-3 rounded-sm ${c}`} />
              ))}
              <span>Más</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
