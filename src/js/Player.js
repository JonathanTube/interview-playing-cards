class Player {
  constructor(index) {
    this.index = index
    this.winer = false
    this.sortedCards = []
    this.maxSameCard = {
      // when we judge who is the final winer, we nned to know the player index.
      playerIndex: index,
      cards: []
    }
  }

  addCard(card) {
    this.sortedCards[card.getIndex()] = card
  }

  removeCards() {
    this.sortedCards = []
    this.isWiner = false
  }

  /**
   * slide window method for looking up the max cards which has the max length and max value.
   * Since the order of cards is from bigger ones to small ones, so we iterate the cards by reverse.
   */
  calcMaxCountOfSameCards() {
    let finalMaxCards = []
    let currentMaxCards = []
    // [2 ~ A] <--
    for (let i = this.sortedCards.length - 1; i >= 0; i--) {
      let currentCard = this.sortedCards[i]
      if (currentCard === undefined) continue
      if (currentMaxCards.length === 0) {
        currentMaxCards.push(currentCard)
        finalMaxCards.push(currentCard)
      } else {
        let prevCard = currentMaxCards[0]
        if (prevCard.char === currentCard.char) currentMaxCards.unshift(currentCard)
        if (i === 0 || prevCard.char !== currentCard.char) {
          if (currentMaxCards.length > finalMaxCards.length) finalMaxCards = currentMaxCards
          currentMaxCards = [currentCard]
        }
      }
    }
    this.maxSameCard = {
      ...this.maxSameCard,
      cards: finalMaxCards
    }
  }
}

export default Player
