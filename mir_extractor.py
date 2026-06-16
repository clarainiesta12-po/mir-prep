#!/usr/bin/env python3
"""
MIR PDF Extractor - Extracción masiva de manuales AMIR
=======================================================
Procesa PDFs de manuales MIR y genera:
  - JSON estructurado con el contenido (sin marcas de la academia)
  - Imágenes clínicas extraídas (radiografías, ECGs, anatomías, etc.)

Uso:
  python3 mir_extractor.py input.pdf
  python3 mir_extractor.py *.pdf
  python3 mir_extractor.py /carpeta/con/pdfs/

Salida por cada PDF:
  output/<nombre_pdf>/
    ├── contenido.json
    └── imagenes/
        ├── p011_img001.jpg
        └── ...
"""

import sys
import os
import re
import json
import struct
import zlib
from pathlib import Path
import pdfplumber
from pypdf import PdfReader

# ─────────────────────────────────────────────
# CONFIGURACIÓN: ajusta estos valores si cambia
# la academia o el estilo de los PDFs
# ─────────────────────────────────────────────

# Términos de marca a eliminar del texto
BRAND_PATTERNS = [
    r"Manual\s+AMIR",
    r"MANUAL\s+AMIR",
    r"Academia\s+de\s+Estudios\s+MIR[\s,\.]*S\.?L\.?",
    r"ACADEMIA\s+DE\s+ESTUDIOS\s+MIR[\s,\.]*S\.?L\.?",
    r"www\.academiamir\.com",
    r"info@academiamir\.com",
    r"Equipo\s+de\s+Diseño\s+y\s+Maquetación\s+AMIR",
    r"©\s*AMIR",
    r"AMIR\s+\d{4}",          # "AMIR 2023" etc.
]

# Líneas de encabezado/pie que se eliminan enteras si contienen marca
HEADER_FOOTER_BRAND_TERMS = [
    "Manual AMIR", "MANUAL AMIR", "academiamir", "Academia de Estudios MIR"
]

# Tamaño mínimo de imagen clínica (píxeles). Las más pequeñas son logos/iconos.
# Logos AMIR suelen ser <150x150 px, imágenes clínicas >300x300 px
MIN_CLINICAL_IMAGE_WIDTH = 200
MIN_CLINICAL_IMAGE_HEIGHT = 200

# Páginas a saltar (portada, créditos, índices, notas finales, bibliografía)
# Se detectan automáticamente por contenido, pero también puedes añadir rangos manuales
SKIP_PAGES_PATTERNS = [
    r"ISBN\s*\n.*\d{3}-\d{2}-\d{5}-\d{2}-\d{1}",  # página de créditos
    r"DEPÓSITO LEGAL",
    r"^Notas\s*$",
    r"^Sedes\s*$",
    r"FILIACIÓN PROFESIONAL\s+DE AUTORES",
]

# ─────────────────────────────────────────────
# FUNCIONES PRINCIPALES
# ─────────────────────────────────────────────

def clean_text(text: str) -> str:
    """Elimina todas las referencias de marca del texto."""
    for pattern in BRAND_PATTERNS:
        text = re.sub(pattern, "", text, flags=re.IGNORECASE)
    # Eliminar espacios múltiples y líneas vacías consecutivas
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r" {2,}", " ", text)
    return text.strip()


def is_header_footer_brand(line: str) -> bool:
    """Detecta si una línea es solo un encabezado/pie con marca."""
    line_stripped = line.strip()
    return any(term.lower() in line_stripped.lower() for term in HEADER_FOOTER_BRAND_TERMS)


def is_skip_page(text: str) -> bool:
    """Detecta páginas que deben omitirse completamente (créditos, notas, etc.)."""
    for pattern in SKIP_PAGES_PATTERNS:
        if re.search(pattern, text, re.MULTILINE | re.IGNORECASE):
            return True
    return False


def is_clinical_image(img: dict) -> bool:
    """
    Determina si una imagen es clínica (a conservar) vs logo/icono (a descartar).
    Criterios:
      - Tamaño mínimo en píxeles (los logos son pequeños)
      - Las imágenes de marca de AMIR suelen estar en la primera/última página
        y son muy pequeñas
    """
    src_w, src_h = img.get("srcsize", (0, 0))
    return src_w >= MIN_CLINICAL_IMAGE_WIDTH and src_h >= MIN_CLINICAL_IMAGE_HEIGHT


