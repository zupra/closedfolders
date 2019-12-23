export default function({ store }) {
  store.app.router.beforeEach((to, from, next) => {
    // store.state.socket.message = ''
    store.commit('SOCKET_ONMESSAGE', '')
    next()
  })
}
