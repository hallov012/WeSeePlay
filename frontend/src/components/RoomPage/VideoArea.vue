<template>
  <div class="video-area-case" :class="true ? 'non-side' : 'on-side'">
    <GameVideo v-if="isGameMode" :users="userList" />
    <MeetingVideo v-else :users="userList" />
  </div>
</template>

<script setup>
import GameVideo from "./game/liargame/VideoList.vue"
import MeetingVideo from "./meeting/VideoList.vue"
import { ref } from "vue"

const isGameMode = ref(true)
const userList = ref([])

const customNumber = ref(13)

for (let i = 1; i < customNumber.value; i++) {
  const id = i
  const nickname = String.fromCharCode(i + 64)
  const onVideo = false
  userList.value.push({ id, nickname, onVideo })
}
</script>

<style>
.video-area-case {
  padding: 15px 15px 95px 15px;
}

.non-side {
  height: 100%;
}
</style>
