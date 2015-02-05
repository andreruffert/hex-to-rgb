function isHex(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return /^(?:[#]?[0-9A-F]{3}){1,2}$/i.test(str);
}

function isRgb(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return /^(rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)|(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}))$/i.test(str);
}

function getLuma(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  var rgb = str.replace(/[^\d,]/g, '').split(',');

  // https://en.wikipedia.org/wiki/Relative_luminance
  return parseInt(0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2]);
}

module.exports = {
  isHex: isHex,
  isRgb: isRgb,
  getLuma: getLuma
};
