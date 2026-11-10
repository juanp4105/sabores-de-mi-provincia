// Auditoría de estructura de la página abierta (apoyo a la lista WCAG 2.2 AA de references/diseno-y-accesibilidad.md).
// Revisa: un solo h1, títulos sin saltos, zonas (header/nav/main/footer), enlaces y botones con nombre,
// objetivos táctiles de al menos 24 × 24 px, ids repetidos, imágenes sin alt, enlaces internos rotos
// y desplazamiento horizontal.
//
// Uso (con el servidor local en marcha), en la consola del navegador de la página a revisar:
//     (await import('/herramientas/auditoria-estructura.js')).default()

export default async function auditarEstructura() {
  await new Promise((r) => setTimeout(r, 1500)); // espera a que se dibujen las recetas

  const niveles = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
  const saltosDeTitulo = [];
  for (let i = 1; i < niveles.length; i++) {
    if (niveles[i] - niveles[i - 1] > 1) saltosDeTitulo.push(`h${niveles[i - 1]} → h${niveles[i]}`);
  }

  const nombre = (e) => (e.getAttribute('aria-label') || e.textContent || e.getAttribute('title') || '').trim();
  const interactivos = [...document.querySelectorAll('a[href], button')];
  const sinNombre = interactivos.filter((e) => !nombre(e)).length;
  const menoresA24 = interactivos
    .filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && (r.width < 24 || r.height < 24) && getComputedStyle(e).display !== 'inline';
    })
    .map((e) => nombre(e).slice(0, 24));

  const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
  const idsRepetidos = ids.filter((x, i) => ids.indexOf(x) !== i);

  const paginas = /^(index|recetas|recomendador|acerca)\.html(#.*)?$/;
  const enlacesDudosos = interactivos
    .filter((e) => e.tagName === 'A')
    .map((a) => a.getAttribute('href'))
    .filter((h) => !h.startsWith('#') && !paginas.test(h));

  const anclasRotas = interactivos
    .filter((e) => e.tagName === 'A' && e.getAttribute('href').startsWith('#') && e.getAttribute('href').length > 1)
    .map((a) => a.getAttribute('href'))
    .filter((h) => !document.getElementById(decodeURIComponent(h.slice(1))));

  const ocultoPorAncestro = (e) => !!e.closest('[aria-hidden="true"]');
  return {
    pagina: location.pathname,
    anchoDePantalla: innerWidth,
    desbordaHorizontalmente: document.documentElement.scrollWidth > innerWidth,
    idioma: document.documentElement.lang,
    titulo: document.title,
    h1: document.querySelectorAll('h1').length,
    saltosDeTitulo,
    zonas: ['header', 'nav', 'main', 'footer'].map((z) => `${z}:${document.querySelectorAll(z).length}`).join(' '),
    enlacesYBotones: interactivos.length,
    sinNombre,
    objetivosMenoresA24: menoresA24,
    idsRepetidos,
    imagenesSinAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
    svgSinOcultar: [...document.querySelectorAll('svg')].filter((s) => !ocultoPorAncestro(s)).length,
    enlacesDudosos,
    anclasRotas,
  };
}
