import type { Simulacro, ResultadoSimulacro } from "@/lib/types/simulacro";

export const simulacrosMock: Simulacro[] = [
  {
    id: "sim-mir-2023",
    nombre: "MIR 2023-2024 Oficial",
    descripcion: "Examen oficial MIR convocatoria 2023-2024 completo. 210 preguntas en 270 minutos.",
    tipo: "oficial",
    año: 2023,
    config: {
      totalPreguntas: 210,
      tiempoLimiteMinutos: 270,
      modoRevision: false,
    },
    estado: "no_iniciado",
    fechaCreacion: new Date("2024-01-15"),
  },
  {
    id: "sim-mir-2022",
    nombre: "MIR 2022-2023 Oficial",
    descripcion: "Examen oficial MIR convocatoria 2022-2023 completo.",
    tipo: "oficial",
    año: 2022,
    config: {
      totalPreguntas: 210,
      tiempoLimiteMinutos: 270,
      modoRevision: false,
    },
    estado: "completado",
    fechaCreacion: new Date("2023-02-01"),
    fechaInicio: new Date("2024-03-10T10:00:00"),
    fechaFin: new Date("2024-03-10T14:15:00"),
  },
  {
    id: "sim-cardio-1",
    nombre: "Simulacro Cardiología Intensivo",
    descripcion: "50 preguntas de Cardiología seleccionadas por dificultad. Ideal para repaso final.",
    tipo: "tematico",
    config: {
      totalPreguntas: 50,
      tiempoLimiteMinutos: 60,
      especialidades: ["cardiologia"],
      modoRevision: false,
    },
    estado: "no_iniciado",
    fechaCreacion: new Date("2024-04-01"),
  },
  {
    id: "sim-neuro-1",
    nombre: "Neurología + Psiquiatría",
    descripcion: "40 preguntas combinadas de Neurología y Psiquiatría.",
    tipo: "tematico",
    config: {
      totalPreguntas: 40,
      tiempoLimiteMinutos: 50,
      especialidades: ["neurologia", "psiquiatria"],
      modoRevision: true,
    },
    estado: "en_progreso",
    fechaCreacion: new Date("2024-04-10"),
    fechaInicio: new Date("2024-04-15T16:30:00"),
  },
  {
    id: "sim-custom-1",
    nombre: "Repaso Personalizado Semana 12",
    descripcion: "Preguntas falladas de las últimas 2 semanas. Generado automáticamente.",
    tipo: "personalizado",
    config: {
      totalPreguntas: 30,
      tiempoLimiteMinutos: 40,
      modoRevision: true,
    },
    estado: "no_iniciado",
    fechaCreacion: new Date("2024-04-18"),
  },
];

export const resultadosMock: ResultadoSimulacro[] = [
  {
    simulacroId: "sim-mir-2022",
    totalPreguntas: 210,
    respondidas: 210,
    correctas: 147,
    incorrectas: 45,
    enBlanco: 18,
    nota: 135.75, // 147 - (45/4) + 10 ≈ 145.75 sobre 220 aprox
    tiempoEmpleadoSegundos: 14700,
    porEspecialidad: [
      { especialidadId: "cardiologia", especialidadNombre: "Cardiología", correctas: 18, incorrectas: 4, enBlanco: 2, porcentajeAcierto: 75 },
      { especialidadId: "neurologia", especialidadNombre: "Neurología", correctas: 16, incorrectas: 5, enBlanco: 3, porcentajeAcierto: 67 },
      { especialidadId: "medicina-interna", especialidadNombre: "Medicina Interna", correctas: 22, incorrectas: 7, enBlanco: 3, porcentajeAcierto: 69 },
      { especialidadId: "cirugia", especialidadNombre: "Cirugía", correctas: 14, incorrectas: 4, enBlanco: 2, porcentajeAcierto: 70 },
      { especialidadId: "ginecologia", especialidadNombre: "Ginecología", correctas: 12, incorrectas: 5, enBlanco: 3, porcentajeAcierto: 60 },
      { especialidadId: "pediatria", especialidadNombre: "Pediatría", correctas: 17, incorrectas: 6, enBlanco: 2, porcentajeAcierto: 68 },
      { especialidadId: "psiquiatria", especialidadNombre: "Psiquiatría", correctas: 10, incorrectas: 4, enBlanco: 1, porcentajeAcierto: 67 },
      { especialidadId: "neumologia", especialidadNombre: "Neumología", correctas: 13, incorrectas: 5, enBlanco: 2, porcentajeAcierto: 65 },
    ],
    fechaRealizacion: new Date("2024-03-10"),
  },
];
