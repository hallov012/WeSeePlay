<template>
  <div class="video-item">
    <div class="user-video-box">
      <div v-if="user">
        <ov-video :stream-manager="user" />
      </div>
      <div>
        <p>gameIdx: {{ gameIdx }}</p>
      </div>
      <button v-if="myEmail === userEmail" @click.stop="$emit('next')">
        NEXT {{ gameIdx }}
      </button>
    </div>
  </div>
</template>

<script setup>
import store from "@/store"
import { defineProps } from "vue"
import OvVideo from "./OvVideo.vue"

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  gameIdx: {
    type: Number,
  },
  userEmail: {
    type: String,
  },
})

const myEmail = store.getters.me.userEmail
console.log("asdasdasdasdasdasdasdasdsa", myEmail, props.userEmail)
</script>

<style scoped>
.user-video-box {
  background-color: #c9c5f1;
  border-radius: 15px;
  width: 100%;
}
</style>
