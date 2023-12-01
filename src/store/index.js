import { createStore } from 'vuex'
import { toRaw } from 'vue'

const store = createStore({
  state: {
    cards: [], // the current cards
    players: [], // If there're four players, it will be [[], [], [], []]
    gameState: null // if the game is over
  },
  mutations: {
    setCards: (state, payload) => {
      state.cards = payload.value
    },
    setPlayers: (state, payload) => {
      state.players = payload.value
    },
    setGameState: (state, payload) => {
      state.gameState = payload.value
    }
  },
  actions: {
    // It's async
    handlerCards: (context, payload) => {
      context.commit('setCards', payload)
    },
    handlerPlayers: (context, payload) => {
      context.commit('setPlayers', payload)
    },
    handlerGameState: (context, payload) => {
      context.commit('setGameState', payload)
    }
  },
  getters: {
    getCards: (state) => {
      return toRaw(state.cards)
    },
    getPlayers(state) {
      return toRaw(state.players)
    },
    getGameState(state) {
      return toRaw(state.gameState)
    }
  }
})

export default store
