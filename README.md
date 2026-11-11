# Sabores de mi provincia

**Cocina tradicional de Loja, Ecuador.** Prototipo web de una plataforma de recetas de los 16 cantones de la provincia de Loja, con recomendador basado en contenido, modo cocina, mapa por cantón, español e inglés, y accesibilidad WCAG 2.2 AA.

Es el instrumento de validación del proyecto de titulación (examen complexivo) de la Maestría en Gestión Empresarial, EDES – UTPL: *Modelo de negocio digital escalable para la difusión de la gastronomía tradicional lojana*.

> **Estado: prototipo en construcción (etapa 1 de 6).** Las recetas todavía no están completas ni validadas; se muestran con la insignia «Contenido de ejemplo». Los establecimientos serán ficticios y estarán rotulados como tales.

## Sitio publicado (GitHub Pages)

**https://juanp4105.github.io/sabores-de-mi-provincia/**

Cada vez que se sube un cambio a la rama `main`, el sitio se actualiza solo en uno o dos minutos.

## Cómo ver el sitio en su computador

El sitio no se abre con doble clic (el navegador bloquea la carga de los datos). Use el servidor incluido, que requiere tener [Python](https://www.python.org/downloads/) instalado:

1. Abra una terminal en esta carpeta.
2. Ejecute:

```bash
python herramientas/servidor.py
```

3. Abra en el navegador: <http://localhost:8080>
4. Para detenerlo, vuelva a la terminal y pulse `Ctrl + C`.

### Verlo en el teléfono (misma red Wi-Fi)

```bash
python herramientas/servidor.py --red
```

La terminal mostrará una dirección parecida a `http://192.168.x.x:8080`; escríbala en el navegador del teléfono. Windows puede preguntar si permite el acceso en redes privadas: acepte solo en su red de casa. Cuando termine, detenga el servidor.

## Qué contiene

| Carpeta o archivo | Para qué sirve |
|---|---|
| `index.html` | Portada |
| `recetas.html` | Catálogo de recetas agrupado por cantón |
| `recomendador.html`, `acerca.html` | Páginas «Próximamente» (se construyen en etapas posteriores) |
| `assets/css/styles.css` | Colores, tipografía y estilos |
| `assets/js/` | Código que arma las páginas a partir de los datos y cambia el idioma |
| `data/` | Recetas, cantones, contornos del mapa (OpenStreetMap), establecimientos y textos de la interfaz (JSON) |
| `herramientas/` | Servidor local, verificador de datos y cálculo de contrastes |
| `evidencias/` | Informes de accesibilidad y capturas para el tribunal |
| `BITACORA.md` | Registro de cada sesión de trabajo con IA |
| `.claude/skills/` | Guía del proyecto para Claude Code |

## Herramientas de verificación

```bash
python herramientas/verificar-datos.py
python herramientas/contraste.py
```

La primera revisa que los datos cumplan el esquema; la segunda calcula los contrastes de color (WCAG 2.2 AA).

## Decisiones principales

- Sitio estático con HTML, CSS y JavaScript sin frameworks; datos en JSON; publicación prevista en GitHub Pages.
- Sin cuentas de usuario; las preferencias se guardan solo en el dispositivo.
- Fase 1 sin modelo de lenguaje: el recomendador funciona en el navegador. El asistente con IA generativa es de la fase 2.
- Diseñado primero para teléfono; tipografías Fraunces (títulos) y Atkinson Hyperlegible (texto).

## Uso de inteligencia artificial

Este prototipo se construye con ayuda de Claude Code (Anthropic). Cada sesión queda registrada en `BITACORA.md`: qué se pidió, qué hizo la herramienta y qué decidió la persona responsable.

## Licencia

Código: por definir. Contenido de las recetas: CC BY-NC-SA 4.0, con crédito a los portadores del saber (cuando exista su consentimiento escrito).

