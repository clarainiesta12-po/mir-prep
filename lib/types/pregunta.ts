export type Dificultad = "facil" | "media" | "dificil";

export type EstadoPregunta = "no_vista" | "correcta" | "incorrecta" | "revisada";

export interface OpcionRespuesta {
  id: string; // "a" | "b" | "c" | "d" | "e"
  texto: string;
}

export interface Pregunta {
  id: string;
  numero: number;         // Número oficial en el examen MIR
  año: number;            // Año del examen (ej: 2023)
  convocatoria: string;   // "MIR 2023-2024"
  especialidad: string;   // slug de la especialidad
  tema: string;
  subtema?: string;
  enunciado: string;
  opciones: OpcionRespuesta[];
  respuestaCorrecta: string; // "a" | "b" | "c" | "d" | "e"
  explicacion: string;
  explicacionIA?: string;    // Generada por OpenAI en fase 3
  dificultad: Dificultad;
  tags: string[];
  imagenUrl?: string;
  estado?: EstadoPregunta;   // Estado del usuario (en fase 2 viene de DB)
  tiempoMedioSegundos?: number;
}

export interface FiltroPreguntas {
  especialidad?: string;
  año?: number;
  dificultad?: Dificultad;
  estado?: EstadoPregunta;
  busqueda?: string;
  tags?: string[];
}

export interface PaginacionPreguntas {
  pagina: number;
  porPagina: number;
  total: number;
}
