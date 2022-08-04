<template>
  <div class="video-item">
    <div class="user-box">
      <p>{{ user.nickname }}</p>
      <p v-if="user.onVideo">
        <img
          src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
          style="width: 100px; height: 100px"
        />
      </p>
      <p v-else>Video가 꺼져있습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"

defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<style>
.video-item {
  padding: 10px;
}

.user-box {
  height: 200px;
  background-color: #c9c5f1;
  border-radius: 15px;
}
</style>
