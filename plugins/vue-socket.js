import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

const options = {
  transports: ['websocket']
}

export default ({ store }) => {
  const socket = new VueSocketIO({
    debug: true,
    // connection: SocketIO(
    //   'wss://closedfolders.com:8000/?hash=8d8767faa2088be073db234408e6949aa4a940e7',
    //   options
    // ),
    connection:
      'wss://closedfolders.com:8000/?hash=8d8767faa2088be073db234408e6949aa4a940e7',
    vuex: {
      store
    }

    // options: {
    //   transports: ['websocket']
    // }
  })

  Vue.use(socket)

  console.log('IO', socket)
}
