// Pequeña ayuda para crear elementos HTML sin escribir texto como HTML (evita errores y es más seguro).
// Uso: h('p', { class: 'aviso' }, 'Texto', otroElemento)

export function h(etiqueta, atributos = {}, ...hijos) {
  const elemento = document.createElement(etiqueta);
  for (const [nombre, valor] of Object.entries(atributos)) {
    if (valor === null || valor === undefined || valor === false) continue;
    elemento.setAttribute(nombre, valor === true ? '' : valor);
  }
  for (const hijo of hijos.flat()) {
    if (hijo === null || hijo === undefined || hijo === false) continue;
    elemento.append(hijo);
  }
  return elemento;
}
