# Bitácora del proyecto «Sabores de mi provincia»

Registro de sesiones de trabajo con Claude Code. Sirve como declaración del uso de inteligencia artificial que exige la guía didáctica del módulo de titulación: muestra qué hizo la herramienta y qué decidió el autor.

## Estado actual
- **Etapa:** 0 terminada. Etapa 1 con primer diseño construido y verificado, **pendiente de revisión y aprobación de la persona responsable**.
- **Próxima tarea:** Etapa 2 (21–27 nov): ficha de receta, modo cocina, buscador y filtros. Empezar solo después de aprobar el diseño de la etapa 1.
- **Pendientes de la persona:**
  1. Ver el sitio y responder las 5 preguntas de diseño (ver abajo).
  2. Carril de contenido: contactar validadores y portadores; preparar el consentimiento; primeras entrevistas. Meta del 27 de noviembre: **10 recetas completas** entregadas.
  3. Decidir dónde vivirá la carpeta del proyecto (ver «Observaciones técnicas»).
  4. Compartir el cronograma oficial del tutor.

---

## Sesión 2026-11-10

**Lo que pidió el autor**
- Terminar la etapa 0 y avanzar la etapa 1 hasta tener un primer diseño visible en teléfono y computadora.
- Explicar todo en lenguaje sencillo; no cambiar las decisiones de la skill sin consultar; no inventar recetas; avisar «Contenido de ejemplo»; pedir confirmación antes de borrar o publicar (hoy no se publica).

**Lo que hizo Claude Code**
- *Etapa 0:* revisó la carpeta (vacía; faltaban Git y Node), creó la estructura de `references/arquitectura-y-datos.md`, copió la skill a `.claude/skills/` y los datos semilla a `data/`, creó `README.md`, esta bitácora y `.gitignore`, e inició el control de versiones.
- *Etapa 1:* paleta y tipografía de `references/diseno-y-accesibilidad.md` como tokens CSS (con modo oscuro); cabecera con nombre y subtítulo, navegación, pie y selector ES/EN; portada (propuesta de valor, acceso por cantón, recomendador «Próximamente», 4 recetas destacadas); catálogo de las 20 recetas agrupadas por los 16 cantones con insignias «En revisión», «Contenido de ejemplo» e «Imagen provisional»; ilustraciones sencillas en lugar de fotos; páginas «Próximamente» para Recomendador y Acerca (para que ningún enlace quede roto). Textos de interfaz en `data/i18n/es.json` y `en.json`; las traducciones al inglés las redactó Claude Code y **no están revisadas por la persona**.
- *Herramientas propias:* `herramientas/servidor.py` (ver el sitio), `verificar-datos.py` (esquema de los datos), `contraste.py` (contrastes de la paleta), `auditoria-contraste.js` y `auditoria-estructura.js` (revisiones sobre la página abierta).
- No inventó ninguna receta: las 20 recetas son la semilla de la skill, sin ingredientes, cantidades, pasos ni historia, todas marcadas `contenido_ejemplo: true`.

**Decisiones del autor**
- Instalar Git en el computador (aceptado). Nada más fue decidido todavía: el resto de las decisiones de diseño espera su opinión.

**Decisiones de Claude Code que la persona debe conocer (reversibles)**
- La verificación de datos se escribió en **Python** (no en Node como pedía la skill) porque Node no está instalado.
- Las **recetas destacadas** de la portada (repe lojano, humitas de maíz, miel con quesillo, cuy asado con papas) están fijadas en `assets/js/portada.js`, no en los datos, para no cambiar el esquema de `recetas.json`.
- Las tarjetas **aún no son enlaces**: la ficha de receta es de la etapa 2.
- Se quitó el desplazamiento suave de la página (movimiento innecesario y dificultaba comprobar el foco).
- Identidad de Git del repositorio: marcador local `autor@sabores.local`, para no exponer ningún correo; se puede cambiar antes de publicar.

