import api from '@/api/api'
import router from '@/router'
import axios from 'axios'

export default {
  state: {
    // 방 정보
    roomInfo: {},
    // 사이드바 오픈용 변수
    sidebar: '0',
  },
  getters: {
    get_sidebar: (state) => state.sidebar,
    // 방 정보 가져오기
    getRoomInfo: (state) => state.roomInfo,
    // 방에 있는 User 정보 가져오기
    getUserInfo: (state) => state.roomInfo.joinUsers,
  },
  mutations: {
    SET_SIDEBAR: (state, data) => {
      if (state.sidebar === data) {
        state.sidebar = '0'
      } else {
        state.sidebar = data
      }
    },
    SET_ROOM_INFO: (state, data) => {
      state.roomInfo = data
    },
  },
  actions: {
    openSidebar: ({ commit }, data) => {
      commit('SET_SIDEBAR', data)
    },
    setRoomInfo: ({ commit }, data) => {
      commit('SET_ROOM_INFO', data)
    },
    // 룸 정보 받는 함수
    getRoomInfo: async function ({ getters, dispatch }, roomID) {
      try {
        const response = await axios({
          method: 'GET',
          headers: getters.authHeader,
          url: api.room.roomInfo(roomID),
        })
        dispatch('setRoomInfo', response.data)
      } catch (err) {
        console.log(err)
        dispatch('removeToken')
        router.push({ name: 'startpage' })
      }
    },
  },
}