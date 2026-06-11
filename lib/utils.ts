import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calcularNotaMIR(correctas: number, incorrectas: number): number {
  return Math.max(0, correctas - incorrectas / 4) + 10;
}

export function formatTiempo(segundos: number): string {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segs = segundos % 60;
  if (horas > 0) return `${horas}h ${minutos}m`;
  if (minutos > 0) return `${minutos}m ${segs}s`;
  return `${segs}s`;
}

export function formatFecha(fecha: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

export function getPorcentaje(valor: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((valor / total) * 100);
}

export function getDificultadColor(dificultad: string): string {
  switch (dificultad) {
    case "facil":   return "text-green-600 bg-green-50 border-green-200";
    case "media":   return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "dificil": return "text-red-600 bg-red-50 border-red-200";
    default:        return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function getDificultadLabel(dificultad: string): string {
  const labels: Record<string, string> = {
    facil: "Fácil",
    media: "Media",
    dificil: "Difícil",
  };
  return labels[dificultad] ?? dificultad;
}
