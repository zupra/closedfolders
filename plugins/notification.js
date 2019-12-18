const NOTICE = (title, msg, type = 'info') => ({
  title: title,
  body: msg,
  type: type
  // id: +new Date()
})

export default ({ store }, inject) => {
  inject('notice', (...arg) => {
    store.commit('setNotice', NOTICE(...arg))
    // store.state.user.isDev && store.commit('setNotice', NOTICE(...arg))
    // console.table(NOTICE(...arg))
  })
}
