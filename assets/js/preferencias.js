// Guardado local de preferencias (solo en el dispositivo, sin cuentas ni datos personales).
// Todo va envuelto en try/catch: si el navegador bloquea el almacenamiento, el sitio sigue funcionando.

const PREFIJO = 'sabores.';

export function leer(clave, valorPorDefecto = null) {
  try {
    const valor = window.localStorage.getItem(PREFIJO + clave);
    return valor === null ? valorPorDefecto : valor;
  } catch {
    return valorPorDefecto;
  }
}

export function guardar(clave, valor) {
  try {
    window.localStorage.setItem(PREFIJO + clave, valor);
  } catch {
    /* sin almacenamiento: se ignora */
  }
}
