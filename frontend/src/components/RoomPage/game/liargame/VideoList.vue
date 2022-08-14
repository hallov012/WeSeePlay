<template>
  <div class="row video-list-area">
    <div>{{ gameSet.gameIdx }}</div>
    <div>
      <MainVideo
        v-if="gameSet.gameIdx == 0"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 1"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 2"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 3"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 4"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 5"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 6"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 7"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 8"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 9"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 10"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
      <MainVideo
        v-if="gameSet.gameIdx == 11"
        class="self-center"
        :class="isSide ? 'col-7' : 'col-5'"
        :user="gameSet.gameUserOrder[gameSet.gameIdx]"
        :gameIdx="gameSet.gameIdx"
        @next="gameIdxUp"
      />
    </div>
    <AllVideo
      class="self-center"
      :class="isSide ? 'col-5' : 'col-7'"
      :gameUserOrder="gameSet.gameUserOrder"
      :isSide="isSide"
    />
    <!-- 일반인인지 라이어인지, 제시어 알려 주는 부분 -->
    <!-- <div v-if="gameSet.liar == userId">당신은 라이어 입니다.</div> -->
    <div>제시어는 {{ gameSet.suggestion }} 입니다.</div>
  </div>

  <q-dialog v-model="gameSet.isVoteNow" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div v-for="pl in userList" :key="pl">
          <p @click="heIsLiar(pl)">
            {{ pl }}
          </p>
        </div>
        <div @click="heIsLiar('skip')">skip</div>
        <div @click="gameSet.isVoteNow = false">끝</div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="gameSet.liarInputModal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div>
          <input type="text" v-model="gameSet.liarInput" />
          <button @click="liarFinalInput()">입력하</button>
        </div>

        <div @click="gameSet.liarInputModal = false">끝</div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="gameSet.gameResultModal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div>
          <p>
            {{ gameSet.gameResult }}
          </p>
        </div>

        <div @click="gameSet.gameResultModal = false">끝</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, defineProps, watchEffect } from "vue"
import MainVideo from "./MainVideo.vue"
// import AllVideo from "./AllVideo.vue"

const props = defineProps({
  isSide: {
    type: Boolean,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  setting: {
    type: Object,
    required: true,
  },
  session: {
    type: Object,
    required: true,
  },
})
const gameSet = reactive({ ...props.setting })
watchEffect(() => {
  console.log(gameSet.gameIdx)
})
// 역기서 부터 게임 입니다.
//여긴 game web socket
const userList = ref([])
console.log("여기는 왜 안들어 가 있는거야?", gameSet.gameUserOrder)
// const gameSetting = function () {
//   gameSet.maxRound = 5
//   gameSet.suggestion = "사자"
//   shuffle(userList.value)
//   gameSet.liar = pickLiar(userList.value)
// }
const gameIdxUp = function () {
  props.session
    .signal({
      data: 1,
      to: [],
      type: "gameIdxUp",
    })
    .then(() => {
      console.log("gameIdxUp")
    })
    .catch((error) => {
      console.error(error)
    })
}
const heIsLiar = function (suspect) {
  gameSet.isVoteNow = false
  props.session
    .signal({
      data: suspect,
      to: [],
      type: "heIsLiar",
    })
    .then(() => {
      console.log("heIsLiar")
    })
    .catch((error) => {
      console.error(error)
    })
}
const liarFinalInput = function () {
  let result = true
  if (gameSet.liarInput == gameSet.suggestion) {
    console.log("정답이다 멍청아")
    result = false
  }
  props.session
    .signal({
      data: result,
      to: [],
      type: "liarInput",
    })
    .then(() => {
      console.log("liarInput")
    })
    .catch((error) => {
      console.error(error)
    })
  gameSet.liarInput = ""
  gameSet.liarInputModal = false
}
// const endGame = function (result) {
//   gameSet.isGameNow = 0
//   gameSet.gameResultModal = true
//   result = Boolean(result)
//   console.log(result)
//   if (result) {
//     if (gameSet.liar === state.myUserName) {
//       gameSet.gameResult = "니가 졌어"
//     } else {
//       gameSet.gameResult = "이겼습니다."
//     }
//   } else {
//     console.log("여기까지 온거 아냐?")
//     if (gameSet.liar === state.myUserName) {
//       gameSet.gameResult = "이겼습니다"
//     } else {
//       gameSet.gameResult = "니가 졌어."
//     }
//   }
// }
</script>

<style scoped>
.video-list-area {
  width: 100%;
  min-width: 35rem;
}
</style>
