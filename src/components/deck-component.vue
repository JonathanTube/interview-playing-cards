<template>
  <div class="deck">
    <div style="color: #fff; font-weight: bolder; font-size: 20px">{{ gameState }}</div>
    <card-list-component :data-list="allCards" />
    <div>
      <button class="shuffle-cards" @click="shuffleCards" v-if="gameState === 'INIT'">
        Shuffle Cards
      </button>
      <button class="dispatch-cards" @click="dispatchCards" v-if="gameState === 'SHUFFLED'">
        Dispatch Cards
      </button>
      <button class="calc-game-Result" @click="calcGameResult" v-if="gameState === 'DISPATCHED'">
        Who is the winer?
      </button>
      <button class="play-again" @click="playAgain" v-if="gameState === 'FINISH'">
        Play Again
      </button>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { ref, onMounted, watchEffect } from 'vue'
import cardListComponent from './card-list-component.vue'
import Game from '../js/Game'
const store = useStore()
var game = null

const gameState = ref('')
const allCards = ref([])

watchEffect(() => {
  // console.log('watchEffect')
  gameState.value = store.getters['getGameState']
})

onMounted(() => {
  initGame()
})

const initGame = () => {
  game = new Game(4)
  game.initDefaultCards()
  allCards.value = game.currentCards
  store.dispatch('handlerPlayers', { value: game.playerList })
  store.dispatch('handlerGameState', { value: 'INIT' })
}

const shuffleCards = () => {
  game.shuffleCards()
  allCards.value = game.currentCards
  store.dispatch('handlerGameState', { value: 'SHUFFLED' })
}

const dispatchCards = () => {
  game.dispatchCards()
  store.dispatch('handlerPlayers', { value: game.playerList })
  store.dispatch('handlerGameState', { value: 'DISPATCHED' })
}

const calcGameResult = () => {
  game.calcGameResult()
  store.dispatch('handlerPlayers', { value: game.playerList })
  store.dispatch('handlerGameState', { value: 'FINISH' })
}

const playAgain = () => {
  initGame()
}
</script>

<style scoped>
.deck {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #00aa00;
  padding: 10px;
  border-radius: 5px;
  margin: 0 10px;
}

.shuffle-cards {
  margin: 10px;
  background: blue;
  border: none;
  color: #fff;
  padding: 15px 20px;
  border-radius: 5%;
}

.dispatch-cards {
  margin: 10px;
  background: #69641e;
  border: none;
  color: #fff;
  padding: 15px 20px;
  border-radius: 5%;
}
.calc-game-Result {
  margin: 10px;
  background: red;
  border: none;
  color: #fff;
  padding: 15px 20px;
  border-radius: 5%;
}
.play-again {
  margin: 10px;
  background: #54012f;
  border: none;
  color: #fff;
  padding: 15px 20px;
  border-radius: 5%;
}
</style>
