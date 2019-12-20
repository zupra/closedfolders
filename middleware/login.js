export default function({ store, route, redirect }) {
  // if (!store.state.persist.token)
  if (!localStorage.token) {
    store.commit('SOCKET_ONCLOSE')
    return redirect('/login')
  }
}
