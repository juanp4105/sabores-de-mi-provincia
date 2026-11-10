---
name: sabores-de-mi-provincia
description: "Construye, de principio a fin y por etapas, el prototipo web «Sabores de mi provincia» — plataforma de recetas tradicionales de los 16 cantones de Loja con recomendador basado en contenido, asistente guiado, modo cocina paso a paso, mapa por cantón, fichas de establecimientos ficticios, español e inglés, WCAG 2.2 AA y publicación en GitHub Pages — para el examen complexivo de la Maestría en Gestión Empresarial (EDES UTPL), con entrega antes del 25 de diciembre de 2026. Úsala siempre que se trabaje en este proyecto aunque no se nombre la skill — montar o continuar el sitio, cargar o corregir recetas, el recomendador, el asistente, el mapa, la accesibilidad, las pruebas SUS, la publicación, el cronograma o las evidencias para el tribunal."
---

# Sabores de mi provincia — skill del proyecto

Esta skill guía a Claude Code para construir y entregar el prototipo de la plataforma «Sabores de mi provincia». La persona que dirige el proyecto **no programa**: Claude Code escribe todo el código, y la persona decide, revisa y aprueba. Esa división de trabajo condiciona cómo se trabaja (ver «Cómo trabajar con la persona»).

## Para qué existe el prototipo

El proyecto se evalúa en una **Maestría en Gestión Empresarial**, no en una carrera de informática. El tribunal juzga la propuesta de valor, el modelo de negocio, la viabilidad y la validación con usuarios. El sitio web es el **instrumento de validación** de ese modelo, como la maqueta de una feria inmobiliaria: sirve para comprobar si alguien «compraría el departamento», no para lucir la calidad de los ladrillos.

De ahí salen tres prioridades, en este orden:

1. **Que funcione de verdad y sea honesto.** Lo que se muestra como IA debe hacer lo que dice; lo que es ficticio o de ejemplo debe decirlo en pantalla.
2. **Que sea usable y accesible en un teléfono**, porque se cocina con el teléfono en la mano y así se harán las pruebas SUS.
3. **Que esté a tiempo.** Entrega final antes del 25 de diciembre de 2026; el cronograma apunta a terminar el 18 de diciembre y deja margen.

Antes de cualquier tarea, lee `references/decisiones-proyecto.md`: resume todas las decisiones ya tomadas con la persona. No las reabras salvo que ella lo pida.

## Cómo trabajar con la persona

- **Habla en español claro, sin jerga.** Si un término técnico es inevitable (repositorio, commit, JSON), explícalo en una línea la primera vez.
- **Una etapa a la vez.** Al empezar una sesión, revisa `BITACORA.md` en la raíz del repositorio para saber en qué etapa va el proyecto y qué quedó pendiente. Si no existe, el proyecto está en la etapa 0.
- **Muestra, no describas.** Al terminar algo visible, ábrelo en el navegador (vista previa local) y verifica tú mismo que se ve y funciona antes de decir que está listo. Luego indica a la persona qué mirar y en qué orden.
- **Guarda el avance al cerrar cada tarea**: un commit con un mensaje en español que diga qué cambió («Agrega modo cocina con temporizadores»). Explica que un commit es «un punto de guardado al que siempre se puede volver».
- **Registra cada sesión en `BITACORA.md`** (plantilla en `assets/plantillas/bitacora-ia.md`): fecha, qué se pidió, qué hizo Claude Code, qué decidió la persona. La guía de la maestría exige declarar el uso de IA; esta bitácora es esa evidencia y muestra que las decisiones fueron humanas.
- **Pide confirmación antes de** borrar archivos, cambiar la estructura de datos de recetas, publicar en GitHub Pages por primera vez o cambiar una decisión de `decisiones-proyecto.md`.
- **Nunca pongas claves, contraseñas ni datos personales en el repositorio.** El prototipo no las necesita.

