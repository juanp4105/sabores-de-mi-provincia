// Cambio de idioma (español / inglés) para la interfaz.
// Los textos viven en data/i18n/es.json y data/i18n/en.json.
// El HTML ya trae el español escrito, así que la página se lee aunque falle el JavaScript.

import { cargarJSON } from './datos.js';
import { leer, guardar } from './preferencias.js';

const IDIOMAS = ['es', 'en'];
let idioma = 'es';
let textos = {};

export function idiomaActual() {
  return idioma;
}

// Devuelve el texto de la interfaz. Con {variables}: t('catalogo.conteo', { recetas: 20, cantones: 16 })
export function t(clave, variables = {}) {
  const base = textos[clave] ?? clave;
  return base.replace(/\{(\w+)\}/g, (_, nombre) => variables[nombre] ?? '');
}

// Elige el texto en el idioma actual dentro de un objeto { es, en } de los datos.
export function enIdioma(objeto) {
  if (!objeto) return '';
  return objeto[idioma] || objeto.es || '';
}

async function cargarTextos() {
  try {
    textos = await cargarJSON(`data/i18n/${idioma}.json`);
  } catch {
    textos = {};
  }
}

function aplicar() {
  document.documentElement.lang = idioma;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    if (textos[el.dataset.i18n] !== undefined) el.textContent = textos[el.dataset.i18n];
  });

  // data-i18n-attr="aria-label:clave;title:otraClave"
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((par) => {
      const [atributo, clave] = par.split(':').map((s) => s.trim());
      if (textos[clave] !== undefined) el.setAttribute(atributo, textos[clave]);
    });
  });

  const pagina = document.body.dataset.pagina;
  if (pagina && textos[`titulo.${pagina}`]) document.title = textos[`titulo.${pagina}`];

  document.querySelectorAll('.idioma__boton').forEach((boton) => {
    boton.setAttribute('aria-pressed', String(boton.dataset.lang === idioma));
  });
}

function anunciar(mensaje) {
  const zona = document.getElementById('anuncios');
  if (!zona) return;
  zona.textContent = '';
  // Pequeño retraso para que los lectores de pantalla detecten el cambio.
  setTimeout(() => { zona.textContent = mensaje; }, 50);
}

async function cambiarIdioma(nuevo) {
  if (!IDIOMAS.includes(nuevo) || nuevo === idioma) return;
  idioma = nuevo;
  guardar('idioma', idioma);
  await cargarTextos();
  aplicar();
  document.dispatchEvent(new CustomEvent('idioma-cambiado'));
  anunciar(t(`idioma.anuncio.${idioma}`));
}

export async function iniciarIdioma() {
  const guardado = leer('idioma', 'es');
  idioma = IDIOMAS.includes(guardado) ? guardado : 'es';
  await cargarTextos();
  aplicar();
  document.querySelectorAll('.idioma__boton').forEach((boton) => {
    boton.addEventListener('click', () => cambiarIdioma(boton.dataset.lang));
  });
}
