<template>
  <div class="cards-component">
    <div
      class="card"
      v-for="card in props.dataList.filter((data) => data != undefined)"
      :key="card.index"
    >
      <card-single-component :card="card" />
    </div>
  </div>
</template>

<script setup>
import cardSingleComponent from './card-single-component.vue'
const props = defineProps({
  dataList: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.cards-component {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
