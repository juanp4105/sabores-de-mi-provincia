// Tarjeta de receta: se usa en la portada (destacadas) y en el catálogo.
// Reglas de interfaz (references/arquitectura-y-datos.md):
//   validacion.estado distinto de «validada» -> insignia «En revisión»
//   contenido_ejemplo: true                  -> insignia «Contenido de ejemplo»
//   imagen.provisional: true                 -> insignia «Imagen provisional»

import { h } from './dom.js';
import { t, enIdioma } from './i18n.js';
import { ilustracion } from './ilustraciones.js';

function insignias(receta) {
  const lista = [];

  if (receta.validacion?.estado === 'validada') {
    const quien = [receta.validacion.revisor, receta.validacion.rol].filter(Boolean).join(', ');
    lista.push(h('li', { class: 'insignia insignia--validada' },
      quien ? `${t('insignia.validada')}: ${quien}` : t('insignia.validada')));
  } else {
    lista.push(h('li', { class: 'insignia insignia--revision' }, t('insignia.revision')));
  }

  if (receta.contenido_ejemplo) {
    lista.push(h('li', { class: 'insignia insignia--ejemplo' },
      t('insignia.ejemplo'),
      h('span', { class: 'solo-lectores' }, t('insignia.ejemplo.extra'))));
  }

  if (receta.imagen?.provisional) {
    lista.push(h('li', { class: 'insignia insignia--imagen' }, t('insignia.imagen')));
  }

  return lista;
}

export function crearTarjeta(receta, cantonesPorId, indice = 0) {
  const canton = cantonesPorId.get(receta.canton);
  const imagen = h('div', { class: 'tarjeta__imagen' });
  imagen.innerHTML = ilustracion(receta.tipo, indice); // texto fijo del propio sitio, no datos externos

  return h('li', { class: 'tarjeta' },
    imagen,
    h('div', { class: 'tarjeta__cuerpo' },
      h('p', { class: 'tarjeta__canton' }, canton ? canton.nombre : receta.canton),
      h('h3', { class: 'tarjeta__titulo' }, enIdioma(receta.nombre)),
      h('p', { class: 'tarjeta__tipo' }, t(`tipo.${receta.tipo}`)),
      h('ul', { class: 'insignias', 'aria-label': t('insignias.etiqueta') }, insignias(receta))));
}

export function textoRecetas(n) {
  return n === 1 ? t('receta.una') : t('receta.varias', { n });
}
