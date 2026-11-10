// Ilustraciones sencillas que reemplazan a las fotos mientras no existan fotografías.
// Son dibujos decorativos (aria-hidden): la información útil va siempre en texto.
// Cada tipo de plato tiene su dibujo; el fondo rota entre maíz, achira y barro.

const VARIANTES = ['a', 'b', 'c'];

const ICONOS = {
  sopa: `
    <path class="ilu__masa" d="M-44 -6H44C44 28 22 44 0 44C-22 44 -44 28 -44 -6Z"/>
    <path class="ilu__linea" d="M-52 -6H52M-18 52H18"/>
    <path class="ilu__linea" d="M-20 -18q-9 -12 0 -22q9 -10 0 -20M0 -18q-9 -12 0 -22q9 -10 0 -20M20 -18q-9 -12 0 -22q9 -10 0 -20"/>`,
  plato_fuerte: `
    <circle class="ilu__masa" r="40"/>
    <circle class="ilu__linea" r="24"/>
    <path class="ilu__linea" d="M-66 -34V38M-74 -34V-12M-58 -34V-12M-74 -12Q-66 0 -58 -12M66 -34V38M66 -34Q80 -18 66 6"/>`,
  desayuno: `
    <g transform="rotate(-12)">
      <rect class="ilu__masa" x="-48" y="-26" width="96" height="54" rx="16"/>
      <path class="ilu__linea" d="M-22 -26L-16 28M22 -26L28 28"/>
    </g>
    <path class="ilu__linea" d="M-14 -40q-8 -10 0 -18q8 -8 0 -16M14 -40q-8 -10 0 -18q8 -8 0 -16"/>`,
  entrada: `
    <ellipse class="ilu__linea" cx="0" cy="26" rx="56" ry="14"/>
    <path class="ilu__masa" d="M-32 20C-32 -18 32 -18 32 20Z"/>
    <path class="ilu__masa" d="M-4 -12Q4 -40 30 -38Q26 -10 -4 -12Z"/>`,
  postre: `
    <path class="ilu__masa" d="M-52 28H52V-2Z"/>
    <path class="ilu__linea" d="M-30 18V26M-6 12V26M18 6V26"/>
    <path class="ilu__linea" d="M-10 -22q8 -10 16 0q8 10 16 0"/>
    <circle class="ilu__linea" cx="36" cy="-26" r="4"/>`,
  bebida: `
    <path class="ilu__masa" d="M-32 -18H32V14C32 34 18 44 0 44C-18 44 -32 34 -32 14Z"/>
    <path class="ilu__linea" d="M32 -6H42a12 12 0 0 1 0 28H30M-46 54H46"/>
    <path class="ilu__linea" d="M-10 -30q-8 -9 0 -17M10 -30q-8 -9 0 -17"/>`,
};

export function ilustracion(tipo, indice = 0) {
  const variante = VARIANTES[indice % VARIANTES.length];
  const icono = ICONOS[tipo] ?? ICONOS.plato_fuerte;
  return `
<svg class="ilu ilu--${variante}" viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <rect class="ilu__fondo" width="320" height="160"/>
  <path class="ilu__relleno" d="M-10 175C20 95 85 62 150 72C118 114 72 152 -10 175Z"/>
  <path class="ilu__relleno" d="M330 -10C300 40 250 62 200 56C226 20 272 -6 330 -10Z"/>
  <circle class="ilu__relleno" cx="284" cy="120" r="14"/><circle class="ilu__relleno" cx="258" cy="136" r="9"/><circle class="ilu__relleno" cx="294" cy="146" r="7"/>
  <g transform="translate(160 84)">${icono}</g>
</svg>`;
}
