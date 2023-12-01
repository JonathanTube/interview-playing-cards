import { randomIntInclusive } from './utils'
import { chars, shapes } from './config'
import Card from './Card'
import Player from './Player'

class Game {
  constructor(amountOfPlayers) {
    this.amountOfPlayers = amountOfPlayers
    this.currentCards = []
    this.defaultCards = []
    this.playerList = this.initPalyerList()
  }

  /**
   * init default card according to chars and shapes.
   * @returns
   */
  initDefaultCards() {
    const initialCards = []
    chars.forEach((char) => {
      shapes.forEach((shape) => {
        initialCards.push(new Card(char, shape))
      })
    })
    this.currentCards = initialCards
    this.defaultCards = initialCards
  }

  /**
   * init the player array according to the number of players.
   */
  initPalyerList() {
    return Array.from({ length: this.amountOfPlayers }, (value, index) => new Player(index))
  }

  /**
   * shuffle the cards according to the last card array.
   * It's a simple random algorithm which keeps the card store in an array by random,
   * and then update the vuex cards state.
   */
  shuffleCards() {
    let tempCards = [...this.defaultCards]
    let newCards = []
    // loopping until all of the old elements are selected.
    while (tempCards.length > 0) {
      // get the index of element and then get rid of it from the temp cards.
      let idx = randomIntInclusive(0, tempCards.length)
      let [cardStr] = tempCards.splice(idx, 1)
      // collecting the new element
      if (cardStr) newCards.push(cardStr)
    }
    this.currentCards = newCards
  }

  /**
   * deal the cards to each player one by one.
   */
  dispatchCards() {
    let cards = this.currentCards
    this.playerList.forEach((player) => player.removeCards())

    let playerCount = this.playerList.length
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i]
      let player = this.playerList[i % playerCount]
      player.addCard(card)
    }
    // remove empty elements.
    this.playerList.forEach((player) => {
      player.sortedCards = player.sortedCards.filter((card) => card != undefined)
    })
  }

  calcGameResult() {
    this.playerList.forEach((player) => player.calcMaxCountOfSameCards())
    this.calcWhoIsWiner()
  }

  /**
   * calculate who is the winer of this round.
   */
  calcWhoIsWiner() {
    let maxValue = this.playerList[0].maxSameCard
    for (let i = 1; i < this.playerList.length; i++) {
      let curValue = this.playerList[i].maxSameCard
      // get the max which player has the most amount of cards.
      if (curValue.cards.length > maxValue.cards.length) {
        maxValue = curValue
        continue
      }
      // if the amount of cards is equal between two players. we need to compare the chars and shapes
      if (curValue.cards.length === maxValue.cards.length) {
        let curCard = curValue.cards[0]
        let maxCard = maxValue.cards[0]
        if (curCard.getWeightOfChar() > maxCard.getWeightOfChar()) {
          maxValue = curValue
          continue
        }
        if (curCard.getWeightOfShape() < maxCard.getWeightOfShape()) {
          maxValue = curValue
        }
      }
    }
    // console.log('maxValue.playerIndex=', maxValue.playerIndex)
    this.playerList[maxValue.playerIndex].winer = true
  }
}

export default Game
