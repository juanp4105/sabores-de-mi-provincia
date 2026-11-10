// Auditoría de contraste de la página abierta: mide el contraste REAL de cada texto visible
// (color del texto contra el fondo efectivo) según WCAG 2.2 AA: 4.5:1 en texto normal y
// 3:1 en texto grande (≥ 24 px, o ≥ 18.66 px en negrita).
//
// Uso (con el servidor local en marcha), en la consola del navegador de la página a revisar:
//     (await import('/herramientas/auditoria-contraste.js')).default()
// Devuelve cuántos textos midió, el contraste mínimo y la lista de fallos (vacía si todo cumple).

export default async function auditarContraste() {
  await new Promise((r) => setTimeout(r, 1200)); // espera a que se dibujen las recetas

  const leer = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map((s) => parseFloat(s));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const luminancia = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const contraste = (a, b) => {
    const l1 = luminancia(a), l2 = luminancia(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const mezclar = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const fondoEfectivo = (el) => {
    const capas = [];
    for (let e = el; e; e = e.parentElement) {
      const c = leer(getComputedStyle(e).backgroundColor);
      if (c && c.a > 0) { capas.push(c); if (c.a === 1) break; }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (const c of capas.reverse()) base = mezclar(c, base);
    return base;
  };

  const fallos = [];
  let medidos = 0, minimo = 99, textoMasBajo = '';
  const recorrido = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vistos = new Set();
  while (recorrido.nextNode()) {
    const nodo = recorrido.currentNode;
    if (!nodo.textContent.trim()) continue;
    const el = nodo.parentElement;
    if (vistos.has(el)) continue;
    vistos.add(el);
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const caja = el.getBoundingClientRect();
    if (caja.width < 2 || caja.height < 2) continue;
    if (el.closest('.solo-lectores, .saltar, noscript')) continue;
    const fg = leer(cs.color);
    if (!fg) continue;
    const bg = fondoEfectivo(el);
    const k = contraste(mezclar(fg, bg), bg);
    const px = parseFloat(cs.fontSize);
    const negrita = parseInt(cs.fontWeight, 10) >= 700;
    const grande = px >= 24 || (px >= 18.66 && negrita);
    const requerido = grande ? 3 : 4.5;
    medidos++;
    if (k < minimo) { minimo = k; textoMasBajo = nodo.textContent.trim().slice(0, 30); }
    if (k < requerido) fallos.push({ texto: nodo.textContent.trim().slice(0, 40), contraste: +k.toFixed(2), requerido });
  }
  return {
    pagina: location.pathname,
    esquema: matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro',
    anchoDePantalla: innerWidth,
    textosMedidos: medidos,
    contrasteMinimo: +minimo.toFixed(2),
    textoMasBajo,
    fallos,
  };
}
