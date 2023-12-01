/**
 * get a random int from [min, max]
 *
 * @param {*} min
 * @param {*} max
 * @returns
 */
const randomIntInclusive = (min, max) => {
  var array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return Math.floor((array[0] / (2 ** 32 - 1)) * (max - min + 1)) + min
}

export { randomIntInclusive }
