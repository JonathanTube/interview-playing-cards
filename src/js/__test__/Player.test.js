import { expect, test } from 'vitest'
import Player from '../Player'
import Card from '../Card'

test('test add card', () => {
  let player = new Player()
  let card1 = new Card('2', '@')
  player.addCard(card1)
  expect(player.sortedCards[card1.getIndex()].char).toBe('2')

  let card2 = new Card('3', '#')
  player.addCard(card2)
  expect(player.sortedCards[card2.getIndex()].char).toBe('3')
})

test('test remove cards', () => {
  let player = new Player()
  let card1 = new Card('2', '@')
  player.addCard(card1)

  expect(player.sortedCards.some((card) => card != undefined)).toBe(true)

  player.removeCards()
  expect(player.sortedCards.some((card) => card != undefined)).toBe(false)
})

test('test get max sames cards, get four same cards', () => {
  let player = new Player()
  let cards1 = [new Card('2', '@'), new Card('2', '#'), new Card('2', '^'), new Card('2', '*')]
  cards1.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  // console.log(player)
  expect(player.maxSameCard.cards[0].char).toBe('2')

  let cards2 = [new Card('Q', '@'), new Card('Q', '#'), new Card('Q', '^'), new Card('Q', '*')]
  cards2.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  expect(player.maxSameCard.cards[0].char).toBe('Q')

  let cards3 = [new Card('A', '@'), new Card('A', '#'), new Card('A', '*')]
  cards3.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  expect(player.maxSameCard.cards[0].char).toBe('Q')
  // console.log(player)
})

test('test get max sames cards, get three same cards', () => {
  let player = new Player()
  let cards1 = [new Card('2', '@'), new Card('2', '#'), new Card('2', '*')]
  cards1.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  expect(player.maxSameCard.cards[0].char).toBe('2')

  let cards2 = [new Card('Q', '@'), new Card('Q', '#'), new Card('Q', '*')]
  cards2.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  expect(player.maxSameCard.cards[0].char).toBe('Q')

  let cards3 = [new Card('A', '@')]
  cards3.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  expect(player.maxSameCard.cards[0].char).toBe('Q')
  // console.log(player)
})

test('test get max sames cards, get two same cards', () => {
  let player = new Player()
  let cards1 = [new Card('2', '@'), new Card('2', '#')]
  cards1.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()

  expect(player.maxSameCard.cards[0].char).toBe('2')
  let cards2 = [new Card('Q', '@')]
  cards2.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()

  expect(player.maxSameCard.cards[0].char).toBe('2')
  let cards3 = [new Card('A', '@')]
  cards3.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()

  expect(player.maxSameCard.cards[0].char).toBe('2')
  // console.log(player)
})

test('test get max sames cards, get none of the same cards', () => {
  let player = new Player()
  let cards1 = [new Card('2', '@')]
  cards1.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  expect(player.maxSameCard.cards[0].char).toBe('2')

  let cards2 = [new Card('Q', '@')]
  cards2.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  expect(player.maxSameCard.cards[0].char).toBe('Q')

  let cards3 = [new Card('A', '@')]
  cards3.forEach((card) => player.addCard(card))
  player.calcMaxCountOfSameCards()
  expect(player.maxSameCard.cards[0].char).toBe('A')
  // console.log(player)
})
