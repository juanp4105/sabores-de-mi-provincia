// Catálogo: las recetas agrupadas por cantón, con un índice para saltar a cada uno.
// (El buscador y los filtros llegan en la etapa 2.)

import { h } from './dom.js';
import { t } from './i18n.js';
import { cargarRecetas, cargarCantones } from './datos.js';
import { crearTarjeta, textoRecetas } from './tarjetas.js';
import { cargarMapa, crearMapa } from './mapa.js';

let recetas = [];
let cantones = [];

export async function iniciar() {
  const estado = document.getElementById('estado');
  try {
    [recetas, cantones] = await Promise.all([cargarRecetas(), cargarCantones(), cargarMapa()]);
  } catch (error) {
    console.error(error);
    estado.className = 'estado estado--error';
    estado.textContent = t('catalogo.error');
    return;
  }
  renderizar();
  irAlCantonDelEnlace();
  // Un clic en el mapa o en la lista, estando ya en esta página, también lleva al cantón.
  window.addEventListener('hashchange', irAlCantonDelEnlace);
}

export function renderizar() {
  if (!recetas.length) return;

  const cantonesPorId = new Map(cantones.map((c) => [c.id, c]));
  const porCanton = new Map(cantones.map((c) => [c.id, []]));
  recetas.forEach((r) => porCanton.get(r.canton)?.push(r));

  const estado = document.getElementById('estado');
  estado.className = 'estado';
  estado.textContent = '';

  const mapa = crearMapa(recetas, cantones);
  document.getElementById('mapa').replaceChildren(...(mapa ? [mapa] : []));

  const conCantones = cantones.filter((c) => porCanton.get(c.id).length > 0);

  document.getElementById('conteo').textContent =
    t('catalogo.conteo', { recetas: recetas.length, cantones: conCantones.length });

  document.getElementById('indice-cantones').replaceChildren(
    ...conCantones.map((c) => h('li', {},
      h('a', { class: 'chip', href: `#canton-${c.id}` },
        c.nombre,
        h('span', { class: 'chip__n' }, textoRecetas(porCanton.get(c.id).length))))));

  let indice = 0;
  document.getElementById('catalogo').replaceChildren(
    ...conCantones.map((c) => {
      const lista = porCanton.get(c.id);
      return h('section', { class: lista.length > 1 ? 'canton canton--varias' : 'canton', id: `canton-${c.id}`, 'aria-labelledby': `titulo-${c.id}` },
        h('div', { class: 'canton__cab' },
          h('h2', { id: `titulo-${c.id}`, tabindex: '-1' }, c.nombre),
          h('p', {}, `${t('catalogo.cabecera', { nombre: c.cabecera })} · ${textoRecetas(lista.length)}`)),
        h('ul', { class: 'rejilla' }, lista.map((r) => crearTarjeta(r, cantonesPorId, indice++))));
    }));
}

// Si se llega con un enlace como recetas.html#canton-calvas, el contenido aún no existía
// cuando el navegador intentó ir a esa zona; se corrige aquí.
function irAlCantonDelEnlace() {
  const id = decodeURIComponent(location.hash.slice(1));
  const destino = id && document.getElementById(id);
  if (!destino) return;
  destino.scrollIntoView();
  destino.querySelector('h2')?.focus({ preventScroll: true });
}
