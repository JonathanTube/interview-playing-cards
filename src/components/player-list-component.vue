<template>
  <div class="player-list">
    <div
      class="container"
      v-for="{ index, sortedCards, winer, maxSameCard } in playerList.list"
      :key="index"
    >
      <div class="result">
        <card-list-component :data-list="maxSameCard.cards" />
        <div v-if="winer" class="winer">
          <div>WINER!!!</div>
          <img :src="`/player.gif`" />
        </div>
      </div>
      <div class="player">
        <div class="profile">
          <label class="player-name">PLAYER {{ index + 1 }}</label>
        </div>
        <div class="waiting" v-if="sortedCards.length === 0">I'm waiting.</div>
        <card-list-component :data-list="sortedCards" v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import cardListComponent from './card-list-component.vue'
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
let playerList = reactive({
  list: []
})

watch(
  () => store.getters['getGameState'],
  () => {
    // do not assign directly, using destructing syntax
    let list = store.getters['getPlayers']
    playerList.list = [...list]
  }
)
</script>

<style scoped>
.player-list {
  display: grid;
  grid-template-columns: 50% 50%;
}
@media (min-width: 1024px) {
  .player-list {
    grid-template-columns: 25% 25% 25% 25%;
  }
}

.container {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  margin: 10px;
  min-height: 100px;
  text-align: center;
  padding: 10px 0;
}

.result {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.winer {
  font-size: 25px;
  color: red;
  text-align: center;
}

.winer img {
  width: 40px;
}

.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
}

.waiting {
  font-size: 20px;
}

.player-name {
  font-size: 16px;
  font-weight: bolder;
}
</style>