def extract_image_bytes(img_obj: dict) -> tuple[bytes, str]:
    """Extrae los bytes de la imagen y devuelve (bytes, extensión)."""
    stream = img_obj.get("stream")
    if stream is None:
        return None, None
    
    # pdfplumber expone el stream crudo del PDF
    try:
        raw = stream.get_data()
        # Detectar si ya es JPEG (empieza con FF D8)
        if raw[:2] == b'\xff\xd8':
            return raw, "jpg"
        # PNG signature
        if raw[:8] == b'\x89PNG\r\n\x1a\n':
            return raw, "png"
        # Intentar decompress como zlib (imágenes FlateDecode)
        try:
            decompressed = zlib.decompress(raw)
            # Convertir raw pixels a PNG sencillo si tenemos dimensiones
            return decompressed, "raw"
        except Exception:
            return raw, "bin"
    except Exception:
        return None, None


def process_page_text(page, page_num: int) -> dict:
    """Extrae y limpia el texto de una página, devuelve dict con metadata."""
    raw_text = page.extract_text() or ""
    
    if is_skip_page(raw_text):
        return None
    
    lines = raw_text.split("\n")
    
    # Eliminar líneas de encabezado/pie con marca (primeras y últimas líneas)
    # Los encabezados AMIR suelen ser la 1ª línea, los números de página la última
    cleaned_lines = []
    for i, line in enumerate(lines):
        if is_header_footer_brand(line):
            continue
        cleaned_lines.append(line)
    
    cleaned_text = "\n".join(cleaned_lines)
    cleaned_text = clean_text(cleaned_text)
    
    # Extraer referencias MIR mencionadas en el texto (para metadata)
    mir_refs = re.findall(r"MIR\s+(\d{2}),\s*(\d+)", cleaned_text)
    mir_refs_formatted = [f"MIR{year}-{num}" for year, num in mir_refs]
    
    # Detectar número de tema
    tema_match = re.search(r"Tema\s+(\d+)", cleaned_text[:200])
    tema = int(tema_match.group(1)) if tema_match else None
    
    # Extraer número de página real del PDF (última línea suele ser el número)
    page_number_match = re.search(r"^\s*(\d+)\s*$", lines[-1].strip() if lines else "")
    page_number_pdf = int(page_number_match.group(1)) if page_number_match else page_num + 1
    
    return {
        "pagina_pdf": page_num + 1,
        "numero_pagina": page_number_pdf,
        "tema": tema,
        "texto": cleaned_text,
        "referencias_mir": mir_refs_formatted,
        "tiene_imagen": False,  # se actualiza al procesar imágenes
        "imagenes": []
    }


def extract_images_from_page(page, page_num: int, output_dir: Path) -> list[str]:
    """Extrae imágenes clínicas de una página, las guarda y devuelve lista de rutas."""
    img_dir = output_dir / "imagenes"
    img_dir.mkdir(exist_ok=True)
    
    saved_images = []
    img_counter = 0
    
    for img in page.images:
        if not is_clinical_image(img):
            continue
        
        img_counter += 1
        img_data, ext = extract_image_bytes(img)
        
        if img_data and ext in ("jpg", "png"):
            filename = f"p{page_num+1:03d}_img{img_counter:03d}.{ext}"
            filepath = img_dir / filename
            with open(filepath, "wb") as f:
                f.write(img_data)
            saved_images.append(str(filepath.relative_to(output_dir)))
        else:
            # Fallback: usar pdfimages CLI para esta página específica
            saved_images.append(f"[imagen p{page_num+1}-{img_counter}: extraer manualmente con pdfimages]")
    
    return saved_images


