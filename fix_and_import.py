# -*- coding: utf-8 -*-
"""
fix_and_import.py
Lee todos los contenido.json de output/, corrige encoding mojibake
(Ã³ -> o con tilde, Ã¡ -> a con tilde, etc.) y muestra las primeras 3
paginas del primer JSON como verificacion.
"""

import json
import sys
import io
from pathlib import Path

# Forzar UTF-8 en la consola de Windows para mostrar tildes correctamente
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
else:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# -- Intentar usar ftfy (pip install ftfy) ------------------------------------
try:
    import ftfy
    USE_FTFY = True
except ImportError:
    USE_FTFY = False

# -- Tabla de reemplazos manuales (UTF-8 leido como latin-1/cp1252) -----------
# Usamos \uXXXX para evitar que caracteres especiales rompan el parser de Python
MOJIBAKE = {
    # vocales minusculas con tilde
    "Ã¡": "á",  # a
    "Ã©": "é",  # e
    "Ã­": "í",  # i
    "Ã³": "ó",  # o  (forma alternativa)
    "Ã³": "ó",  # o
    "Ãº": "ú",  # u
    # vocales mayusculas con tilde
    "Ã": "À",  # A grave
    "Ã": "É",       # E (cp1252: 0x89 = permil sign)
    "Ã": "Í",       # I (cp1252: 0x8d = undefined -> usamos byte)
    "Ã": "Ó",       # O (cp1252: 0x93 = left dquote)
    "Ã": "Ú",       # U (cp1252: 0x9a = s-caron)
    # vocales con acento grave
    "Ã ": "à",  # a grave
    "Ã¨": "è",  # e grave
    "Ã¬": "ì",  # i grave
    "Ã²": "ò",  # o grave
    "Ã¹": "ù",  # u grave
    # vocales con circumflejo
    "Ã¢": "â",
    "Ãª": "ê",
    "Ã®": "î",
    "Ã´": "ô",
    "Ã»": "û",
    # n~, N~
    "Ã±": "ñ",  # n~
    "Ã'": "Ñ",  # N~
    # cedilla
    "Ã§": "ç",
    "Ã": "Ç",
    # diéresis
    "Ã¤": "ä",
    "Ã¶": "ö",
    "Ã¼": "ü",
    "Ã": "Ä",
    "Ã": "Ö",
    "Ã": "Ü",
    # comillas tipograficas (cp1252)
    "â": "“",  # "
    "â": "”",  # "
    "â": "‘",  # '
    "â": "’",  # '
    # guiones
    "â": "–",  # en-dash
    "â": "—",  # em-dash
    # simbolos frecuentes
    "Â©": "©",  # (c)
    "Â®": "®",  # (r)
    "Â°": "°",  # grado
    "Â·": "·",  # punto medio
    "Âº": "º",  # ordinal masculino
    "Âª": "ª",  # ordinal femenino
}


def fix_mojibake(text):
    """
    Corrige mojibake en un string.
    1. Si no hay patrones sospechosos, devuelve tal cual.
    2. Intenta ftfy si esta instalado.
    3. Intenta re-encode latin-1 -> utf-8.
    4. Aplica tabla de reemplazos manuales.
    """
    if not isinstance(text, str):
        return text

    # Heuristico: si no hay caracteres sospechosos, devolver tal cual
    if "Ã" not in text and "Ã" not in text and "â€" not in text and "Â" not in text:
        return text

    # Estrategia 1: ftfy
    if USE_FTFY:
        return ftfy.fix_text(text)

    # Estrategia 2: re-encode latin-1 -> utf-8
    try:
        return text.encode("latin-1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        pass

    # Estrategia 3: tabla manual
    for bad, good in MOJIBAKE.items():
        text = text.replace(bad, good)
    return text


def fix_value(value):
    """Recorre recursivamente el JSON y corrige todos los strings."""
    if isinstance(value, str):
        return fix_mojibake(value)
    if isinstance(value, list):
        return [fix_value(v) for v in value]
    if isinstance(value, dict):
        return {k: fix_value(v) for k, v in value.items()}
    return value


def process_file(json_path):
    """Lee, corrige y devuelve el JSON limpio."""
    raw = json_path.read_text(encoding="utf-8", errors="replace")
    data = json.loads(raw)
    return fix_value(data)


def contar_mojibake(text):
    """Cuenta ocurrencias de patrones sospechosos en el texto."""
    return text.count("Ã") + text.count("â€") + text.count("Â")


def main():
    base = Path(__file__).parent / "output"
    if not base.exists():
        print("[ERROR] No se encontro la carpeta: {}".format(base))
        sys.exit(1)

    archivos = sorted(base.rglob("contenido.json"))
    if not archivos:
        print("[ERROR] No se encontraron archivos contenido.json en output/")
        sys.exit(1)

    print("Encontrados {} archivo(s) contenido.json\n".format(len(archivos)))

    fixed_all = []
    correcciones_total = 0

    for path in archivos:
        raw = path.read_text(encoding="utf-8", errors="replace")
        n_problemas = contar_mojibake(raw)

        data_fixed = process_file(path)
        fixed_all.append((path, data_fixed))

        if n_problemas:
            estado = "[FIX] {} patrones".format(n_problemas)
        else:
            estado = "[ OK]"
        print("  {}  {}".format(estado, path.relative_to(base.parent)))
        correcciones_total += n_problemas

    separador = "-" * 60
    print("\n" + separador)
    print("Total correcciones detectadas: {}".format(correcciones_total))
    print(separador + "\n")

    # -- Mostrar las 3 primeras paginas del primer JSON -----------------------
    primer_path, primer_data = fixed_all[0]
    print("Primeras 3 paginas de: {}\n".format(primer_path.parent.name))

    paginas = primer_data.get("paginas", [])
    for i, pagina in enumerate(paginas[:3], start=1):
        texto = pagina.get("texto", "").strip()
        tema  = pagina.get("tema") or "sin tema"
        num   = pagina.get("pagina_pdf", "?")
        print("  -- Pagina {} (pdf p.{}) | Tema: {}".format(i, num, tema))
        preview = texto[:400]
        if len(texto) > 400:
            preview += "..."
        print("  " + preview.replace("\n", "\n  "))
        print()

    # -- Preguntar si sobreescribir los JSON corregidos -----------------------
    if correcciones_total > 0:
        try:
            respuesta = input("Sobreescribir los JSON corregidos? [s/N]: ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            respuesta = "n"
        if respuesta == "s":
            for path, data in fixed_all:
                path.write_text(
                    json.dumps(data, ensure_ascii=False, indent=2),
                    encoding="utf-8"
                )
            print("Archivos sobreescritos con encoding correcto.")
        else:
            print("Los archivos originales no fueron modificados.")
    else:
        print("No se detecto mojibake. Los archivos estan limpios.")


if __name__ == "__main__":
    main()