**Verificación realizada** (detalle en `evidencias/accesibilidad/etapa1-verificacion.md`)
- Portada y catálogo revisados a 360 px y a 1280 px (capturas en `evidencias/capturas/`), en modo claro y oscuro.
- Contraste de cada texto renderizado: 0 fallos en las 4 páginas, claro y oscuro (mínimo 5.18:1 en claro y 7:1 en oscuro). Paleta: `contraste.py` sin fallos.
- Estructura: un solo h1, títulos sin saltos, zonas completas, sin enlaces rotos, sin desborde a 320 px. Objetivos táctiles ≥ 24 px.
- Teclado: orden lógico, sin trampas, foco visible y nunca tapado. Selector de idioma, salto al contenido y enlace directo a un cantón funcionan.
- Problemas hallados y corregidos: foco azul invisible en el pie; texto claro sobre maíz en modo oscuro; desplazamiento suave; catálogo demasiado largo en computadora; cuarta destacada sola; letra de la insignia «Próximamente».
- **Sin hacer todavía:** Lighthouse, axe/WAVE, lector de pantalla (NVDA/TalkBack), teléfono real, zoom 200 %. Corresponden a la etapa 4; no se afirma que el sitio ya cumpla WCAG 2.2 AA en su totalidad.

**Observaciones técnicas**
- La carpeta actual está dentro de una ruta muy larga (carpeta temporal de la aplicación). Windows limita las rutas a 260 caracteres; se activó `core.longpaths` en Git para este repositorio. Conviene mover el proyecto a una ruta corta (por ejemplo `C:\proyectos\sabores-de-mi-provincia`) antes de seguir y antes de publicar.
- Las tipografías se cargan desde Google Fonts: sin internet se ven letras de reemplazo.
- El panel del navegador integrado fallaba al capturar con la ventana oculta; las capturas se hicieron con Microsoft Edge sin ventana.

**Guardado (commit)**
- Punto 1: «Etapa 0: estructura, skill, datos semilla, README y bitácora»
- Punto 2: «Etapa 1: primer diseño (portada, catálogo por cantón, idioma, accesibilidad)»

**Publicación (adelantada por decisión de la persona)**
- El proyecto se trasladó a una carpeta de Google Drive y se subió a https://github.com/juanp4105/sabores-de-mi-provincia (repositorio público).
- GitHub Pages activado desde `main`, carpeta raíz. Dirección: https://juanp4105.github.io/sabores-de-mi-provincia/
- Comprobado en línea: portada y catálogo cargan (20 recetas, 16 cantones). Todo sigue marcado «Contenido de ejemplo».
- Nota: la guía pedía publicar tras la auditoría de la etapa 4; aquí se publica antes para poder revisar el diseño en vivo. No hay recetas reales ni datos personales en el sitio.

**Pendiente para la próxima sesión**
- Recoger las respuestas de la persona sobre el diseño y aplicarlas.
- Mover el proyecto a una ruta corta (con confirmación).
- Cuando la persona apruebe la etapa 1: iniciar la etapa 2.

---

## Sesión 2026-11-11

**Lo que pidió el autor**
- Cambiar el plato típico de Gonzanamá a «Sango con huevo frito» y el de Espíndola a «Yuca cuadrada».
- Colocar las fotos de Loja (5) y de otros cantones: chanfaina (Celica), yuca cuadrada (Espíndola), sango con huevo frito (Gonzanamá), molloco (Chaguarpamba), madre olla (Calvas) y cecina (Catamayo).
- Quitar la insignia «Imagen provisional» en las recetas con foto.
- Preparar una presentación y una rúbrica de calificación para el focus group (archivos locales: no se publican).

**Lo que hizo Claude Code**
- Renombró las dos recetas (ids `sango-con-huevo-frito` y `yuca-cuadrada`), con nombre en inglés propuesto y sin revisar.
- Copió 11 fotos a `assets/img/recetas/` con texto alternativo en español e inglés, y las conectó a los datos.
- Publicó el proyecto en GitHub Pages y registró su dirección en el README (sesión anterior).

**Decisiones del autor**
- Los dos platos nuevos reemplazan a «Arveja con guineo» y «Achiras con queso».
- Las recetas con foto no llevan la insignia «Imagen provisional» (9 recetas siguen con ilustración y esa insignia).

**Pendientes**
- **Fuentes:** las fuentes anteriores respaldaban los platos reemplazados, por lo que Sango con huevo frito y Yuca cuadrada quedaron como «fuente por confirmar». Necesitan una fuente real.
- **Fotos:** falta registrar el origen, el autor y la licencia de las 11 imágenes. Antes de usarlas como fotos reales de la receta, confirmar si son fotografías o imágenes generadas con IA, y declararlo.
- **Clasificación:** el tipo y la ocasión de los dos platos nuevos (desayuno y plato fuerte) son propuestas por confirmar con los validadores.
- La semilla original dentro de `.claude/skills/` aún lista los platos anteriores; la fuente vigente es `data/recetas.json`.