## Reglas de contenido que no se negocian

Estas reglas protegen la credibilidad del proyecto ante el tribunal, que preguntará quién respalda cada receta.

- **No inventes recetas.** Ingredientes, cantidades, pasos e historia salen solo de lo que la persona entregue (entrevistas, bibliografía) o de fuentes que ella apruebe. Si hace falta contenido para probar la interfaz antes de tener las recetas reales, marca la receta con `"contenido_ejemplo": true`; la interfaz debe mostrar entonces un aviso visible «Contenido de ejemplo: no es la receta validada». Retira el aviso solo cuando la persona cargue la receta real.
- **Cada receta muestra su estado de validación** («En revisión» o «Validada por [nombre], [rol]»). El esquema está en `references/arquitectura-y-datos.md`.
- **Cada receta cita su fuente** en formato APA 7 y da crédito al portador del saber cuando hay consentimiento.
- **Los establecimientos son ficticios** hasta que exista autorización escrita. Cada ficha lleva la etiqueta «Ejemplo ficticio» y, si representa un patrocinio, la palabra «Patrocinado». La publicidad sin rotular engaña al usuario y contradice la propuesta de confiabilidad.
- **El asistente no inventa.** Responde solo con datos del corpus y cita la receta de la que sale la respuesta; si no sabe, lo dice.
- **Las traducciones al inglés** las redacta Claude Code y quedan marcadas `"traduccion_revisada": false` hasta que la persona las apruebe.

## Arquitectura en una línea

Sitio estático con HTML, CSS y JavaScript sin frameworks ni paso de compilación, datos en archivos JSON y publicación en GitHub Pages. Así la persona puede abrir cualquier archivo y entenderlo, y no hay nada que instalar ni mantener. Los detalles, la estructura de carpetas y el esquema de datos están en `references/arquitectura-y-datos.md`.

Como GitHub Pages no puede guardar claves de API, **la fase 1 no usa un modelo de lenguaje**. La IA de la fase 1 es el recomendador basado en contenido, que corre en el navegador. El asistente conversacional con modelo de lenguaje pertenece a la fase 2 y debe aparecer así en la interfaz y en la página «Acerca del proyecto».

## Etapas y criterios de aceptación

Las fechas detalladas y el trabajo paralelo de contenido (entrevistas, validación, fotos) están en `references/cronograma.md`. Una etapa termina solo cuando se cumplen sus criterios y la persona la aprueba.

### Etapa 0 — Preparación (10–13 nov)
Crear el repositorio `sabores-de-mi-provincia`, copiar esta skill en `.claude/skills/`, copiar los datos semilla de `assets/data/` a `data/`, crear `README.md` y `BITACORA.md`.
- [ ] El repositorio existe y la persona sabe dónde verlo.
- [ ] `data/recetas.json` tiene las 20 recetas semilla y `data/cantones.json` los 16 cantones.

### Etapa 1 — Base y sistema de diseño (14–20 nov)
Estructura de páginas, hoja de estilos con los tokens de `references/diseno-y-accesibilidad.md`, cabecera, pie, navegación, selector de idioma, portada y catálogo de recetas agrupado por cantón.
- [ ] Portada y catálogo se ven bien a 360 px de ancho y en escritorio.
- [ ] Todo se recorre con teclado y el foco es visible.
- [ ] El cambio a inglés funciona en la interfaz (los textos de receta pueden seguir en español).

### Etapa 2 — Ficha de receta y modo cocina (21–27 nov)
Ficha completa (ingredientes con sustitutos, pasos, historia, fuente, validación, establecimientos), ajuste de porciones, buscador y filtros (cantón, tipo, tiempo, dificultad). Modo cocina: un paso por pantalla en letra grande, lectura en voz alta, temporizadores, pantalla que no se apaga.
- [ ] El modo cocina se usa entero sin tocar la pantalla más de una vez por paso.
- [ ] La voz se puede pausar y detener; los temporizadores solo arrancan cuando la persona los inicia.
- [ ] Los filtros combinados devuelven resultados correctos y anuncian cuántos hay.

