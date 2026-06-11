"use client";

import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Plus, BookOpen,
  ClipboardList, RotateCcw, Coffee, Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { EventoCalendario } from "@/lib/types/usuario";

// Mock events
const eventosMock: EventoCalendario[] = [
  { id: "1", titulo: "Cardiología — Arritmias",   fecha: new Date(2025, 5, 3),  tipo: "estudio",    especialidadId: "cardiologia",    completado: true,  color: "#e84545" },
  { id: "2", titulo: "Simulacro MIR 2022",         fecha: new Date(2025, 5, 5),  tipo: "simulacro",  completado: true,  color: "#3068ff" },
  { id: "3", titulo: "Repaso Neurología",           fecha: new Date(2025, 5, 7),  tipo: "repaso",     especialidadId: "neurologia",     completado: true,  color: "#8b5cf6" },
  { id: "4", titulo: "Pediatría — Neonatología",   fecha: new Date(2025, 5, 10), tipo: "estudio",    especialidadId: "pediatria",      completado: false, color: "#f59e0b" },
  { id: "5", titulo: "Descanso activo",             fecha: new Date(2025, 5, 11), tipo: "descanso",   completado: false, color: "#10b981" },
  { id: "6", titulo: "Cirugía — Digestivo",        fecha: new Date(2025, 5, 12), tipo: "estudio",    especialidadId: "cirugia",        completado: false, color: "#059669" },
  { id: "7", titulo: "Simulacro Cardiología",       fecha: new Date(2025, 5, 14), tipo: "simulacro",  completado: false, color: "#3068ff" },
  { id: "8", titulo: "Ginecología — Obstetricia",  fecha: new Date(2025, 5, 17), tipo: "estudio",    especialidadId: "ginecologia",    completado: false, color: "#ec4899" },
  { id: "9", titulo: "Repaso general semana",      fecha: new Date(2025, 5, 18), tipo: "repaso",     completado: false, color: "#8b5cf6" },
  { id: "10", titulo: "Simulacro MIR 2023",         fecha: new Date(2025, 5, 21), tipo: "simulacro",  completado: false, color: "#3068ff" },
];

const DAYS = ["L", "M", "X", "J", "V", "S", "D"];
const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

const tipoConfig = {
  estudio:   { icon: BookOpen,     label: "Estudio",   color: "bg-blue-50 text-blue-700" },
  simulacro: { icon: ClipboardList, label: "Simulacro", color: "bg-brand-50 text-brand-700" },
  repaso:    { icon: RotateCcw,    label: "Repaso",    color: "bg-purple-50 text-purple-700" },
  descanso:  { icon: Coffee,       label: "Descanso",  color: "bg-green-50 text-green-700" },
  examen:    { icon: Flame,        label: "Examen",    color: "bg-red-50 text-red-700" },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday-first
}

export default function CalendarioPage() {
  const today = new Date();
  const [currentYear,  setYear]  = useState(today.getFullYear());
  const [currentMonth, setMonth] = useState(today.getMonth());
  const [selectedDay,  setDay]   = useState<number | null>(today.getDate());

  const daysInMonth  = getDaysInMonth(currentYear, currentMonth);
  const firstDay     = getFirstDayOfMonth(currentYear, currentMonth);
const calendarDays: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function prevMonth() {
    if (currentMonth === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  function getEventosForDay(day: number) {
    return eventosMock.filter(e => {
      const d = new Date(e.fecha);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth && d.getDate() === day;
    });
  }

  const selectedEventos = selectedDay ? getEventosForDay(selectedDay) : [];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Calendario de Estudio</h1>
          <p className="text-gray-500 mt-1">Planifica y sigue tu progreso semana a semana</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          Añadir evento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 card">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-display font-bold text-gray-900">
              {MONTHS[currentMonth]} {currentYear}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              if (!day) return <div key={idx} />;
              const eventos     = getEventosForDay(day);
              const isToday     = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              const isSelected  = day === selectedDay;
              return (
                <button
                  key={idx}
                  onClick={() => setDay(day)}
                  className={cn(
                    "relative flex flex-col items-center rounded-xl p-1.5 min-h-[52px] transition-all hover:bg-gray-50",
                    isSelected && "bg-brand-50 ring-2 ring-brand-400",
                    isToday    && !isSelected && "ring-2 ring-brand-200"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium mb-1",
                    isToday    ? "text-brand-600 font-bold" :
                    isSelected ? "text-brand-700" : "text-gray-700"
                  )}>
                    {day}
                  </span>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {eventos.slice(0, 3).map((e) => (
                      <div
                        key={e.id}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: e.color }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Selected day */}
          <div className="card">
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              {selectedDay
                ? `${selectedDay} de ${MONTHS[currentMonth]}`
                : "Selecciona un día"}
            </h3>
            {selectedEventos.length > 0 ? (
              <div className="space-y-3">
                {selectedEventos.map((e) => {
                  const cfg = tipoConfig[e.tipo];
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={e.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-xl border",
                        e.completado ? "border-green-200 bg-green-50" : "border-gray-100 bg-gray-50"
                      )}
                    >
                      <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center shrink-0", cfg.color)}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium", e.completado ? "line-through text-gray-400" : "text-gray-900")}>
                          {e.titulo}
                        </p>
                        <span className={cn("badge text-[10px] mt-1", cfg.color)}>{cfg.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-gray-400">Sin eventos este día</p>
                <button className="btn-ghost text-xs mt-2">
                  <Plus className="h-3.5 w-3.5" />
                  Añadir
                </button>
              </div>
            )}
          </div>

          {/* Weekly summary */}
          <div className="card">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Resumen semanal</h3>
            <div className="space-y-3">
              {Object.entries(tipoConfig).map(([tipo, cfg]) => {
                const count = eventosMock.filter(e => e.tipo === tipo).length;
                const Icon  = cfg.icon;
                if (count === 0) return null;
                return (
                  <div key={tipo} className="flex items-center gap-3">
                    <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center shrink-0", cfg.color)}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-gray-700 flex-1">{cfg.label}</span>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak */}
          <div className="card bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
            <div className="flex items-center gap-3">
              <Flame className="h-8 w-8 text-white/90" />
              <div>
                <p className="text-2xl font-display font-bold">12 días</p>
                <p className="text-sm text-orange-100">Racha de estudio activa 🔥</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
