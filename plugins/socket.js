import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

export default ({ store }) => {
  Vue.use(
    VueNativeSock,
    `wss://closedfolders.com:8001/?hash=${store.state.persist.token}`,
    {
      store: store,
      format: 'json',
      reconnection: true,
      reconnectionAttempts: 5
    }
  )
}
