"""Calcula el contraste (WCAG 2.2) de las combinaciones de color del sitio.

Uso:  python herramientas/contraste.py
Sale con código 1 si alguna combinación no cumple el mínimo (así se puede
ejecutar cada vez que se cambie un color).
"""
import sys

sys.stdout.reconfigure(encoding="utf-8")


def luminancia(hex_color):
    h = hex_color.lstrip("#")
    canales = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in canales]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def contraste(a, b):
    la, lb = luminancia(a), luminancia(b)
    claro, oscuro = max(la, lb), min(la, lb)
    return (claro + 0.05) / (oscuro + 0.05)


# Mismos valores que los tokens de assets/css/styles.css
CLARO = {
    "fondo": "#FBF6EC", "superficie": "#FFFFFF", "texto": "#3B2A20",
    "suave": "#6B5444", "primario": "#A4502E", "secundario": "#3F6B3A",
    "acento": "#E8B638", "sobre_acento": "#3B2A20", "sobre_primario": "#FFFFFF",
    "aviso_fondo": "#FFF0C2", "aviso_texto": "#4A3000", "aviso_borde": "#8A5A00",
    "revision_fondo": "#F0E3D2", "revision_texto": "#4D3320",
    "borde": "#8C7664", "foco": "#0B4F9C",
    "pie_fondo": "#3B2A20", "pie_texto": "#FBF6EC", "foco_pie": "#FFD166",
    "ilu_fondo": "#F3DFA0", "ilu_trazo": "#7A3A1F",
    "hero_fondo": "#A4502E", "hero_texto": "#FFFFFF", "mapa_d": "#E8D8C0",
    "ilu_b_fondo": "#DCE8D2", "ilu_b_trazo": "#2F5230",
    "ilu_c_fondo": "#F0D3C4", "ilu_c_trazo": "#7A3A1F",
}
OSCURO = {
    "fondo": "#1E1712", "superficie": "#2A2018", "texto": "#F4EADB",
    "suave": "#CDBCA8", "primario": "#E59A78", "secundario": "#A6D19C",
    "acento": "#E8B638", "sobre_acento": "#3B2A20", "sobre_primario": "#1E1712",
    "aviso_fondo": "#3A2D10", "aviso_texto": "#FFE3A0", "aviso_borde": "#E8B638",
    "revision_fondo": "#3A2C21", "revision_texto": "#F0DCC6",
    "borde": "#9C8672", "foco": "#FFD166",
    "pie_fondo": "#120D0A", "pie_texto": "#F4EADB", "foco_pie": "#FFD166",
    "ilu_fondo": "#4A3A1C", "ilu_trazo": "#F2C88A",
    "hero_fondo": "#7A3A1F", "hero_texto": "#FFF8EE", "mapa_d": "#3F3426",
    "ilu_b_fondo": "#2A3D2A", "ilu_b_trazo": "#BFE0B4",
    "ilu_c_fondo": "#4A2C20", "ilu_c_trazo": "#F2B49A",
}

# (texto, fondo, mínimo, descripción)
PARES = [
    ("texto", "fondo", 4.5, "Texto principal sobre fondo"),
    ("texto", "superficie", 4.5, "Texto en tarjetas"),
    ("suave", "fondo", 4.5, "Texto suave sobre fondo"),
    ("suave", "superficie", 4.5, "Texto suave en tarjetas"),
    ("primario", "fondo", 4.5, "Enlaces/títulos terracota sobre fondo"),
    ("primario", "superficie", 4.5, "Enlaces/títulos terracota en tarjetas"),
    ("secundario", "fondo", 4.5, "Etiqueta de cantón (verde) sobre fondo"),
    ("secundario", "superficie", 4.5, "Etiqueta de cantón (verde) en tarjetas"),
    ("sobre_primario", "primario", 4.5, "Texto de botón sobre terracota"),
    ("aviso_texto", "aviso_fondo", 4.5, "Insignia «Contenido de ejemplo»"),
    ("revision_texto", "revision_fondo", 4.5, "Insignia «En revisión»"),
    ("sobre_acento", "acento", 4.5, "Texto oscuro sobre maíz (insignias decorativas)"),
    ("pie_texto", "pie_fondo", 4.5, "Texto del pie de página"),
    ("hero_texto", "hero_fondo", 4.5, "Texto del encabezado de la portada"),
    ("texto", "ilu_fondo", 4.5, "Nombre de cantón en el mapa (color 1)"),
    ("texto", "ilu_b_fondo", 4.5, "Nombre de cantón en el mapa (color 2)"),
    ("texto", "ilu_c_fondo", 4.5, "Nombre de cantón en el mapa (color 3)"),
    ("texto", "mapa_d", 4.5, "Nombre de cantón en el mapa (color 4)"),
    ("ilu_trazo", "ilu_fondo", 3.0, "Ilustración maíz (gráfico, mínimo 3:1)"),
    ("ilu_b_trazo", "ilu_b_fondo", 3.0, "Ilustración achira (gráfico, mínimo 3:1)"),
    ("ilu_c_trazo", "ilu_c_fondo", 3.0, "Ilustración barro (gráfico, mínimo 3:1)"),
    ("borde", "fondo", 3.0, "Borde de controles sobre fondo (mín. 3:1)"),
    ("borde", "superficie", 3.0, "Borde de controles sobre tarjeta (mín. 3:1)"),
    ("foco", "fondo", 3.0, "Anillo de foco sobre fondo (mín. 3:1)"),
    ("foco", "superficie", 3.0, "Anillo de foco sobre tarjeta (mín. 3:1)"),
    ("foco_pie", "pie_fondo", 3.0, "Anillo de foco sobre el pie (mín. 3:1)"),
    ("aviso_borde", "aviso_fondo", 3.0, "Borde del aviso (mín. 3:1)"),
]


def main():
    fallos = 0
    for nombre, paleta in (("MODO CLARO", CLARO), ("MODO OSCURO", OSCURO)):
        print(f"\n{nombre}")
        for t, f, minimo, desc in PARES:
            r = contraste(paleta[t], paleta[f])
            ok = r >= minimo
            fallos += 0 if ok else 1
            print(f"  {'OK ' if ok else 'FALLA'} {r:5.2f}:1 (mín {minimo})  {desc}  [{paleta[t]} sobre {paleta[f]}]")
    print(f"\nResultado: {'todo cumple WCAG 2.2 AA' if fallos == 0 else str(fallos) + ' combinación(es) no cumplen'}")
    return 1 if fallos else 0


if __name__ == "__main__":
    sys.exit(main())