### Etapa 3 — Recomendador, asistente, mapa y establecimientos (28 nov–4 dic)
Implementar `references/recomendador-y-asistente.md`, el mapa por cantón con lista equivalente al lado, y las fichas «Dónde probar este plato» con establecimientos ficticios rotulados.
- [ ] Cada recomendación explica por qué se sugiere.
- [ ] El asistente nunca responde algo que no esté en el corpus.
- [ ] El mapa nunca es la única forma de llegar a un cantón.
- [ ] Las preferencias se guardan sin cuenta y sin datos personales.

### Etapa 4 — Contenido real, auditoría y publicación (5–9 dic)
Cargar las recetas reales que la persona entregue, fotos con texto alternativo, auditoría de accesibilidad y rendimiento, página «Acerca del proyecto» (propósito, modelo por fases, cómo funciona el recomendador, fuentes, validación, licencia CC BY-NC-SA, declaración de uso de IA) y publicación en GitHub Pages siguiendo `references/publicacion-github-pages.md`.
- [ ] Lighthouse: Accesibilidad ≥ 95 en todas las páginas; sin errores críticos en axe o WAVE.
- [ ] El sitio publicado abre desde un teléfono con datos móviles.
- [ ] Ninguna receta real queda sin fuente ni estado de validación.

### Etapa 5 — Pruebas con usuarios (10–16 dic)
Apoyar a la persona en las pruebas con 5 a 8 participantes usando `assets/plantillas/guion-prueba-usabilidad.md` y `assets/plantillas/cuestionario-sus.md`. Calcular el puntaje SUS, listar los problemas observados y corregir los de mayor impacto.
- [ ] Hoja de resultados con el SUS de cada participante y el promedio, calculado con código, no a mano.
- [ ] Problemas clasificados por gravedad y los graves corregidos.

### Etapa 6 — Cierre y evidencias (17–18 dic; margen hasta el 22)
Correcciones finales y paquete de evidencias según `references/evidencias-y-validacion.md`: capturas por página, informe de accesibilidad, resultados SUS, historial de versiones, bitácora y guion de demostración de 3 minutos para la defensa.
- [ ] La persona puede recorrer el guion de demostración sin ayuda.
- [ ] Todo está publicado y el repositorio tiene un `README.md` que explica el proyecto a un lector externo.

Si el cronograma se atrasa, recorta en este orden: primero el mapa (deja la lista por cantón), luego la segunda lengua en las recetas (mantén la interfaz bilingüe), luego el ajuste de porciones. **Nunca recortes** la honestidad del contenido, la accesibilidad básica ni las pruebas con usuarios: son lo que el tribunal evalúa.

## Archivos de esta skill

| Archivo | Cuándo leerlo |
|---|---|
| `references/decisiones-proyecto.md` | Siempre, al empezar cualquier tarea |
| `references/cronograma.md` | Al planificar la semana o si hay atraso |
| `references/arquitectura-y-datos.md` | Al crear páginas, scripts o tocar los JSON |
| `references/diseno-y-accesibilidad.md` | Al escribir HTML o CSS y en la auditoría |
| `references/recomendador-y-asistente.md` | En la etapa 3 y al explicar la IA al tribunal |
| `references/evidencias-y-validacion.md` | En las etapas 4 a 6 |
| `references/publicacion-github-pages.md` | Al publicar por primera vez |
| `assets/data/recetas.json` | Datos semilla de las 20 recetas (sin contenido inventado) |
| `assets/data/cantones.json` | Los 16 cantones con coordenadas aproximadas |
| `assets/data/establecimientos.json` | Establecimientos ficticios de ejemplo |
| `assets/plantillas/` | Bitácora, ficha de validación, consentimiento, guion de pruebas y SUS |
