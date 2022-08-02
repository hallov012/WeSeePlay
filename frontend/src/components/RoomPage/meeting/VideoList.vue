<template>
  <div>Meeting Video Area</div>
  <div class='row' style='height: 70%;'>
    <VideoItem class='col-4' v-for="user in users" :key="user" :user='user'/>
  </div>
</template>

<script>
import VideoItem from './VideoItem.vue'

export default {
    components: { VideoItem },
    props: {
        users: {
            type: Array,
            required: true
        }
    },
}
</script>

<style>

</style>