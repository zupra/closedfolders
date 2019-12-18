export const state = () => ({
  notice: {
    title: '',
    body: '',
    type: '', //default info
    id: 1
  }
})

export const mutations = {
  setNotice(state, obj) {
    state.notice = {
      ...state.notice,
      ...obj,
      id: +new Date()
    }
  }
}

export const getters = {
  getNotice: (state) => {
    return state.notice
  }
}
