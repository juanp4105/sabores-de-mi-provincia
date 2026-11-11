"""Verifica que los datos del sitio cumplen el esquema de references/arquitectura-y-datos.md.

Uso:  python herramientas/verificar-datos.py
Ejecútelo cada vez que cambien recetas.json, cantones.json o establecimientos.json.
Sale con código 1 si encuentra errores.
(La skill pedía una versión en Node; como Node no está instalado, se escribió en Python.)
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TIPOS = {"sopa", "plato_fuerte", "desayuno", "entrada", "postre", "bebida"}
OCASIONES = {"desayuno", "almuerzo", "merienda", "fiesta", "domingo_familiar", "festividad_religiosa"}
DIFICULTADES = {"facil", "media", "dificil", None}
ESTADOS = {"pendiente", "en_revision", "validada"}
CLAVE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
CAMPOS = ["id", "nombre", "canton", "parroquia", "tipo", "ocasiones", "descripcion", "historia", "porciones",
          "tiempo_min", "dificultad", "ingredientes", "pasos", "consejos", "alergenos", "imagen", "fuentes",
          "portador", "validacion", "establecimientos", "contenido_ejemplo", "traduccion_revisada"]

errores, avisos = [], []


def cargar(ruta):
    with open(os.path.join(RAIZ, ruta), encoding="utf-8") as f:
        return json.load(f)


def error(msg):
    errores.append(msg)


def main():
    recetas = cargar("data/recetas.json")["recetas"]
    cantones = cargar("data/cantones.json")["cantones"]
    establecimientos = cargar("data/establecimientos.json")["establecimientos"]

    ids_canton = [c["id"] for c in cantones]
    ids_est = [e["id"] for e in establecimientos]
    if len(set(ids_canton)) != len(ids_canton):
        error("Hay cantones con id repetido")
    if len(cantones) != 16:
        error(f"Se esperaban 16 cantones y hay {len(cantones)}")
    for c in cantones:
        for campo in ("id", "nombre", "cabecera", "lat", "lng", "coordenadas_verificadas"):
            if campo not in c:
                error(f"Cantón {c.get('id')}: falta «{campo}»")

    for e in establecimientos:
        if e.get("canton") not in ids_canton:
            error(f"Establecimiento {e['id']}: cantón inexistente «{e.get('canton')}»")
        if e.get("ficticio") is not True:
            error(f"Establecimiento {e['id']}: en el prototipo debe ser ficticio: true")
        for rid in e.get("recetas", []):
            if rid not in {r['id'] for r in recetas}:
                error(f"Establecimiento {e['id']}: receta inexistente «{rid}»")

    ids_receta = [r["id"] for r in recetas]
    if len(set(ids_receta)) != len(ids_receta):
        error("Hay recetas con id repetido")
    if len(recetas) != 20:
        error(f"Se esperaban 20 recetas y hay {len(recetas)}")

    por_canton = {}
    nombres_por_clave = {}
    for r in recetas:
        rid = r.get("id", "?")
        for campo in CAMPOS:
            if campo not in r:
                error(f"{rid}: falta el campo «{campo}»")
        if r.get("canton") not in ids_canton:
            error(f"{rid}: cantón inexistente «{r.get('canton')}»")
        por_canton[r.get("canton")] = por_canton.get(r.get("canton"), 0) + 1
        if r.get("tipo") not in TIPOS:
            error(f"{rid}: tipo no permitido «{r.get('tipo')}»")
        for o in r.get("ocasiones", []):
            if o not in OCASIONES:
                error(f"{rid}: ocasión no permitida «{o}»")
        if r.get("dificultad") not in DIFICULTADES:
            error(f"{rid}: dificultad no permitida «{r.get('dificultad')}»")
        if r.get("validacion", {}).get("estado") not in ESTADOS:
            error(f"{rid}: estado de validación no permitido")
        for lengua in ("es", "en"):
            if not r.get("nombre", {}).get(lengua):
                error(f"{rid}: falta el nombre en «{lengua}»")
        if not r.get("fuentes"):
            error(f"{rid}: no tiene fuentes (cada receta debe citar una)")
        for est in r.get("establecimientos", []):
            if est not in ids_est:
                error(f"{rid}: establecimiento inexistente «{est}»")
        if r.get("portador", {}).get("consentimiento") is False and r.get("portador", {}).get("nombre"):
            error(f"{rid}: hay nombre de portador sin consentimiento")
        if r.get("validacion", {}).get("estado") != "validada" and not r.get("contenido_ejemplo") and not r.get("ingredientes"):
            avisos.append(f"{rid}: sin ingredientes y no marcada como contenido de ejemplo")
        for ing in r.get("ingredientes", []):
            clave = ing.get("clave", "")
            if not CLAVE.match(clave):
                error(f"{rid}: clave de ingrediente inválida «{clave}» (minúsculas con guiones)")
            nombre = ing.get("nombre", {}).get("es")
            if clave in nombres_por_clave and nombres_por_clave[clave] != nombre:
                error(f"Clave «{clave}» usada con nombres distintos: «{nombres_por_clave[clave]}» y «{nombre}»")
            nombres_por_clave.setdefault(clave, nombre)

    if por_canton.get("loja") != 5:
        error(f"Loja debe tener 5 recetas y tiene {por_canton.get('loja', 0)}")
    for cid in ids_canton:
        if cid != "loja" and por_canton.get(cid) != 1:
            error(f"{cid} debe tener 1 receta y tiene {por_canton.get(cid, 0)}")

    # Mapa: cada cantón debe tener su contorno, y cada contorno su cantón
    mapa = cargar("data/cantones-mapa.json")["cantones"]
    ids_mapa = {c["id"] for c in mapa}
    for cid in ids_canton:
        if cid not in ids_mapa:
            error(f"Mapa: falta el contorno del cantón «{cid}»")
    for cid in ids_mapa - set(ids_canton):
        error(f"Mapa: hay un contorno sin cantón «{cid}»")

    # Textos de interfaz: mismas claves en español e inglés
    es, en = cargar("data/i18n/es.json"), cargar("data/i18n/en.json")
    for k in sorted(set(es) ^ set(en)):
        error(f"i18n: la clave «{k}» no está en ambos idiomas")

    print(f"Recetas: {len(recetas)} · Cantones: {len(cantones)} · Establecimientos: {len(establecimientos)} · Textos de interfaz: {len(es)}")
    for a in avisos:
        print("  aviso:", a)
    if errores:
        print(f"\n{len(errores)} ERROR(ES):")
        for e in errores:
            print("  ✗", e)
        return 1
    print("\nTodo correcto: los datos cumplen el esquema.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
