import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  return new VuexPersistence({
    key: 'persist',
    modules: ['persist']
    // storage: sessionStorage
  }).plugin(store)
}
