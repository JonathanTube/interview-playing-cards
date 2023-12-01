<template>
  <div>
    <div class="title">Let's play cards.</div>
    <main-component />
  </div>
</template>

<script setup>
import mainComponent from './components/main-component.vue'
</script>

<style scoped>
.title {
  font-size: 30px;
  line-height: 60px;
  font-weight: bold;
  text-align: center;
}
</style>
