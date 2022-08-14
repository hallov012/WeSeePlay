<template>
  <div>
    <!-- 이 버튼 어차피 나중에 날릴 것이므로 -->
    <button style="position: absolute; top: 1rem" @click="gameStart">
      Game On/Off
    </button>
    <!-- isGameMode가 참이면 GameVideo가 나오게 하고, false라면 MeetingVideo가 나오게 짰어-->
    <LiarGameVideo
      v-if="isGameMode === 2"
      :isSide="isSide"
      :roomId="roomId"
      :setting="gameSet"
      :session="state.session"
    />
    <MeetingVideo
      v-if="isGameMode === 1"
      :users="userList"
      :isSide="isSide"
      :publisher="state.publisher"
      :subscribers="state.subscribers"
    />
  </div>
  <!-- 모달 확인용 버튼 -->
  <button @click="isVoteModal = true">Vote!</button>
  <button @click="isLiarInputModal = true">LiarInput!</button>
  <button @click="isResultModal = true">Result!</button>
  <VoteModal v-if="isVoteModal" @close="isVoteModal = false" />
  <LiarInputModal v-if="isLiarInputModal" @close="isLiarInputModal = false" />
  <ResultModal v-if="isResultModal" @close="isResultModal = false" />
</template>

<script setup>
import LiarGameVideo from "./game/liargame/VideoList.vue"
import MeetingVideo from "./meeting/VideoList.vue"
import VoteModal from "@/components/RoomPage/game/liargame/modal/VoteModal.vue"
import LiarInputModal from "@/components/RoomPage/game/liargame/modal/LiarInputModal.vue"
import ResultModal from "@/components/RoomPage/game/liargame/modal/ResultModal.vue"
import { ref, defineProps, watchEffect } from "vue"
import store from "@/store"
import { useStore } from "vuex"
import api from "@/api/api"
import axios from "axios"

//---------------------openvidu import-----------------------------------

import $axios from "axios"
import { reactive, onBeforeUnmount, onMounted } from "vue"
import { OpenVidu } from "openvidu-browser"
// import UserVideo from "./components/UserVideo.vue"
// import VoteModal from "./components/VoteModal.vue"
// import VoteModalContent from "./components/VoteModalContent.vue"
$axios.defaults.headers.post["Content-Type"] = "application/json"
$axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

// modal control
const isVoteModal = ref(false)
const isLiarInputModal = ref(false)
const isResultModal = ref(false)

// 다른 파일에서와는 다르게, 얘가 useStore임
const usestore = useStore()

const isGameMode = ref(store.getters.getRoomInfo.game)

watchEffect(() => {
  isGameMode.value = store.getters.getRoomInfo.game
})
// 게임 정보
const gameSet = reactive({
  gameIdx: 0,
  isGameNow: 0,
  suggestion: "",
  maxRound: 0,
  liar: "",
  passedTurn: 0,
  passedRound: 0,
  gameUserList: [],
  gameUserOrder: [],
  liarInput: "",
  liarInputModal: false,
  isVoteNow: false,
  gameResult: false,
  gameResultModal: false,
  votingProcess: {},
  skipNum: 0,
  voteNum: 0,
})
// const changeGame = function () {
//   if (isGameMode.value === 1) {
//     isGameMode.value = 2
//     console.log("gamemode: ", isGameMode.value)
//     return
//   } else {
//     isGameMode.value = 1
//     console.log("gamemode: ", isGameMode.value)
//     return
//   }
// }
function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1))

    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = array[index]
    array[index] = array[randomPosition]
    array[randomPosition] = temporary
  }
}
function pickLiar(array) {
  const randomPosition = Math.floor(Math.random() * array.length)
  return array[randomPosition]
}
const gameStart = function () {
  gameSet.gameUserOrder = [] // 초기화
  gameSet.gameUserList.value = []
  state.subscribers.forEach(function (element) {
    gameSet.gameUserList.value.push(
      JSON.parse(element.stream.connection.data).clientData
    )
    // gameSet.gameUserOrder.push(element)
  })
  gameSet.gameUserList.value.push(state.myUserName)
  gameSet.maxRound = 5
  gameSet.suggestion = "사자"
  shuffle(gameSet.gameUserList.value)
  gameSet.liar = pickLiar(gameSet.gameUserList.value)

  state.session
    .signal({
      data: gameSet.liar,
      to: [],
      type: "whoIsLiar",
    })
    .then(() => {
      console.log("who is Liar")
    })
    .catch((error) => {
      console.error(error)
    })

  state.session
    .signal({
      data: gameSet.gameUserList.value.join(),
      to: [],
      type: "gameOrder",
    })
    .then(() => {
      console.log("gameOrder")
    })
    .catch((error) => {
      console.error(error)
    })
  state.session
    .signal({
      data: "2," + gameSet.suggestion + "," + String(gameSet.maxRound),
      to: [],
      type: "gameStart",
    })
    .then(() => {
      console.log("game Start!")
    })
    .catch((error) => {
      console.error(error)
    })
}
const userList = ref([]) // Component에 넘겨줄 user list
const props = defineProps({
  isSide: {
    type: Boolean,
    required: true,
  },
  roomId: {
    type: String,
  },
  isVideoOpen: {
    type: Boolean,
    required: true,
  },
  isAudeoOpen: {
    type: Boolean,
    required: true,
  },
  chatData: {
    type: String,
  },
})

