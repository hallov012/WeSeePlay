<template>
  <div>VideoArea.vue</div>
  <GameVideo v-if="isGameMode" :users="userList"/>
  <MeetingVideo v-else :users="userList"/>
  <button @click.stop='changeMode'>Change Mode</button>
</template>

<script>
import GameVideo from './game/liargame/VideoList.vue'
import MeetingVideo from './meeting/VideoList.vue'
import { ref } from 'vue'

export default {    
    name: 'VideoArea',

    components: {
        GameVideo, MeetingVideo,
    },

    setup() {
        const isGameMode= ref(false)
        const userList = ref([])
        const changeMode = function () {
            isGameMode.value = !isGameMode.value
        }
        
        for (let i = 1; i < 13; i++) {
            const id = i
            const nickname = String.fromCharCode(i + 64)
            const onVideo = false
            userList.value.push({id, nickname, onVideo})
        }
        
        return {
            isGameMode,
            changeMode,
            userList
        }
    }
}
</script>

<style>

</style>