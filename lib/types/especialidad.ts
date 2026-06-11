export interface Especialidad {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;           // Nombre del icono de lucide-react
  color: string;           // Color hex para el badge
  totalPreguntas: number;
  porcentajeMIR: number;   // % histórico en el MIR
  temas: TemaEspecialidad[];
}

export interface TemaEspecialidad {
  id: string;
  nombre: string;
  totalPreguntas: number;
  subtemas: string[];
}

export interface ProgresoPorEspecialidad {
  especialidadId: string;
  totalVistas: number;
  totalCorrectas: number;
  totalIncorrectas: number;
  porcentajeAcierto: number;
  ultimaActividad?: Date;
}
