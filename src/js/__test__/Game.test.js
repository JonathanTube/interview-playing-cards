import { expect, test } from 'vitest'
import { amountOfCards } from '../config'
import Card from '../Card'
import Game from '../Game'

test('test initing default cards', () => {
  let game = new Game()
  game.initDefaultCards()
  expect(game.defaultCards.length).toBe(52)
})

test('test initing player list', () => {
  let game = new Game(4)
  expect(game.initPalyerList().length).toBe(game.amountOfPlayers)
  expect(game.playerList.length).toBe(game.amountOfPlayers)
})

test('test shuffle cards', () => {
  let game = new Game(4)
  game.shuffleCards()
  expect(game.currentCards.length).toBe(game.defaultCards.length)
  // each generated card must be exist in default cards.
  game.currentCards.forEach((cc) => {
    let isMatch = game.defaultCards.some(
      (dc) => dc.index === cc.index && dc.char === cc.char && dc.shape === cc.shape
    )
    expect(isMatch).toBe(true)
  })
})

test('deal cards', () => {
  let players = 4
  let game = new Game(players)
  game.initDefaultCards()
  game.shuffleCards()
  // console.log('game=', game)
  game.dispatchCards()
  // each player must have 52 / 4 = 13 cards
  game.playerList.forEach((player) => {
    // console.log('player.cards=', player.cards)
    let count = player.sortedCards.filter((card) => card != undefined).length
    expect(count).toBe(amountOfCards / players)
  })
})

test('calculate who is the winer: only one user has four cards', () => {
  let players = 4
  let game = new Game(players)
  game.playerList[0].maxSameCard = {
    playerIndex: 0,
    cards: [new Card('A', '@')]
  }
  game.playerList[1].maxSameCard = {
    playerIndex: 1,
    cards: [new Card('K', '@'), new Card('K', '#')]
  }
  game.playerList[2].maxSameCard = {
    playerIndex: 2,
    cards: [new Card('Q', '@'), new Card('Q', '#'), new Card('Q', '^')]
  }
  game.playerList[3].maxSameCard = {
    playerIndex: 3,
    cards: [new Card('J', '@'), new Card('J', '#'), new Card('J', '^'), new Card('J', '*')]
  }
  game.calcWhoIsWiner()
  expect(game.playerList[0].winer).toBe(false)
  expect(game.playerList[1].winer).toBe(false)
  expect(game.playerList[2].winer).toBe(false)
  expect(game.playerList[3].winer).toBe(true)
})

test('calculate who is the winer: two players have four cards', () => {
  let players = 4
  let game = new Game(players)
  game.playerList[0].maxSameCard = {
    playerIndex: 0,
    cards: [new Card('A', '@')]
  }
  game.playerList[1].maxSameCard = {
    playerIndex: 1,
    cards: [new Card('K', '@'), new Card('K', '#')]
  }
  game.playerList[2].maxSameCard = {
    playerIndex: 2,
    cards: [new Card('J', '@'), new Card('J', '#'), new Card('J', '^'), new Card('J', '*')]
  }
  game.playerList[3].maxSameCard = {
    playerIndex: 3,
    cards: [new Card('Q', '@'), new Card('Q', '#'), new Card('Q', '^'), new Card('Q', '*')]
  }
  game.calcWhoIsWiner()
  expect(game.playerList[0].winer).toBe(false)
  expect(game.playerList[1].winer).toBe(false)
  expect(game.playerList[2].winer).toBe(false)
  expect(game.playerList[3].winer).toBe(true)
})

test('calculate who is the winer: only one user has three cards', () => {
  let players = 4
  let game = new Game(players)
  game.playerList[0].maxSameCard = {
    playerIndex: 0,
    cards: [new Card('A', '@')]
  }
  game.playerList[1].maxSameCard = {
    playerIndex: 1,
    cards: [new Card('K', '@'), new Card('K', '#')]
  }
  game.playerList[2].maxSameCard = {
    playerIndex: 2,
    cards: [new Card('Q', '@'), new Card('Q', '#')]
  }
  game.playerList[3].maxSameCard = {
    playerIndex: 3,
    cards: [new Card('J', '@'), new Card('J', '#'), new Card('J', '^')]
  }
  game.calcWhoIsWiner()
  expect(game.playerList[0].winer).toBe(false)
  expect(game.playerList[1].winer).toBe(false)
  expect(game.playerList[2].winer).toBe(false)
  expect(game.playerList[3].winer).toBe(true)
})