// 이쪽은 샘플로 넣을 User 수 정하는 거 (최종본에는 지울 내용)
const customNumber = ref(10)
for (let i = 1; i < customNumber.value; i++) {
  const id = i
  const nickname = String.fromCharCode(i + 64)
  const onVideo = false
  userList.value.push({ id, nickname, onVideo })
}

// --------------------------------------open vidu-----------------------------------------------
// 여기서 부턴 openVidu
const OPENVIDU_SERVER_URL = "https://" + "i7a501.p.ssafy.io" + ":8443"
// const OPENVIDU_SERVER_URL = "https://" + location.hostname + ":4443"
const OPENVIDU_SERVER_SECRET = "MY_SECRET"
const state = reactive({
  OV: undefined,
  session: undefined,
  mainStreamManager: undefined,
  publisher: undefined,
  subscribers: [],
  mySessionId: props.roomId,
  myUserName: undefined,
  playersNum: 1,
})

// toggle
watchEffect(() => {
  if (state.publisher) {
    state.publisher.publishVideo(props.isVideoOpen)
  }
  if (state.publisher) {
    state.publisher.publishAudio(props.isAudeoOpen)
  }
})
// const toggleAudio = () => {
//   vidoman.publishAudio = !vidoman.publishAudio
//   if (vidoman.publishAudio) {
//     state.publisher.publishAudio(true)
//   } else {
//     state.publisher.publishAudio(false)
//   }
// }
const joinSession = () => {
  // --- Get an OpenVidu object ---
  console.log("오픈 비두 시작!")
  state.mySessionId = props.roomId
  console.log(store.getters.me.userEmail)
  console.log(state.mySessionId)
  state.OV = new OpenVidu()
  // --- Init a session ---
  state.session = state.OV.initSession()
  // On every new Stream received...
  state.session.on("streamCreated", ({ stream }) => {
    const subscriber = state.session.subscribe(stream)
    state.subscribers.push(subscriber)
    state.playersNum += 1
    // 여기서 플레이어 숫자 계산
  })
  // 메시지 캐치하는 부분
  state.session.on("signal:this is chat", (e) => {
    const userList = usestore.getters.getUserInfo
    const rawMessage = e.data
    let splitIdx = -1
    console.log("여기까지?")
    for (let i = 0; i < rawMessage.length; i++) {
      if (rawMessage[i] === ":") {
        splitIdx = i
        break
      }
    }
    const Email = rawMessage.slice(0, splitIdx - 1)
    const Message = rawMessage.slice(splitIdx + 2, rawMessage.length)
    let userNickname = ""
    userList.forEach((userInfo) => {
      console.log(userInfo)
      if (userInfo.userEmail === Email) {
        userNickname = userInfo.userNickname
        return
      }
    })
    console.log(userNickname)
    console.log(Message)
    const sendTime = new Date().toLocaleTimeString().slice(0, -3)
    const messageObject = {
      userNickname: userNickname,
      content: Message,
      sendTime: sendTime,
      isDifferentNameAndTime: true,
    }
    const exMessage = usestore.getters.getChattings.at(-1)
    if (
      exMessage &&
      exMessage.userNickname === userNickname &&
      exMessage.sendTime === sendTime
    ) {
      messageObject.isDifferentNameAndTime = false
    }
    usestore.dispatch("addMessage", messageObject)
  })

  // On every Stream destroyed...
  state.session.on("streamDestroyed", ({ stream }) => {
    const index = state.subscribers.indexOf(stream.streamManager, 0)
    if (index >= 0) {
      state.subscribers.splice(index, 1)
    }
  })
  // On every asynchronous exception...
  state.session.on("exception", ({ exception }) => {
    console.warn(exception)
  })

  // liar Game
  state.session.on("signal:gameStart", (data) => {
    console.log("게임이 시작 되었는가?????????????")
    let info = data.data.split(",")
    console.log(info)
    gameSet.suggestion = info[1]
    gameSet.maxRound = parseInt(info[2])
    isGameMode.value = parseInt(info[0])
  })
  state.session.on("signal:whoIsLiar", (data) => {
    console.log(data.data)
    gameSet.liar = data.data
  })
  state.session.on("signal:gameOrder", (data) => {
    console.log(data.data)
    gameSet.gameUserList.value = data.data.split(",")
    for (let p = 0; p < state.playersNum; p++) {
      let flag = 0
      state.subscribers.forEach(function (element) {
        if (
          gameSet.gameUserList.value[p] ===
          JSON.parse(element.stream.connection.data).clientData
        ) {
          // console.log(JSON.parse(element.stream.connection.data).clientData)
          gameSet.gameUserOrder.push(element)
          flag = 1
        }
      })
      if (!flag) {
        gameSet.gameUserOrder.push(state.publisher)
      }
    }
  })
  state.session.on("signal:gameIdxUp", (data) => {
    console.log(data.data)
    let flag = 0
    gameSet.gameIdx += 1
    if (gameSet.gameIdx >= state.playersNum) {
      gameSet.gameIdx = 0
      gameSet.passedRound += 1
      flag = 1
    }
    gameSet.passedTurn += 1
    // 모든 사용자 gameidx증가
    if (flag && gameSet.passedRound > 1) {
      // 만약에 라운드가 넘어갔다면 투표
      console.log("왜 투표를 안하나요")
      gameSet.isVoteNow = true
    }
    console.log("gameSet.gameIdx : ", gameSet.gameIdx)
  })

  // 'getToken' method is simulating what your server-side should do.
  // 'token' parameter should be retrieved and returned by your own backend
  getToken(state.mySessionId).then((token) => {
    state.session
      .connect(token, { clientData: state.myUserName })
      .then(() => {
        // --- Get your own camera stream with the desired properties ---
        let publisher = state.OV.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "600x320", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        })
        state.mainStreamManager = publisher
        state.publisher = publisher
        state.session.publish(publisher)
      })
      .catch((error) => {
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        )
      })
  })
  window.addEventListener("beforeunload", leaveSession)
}
const leaveSession = () => {
  // --- Leave the session by calling 'disconnect' method over the Session object ---
  if (state.session) state.session.disconnect()
  state.session = undefined
  state.mainStreamManager = undefined
  state.publisher = undefined
  state.subscribers = []
  state.OV = undefined

  window.removeEventListener("beforeunload", leaveSession)
}
// const updateMainVideoStreamManager = (stream) => {
//   if (state.mainStreamManager === stream) return
//   state.mainStreamManager = stream
// }
const getToken = (mySessionId) => {
  return createSession(mySessionId).then((sessionId) => createToken(sessionId))
}
const createSession = (sessionId) => {
  return new Promise((resolve, reject) => {
    $axios
      .post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
        JSON.stringify({
          customSessionId: sessionId,
        }),
        {
          auth: {
            username: "OPENVIDUAPP",
            password: OPENVIDU_SERVER_SECRET,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => resolve(data.id))
      .catch((error) => {
        if (error.response.status === 409) {
          resolve(sessionId)
        } else {
          console.warn(
            `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`
          )
          if (
            window.confirm(
              `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}\n\nClick OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
            )
          ) {
            location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`)
          }
          reject(error.response)
        }
      })
  })
}
const createToken = (sessionId) => {
  return new Promise((resolve, reject) => {
    $axios
      .post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
        {},
        {
          auth: {
            username: "OPENVIDUAPP",
            password: OPENVIDU_SERVER_SECRET,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => resolve(data.token))
      .catch((error) => reject(error.response))
  })
}

//---------------------------openVidu Chatting--------------------------------
// OpenVidu 채팅 기능
// const chattingList = ref([])
// const inputMsg = ref("")

watchEffect(() => {
  if (props.chatData) {
    console.log("마지막 포인트 입니다.", props.chatData)
    sendMsg(props.chatData)
  }
})
const sendMsg = (data) => {
  console.log(data)
  state.session
    .signal({
      data: state.myUserName + " : " + data,
      to: [],
      type: "this is chat",
    })
    .then(() => {
      console.log("Chat!")
    })
    .catch((error) => {
      console.error(error)
    })
}

//-----------------------------Liar Game--------------------------------

// beforeunmount
onBeforeUnmount(() => {
  leaveSession()
})
// onBeforeMount
onMounted(async () => {
  const userId = ref("")
  try {
    console.log(localStorage.getItem("token"))
    const response = await axios({
      url: api.users.checkToken(),
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    })
    console.log(response)
    userId.value = response.data.userEmail
    state.myUserName = userId.value
  } catch (err) {
    console.log(err)
  }
  console.log("본인 아이디요", userId.value)

  // try {
  //   const response = await axios({
  //     method: 'GET',
  //     headers: { authorization: "Bearer " + localStorage.getItem("token") },
  //     url: api.room.roomInfo(roomID),
  //   })

  //   if (response.status === 200) {
  //     dispatch('setRoomInfo', response.data)
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       text: '존재하지 않는 방입니다',
  //     })
  //     router.push({ name: 'errorpage', params: { errorname: '404' } })
  //   }
  // } catch (err) {
  //   Swal.fire({
  //     icon: 'error',
  //     text: '잘못된 접근입니다',
  //   })
  //   router.push({ name: 'errorpage', params: { errorname: '500' } })
  // }
  console.log("룸 번호요", props.roomId)

  console.log("본인 아이디요", userId.value)
  joinSession()
  // joinGameSession()
})
</script>

<style scoped></style>
