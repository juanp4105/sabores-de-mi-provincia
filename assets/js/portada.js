// Portada: acceso por cantón y recetas destacadas.

import { h } from './dom.js';
import { cargarRecetas, cargarCantones } from './datos.js';
import { crearTarjeta, textoRecetas } from './tarjetas.js';
import { cargarMapa, crearMapa } from './mapa.js';

// Recetas que se muestran como destacadas (decisión de diseño por confirmar con la persona responsable).
const DESTACADAS = ['repe-lojano', 'humitas-de-maiz', 'yuca-con-salsa-de-mani', 'cuy-con-papas'];

let recetas = [];
let cantones = [];

export async function iniciar() {
  try {
    [recetas, cantones] = await Promise.all([cargarRecetas(), cargarCantones(), cargarMapa()]);
  } catch (error) {
    console.error(error);
    return;
  }
  renderizar();
}

export function renderizar() {
  if (!recetas.length) return;
  const cantonesPorId = new Map(cantones.map((c) => [c.id, c]));

  const mapa = crearMapa(recetas, cantones);
  document.getElementById('mapa').replaceChildren(...(mapa ? [mapa] : []));

  document.getElementById('lista-cantones').replaceChildren(
    ...cantones.map((c) => {
      const n = recetas.filter((r) => r.canton === c.id).length;
      return h('li', {},
        h('a', { class: 'chip', href: `recetas.html#canton-${c.id}` },
          c.nombre,
          h('span', { class: 'chip__n' }, textoRecetas(n))));
    }));

  const destacadas = DESTACADAS
    .map((id) => recetas.find((r) => r.id === id))
    .filter(Boolean);
  document.getElementById('lista-destacadas').replaceChildren(
    ...destacadas.map((r, i) => crearTarjeta(r, cantonesPorId, i)));
}
