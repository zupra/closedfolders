export default {
  mode: 'spa', // 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:400,500,700&amp;subset=cyrillic'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#47bac1' },
  /*
   ** Global CSS
   */
  css: [{ src: '~assets/main.styl', lang: 'stylus' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vuex-persist.js',
    '~plugins/notification.js',
    '~plugins/socket.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
    // 'nuxt-socket-io'
    // '@nuxtjs/svg',
    // '@nuxtjs/svg-sprite'
  ],

  /*
  io: {
    sockets: [
      {
        name: 'home',
        // url: 'http://localhost:3000',
        // wss://closedfolders.com:8000/?hash=8d8767faa2088be073db234408e6949aa4a940e7
        url: 'wss://closedfolders.com:8000', // ?hash=8d8767faa2088be073db234408e6949aa4a940e7',
        default: true
        // vuex: { // optional
        //   mutations: [{ progress: 'examples/SET_PROGRESS' }], // pass in the evt --> mutation map OR array of actions
        //   actions: [{ chatMessage: 'FORMAT_MESSAGE' }, 'SOMETHING_ELSE'] // pass in the evt --> action map OR array of actions or mixed!,
        //   emitBacks: ['examples/sample', { 'examples/sample2': 'sample2' }] // pass in the state props you want to listen for changes on. When those props thance, they'll fire these "emitBack" events. If the emitBack is a string, it will send the string, otherwise, if it's an object, it will send the mapped string. (see the updated examples in the page/examples.vue, where I also use a "mapState2Way" function in the component).
        // }
      }
    ]
  },
  */

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  svgSprite: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
