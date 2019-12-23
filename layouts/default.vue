<template lang="pug">
.grid

  Modal(
    :show.sync="showModal_folderCreate",
    mod="SM toCenter",
    title="add new Folder"
  )
    p add new Folder
    .flex_col
      input.xl(
        v-model="foldername"
        placeholder="foldername"
      )
    .flex.x_end.y_center(slot="actions")
      .btn.lg(
        @click="folder_create(); showModal_folderCreate = false"
      ) new Folder



  Modal(
    :show.sync="showModal_fileUpload",
    mod="toCenter",
    title="add new File"
  )
    p add new File
      <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
    .flex.x_end.y_center(slot="actions")
      .btn.lg(
        @click="showModal_fileUpload = false"
      ) file Upload



  header.header.flex.x_sb.y_center.px_3



    svg#hamburger(
        @click="showSidebar = !showSidebar",
        width='44',
        height='44',
        stroke='#495057',
        stroke-width='4',
        stroke-linecap='round',
      )
        path(d='M8,14 L26,14')
        path(d='M8,22 L32,22')
        path(d='M8,30 L24,30')


    input.lg.Search(
      placeholder="Search files..."
    )

    div
      .btn_icon.fill.green(
        @click="showModal_folderCreate = true"
      ) &nbsp;
        svg.icon(
          
          width="24px",
          height="24px",
        )
          use( v-bind="{'xlink:href': require('../assets/sprite/svg/feaver.svg')+'#folder-plus'}", stroke="#FFF" )
        | &nbsp; add Folder &nbsp;

      .btn_icon(
        @click="showModal_fileUpload = true"

      ) &nbsp;
        svg.icon(
          width="24px",
          height="24px",
        )
          use( v-bind="{'xlink:href': require('../assets/sprite/svg/feaver.svg')+'#upload'}", stroke="#FFF" )
        | &nbsp; Upload &nbsp;



  //- transition(name="slideSidebar")
  aside.sidebar(
    :class="{show:showSidebar}"
  )
    .clickedArea(
      @click="showSidebar = !showSidebar",
    )

    center
      div socket connected:
        b {{socket.isConnected}}


    .flex.my_4
      N-link.m_auto.flex.y_center(
        to="/"
      )
        //- use(xlink:href='#archive', stroke-width="2", stroke="#47bac1")
        //- v-bind="{'xlink:href':`#${item.icon}`}"
        //- v-bind="{'xlink:href':`../static/svg_sprite/feaver.svg#inbox`}"
        svg.icon(height="24px", width="24px")
          use( 
            v-bind="{'xlink:href': require('../assets/sprite/svg/feaver.svg')+'#archive'}",
            stroke="#47bac1"
          )
        | &nbsp; closedfolders




    .expand

      .ml_4.flex.y_start
        svg.icon.mr_3(height="36px", width="36px")
          //- use(xlink:href="#user")
          use( 
            v-bind="{'xlink:href': require('../assets/sprite/svg/feaver.svg')+'#user'}",
            stroke="#47bac1"
          )
        div
          .text_x2 name
          .text_x1 name


      .subList(v-for="item in navInner")
        N-link.flex.y_start(
          v-if="item.name !== 'LogOut'"
          :to="item.link"
        )
          svg.icon.mr_3(height="24px", width="24px")
            use( 
              v-bind="{'xlink:href': require('../assets/sprite/svg/feaver.svg')+`#${item.icon}`}"
            )
          div {{item.name}}

        a.flex.y_start(
          href="#"
          v-else
          @click.prevent="$store.commit('SOCKET_ONCLOSE');$router.push('/login')"
        )
          svg.icon.mr_3(height="24px", width="24px")
            //- v-bind="{'xlink:href':`#${item.icon}`}"
            use(
              v-bind="{'xlink:href': require('../assets/sprite/svg/feaver.svg')+`#${item.icon}`}",
              stroke="#CCC"
            )
          div {{item.name}}


    .nav(v-for="item in nav")
      N-link.flex.y_start(
        to="/"
      )
        svg.icon.mr_3(height="36px", width="36px")
          use(
            v-bind="{'xlink:href': require('../assets/sprite/svg/feaver.svg')+`#${item.icon}`}",
            stroke-width="1"
          )
        div
          div {{item.name}}
          small.text_sm2 {{item.dscr}}



  main.main
    <nuxt />



  footer.footer.px_3.flex.y_center.x_sb
    | © 2019 closedfolders
    nav
      N-link.ml_3(
        v-for="V,K in { Support:'/', Policy:'/', Terms:'/', Contacts:'/' }"
        to="/"
      ) {{K}}

</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import { mapState } from 'vuex'
import Modal from '~/components/Modal/Modal.vue'

