<template>
  <div class="row">
    <MainVideo class="temp" :class="isSide ? 'col-6' : 'col-4'" />
    <AllVideo class="temp" :class="isSide ? 'col-6' : 'col-8'" />
  </div>
</template>

<script setup>
import { defineProps } from "vue"
import MainVideo from "./MainVideo.vue"
import AllVideo from "./AllVideo.vue"

defineProps({
  isSide: {
    type: Boolean,
    required: true,
  },
})
</script>

<style></style>
