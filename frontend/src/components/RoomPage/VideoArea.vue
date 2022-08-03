<template>
  <div class="video-case" :class="true ? 'non-side' : 'on-side'">
    <GameVideo v-if="isGameMode" :users="userList" />
    <MeetingVideo v-else :users="userList" />
  </div>
</template>

<script>
import GameVideo from "./game/liargame/VideoList.vue"
import MeetingVideo from "./meeting/VideoList.vue"
import { ref } from "vue"

export default {
  name: "VideoArea",

  components: {
    GameVideo,
    MeetingVideo,
  },

  setup() {
    const isGameMode = ref(false)
    const userList = ref([])
    const changeMode = function () {
      isGameMode.value = !isGameMode.value
    }

    const customNumber = ref(13)

    for (let i = 1; i < customNumber.value; i++) {
      const id = i
      const nickname = String.fromCharCode(i + 64)
      const onVideo = false
      userList.value.push({ id, nickname, onVideo })
    }
    return {
      isGameMode,
      changeMode,
      userList,
    }
  },
}
</script>

<style>
.video-case {
  padding: 15px 15px 95px 15px;
}

.non-side {
  height: 100%;
}
</style>
