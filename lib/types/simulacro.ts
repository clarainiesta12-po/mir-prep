export type EstadoSimulacro = "no_iniciado" | "en_progreso" | "completado";

export interface ConfigSimulacro {
  totalPreguntas: number;        // 210 en MIR real
  tiempoLimiteMinutos: number;   // 270 en MIR real
  especialidades?: string[];     // Filtrar por especialidades
  años?: number[];               // Filtrar por años
  modoRevision: boolean;         // Mostrar respuesta al instante
}

export interface Simulacro {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: "oficial" | "tematico" | "personalizado";
  año?: number;
  config: ConfigSimulacro;
  estado: EstadoSimulacro;
  fechaCreacion: Date;
  fechaInicio?: Date;
  fechaFin?: Date;
  preguntas?: string[];          // IDs de preguntas
}

export interface ResultadoSimulacro {
  simulacroId: string;
  totalPreguntas: number;
  respondidas: number;
  correctas: number;
  incorrectas: number;
  enBlanco: number;
  nota: number;                  // Nota MIR: aciertos - (incorrectas / 4) + 10
  tiempoEmpleadoSegundos: number;
  porEspecialidad: ResultadoPorEspecialidad[];
  fechaRealizacion: Date;
}

export interface ResultadoPorEspecialidad {
  especialidadId: string;
  especialidadNombre: string;
  correctas: number;
  incorrectas: number;
  enBlanco: number;
  porcentajeAcierto: number;
}
