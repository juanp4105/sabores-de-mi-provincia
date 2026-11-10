# Recomendador y asistente guiado

Ambos deben poder explicarse en dos minutos ante un tribunal de gestión empresarial. La claridad pesa más que la sofisticación.

## Qué es la «IA» de la fase 1
Un **sistema de recomendación basado en contenido**, una técnica clásica de los sistemas de recomendación. Compara lo que el usuario declara (ingredientes que tiene, cantón que le interesa, ocasión, tiempo disponible) con los atributos de cada receta, calcula una puntuación y explica el resultado.

Se eligió esta técnica, y no un modelo de lenguaje, por cuatro razones que la página «Acerca» debe exponer:
1. Funciona en el navegador, sin servidor ni costo, lo que encaja con GitHub Pages.
2. Es explicable: cada sugerencia dice por qué aparece.
3. No inventa: solo recomienda recetas que existen en el corpus validado.
4. Resuelve el problema del arranque en frío: no necesita historial de otros usuarios porque parte de las preferencias declaradas.

Descríbelo con honestidad. No lo llames «aprendizaje automático» ni «red neuronal»: no lo es.

## Entradas del usuario
- **Ingredientes que tiene a mano:** selección múltiple a partir del vocabulario de `clave` de ingredientes del corpus, con buscador.
- **Cantón de interés:** opcional.
- **Ocasión:** opcional (desayuno, almuerzo, fiesta…).
- **Tiempo máximo:** opcional.
- **Nivel:** opcional (fácil, media, difícil).

Las preferencias se guardan en el dispositivo (ver `preferencias.js`) para precargar el formulario la próxima vez.

## Algoritmo

Para cada receta `r` que tenga ingredientes cargados (las que aún no los tienen quedan fuera del cálculo, y la interfaz lo indica: «Esta receta todavía no participa en las recomendaciones»):

1. **Filtros duros:** si el usuario fijó tiempo máximo y `r.tiempo_min` lo supera, o fijó nivel y `r.dificultad` es mayor, la receta se descarta.
2. **Cobertura de ingredientes:**
   - `I_r` = claves de ingredientes de `r`.
   - Por cada clave de `I_r`: vale **1** si el usuario la tiene; **0.6** si tiene uno de sus sustitutos; **0** si no.
   - `cobertura = suma / |I_r|` (entre 0 y 1).
3. **Afinidad de contexto:**
   - `+0.15` si el cantón coincide.
   - `+0.10` si alguna ocasión coincide.
4. **Puntuación:** `puntaje = 0.75 × cobertura + afinidad`.
5. Ordena de mayor a menor y muestra las **3 mejores**. Si ninguna supera 0.3, dilo con claridad y sugiere las recetas que más se acercan, indicando qué falta.

Ajusta los pesos solo con el acuerdo de la persona, y documenta cualquier cambio en la bitácora.

## Explicación de cada resultado

Cada recomendación muestra, en lenguaje llano:
- «Tienes 5 de 7 ingredientes.»
- «Puedes reemplazar el quesillo por queso fresco.»
- «Te falta: maní tostado.»
- «Es del cantón que elegiste» o «Es ideal para el desayuno».

La explicación es la parte más importante: convierte el algoritmo en algo que el usuario entiende y en lo que confía.

## Recetas similares (en la ficha)
Al pie de cada ficha, muestra 3 recetas similares. Calcula la similitud de Jaccard entre conjuntos de atributos (claves de ingredientes, tipo, ocasiones) y excluye la propia receta.

## Pruebas del recomendador
Crea `herramientas/probar-recomendador.mjs` con al menos cinco casos:
1. Con todos los ingredientes de una receta, esa receta sale primera.
2. Con un sustituto en lugar del original, la receta sigue apareciendo y la explicación lo menciona.
3. Un tiempo máximo bajo descarta las recetas largas.
4. Sin ingredientes en común, el sistema lo dice y no muestra resultados engañosos.
5. Mismo puntaje → el orden es estable (desempate por nombre).

Ejecuta las pruebas cada vez que cambien el algoritmo o los datos.

## Asistente guiado (fase 1)

No es un chat libre. Es una conversación guiada por botones que responde solo con datos del corpus:

1. «¿Sobre qué receta quieres preguntar?» → lista o buscador.
2. Preguntas disponibles para esa receta, generadas a partir de los campos que tengan contenido:
   - ¿Con qué puedo reemplazar un ingrediente? → `sustitutos`
   - ¿De dónde viene este plato? → `historia`, `canton`
   - ¿Cuánto tiempo toma y qué tan difícil es? → `tiempo_min`, `dificultad`
   - ¿Tiene alérgenos? → `alergenos`
   - ¿Dónde puedo probarlo? → `establecimientos` (rotulados como ficticios)
   - ¿Quién validó esta receta? → `validacion`
3. Cada respuesta termina con «Fuente: [receta], [referencia]».
4. También admite texto libre, pero solo como **búsqueda** en el corpus: si encuentra coincidencias, ofrece las recetas; si no, responde «No tengo esa información en las recetas validadas».

En la interfaz y en «Acerca», rotula: «Asistente guiado (fase 1). La versión conversacional con inteligencia artificial generativa forma parte de la fase 2 del proyecto». Esa transparencia es un argumento a favor ante el tribunal, no una debilidad.

## Fase 2 (solo documentar, no implementar)
Describe en «Acerca» la arquitectura prevista: un servidor intermedio guarda la clave de la API; el modelo responde únicamente con recetas recuperadas del corpus y cita la fuente; presupuesto estimado de hasta USD 20 al mes en la etapa de validación.
