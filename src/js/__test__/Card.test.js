import { expect, test } from 'vitest'
import Card from '../Card'

test('test init a Card', () => {
  let card = new Card('A', '@')
  expect(card.char).toBe('A')
  expect(card.shape).toBe('@')
})
