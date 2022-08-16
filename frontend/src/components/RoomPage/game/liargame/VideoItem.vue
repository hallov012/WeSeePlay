<template>
  <div class="padding-area">
    <div class="radius-area row">
      <div class="name-area">{{ nickname }}</div>
      <ov-video class="ov-area" :stream-manager="user" />
    </div>
  </div>
</template>

<script setup>
import OvVideo from "./OvVideo.vue"
import { defineProps } from "vue"
import store from "@/store"

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  userEmail: {
    type: String,
  },
})

const nickname = store.getters.getNickname(props.userEmail)
</script>

<style scoped>
.padding-area {
  padding: 5px;
  background-color: #c9c5f1;
  border-radius: 15px;
}
.radius-area {
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.name-area {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgb(94, 144, 219);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  padding: 2px 10px;
}
</style>
