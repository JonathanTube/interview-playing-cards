import { getCharIndex, getShapeIndex, shapes } from './config'
class Card {
  constructor(char, shape) {
    this.char = char
    this.shape = shape
    this.index = this.getIndex()
  }
  getWeightOfChar() {
    return getCharIndex(this.char)
  }

  getWeightOfShape() {
    return getShapeIndex(this.shape)
  }

  getIndex() {
    return this.getWeightOfChar() * shapes.length + this.getWeightOfShape()
  }
}

export default Card
