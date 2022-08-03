<template>
  <div>Meeting Video Area</div>
  <div class='row justify-center'>
    <VideoItem class='col' :class="users.length < 5 ? 'col-6' : 'col-4'" v-for="user in users" :key="user" :user='user'/>
  </div>
</template>

<script>
import VideoItem from './VideoItem.vue'
// import { ref, watch } from 'vue'

export default {
    components: { VideoItem },
    props: {
        users: {
            type: Array,
            required: true
        }
    },

    // setup(props) {
    //     const numberOfUsers = ref(0)
    //     watch(props.users, () => {
    //         console.log(props.users)
    //         numberOfUsers.value = props.users.length
    //     })
    //     return {
    //         numberOfUsers
    //     }
    // }
}
</script>

<style>

</style>