<template>
  <div class="sideArea">
    <button class="exit"><i class="fa-solid fa-x fa-lg"></i></button>
    <GameArea />
  </div>
</template>

<script setup>
import GameArea from './sidearea/GameArea.vue'
</script>

<style scoped>
@import url('../../../src/assets/roompage/sidearea.css');
</style>
