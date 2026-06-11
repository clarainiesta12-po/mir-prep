export type PlanUsuario = "free" | "pro" | "premium";

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellidos?: string;
  avatarUrl?: string;
  plan: PlanUsuario;
  fechaRegistro: Date;
  universidadOrigen?: string;
  añoMIRObjetivo?: number;
  horasEstudioSemana?: number;
}

export interface ProgresoUsuario {
  usuarioId: string;
  totalPreguntasVistas: number;
  totalCorrectas: number;
  totalIncorrectas: number;
  rachaActualDias: number;
  rachaMayorDias: number;
  tiempoTotalEstudioMinutos: number;
  simulacrosCompletados: number;
  notaMediaSimulacros: number;
  ultimaConexion: Date;
}

export interface EventoCalendario {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha: Date;
  fechaFin?: Date;
  tipo: "estudio" | "simulacro" | "repaso" | "descanso" | "examen";
  especialidadId?: string;
  completado: boolean;
  color?: string;
}
