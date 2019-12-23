import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

export default ({ store }) => {
  Vue.use(
    VueNativeSock,
    // `wss://closedfolders.com:8001/?hash=${store.state.persist.token}`,
    `wss://closedfolders.com:8001/?hash=${localStorage.token}`,

    {
      // connectManually: true,
      format: 'json',
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 3000,
      store: store
    }
  )
}
