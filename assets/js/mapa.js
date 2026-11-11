// Mapa de los 16 cantones de la provincia de Loja. Cada cantón es un enlace a su plato típico
// (por ahora, a su tarjeta en el catálogo). El mapa nunca es la única vía: la lista de cantones va al lado.
// Los contornos están en data/cantones-mapa.json (© colaboradores de OpenStreetMap, simplificados).

import { h } from './dom.js';
import { t, enIdioma } from './i18n.js';
import { cargarJSON } from './datos.js';
import { textoRecetas } from './tarjetas.js';

const NS = 'http://www.w3.org/2000/svg';
let geo = null;

export async function cargarMapa() {
  try {
    geo = await cargarJSON('data/cantones-mapa.json');
  } catch (error) {
    console.error(error);
    geo = null; // sin mapa, la lista de cantones sigue funcionando
  }
}

function s(etiqueta, atributos = {}, ...hijos) {
  const el = document.createElementNS(NS, etiqueta);
  for (const [nombre, valor] of Object.entries(atributos)) el.setAttribute(nombre, valor);
  for (const hijo of hijos) el.append(hijo);
  return el;
}

export function crearMapa(recetas, cantones) {
  if (!geo) return null;
  const cantonPorId = new Map(cantones.map((c) => [c.id, c]));
  const [ancho, alto] = geo.viewBox;

  const info = h('p', { class: 'mapa__info', 'aria-live': 'polite' }, t('mapa.ayuda'));
  const resalte = s('path', { class: 'mapa__resalte', 'fill-rule': 'evenodd', d: '' });
  const svg = s('svg', { class: 'mapa__svg', viewBox: `0 0 ${ancho} ${alto}`, role: 'group', 'aria-label': t('mapa.etiqueta') });

  const mostrar = (texto, d, teclado) => {
    info.textContent = texto;
    resalte.setAttribute('d', d);
    resalte.setAttribute('class', teclado ? 'mapa__resalte mapa__resalte--foco' : 'mapa__resalte');
  };
  const ocultar = () => {
    info.textContent = t('mapa.ayuda');
    resalte.setAttribute('d', '');
  };

  // Los nombres van en una capa aparte, encima de todos los cantones (los lectores de pantalla los omiten:
  // cada enlace ya dice su nombre).
  const etiquetas = s('g', { class: 'mapa__etiquetas', 'aria-hidden': 'true' });

  // Los cantones grandes se dibujan primero para que los pequeños queden encima.
  [...geo.cantones].sort((a, b) => b.area - a.area).forEach((g) => {
    const canton = cantonPorId.get(g.id);
    if (!canton) return;
    const lista = recetas.filter((r) => r.canton === g.id);
    const texto = lista.length === 1
      ? `${canton.nombre}: ${enIdioma(lista[0].nombre)}`
      : `${canton.nombre}: ${textoRecetas(lista.length)}`;
    // La letra se ajusta al espacio útil del cantón (radio del mayor círculo que cabe dentro).
    const tamano = Math.round(Math.min(30, Math.max(15, (g.radio * 2 * 1.25) / (canton.nombre.length * 0.58))));

    const enlace = s('a', { href: `recetas.html#canton-${g.id}`, class: `mapa__canton mapa__canton--${g.color}`, 'aria-label': texto },
      s('title', {}, texto),
      s('path', { d: g.d, 'fill-rule': 'evenodd' }));
    etiquetas.append(s('text', { x: g.etiqueta[0], y: g.etiqueta[1], 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': tamano }, canton.nombre));

    enlace.addEventListener('mouseenter', () => mostrar(texto, g.d, false));
    enlace.addEventListener('mouseleave', ocultar);
    enlace.addEventListener('focus', () => mostrar(texto, g.d, true));
    enlace.addEventListener('blur', ocultar);
    svg.append(enlace);
  });
  svg.append(resalte, etiquetas);

  return h('div', {},
    svg,
    info,
    h('p', { class: 'mapa__nota' },
      `${t('mapa.atribucion.texto')} `,
      h('a', { href: 'https://www.openstreetmap.org/copyright', rel: 'noopener' }, t('mapa.atribucion.enlace'))));
}