export default {
  middleware: ['login', 'clear-socket-msg'],

  // middleware({ store }) {
  //   store.app.router.beforeEach((to, from, next) => {
  //     if (confirm('Are you sure?')) {
  //       next()
  //     } else {
  //       next(false)
  //     }
  //   })
  // },

  components: {
    Modal,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: `/upload/?folder_id=41`,
        thumbnailWidth: 150
        // maxFilesize: 0.5,
        // headers: { "My-Awesome-Header": "header value" }
      },
      showSidebar: false,
      showModal_folderCreate: false,
      showModal_fileUpload: false,
      nav: [
        {
          icon: 'inbox',
          name: 'Files',
          dscr: 'Your files and folders',
          link: '/'
        },
        {
          icon: 'share-2',
          name: 'Shares',
          dscr: 'Your shared folders',
          link: '/'
        },
        {
          icon: 'folder-plus',
          name: 'Folder',
          dscr: 'create new folder',
          link: '/'
        },
        {
          icon: 'upload',
          name: 'Upload',
          dscr: 'Upload new files',
          link: '/'
        }
      ],

      navInner: [
        {
          icon: 'settings',
          name: 'General',
          link: '/account'
        },
        {
          icon: 'shield',
          name: 'Security',
          link: '/account/security'
        },
        {
          icon: 'sliders',
          name: 'Plan',
          link: '/account/plan'
        },
        {
          icon: 'credit-card',
          name: 'Billing',
          link: '/account/billing'
        },
        {
          icon: 'log-out',
          name: 'LogOut',
          link: '/'
        }
      ],
      foldername: ''
    }
  },
  computed: {
    ...mapState(['socket'])
  },

  beforeMount() {
    console.log('######options', this.$options.sockets)

    this.$options.sockets.onopen = () =>
      this.$socket.sendObj({ cmd: 'folders' })

    this.$options.sockets.onclose = () => {
      // this.$disconnect()
      this.$notice('disconnect', result.message.text)
      this.$router.replace('/login')
    }
    // this.$connect(`wss://closedfolders.com:8001/?hash=${localStorage.token}`)
    // this.$options.sockets.onmessage = (data) => console.dir(data)
    this.$options.sockets.onmessage = (data) => console.info('INFO', data.data)
  },

  methods: {
    folder_create() {
      if (this.socket.isConnected) {
        this.$socket.sendObj({
          cmd: 'folder_create',
          foldername: this.foldername
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

$height-header = 50px;
$height-footer = 50px;

$width-sidebar = 240px;
$bg-sidebar = #354052
$MW = 46em

/*
.slideSidebar-enter-active, .slideSidebar-leave-active
  transition transform .4s
.slideSidebar-enter, .slideSidebar-leave-active
  transform translateX(-100%)
*/


#hamburger
  display none
  cursor pointer
  transition: stroke .1s ease-in-out,color .1s ease-in-out;
  &:hover
    stroke #47bac1;


scrollableArea()
  // height 100%
  overflow-y auto
  // overflow-y: scroll;
  -webkit-overflow-scrolling touch
  // хром, сафари
  &::-webkit-scrollbar
    width 0
  // ie 10+
  &
    -ms-overflow-style none

.sidebar
.main
  scrollableArea()


.grid
  display: grid;
  height: 100vh;
  overflow-x: hidden; // for hidden sidebar
  background #F5F9FC

  grid-template-columns: $width-sidebar 1fr
  grid-template-rows: $height-header 1fr $height-footer;
  grid-template-areas:
    'sidebar header'\
    'sidebar main'\
    'sidebar footer';

  @media (max-width: $MW)
    #hamburger
      display block
    grid-template-columns: 1fr //calc(100% - $width-sidebar);
    grid-template-areas:
      'header'\
      'main'\
      'footer';

    .sidebar
      height 100%
      width: $width-sidebar;
      transform: translateX(-240px);
      position fixed
      transition: transform .35s //ease-in-out;
      z-index 10
      overflow: visible;
      ov
      &.show
        transform: translateX(0);
        .clickedArea
          transition: background-color .3s .2s
          cursor pointer
          position: fixed;
          left: 240px;
          right: 0;
          width: calc(100vw - 240px);
          background: #3c485885;
          height: 100%;
          filter: blur(80px);




.header
  grid-area: header;
  background #FFF
  // box-shadow: 0 0 2rem 0 rgba(53,64,82,.1);
  box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);

.main
  grid-area: main;

.footer
  grid-area: footer;
  background: #FFF;
  border-top: 1px solid #dee2e6;


.sidebar
  grid-area: sidebar;
  background-color: $bg-sidebar;
  color #ced4da
  a
    color #ced4da
    // padding 1em .7em
    text-decoration none


.nav
  a

    padding 1em
  // .icon
  //   width: 36px;
  //   height: 36px;
  small
    color #6c757d


.subList
  a
    padding 1em //.7em
    padding-left 1.8em
    color #adb5bd

.expand
  // .nuxt-link-active
  .nuxt-link-exact-active
    background rgba(#CCC, 0.2)



.icon
  // width: 24px;
  // height: 24px;
  /*  fill: currentColor;*/
  fill: none;
  stroke: rgba(#FFF, .3) //currentColor;
  stroke-width: 2;
  // stroke-linecap: round;
  // stroke-linejoin: round;




.Page
  margin 1em 2em
</style>
