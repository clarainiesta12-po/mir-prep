"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, BookmarkPlus, CheckCircle, XCircle, Minus } from "lucide-react";
import { preguntasMock, añosDisponibles } from "@/lib/data/preguntas.mock";
import { especialidades } from "@/lib/data/especialidades.mock";
import { getDificultadColor, getDificultadLabel, cn } from "@/lib/utils";
import type { Pregunta } from "@/lib/types/pregunta";

export default function PreguntasPage() {
  const [selected, setSelected]     = useState<Pregunta | null>(null);
  const [revealed, setRevealed]     = useState(false);
  const [answer, setAnswer]         = useState<string | null>(null);
  const [search, setSearch]         = useState("");
  const [filterEsp, setFilterEsp]   = useState("all");
  const [filterDif, setFilterDif]   = useState("all");

  const filtered = preguntasMock.filter((p) => {
    const matchEsp = filterEsp === "all" || p.especialidad === filterEsp;
    const matchDif = filterDif === "all" || p.dificultad === filterDif;
    const matchSearch = search === "" || p.enunciado.toLowerCase().includes(search.toLowerCase());
    return matchEsp && matchDif && matchSearch;
  });

  function handleSelect(p: Pregunta) {
    setSelected(p);
    setRevealed(false);
    setAnswer(null);
  }

  function handleAnswer(opcionId: string) {
    setAnswer(opcionId);
    setRevealed(true);
  }

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left: Question list */}
      <div className="w-full lg:w-96 flex flex-col border-r border-gray-100 bg-white overflow-hidden shrink-0">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 space-y-3">
          <h1 className="text-lg font-display font-bold text-gray-900">Banco de Preguntas</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar preguntas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                value={filterEsp}
                onChange={(e) => setFilterEsp(e.target.value)}
                className="input text-sm appearance-none pr-8 cursor-pointer"
              >
                <option value="all">Todas</option>
                {especialidades.map((e) => (
                  <option key={e.id} value={e.slug}>{e.nombre}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterDif}
                onChange={(e) => setFilterDif(e.target.value)}
                className="input text-sm appearance-none pr-8 cursor-pointer"
              >
                <option value="all">Dificultad</option>
                <option value="facil">Fácil</option>
                <option value="media">Media</option>
                <option value="dificil">Difícil</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {filtered.length} preguntas encontradas
          </p>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className={cn(
                "w-full text-left p-4 hover:bg-gray-50 transition-colors",
                selected?.id === p.id && "bg-brand-50 border-l-2 border-brand-600"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono text-gray-400 mt-0.5 shrink-0">
                  Nº{p.numero}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 line-clamp-2 mb-1.5">{p.enunciado}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("badge text-[10px] border", getDificultadColor(p.dificultad))}>
                      {getDificultadLabel(p.dificultad)}
                    </span>
                    <span className="badge bg-gray-100 text-gray-500 text-[10px]">{p.año}</span>
                    <span className="badge bg-gray-100 text-gray-500 text-[10px] max-w-[100px] truncate">{p.tema}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Question detail */}
      <div className="hidden lg:flex flex-1 overflow-y-auto bg-gray-50">
        {selected ? (
          <div className="p-8 max-w-3xl w-full">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="badge-blue text-xs">{selected.convocatoria}</span>
              <span className={cn("badge border text-xs", getDificultadColor(selected.dificultad))}>
                {getDificultadLabel(selected.dificultad)}
              </span>
              <span className="badge bg-gray-200 text-gray-600 text-xs">{selected.tema}</span>
              <button className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-brand-600 transition-colors">
                <BookmarkPlus className="h-4 w-4" />
                Guardar
              </button>
            </div>

            {/* Question */}
            <div className="card mb-6">
              <p className="text-base font-medium text-gray-900 leading-relaxed">{selected.enunciado}</p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {selected.opciones.map((op) => {
                const isSelected  = answer === op.id;
                const isCorrect   = revealed && op.id === selected.respuestaCorrecta;
                const isWrong     = revealed && isSelected && op.id !== selected.respuestaCorrecta;

                return (
                  <button
                    key={op.id}
                    onClick={() => !revealed && handleAnswer(op.id)}
                    disabled={revealed}
                    className={cn(
                      "w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all",
                      !revealed && "hover:border-brand-300 hover:bg-white cursor-pointer",
                      !revealed && "border-gray-200 bg-white",
                      isCorrect && "border-green-400 bg-green-50",
                      isWrong   && "border-red-400 bg-red-50",
                      isSelected && !revealed && "border-brand-400 bg-brand-50"
                    )}
                  >
                    <span className={cn(
                      "h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5",
                      isCorrect ? "border-green-500 text-green-600 bg-green-100" :
                      isWrong   ? "border-red-500 text-red-600 bg-red-100" :
                      isSelected ? "border-brand-500 text-brand-600 bg-brand-100" :
                      "border-gray-300 text-gray-500"
                    )}>
                      {op.id.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-700 pt-0.5">{op.texto}</span>
                    {isCorrect && <CheckCircle className="ml-auto h-5 w-5 text-green-500 shrink-0 mt-0.5" />}
                    {isWrong   && <XCircle    className="ml-auto h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {!revealed && (
              <button
                onClick={() => setRevealed(true)}
                className="btn-secondary w-full justify-center"
              >
                <Minus className="h-4 w-4" />
                Ver respuesta
              </button>
            )}

            {/* Explanation */}
            {revealed && (
              <div className="card border-brand-100 bg-brand-50 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-700">IA</span>
                  </div>
                  <span className="text-sm font-bold text-brand-700">Explicación</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.explicacion}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="badge bg-white text-gray-600 border border-gray-200 text-[10px]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Selecciona una pregunta</h3>
              <p className="text-sm text-gray-500">Elige una pregunta de la lista para empezar a practicar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
