# -*- coding: utf-8 -*-
"""
extract_questions.py
Lee output/SmCm08MIR2026/contenido.json, procesa las páginas en lotes de 10,
llama a la API de Anthropic una vez por lote y une todos los resultados
en output/SmCm08MIR2026/preguntas_estructuradas.json (sin duplicados).
"""

import json
import os
import sys
import io
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
else:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

import anthropic

CONTENIDO_PATH = Path(__file__).parent / "output" / "SmCm08MIR2026" / "contenido.json"
OUTPUT_PATH    = Path(__file__).parent / "output" / "SmCm08MIR2026" / "preguntas_estructuradas.json"
BATCH_SIZE     = 10

PROMPT = (
    "Extrae todas las preguntas de este examen MIR que aparezcan en el texto. "
    "Para cada pregunta devuelve un JSON con: "
    "numero (int), enunciado (string), opciones (array de strings con a,b,c,d), "
    "respuesta_correcta (string: a/b/c/d), explicacion (string si existe). "
    "Si no hay ninguna pregunta completa en el texto devuelve un array vacío []. "
    "Devuelve SOLO un array JSON válido sin texto adicional."
)


def load_paginas(path: Path) -> list:
    raw = path.read_text(encoding="utf-8", errors="replace")
    data = json.loads(raw)
    return data.get("paginas", [])


def clean_json(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        lines = lines[1:]
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return text


def llamar_api(client: anthropic.Anthropic, texto_lote: str, num_lote: int, total_lotes: int) -> list:
    print(f"\n--- Lote {num_lote}/{total_lotes} ({len(texto_lote):,} caracteres) ---")
    with client.messages.stream(
        model="claude-sonnet-4-6",
        max_tokens=8192,
        messages=[
            {
                "role": "user",
                "content": f"{PROMPT}\n\n---TEXTO---\n\n{texto_lote}",
            }
        ],
    ) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)
        final = stream.get_final_message()

    print()

    raw_response = ""
    for block in final.content:
        if block.type == "text":
            raw_response += block.text

    print(f"Tokens — entrada: {final.usage.input_tokens}, salida: {final.usage.output_tokens}")

    json_text = clean_json(raw_response)
    try:
        preguntas = json.loads(json_text)
        if not isinstance(preguntas, list):
            print(f"[AVISO] Respuesta no es una lista, ignorando lote {num_lote}.")
            return []
        return preguntas
    except json.JSONDecodeError as e:
        print(f"[ERROR] JSON inválido en lote {num_lote}: {e}")
        fallback = OUTPUT_PATH.with_suffix(f".raw_lote{num_lote}.txt")
        fallback.write_text(raw_response, encoding="utf-8")
        print(f"Respuesta en bruto guardada en: {fallback}")
        return []


def deduplicar(preguntas: list) -> list:
    """Elimina duplicados por número de pregunta, manteniendo la primera aparición."""
    vistos = set()
    resultado = []
    sin_numero = []
    for p in preguntas:
        num = p.get("numero")
        if num is None:
            sin_numero.append(p)
        elif num not in vistos:
            vistos.add(num)
            resultado.append(p)
    resultado.sort(key=lambda p: p.get("numero", 0))
    resultado.extend(sin_numero)
    return resultado


def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[ERROR] Variable de entorno ANTHROPIC_API_KEY no encontrada.")
        sys.exit(1)

    if not CONTENIDO_PATH.exists():
        print(f"[ERROR] No se encontró: {CONTENIDO_PATH}")
        sys.exit(1)

    print(f"Leyendo {CONTENIDO_PATH} ...")
    paginas = load_paginas(CONTENIDO_PATH)
    print(f"Total de páginas: {len(paginas)}")

    # Dividir en lotes de BATCH_SIZE páginas
    lotes = []
    for i in range(0, len(paginas), BATCH_SIZE):
        grupo = paginas[i:i + BATCH_SIZE]
        textos = [p.get("texto", "").strip() for p in grupo if p.get("texto", "").strip()]
        if textos:
            lotes.append("\n\n".join(textos))

    print(f"Lotes a procesar: {len(lotes)} (≤{BATCH_SIZE} páginas cada uno)")

    client = anthropic.Anthropic(api_key=api_key)

    todas_preguntas = []
    for idx, texto_lote in enumerate(lotes, start=1):
        preguntas_lote = llamar_api(client, texto_lote, idx, len(lotes))
        print(f"  → {len(preguntas_lote)} pregunta(s) encontrada(s) en lote {idx}")
        todas_preguntas.extend(preguntas_lote)

    print(f"\nTotal antes de deduplicar: {len(todas_preguntas)}")
    preguntas_final = deduplicar(todas_preguntas)
    print(f"Total tras deduplicar:     {len(preguntas_final)}")

    OUTPUT_PATH.write_text(
        json.dumps(preguntas_final, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"\n{len(preguntas_final)} preguntas guardadas en:\n  {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
