# Arquitectura y datos

## Principios
- **Sin frameworks ni compilación.** HTML, CSS y JavaScript nativos (módulos ES). La persona debe poder abrir un archivo y reconocer lo que hace; GitHub Pages sirve los archivos tal cual.
- **Varias páginas, no una aplicación de una sola página.** Cada página tiene su URL, funciona con el botón «atrás» y es más accesible para lectores de pantalla.
- **Los datos viven en JSON** y la interfaz se genera a partir de ellos. Agregar una receta no debe exigir tocar HTML.
- **Dependencias externas mínimas.** Solo Leaflet (mapa) y las fuentes de Google Fonts, cargadas desde CDN.
- **Rutas relativas** en todos los enlaces, porque el sitio vive en una subcarpeta (`/sabores-de-mi-provincia/`) dentro de GitHub Pages.

## Estructura de carpetas

```
sabores-de-mi-provincia/
├── index.html              Portada: propuesta de valor, acceso a cantones, recomendador y recetas destacadas
├── recetas.html            Catálogo agrupado por cantón, buscador y filtros
├── receta.html             Ficha de una receta (?id=repe-lojano) y modo cocina
├── recomendador.html       Formulario de preferencias y resultados explicados
├── asistente.html          Asistente guiado (fase 1)
├── mapa.html               Mapa por cantón con lista equivalente
├── acerca.html             Proyecto, modelo por fases, metodología, fuentes, licencia, declaración de IA
├── assets/
│   ├── css/styles.css      Tokens de diseño y estilos
│   ├── js/
│   │   ├── datos.js        Carga y caché de los JSON
│   │   ├── i18n.js         Cambio de idioma y textos de interfaz
│   │   ├── catalogo.js     Catálogo, buscador y filtros
│   │   ├── receta.js       Ficha y porciones
│   │   ├── modo-cocina.js  Paso a paso, voz, temporizadores, pantalla activa
│   │   ├── recomendador.js Algoritmo y presentación de resultados
│   │   ├── asistente.js    Asistente guiado
│   │   ├── mapa.js         Mapa y lista de cantones
│   │   └── preferencias.js Guardado local seguro (try/catch)
│   └── img/                Fotos (con autor y licencia registrados en recetas.json)
├── data/
│   ├── recetas.json
│   ├── cantones.json
│   ├── establecimientos.json
│   └── i18n/{es,en}.json   Textos de interfaz
├── .claude/skills/sabores-de-mi-provincia/   Esta skill
├── README.md
└── BITACORA.md
```

## Esquema de `recetas.json`

Un objeto con `version`, `actualizado` y la lista `recetas`. Cada receta:

```json
{
  "id": "repe-lojano",
  "nombre": { "es": "Repe lojano", "en": "Loja green banana soup (repe)" },
  "canton": "loja",
  "parroquia": null,
  "tipo": "sopa",
  "ocasiones": ["almuerzo"],
  "descripcion": { "es": "", "en": "" },
  "historia": { "es": "", "en": "" },
  "porciones": 4,
  "tiempo_min": null,
  "dificultad": null,
  "ingredientes": [
    {
      "nombre": { "es": "guineo verde", "en": "green banana" },
      "cantidad": 6,
      "unidad": "unidad",
      "clave": "guineo-verde",
      "sustitutos": [
        { "clave": "platano-verde", "nombre": { "es": "plátano verde", "en": "green plantain" }, "nota": { "es": "", "en": "" } }
      ]
    }
  ],
  "pasos": [
    { "texto": { "es": "", "en": "" }, "temporizador_seg": null }
  ],
  "consejos": [],
  "alergenos": [],
  "imagen": { "src": null, "alt": { "es": "", "en": "" }, "autor": null, "licencia": null, "provisional": true },
  "fuentes": [
    { "tipo": "web", "referencia_apa": "" }
  ],
  "portador": { "nombre": null, "comunidad": null, "consentimiento": false },
  "validacion": { "estado": "pendiente", "revisor": null, "rol": null, "fecha": null },
  "establecimientos": [],
  "contenido_ejemplo": true,
  "traduccion_revisada": false
}
```

Valores permitidos:
- `tipo`: `sopa`, `plato_fuerte`, `desayuno`, `entrada`, `postre`, `bebida`.
- `ocasiones`: `desayuno`, `almuerzo`, `merienda`, `fiesta`, `domingo_familiar`, `festividad_religiosa`.
- `dificultad`: `facil`, `media`, `dificil`.
- `validacion.estado`: `pendiente`, `en_revision`, `validada`.
- `clave` de ingrediente: minúsculas con guiones; es lo que compara el recomendador, así que el mismo ingrediente debe tener siempre la misma clave en todas las recetas.

Reglas de interfaz derivadas del esquema:
- `contenido_ejemplo: true` → aviso visible en la ficha y en la tarjeta del catálogo.
- `imagen.provisional: true` → rótulo «Imagen provisional».
- `validacion.estado` distinto de `validada` → insignia «En revisión».
- `portador.consentimiento: false` → no mostrar el nombre del portador.

Escribe un pequeño script de verificación (`herramientas/verificar-datos.mjs`, ejecutable con Node) que revise que cada receta cumple el esquema, que las claves de ingredientes son coherentes y que los ids de cantón y de establecimiento existen. Ejecútalo cada vez que cambien los datos.

## `cantones.json` y `establecimientos.json`
- **Cantones:** `id`, `nombre`, `cabecera`, `lat`, `lng`, `coordenadas_verificadas`. Las coordenadas de la semilla son **aproximadas**: antes de publicar, verifícalas con una fuente oficial o con OpenStreetMap y cambia `coordenadas_verificadas` a `true`.
- **Establecimientos:** `id`, `nombre`, `canton`, `recetas` (ids), `descripcion`, `ficticio` (siempre `true` en el prototipo), `patrocinado`. La interfaz rotula «Ejemplo ficticio» y, si corresponde, «Patrocinado».

## Funciones del navegador que usa el modo cocina
- **Lectura en voz alta:** Web Speech API (`speechSynthesis`) con voz `es-*` o `en-*` según el idioma. Si el navegador no tiene voces, oculta el botón en vez de fallar.
- **Pantalla activa:** Screen Wake Lock API (`navigator.wakeLock`), con manejo del caso en que no exista.
- **Temporizadores:** se inician solo por acción del usuario; avisan con sonido, vibración (si existe) y un mensaje en una región `aria-live`.
- **Preferencias:** `localStorage` envuelto en `try/catch`; el sitio debe funcionar igual si el almacenamiento falla.

## Verificación local
Para ver el sitio mientras se construye, sirve la carpeta con un servidor local sencillo (por ejemplo `npx serve .` o `python3 -m http.server`) y ábrelo en el navegador. Abrir los HTML con doble clic no sirve, porque el navegador bloquea la carga de los JSON.
