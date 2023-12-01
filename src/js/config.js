const chars = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const shapes = ['@', '#', '^', '*']

const charWeights = new Map()
chars.forEach((item, index) => charWeights.set(item, index))

const shapeWeights = new Map()
shapes.forEach((item, index) => shapeWeights.set(item, index))

const getCharIndex = (char) => {
  let weight = charWeights.get(char)
  return weight == undefined ? -1 : weight
}
const getShapeIndex = (shape) => {
  let weight = shapeWeights.get(shape)
  return weight === undefined ? -1 : weight
}
const amountOfCards = chars.length * shapes.length

export { chars, shapes, getCharIndex, getShapeIndex, amountOfCards }
