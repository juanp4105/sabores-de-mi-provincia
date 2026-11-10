// Punto de entrada de todas las páginas: primero el idioma, luego lo propio de cada página.

import { iniciarIdioma } from './i18n.js';

const MODULOS = {
  inicio: './portada.js',
  recetas: './catalogo.js',
};

async function arrancar() {
  await iniciarIdioma();
  const ruta = MODULOS[document.body.dataset.pagina];
  if (!ruta) return;
  const modulo = await import(ruta);
  await modulo.iniciar();
  document.addEventListener('idioma-cambiado', () => modulo.renderizar());
}

arrancar();
