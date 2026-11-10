# Verificación de la etapa 1 (10 de noviembre de 2026)

Páginas revisadas: `index.html`, `recetas.html`, `recomendador.html`, `acerca.html`.
Servidor local: `python herramientas/servidor.py` (http://localhost:8080). Navegador: panel integrado de Claude (Chromium) y Microsoft Edge para las capturas.

## Resultados

| Comprobación | Cómo se hizo | Resultado |
|---|---|---|
| Contraste de la paleta (claro y oscuro) | `herramientas/contraste.py` | Todas las combinaciones cumplen (informe: `contraste-paleta.txt`) |
| Contraste real de cada texto, modo claro, 360 px | `herramientas/auditoria-contraste.js` | Portada 85 textos, catálogo 205, «Próximamente» 19 + 19. Mínimo 5.18:1. **0 fallos** |
| Contraste real de cada texto, modo oscuro, 360 px | ídem | Mismas páginas. Mínimo 7:1. **0 fallos** |
| Estructura: un solo h1, títulos sin saltos, zonas, nombres de enlaces, ids, imágenes, enlaces internos | `herramientas/auditoria-estructura.js` | Las 4 páginas sin hallazgos |
| Reorganización a 320 px sin desplazamiento horizontal (1.4.10) | Misma auditoría a 320 px | Cumple en las 4 páginas |
| Sin desplazamiento horizontal a 360 y 1280 px | Medición de `scrollWidth` | Cumple |
| Objetivos táctiles ≥ 24 × 24 px (2.5.8) | Misma auditoría | Ninguno menor; botones y enlaces principales ≥ 44 px |
| Recorrido con teclado | Tecla Tab real y lectura del foco | Orden lógico: saltar al contenido → marca → idioma → navegación → contenido → pie; vuelve al inicio sin trampas |
| Foco visible (2.4.7) | Estilo calculado del foco en cada elemento | Contorno sólido de 3 px en todos; color distinto en el encabezado terracota y en el pie |
| Foco no tapado (2.4.11) | Búsqueda de elementos fijos y prueba de enfocar elementos lejanos | No hay elementos fijos ni pegajosos; el foco siempre queda a la vista |
| Selector de idioma | Clic en «EN» y lectura de la página | Cambia `lang`, título, navegación, nombres, tipos, insignias y conteos; anuncia el cambio; recuerda la elección |
| Enlace directo a un cantón y «Saltar al contenido» | Prueba con `recetas.html#canton-zapotillo` | Cumple; el foco pasa al título del cantón / al contenido |

## Problemas encontrados y corregidos durante la verificación
1. Anillo de foco azul invisible sobre el pie oscuro (1.7:1) → foco amarillo claro dentro del pie.
2. Texto sobre el amarillo maíz en modo oscuro tomaba el color claro (1.6:1) → texto siempre oscuro sobre maíz.
3. El desplazamiento suave (`scroll-behavior: smooth`) impedía comprobar el foco y es movimiento innecesario → eliminado.
4. Catálogo de computadora muy largo (9 412 px) por una tarjeta por cantón → cantones con una receta en 3 columnas (5 132 px).
5. Cuarta receta destacada quedaba sola en una segunda fila → 4 columnas en pantallas grandes.
6. La insignia «Próximamente» heredaba la letra serif del título → usa la letra de texto.

## Lo que NO se ha hecho todavía (queda para la etapa 4)
- Lighthouse, axe DevTools o WAVE (la meta es Accesibilidad ≥ 95 en todas las páginas).
- Prueba con lector de pantalla (NVDA o TalkBack).
- Prueba en un teléfono real y con zoom del navegador al 200 %.
- Las capturas en `../capturas/` son de Edge sin ventana; la tipografía se carga desde Google Fonts.
