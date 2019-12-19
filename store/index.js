import Vue from 'vue'

export const state = () => ({
  notice: {
    title: '',
    body: '',
    type: '', //default info
    id: 1
  },
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false
  }
})

export const mutations = {
  setNotice(state, obj) {
    state.notice = {
      ...state.notice,
      ...obj,
      id: +new Date()
    }
  },

  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget
    state.socket.isConnected = true
  },
  SOCKET_ONCLOSE(state, event) {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR(state, event) {
    console.error(state, event)
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE(state, message) {
    state.socket.message = message
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    console.info(state, count)
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true
  }
}

export const getters = {
  getNotice: (state) => {
    return state.notice
  }
}
