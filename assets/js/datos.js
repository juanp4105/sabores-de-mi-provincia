// Carga de los archivos JSON. Cada archivo se pide una sola vez y se guarda en memoria.
// Las rutas son relativas para que el sitio funcione dentro de una subcarpeta (GitHub Pages).

const memoria = new Map();

export function cargarJSON(ruta) {
  if (!memoria.has(ruta)) {
    const promesa = fetch(ruta, { cache: 'no-cache' }).then((respuesta) => {
      if (!respuesta.ok) throw new Error(`No se pudo cargar ${ruta} (${respuesta.status})`);
      return respuesta.json();
    });
    // Si falla, se olvida para poder reintentar.
    promesa.catch(() => memoria.delete(ruta));
    memoria.set(ruta, promesa);
  }
  return memoria.get(ruta);
}

export async function cargarRecetas() {
  return (await cargarJSON('data/recetas.json')).recetas;
}

export async function cargarCantones() {
  return (await cargarJSON('data/cantones.json')).cantones;
}
