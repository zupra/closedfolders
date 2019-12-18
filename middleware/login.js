export default function({ store, route, redirect }) {
  if (!store.state.persist.token) {
    return redirect('/login')
  }
}
