# Publicación en GitHub Pages

La persona no programa. Guíala paso a paso, una acción por mensaje, y espera su confirmación antes de seguir. Cuando una acción ocurra en la web de GitHub, describe exactamente dónde hacer clic. Si los menús de GitHub cambiaron respecto de esta guía, consulta la documentación oficial de GitHub Pages antes de improvisar.

## Antes de la primera publicación
- [ ] La auditoría de accesibilidad de la etapa 4 está aprobada.
- [ ] `herramientas/verificar-datos.mjs` pasa sin errores.
- [ ] No hay claves, contraseñas, correos ni datos personales en ningún archivo (búscalos explícitamente).
- [ ] Todos los enlaces son relativos y funcionan dentro de una subcarpeta.
- [ ] Existe `README.md` con descripción del proyecto, licencia (código y contenido) y declaración de uso de IA.
- [ ] La persona aprueba publicar. Recuérdale que el sitio y el repositorio quedarán **públicos**.

## Pasos
1. **Repositorio en GitHub.** Si Claude Code trabaja en una carpeta local, crea el repositorio remoto `sabores-de-mi-provincia` (con la herramienta `gh` si está disponible y autenticada; si no, guía a la persona para crearlo desde github.com) y sube la rama principal.
2. **Activar Pages.** En el repositorio: *Settings → Pages → Build and deployment → Source: Deploy from a branch*, rama `main`, carpeta `/ (root)`, *Save*.
3. **Esperar el despliegue** (uno o dos minutos). La dirección será `https://<usuario>.github.io/sabores-de-mi-provincia/`.
4. **Verificar el sitio publicado:** abrir cada página, probar filtros, recomendador, modo cocina y mapa; abrirlo también desde un teléfono con datos móviles.
5. **Registrar** la dirección en `README.md` y en `BITACORA.md`.

## Actualizaciones posteriores
Cada vez que se guarde y suba un cambio a `main`, GitHub Pages se actualiza solo. Antes de subir, repite la verificación de datos y revisa en local las páginas afectadas.

## Dominio propio (opcional, fase 2)
Está pendiente de decisión. Si la persona lo pide, explícale costo anual, configuración DNS y el archivo `CNAME`, y espera su aprobación antes de tocar nada.
