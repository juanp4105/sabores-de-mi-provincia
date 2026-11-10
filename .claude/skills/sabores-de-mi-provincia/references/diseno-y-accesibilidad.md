# Diseño y accesibilidad

## Concepto visual
Cálido y tradicional. Los colores salen de la propia cocina lojana: el barro del tiesto, la hoja de achira que envuelve tamales y humitas, el maíz, el café tostado y el quesillo. El objetivo es que el sitio se sienta como una cocina familiar, no como un folleto turístico.

## Tokens de color

Defínelos como variables en `:root` y úsalos siempre por su nombre.

| Token | Valor | Uso |
|---|---|---|
| `--color-fondo` | `#FBF6EC` (crema quesillo) | Fondo general |
| `--color-superficie` | `#FFFFFF` | Tarjetas |
| `--color-texto` | `#3B2A20` (café tostado) | Texto principal |
| `--color-texto-suave` | `#6B5444` | Texto secundario (verificar contraste ≥ 4.5:1) |
| `--color-primario` | `#A4502E` (terracota) | Botones, títulos, enlaces destacados |
| `--color-secundario` | `#3F6B3A` (verde achira) | Etiquetas de cantón, enlaces |
| `--color-acento` | `#E8B638` (maíz) | Solo decoración y fondos de insignias con texto oscuro. **Nunca como color de texto** |
| `--color-aviso` | Por definir con contraste AA | Avisos de contenido de ejemplo |

Contrastes calculados sobre `--color-fondo` (10 nov 2026): texto 12.7:1, texto suave 6.6:1, primario 5.2:1, secundario 5.8:1, acento 1.7:1 (por eso nunca va como texto); blanco sobre primario 5.6:1. Recalcula si cambias algún valor.

Antes de dar por buena cualquier combinación de texto y fondo, calcula su contraste con un script y registra los resultados en la bitácora. Mínimos: 4.5:1 para texto normal, 3:1 para texto grande y para bordes de controles.

Incluye un modo oscuro con `prefers-color-scheme: dark` que conserve los mismos contrastes mínimos.

## Tipografía
- **Títulos:** Fraunces (Google Fonts), serif de carácter artesanal.
- **Texto:** Atkinson Hyperlegible (Google Fonts), diseñada para lectores con baja visión. Argumento útil ante el tribunal.
- Tamaño base de 18 px en móvil; en el modo cocina, los pasos a 28 px o más.
- Usa `rem` para que el texto crezca con la configuración del navegador.

## Componentes clave
- **Tarjeta de receta:** foto (o imagen provisional rotulada), nombre, cantón, tipo, tiempo, dificultad, insignia de validación.
- **Insignias:** «En revisión», «Validada», «Contenido de ejemplo», «Imagen provisional», «Ejemplo ficticio», «Patrocinado». Siempre con texto, nunca solo color.
- **Modo cocina:** pantalla completa, un paso por vista, botones grandes «Anterior», «Siguiente», «Leer en voz alta», «Iniciar temporizador», indicador «Paso 3 de 8».

## Lista de verificación WCAG 2.2 AA

Revisa cada página contra esta lista en la etapa 4 y cada vez que se agregue un componente.

**Perceptible**
- [ ] Toda imagen informativa tiene texto alternativo útil; las decorativas, `alt=""`.
- [ ] Contraste de texto ≥ 4.5:1 (≥ 3:1 en texto grande); controles e íconos ≥ 3:1.
- [ ] La información nunca depende solo del color.
- [ ] El contenido se reorganiza sin desplazamiento horizontal a 320 px de ancho y con zoom al 200 %.
- [ ] `lang="es"` o `lang="en"` en `<html>`, y `lang` en fragmentos de otro idioma.

**Operable**
- [ ] Todo funciona con teclado; el orden del foco sigue el orden visual.
- [ ] Foco visible y no tapado por cabeceras fijas (2.4.11).
- [ ] Enlace «Saltar al contenido» al inicio de cada página.
- [ ] Objetivos táctiles de al menos 24 × 24 px (2.5.8); en el modo cocina, 48 × 48 px.
- [ ] Nada se mueve, parpadea ni arranca solo; se respeta `prefers-reduced-motion`.
- [ ] Temporizadores y voz controlables: el usuario los inicia, pausa y detiene.
- [ ] Títulos de página únicos y descriptivos.

**Comprensible**
- [ ] Cada campo de formulario tiene etiqueta visible y asociada.
- [ ] Los errores se describen en texto y explican cómo corregirlos.
- [ ] Navegación idéntica en todas las páginas.
- [ ] Lenguaje claro; términos locales («gualo», «achira», «quesillo») explicados la primera vez.

**Robusto**
- [ ] HTML semántico: `header`, `nav`, `main`, `footer`, encabezados en orden.
- [ ] Los cambios dinámicos (resultados de filtros, temporizadores, respuestas del asistente) se anuncian con `aria-live="polite"`.
- [ ] Componentes personalizados con roles y estados ARIA correctos; si existe un elemento nativo, úsalo en su lugar.

## Herramientas de verificación
- Lighthouse (pestaña Accesibilidad), meta ≥ 95.
- axe DevTools o WAVE, sin errores críticos.
- Recorrido manual con teclado en cada página.
- Lector de pantalla: NVDA en Windows o TalkBack en Android, al menos en portada, ficha y modo cocina.

Guarda capturas o informes de cada herramienta en `evidencias/accesibilidad/`: son evidencia para el tribunal.
