# Evidencias y validación

El tribunal evaluará el proyecto con las herramientas de la guía didáctica: árbol de problemas, propuesta de valor, prototipo, métricas de validación y pitch. Esta lista indica qué evidencia produce el prototipo para cada uno y dónde guardarla en el repositorio.

## Carpeta `evidencias/`

```
evidencias/
├── capturas/            Una captura por página en teléfono y escritorio (etapa 4 y 6)
├── accesibilidad/       Informes de Lighthouse, axe o WAVE y notas del recorrido con teclado
├── validacion-recetas/  Fichas de validación firmadas (escaneadas) — NO subir datos personales sensibles
├── pruebas-usuarios/    Resultados SUS anonimizados, problemas observados y correcciones
└── demostracion/        Guion de la demostración de 3 minutos
```

**Datos personales.** Los consentimientos firmados y los datos de contacto de participantes **no se suben al repositorio**, porque el repositorio publicado es público. La persona los guarda fuera de él. En el repositorio solo van códigos de participante (P1, P2…) y resultados anonimizados.

## Validación de recetas
- Cada receta real pasa por una ficha de validación (`assets/plantillas/ficha-validacion-receta.md`) que firma un validador.
- Al recibir la ficha firmada, actualiza en `recetas.json`: `validacion.estado = "validada"`, `revisor`, `rol` y `fecha`.
- Si el validador pide cambios, la receta queda `en_revision` hasta corregirlos.

## Pruebas de usabilidad (etapa 5)
1. **Participantes:** 5 a 8, mezclando turistas o personas de fuera de Loja con jóvenes ecuatorianos.
2. **Consentimiento** para la prueba, firmado antes de empezar (`assets/plantillas/consentimiento-informado.md`).
3. **Tareas** del guion (`assets/plantillas/guion-prueba-usabilidad.md`), observadas sin ayudar.
4. **Cuestionario SUS** al final (`assets/plantillas/cuestionario-sus.md`).
5. **Entrevista breve** sobre la propuesta de valor: ¿la usaría?, ¿qué le falta?, ¿confía en las recetas?

### Cálculo del SUS
Calcúlalo con código (`herramientas/calcular-sus.mjs` o una hoja de cálculo con fórmulas), nunca a mano:
- Ítems impares (1, 3, 5, 7, 9): aporte = respuesta − 1.
- Ítems pares (2, 4, 6, 8, 10): aporte = 5 − respuesta.
- Puntaje = suma de aportes × 2.5 (rango 0 a 100).
- Informa el puntaje de cada participante, el promedio y la desviación estándar.
- Referencia para interpretar: un SUS cercano a 68 suele considerarse el promedio en estudios de usabilidad. Presenta la cifra como orientación, no como aprobado o reprobado, y cita la fuente que use la persona en su marco teórico.

Con 5 a 8 participantes, el resultado es exploratorio. Dilo así en el informe: es una limitación honesta, no un defecto.

## Métricas para el modelo de negocio
El prototipo puede registrar, **sin datos personales y solo en el dispositivo**, contadores útiles para la demostración (recetas abiertas, uso del modo cocina, uso del recomendador). No envíes estos datos a ningún servidor en la fase 1. Si la persona quiere métricas reales de visitas, pregúntale antes de agregar cualquier herramienta de analítica y explica sus implicaciones de privacidad.

## Declaración de uso de IA
La página «Acerca» y el `README.md` incluyen un párrafo como este, que la persona debe revisar y ajustar:

> El código de este prototipo fue escrito con asistencia de Claude Code (Anthropic) a partir de decisiones de diseño, contenido y validación tomadas por el autor. Las recetas provienen de fuentes documentadas y de portadores del saber, y fueron revisadas por validadores identificados en cada ficha. El registro completo de sesiones está en BITACORA.md.

## Guion de demostración (3 minutos, para la defensa)
1. **Problema** (20 s): información dispersa y sin validar sobre la cocina lojana.
2. **Recorrido por cantón** (30 s): portada → mapa o lista → un cantón → su receta.
3. **Ficha y validación** (30 s): fuente, validador, sustitutos.
4. **Modo cocina** (40 s): paso a paso con voz y temporizador desde el teléfono.
5. **Recomendador** (40 s): ingredientes disponibles → sugerencias con su explicación.
6. **Modelo de negocio** (20 s): ficha «Dónde probar este plato» (rotulada como ejemplo) como base de la fase 2.

Ensáyalo con la persona en la etapa 6 hasta que lo haga sola y sin pasos en falso.

## Fuentes de las atribuciones de la semilla
Verificar el formato APA final antes de publicar.

- Prefectura de Loja. (s.f.). *Gastronomía de nuestros cantones*. https://prefecturaloja.gob.ec/turismo/gastronomia-de-nuestros-cantones/
- GAD Municipal de Celica. (s.f.). *Datos turísticos*. https://gadcelica.gob.ec/datos-turisticos/
- GAD Municipal del Cantón Macará. (s.f.). *Nuestra gastronomía, nuestra tierra*. https://www.municipiomacara.gob.ec/gadmacara/108-cat-macara/cat-macara-turismo/cat-macara-turismo-gastronomia
- La Hora. (s.f.). *La gastronomía de Saraguro una de las más apetecidas por extranjeros*. https://lahora.com.ec/loja/noticia/1102311205/la-gastronomia-de-saraguro-una-de-las-mas-apetecidas-por-extranjeros-
- Vizhco Vizhco, E. M., y Sacta Caguana, A. D. (2022). *Guía gastronómica de los platos tradicionales de la provincia de Loja* [Trabajo de titulación, Universidad de Cuenca]. http://dspace.ucuenca.edu.ec/handle/123456789/40212
- Lima Campoverde, L. A. (2017). *Estudio gastronómico del cantón Loja, recopilación de recetas tradicionales y ruta gastronómica* [Trabajo de titulación, Universidad Internacional del Ecuador]. https://repositorio.uide.edu.ec/handle/37000/1896

## Antecedentes y competidores (para el marco del proyecto)
- Orígenes Ecuador (origenesecuador.com): recetas documentadas con portador, comunidad y cantón.
- Prefectura de Loja: un plato por cantón, descriptivo.
- Goraymi y Laylita: portales y blogs con comida típica lojana.
- Bravo Pinto, J. N. (2023). Diseño centrado en el usuario de una guía turística digital de los principales platos típicos de la ciudad de Loja [Trabajo de titulación, Universidad Nacional de Loja]. https://dspace.unl.edu.ec/jspui/handle/123456789/26235
- Recetario ilustrado sobre gastronomía lojana para su difusión en plataformas digitales (UTPL, 2023). https://dspace.utpl.edu.ec/handle/123456789/33824
