const domain = "https://mi.dominio/";
/**
 * Convierte un Uint8Array a base64 URL safe
 * @param {Uint8Array} bytes
 * @returns {string}
 */
function toBase64Url(bytes:Uint8Array<ArrayBuffer>) {
  const binary = String.fromCharCode(...bytes);
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Genera un código aleatorio corto y no determinístico
 * @param {number} length - Longitud del código corto deseado
 * @returns {string}
 */
function generateRandomCode(length = 8) {
  const byteLength = Math.ceil((length * 6) / 8); // cada base64 char = 6 bits
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  const base64url = toBase64Url(bytes);
  return base64url.slice(0, length);
}

/**
 * Genera un enlace corto aleatorio sin colisiones verificadas
 * @param {number} length - Longitud del código (default 8)
 * @returns {string} - Enlace corto generado
 */
export function shortenUrl(length?: number) {
  const finalLength = length ?? Math.floor(Math.random() * 5) + 8; // 8 a 12
  const code = generateRandomCode(finalLength);
  return `${domain}${code}`;
}