def process_pdf(pdf_path: str, output_base: str = "output") -> dict:
    """
    Procesa un PDF completo.
    Devuelve un dict con estadísticas del procesamiento.
    """
    pdf_path = Path(pdf_path)
    pdf_name = pdf_path.stem
    output_dir = Path(output_base) / pdf_name
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"\n{'='*60}")
    print(f"Procesando: {pdf_path.name}")
    print(f"Salida en:  {output_dir}/")
    print(f"{'='*60}")
    
    # Extraer metadata básica
    reader = PdfReader(str(pdf_path))
    meta = reader.metadata or {}
    
    result = {
        "archivo_origen": pdf_path.name,
        "metadata": {
            "titulo": meta.get("/Title", pdf_name),
            "creador": meta.get("/Creator", ""),
            "total_paginas": len(reader.pages),
        },
        "aviso": "Contenido extraído para uso educativo. Imágenes clínicas de terceros conservadas con sus atribuciones originales.",
        "paginas": []
    }
    
    stats = {"paginas_procesadas": 0, "paginas_omitidas": 0, 
             "imagenes_extraidas": 0, "refs_mir_encontradas": set()}
    
    with pdfplumber.open(str(pdf_path)) as pdf:
        total = len(pdf.pages)
        
        for i, page in enumerate(pdf.pages):
            # Progreso
            if (i + 1) % 20 == 0 or i == total - 1:
                print(f"  Página {i+1}/{total}...")
            
            # Extraer y limpiar texto
            page_data = process_page_text(page, i)
            
            if page_data is None:
                stats["paginas_omitidas"] += 1
                continue
            
            # Saltar páginas sin contenido real
            if len(page_data["texto"].strip()) < 50:
                stats["paginas_omitidas"] += 1
                continue
            
            # Extraer imágenes clínicas
            images = extract_images_from_page(page, i, output_dir)
            if images:
                page_data["tiene_imagen"] = True
                page_data["imagenes"] = images
                stats["imagenes_extraidas"] += len(images)
            
            stats["paginas_procesadas"] += 1
            stats["refs_mir_encontradas"].update(page_data["referencias_mir"])
            result["paginas"].append(page_data)
    
    # Añadir resumen al JSON
    result["resumen"] = {
        "paginas_procesadas": stats["paginas_procesadas"],
        "paginas_omitidas": stats["paginas_omitidas"],
        "imagenes_clinicas_extraidas": stats["imagenes_extraidas"],
        "total_referencias_mir": len(stats["refs_mir_encontradas"]),
        "referencias_mir": sorted(list(stats["refs_mir_encontradas"]))
    }
    
    # Guardar JSON
    json_path = output_dir / "contenido.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"\n  ✓ JSON guardado: {json_path}")
    print(f"  ✓ Páginas procesadas: {stats['paginas_procesadas']}")
    print(f"  ✓ Páginas omitidas (portada/créditos/índices): {stats['paginas_omitidas']}")
    print(f"  ✓ Imágenes clínicas extraídas: {stats['imagenes_extraidas']}")
    print(f"  ✓ Referencias MIR encontradas: {len(stats['refs_mir_encontradas'])}")
    
    return stats


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    
    inputs = sys.argv[1:]
    pdf_files = []
    
    for inp in inputs:
        p = Path(inp)
        if p.is_dir():
            pdf_files.extend(sorted(p.glob("*.pdf")))
        elif p.is_file() and p.suffix.lower() == ".pdf":
            pdf_files.append(p)
        else:
            # Glob pattern
            from glob import glob
            matches = [Path(f) for f in glob(inp) if f.endswith(".pdf")]
            pdf_files.extend(matches)
    
    if not pdf_files:
        print(f"Error: no se encontraron PDFs en: {inputs}")
        sys.exit(1)
    
    print(f"\nPDFs a procesar: {len(pdf_files)}")
    for f in pdf_files:
        print(f"  - {f.name}")
    
    total_stats = {"imagenes": 0, "paginas": 0, "refs": set()}
    
    for pdf_file in pdf_files:
        try:
            stats = process_pdf(str(pdf_file))
            total_stats["imagenes"] += stats["imagenes_extraidas"]
            total_stats["paginas"] += stats["paginas_procesadas"]
            total_stats["refs"].update(stats["refs_mir_encontradas"])
        except Exception as e:
            print(f"\n  ✗ Error procesando {pdf_file.name}: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\n{'='*60}")
    print(f"RESUMEN TOTAL")
    print(f"{'='*60}")
    print(f"  PDFs procesados: {len(pdf_files)}")
    print(f"  Páginas totales: {total_stats['paginas']}")
    print(f"  Imágenes clínicas: {total_stats['imagenes']}")
    print(f"  Referencias MIR únicas: {len(total_stats['refs'])}")
    print(f"\nSalida en: output/")


if __name__ == "__main__":
    main()
