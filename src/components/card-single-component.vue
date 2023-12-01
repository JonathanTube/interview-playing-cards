<template>
  <div class="card-component">
    <label class="left-top">
      <span>{{ props.card.char }}</span>
      <span>{{ props.card.shape }}</span>
    </label>
    <label class="right-bottom">
      <span>{{ props.card.char }}</span>
      <span>{{ props.card.shape }}</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card-component {
  width: 60px;
  height: 80px;
  border-radius: 5px;
  border: 1px solid #bbb;
  color: #000;
  font-size: 20px;
  background-image: url('@/assets/card_bg.webp');
  background-size: 40% auto;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bolder;
  color: #333;
  margin: 2px;
}

.left-top {
  position: absolute;
  top: 2px;
  left: 5px;
}

.right-bottom {
  position: absolute;
  bottom: 2px;
  right: 5px;
}
</style>
