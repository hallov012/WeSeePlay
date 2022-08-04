<template>
  <div class="row full-height justify-center items-center">
    <button
      class="col-1"
      @click.stop="getPageUser(currentPage - 1)"
      :disabled="currentPage === 0"
    >
      이전
    </button>
    <div class="row col-10">
      <video-item
        v-for="user in pageUsers"
        :key="user.id"
        :user="user"
        :class="grid"
        class="self-center"
      />
    </div>
    <button
      class="col-1"
      @click.stop="getPageUser(currentPage + 1)"
      :disabled="currentPage === parseInt((users.length - 1) / pageLimit)"
    >
      다음
    </button>
  </div>
</template>

<script setup>
import VideoItem from "./VideoItem.vue"
import { ref, defineProps, watchEffect } from "vue"

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  isSide: {
    type: Boolean,
    required: true,
  },
})

// pagination 관련
const pageUsers = ref([])
const currentPage = ref(0)
const maxPages = ref(0)
const pageLimit = ref(6)

const getPageUser = function (page) {
  pageUsers.value = props.users.slice(
    page * pageLimit.value,
    (page + 1) * pageLimit.value
  )
  currentPage.value = page
}

getPageUser(0)

// grid 나누는 거 관련
const grid = ref("col-6")

watchEffect(() => {
  if (props.isSide === true || props.users.length < 5) {
    grid.value = "col-6"
    pageLimit.value = 4
  } else {
    grid.value = "col-4"
    pageLimit.value = 6
  }
  maxPages.value = parseInt((props.users.length - 1) / pageLimit.value)
  getPageUser(currentPage.value)
})

console.log("videoList", props.isSide)
</script>

<style></style>