test('calculate who is the winer: two players have three cards, but char is not same', () => {
  let players = 4
  let game = new Game(players)
  game.playerList[0].maxSameCard = {
    playerIndex: 0,
    cards: [new Card('A', '@')]
  }
  game.playerList[1].maxSameCard = {
    playerIndex: 1,
    cards: [new Card('K', '@'), new Card('K', '#')]
  }
  game.playerList[2].maxSameCard = {
    playerIndex: 2,
    cards: [new Card('J', '@'), new Card('J', '#'), new Card('J', '^')]
  }
  game.playerList[3].maxSameCard = {
    playerIndex: 3,
    cards: [new Card('Q', '@'), new Card('Q', '#'), new Card('Q', '^')]
  }
  game.calcWhoIsWiner()
  expect(game.playerList[0].winer).toBe(false)
  expect(game.playerList[1].winer).toBe(false)
  expect(game.playerList[2].winer).toBe(false)
  expect(game.playerList[3].winer).toBe(true)
})

test('calculate who is the winer: two players have two cards, but char is same', () => {
  let players = 4
  let game = new Game(players)
  game.playerList[0].maxSameCard = {
    playerIndex: 0,
    cards: [new Card('A', '@')]
  }
  game.playerList[1].maxSameCard = {
    playerIndex: 1,
    cards: [new Card('K', '@')]
  }
  game.playerList[2].maxSameCard = {
    playerIndex: 2,
    cards: [new Card('Q', '^'), new Card('Q', '*')]
  }
  game.playerList[3].maxSameCard = {
    playerIndex: 3,
    cards: [new Card('Q', '@'), new Card('Q', '#')]
  }
  game.calcWhoIsWiner()
  expect(game.playerList[0].winer).toBe(false)
  expect(game.playerList[1].winer).toBe(false)
  expect(game.playerList[2].winer).toBe(false)
  expect(game.playerList[3].winer).toBe(true)
})

test('calculate who is the winer: two players have two cards, but char is not same', () => {
  let players = 4
  let game = new Game(players)
  game.playerList[0].maxSameCard = {
    playerIndex: 0,
    cards: [new Card('A', '@')]
  }
  game.playerList[1].maxSameCard = {
    playerIndex: 1,
    cards: [new Card('K', '@')]
  }
  game.playerList[2].maxSameCard = {
    playerIndex: 2,
    cards: [new Card('J', '^'), new Card('J', '*')]
  }
  game.playerList[3].maxSameCard = {
    playerIndex: 3,
    cards: [new Card('Q', '@'), new Card('Q', '#')]
  }
  game.calcWhoIsWiner()
  expect(game.playerList[0].winer).toBe(false)
  expect(game.playerList[1].winer).toBe(false)
  expect(game.playerList[2].winer).toBe(false)
  expect(game.playerList[3].winer).toBe(true)
})

test('calculate who is the winer: each player has two cards', () => {
  let players = 4
  let game = new Game(players)
  game.playerList[0].maxSameCard = {
    playerIndex: 0,
    cards: [new Card('A', '#'), new Card('A', '^')]
  }
  game.playerList[1].maxSameCard = {
    playerIndex: 1,
    cards: [new Card('Q', '@'), new Card('Q', '#')]
  }
  game.playerList[2].maxSameCard = {
    playerIndex: 2,
    cards: [new Card('Q', '^'), new Card('Q', '*')]
  }
  game.playerList[3].maxSameCard = {
    playerIndex: 3,
    cards: [new Card('A', '@'), new Card('A', '*')]
  }
  game.calcWhoIsWiner()
  expect(game.playerList[0].winer).toBe(false)
  expect(game.playerList[1].winer).toBe(false)
  expect(game.playerList[2].winer).toBe(false)
  expect(game.playerList[3].winer).toBe(true)
})

test('calculate who is the winer: each player has one same card', () => {
  let players = 4
  let game = new Game(players)
  game.playerList[0].maxSameCard = {
    playerIndex: 0,
    cards: [new Card('A', '#')]
  }
  game.playerList[1].maxSameCard = {
    playerIndex: 1,
    cards: [new Card('A', '*')]
  }
  game.playerList[2].maxSameCard = {
    playerIndex: 2,
    cards: [new Card('A', '^')]
  }
  game.playerList[3].maxSameCard = {
    playerIndex: 3,
    cards: [new Card('A', '@')]
  }
  game.calcWhoIsWiner()
  expect(game.playerList[0].winer).toBe(false)
  expect(game.playerList[1].winer).toBe(false)
  expect(game.playerList[2].winer).toBe(false)
  expect(game.playerList[3].winer).toBe(true)
})

test('calc game result', () => {
  let players = 4
  let game = new Game(players)
  game.initDefaultCards()
  game.shuffleCards()
  game.dispatchCards()
  game.calcGameResult()
})
