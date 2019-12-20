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
    '~plugins/socket.js',
    '~plugins/click-outside.js',
    '~plugins/notification.js'
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
  ],

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
