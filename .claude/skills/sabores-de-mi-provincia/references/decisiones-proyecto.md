# Decisiones del proyecto

Decisiones tomadas con la persona responsable el 10 de noviembre de 2026. No las cambies sin que ella lo pida; si una tarea parece exigir cambiar alguna, pregunta primero.

## Marco académico
- **Programa:** Maestría en Gestión Empresarial (MIM), EDES – UTPL. Módulo de titulación, modalidad **examen complexivo**.
- **Tema:** Modelo de negocio digital escalable para la difusión de la gastronomía tradicional lojana: diseño y validación de una plataforma de recetas con recomendación basada en inteligencia artificial dirigida a turistas y a la población ecuatoriana.
- **Línea de investigación:** transformación digital.
- **Tema:** presentado al tutor; aún sin aprobación oficial.
- **Plazo:** todo desarrollado y probado antes del 25 de diciembre de 2026. Defensa a finales de enero de 2027.
- **La guía didáctica exige** transparencia en el uso de IA, originalidad de las ideas y normas APA 7.

## Objetivos (propuestos)
- **General:** Diseñar y validar un modelo de negocio digital escalable, sustentado en una plataforma web de recetas con recomendación basada en inteligencia artificial, para la difusión de la gastronomía tradicional lojana entre turistas y la población ecuatoriana.
- **OE1:** Diagnosticar la oferta digital existente y las necesidades de turistas y jóvenes ecuatorianos respecto del acceso a recetas tradicionales lojanas.
- **OE2:** Diseñar la propuesta de valor y el modelo de negocio por fases, con estructura de costos y escenarios de financiamiento.
- **OE3:** Desarrollar un prototipo web accesible con un corpus de 20 recetas validadas y un sistema de recomendación basado en contenido.
- **OE4:** Evaluar la usabilidad y la aceptación del prototipo mediante pruebas con usuarios (SUS) y entrevistas.

## Producto
- **Nombre:** Sabores de mi provincia (subtítulo sugerido: «Cocina tradicional de Loja, Ecuador»).
- **Público:** turistas nacionales y extranjeros, y ecuatorianos jóvenes, con igual peso. Nivel culinario mixto: las recetas indican su dificultad.
- **Dispositivo principal:** teléfono móvil.
- **Idiomas:** español (principal) e inglés.
- **Cuentas de usuario:** no. Preferencias guardadas solo en el dispositivo.
- **Participación:** solo consulta; los usuarios no suben recetas ni comentan.
- **Funciones imprescindibles:** modo cocina, buscador y filtros, mapa por cantón.
- **Navegación principal:** por cantón.
- **Tono visual:** cálido y tradicional.
- **Accesibilidad:** WCAG 2.2 nivel AA.

## Inteligencia artificial
- **Fase 1 (prototipo):** recomendador basado en contenido que corre en el navegador (variables: ingredientes disponibles y sustitutos; cantón y ocasión), más un **asistente guiado** que responde solo con el corpus.
- **Fase 2 (escalamiento):** asistente conversacional con modelo de lenguaje restringido al corpus, con un servidor intermedio para proteger la clave. Presupuesto previsto: hasta USD 20 al mes. No se implementa en el prototipo.

## Modelo de negocio
- **Fase 1:** uso gratuito, sin ingresos; objetivo: validar la propuesta de valor y construir audiencia.
- **Fase 2:** sostenibilidad con patrocinio de restaurantes y huecas («Dónde probar este plato» en cada receta) y publicidad. El pago de usuarios queda solo como recomendación futura.
- **Aliados previstos:** restaurantes y huecas, sobre todo del cantón Loja.
- **Proyección financiera:** básica (estructura de costos y escenarios de ingreso).
- **Establecimientos en el prototipo:** ficticios y rotulados como tales.

## Contenido
- **20 recetas:** 5 del cantón Loja y 1 por cada uno de los otros 15 cantones (lista en `assets/data/recetas.json`).
- **Fuentes:** combinación de entrevistas a portadores y bibliografía.
- **Validadores:** cocineras tradicionales y docentes de gastronomía, por confirmar.
- **Material visual:** aún no existe; el prototipo usa imágenes provisionales rotuladas hasta tenerlo.
- **Consentimiento:** formato escrito que autorice también el uso en la fase 2.
- **Licencia del contenido:** CC BY-NC-SA 4.0, con crédito a los portadores.

## Validación
- Entrevistas a usuarios potenciales.
- Pruebas de usabilidad con 5 a 8 personas y escala SUS.

## Publicación
- **GitHub Pages**, sin servicio adicional en la fase 1.
- **Dominio:** por decidir; mientras tanto, la dirección gratuita de GitHub Pages.

## Pendientes conocidos
- Cronograma oficial del tutor (la persona lo compartirá).
- Nombres reales de validadores y portadores.
- Recetas completas (ingredientes, cantidades, pasos) de las 20.
