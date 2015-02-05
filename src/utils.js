/**
 * Check if a string is a valid HEX code
 *
 * @param  {String}  str  e.g. #000, 000
 * @return {Boolean}
 */
function isHex(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return /^(?:[#]?[0-9A-F]{3}){1,2}$/i.test(str);
}

/**
 * Check if a string is a valid RGB code
 *
 * @param  {String}  str  e.g. rgb(0,0,0), 0,0,0
 * @return {Boolean}
 */
function isRgb(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return /^(rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)|(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}))$/i.test(str);
}

/**
 * Get the Luminance of a RGB code
 *
 * @param  {String}  str  e.g. rgb(0,0,0), 0,0,0
 * @return {Integer}
 *
 * https://en.wikipedia.org/wiki/Relative_luminance
 */
function getLuma(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  var rgb = str.replace(/[^\d,]/g, '').split(',');
  return parseInt(0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2]);
}

module.exports = {
  isHex: isHex,
  isRgb: isRgb,
  getLuma: getLuma
};
