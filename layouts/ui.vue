<template lang="pug">

#layout


  #topNav
    #burger.ml_2
      svg(
          @click="showSidebar = !showSidebar",
          width='80',
          height='44',
        )
        rect(x="14", y="6", width="30", height="32", fill="rgba(255, 255, 255, .2)")
        g(stroke='white', stroke-width='4')
          path(d='M8,14 L36,14')
          path(d='M8,22 L30,22')
          path(d='M8,30 L24,30')
        polyline(v-if="showSidebar", points="50,10 36,22 50,34", fill="lightsteelblue")


    div
      Dropdown(openTo="toLeft")
        button(slot="btn") Radio
        Radio


  transition(name="slideSidebar")
    #sidebar(v-show="showSidebar")
      .scrollableArea

        nav
          nuxt-link(to="/")
            svg(width="26", height="24")
              path(d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z")
            | Home

        //-
        nav
          h4 Принципы

          //- :to="{ path:'/UI', hash:`#${hash}`}"
          //- :href="`/UI#${hash}`"
          a(
            v-for="hash,i in hashNav",
            :href="`/UI#${hash}`"
            :key="i"
            :class="{hashActive:i == hashActive}"
            @click="hashActive = i"
          ) {{hash}}


        nav
          h4 Принципы

          //- :to="{ path:'/UI', hash:`#${hash}`}"
          //- :href="`/UI#${hash}`"
          a(
            v-for="hash,i in hashNav",
            :href="`/UI#${hash}`"
            :key="i"
            :class="{hashActive:i == hashActive}"
            @click="hashActive = i"
          ) {{hash}}

        nav
          h4 тестовые страницы
          nuxt-link(v-for="link in pages", :to="link.url", :key="link.url" ) {{link.name}}
        //- nav
        //-   h3 test megaMenu
        //-   each _,i in Array(30)
        //-     a(href="#") link #{i+1}
        br

  //- MAIN
  #main
    .scrollableArea
      <nuxt/>

</template>

<script>
import Radio from '~/components/Radio.vue'
import Dropdown from '~/components/Dropdown/Dropdown.vue'

const hashNav = [
  'Цвет',
  'Spacing',
  'Shadow',
  'Buttons',
  'Typography',
  'Иконки',
  'Table',
  // 'MaskedInput',
  'Input_Prepend',
  'Input_ReadonlyTgl',
  'Input_Star',
  'Input_Number',
  'Input_Switch',
  'Dropdown',
  'UiSelect',
  'BigSelect_many',
  'Pagination',
  'Card',
  'Calendar',
  'Modal',
  'Expander',

  'Checkbox-Radio',
  'Input-EL',
]

export default {
  // middleware: 'user',
  components: {
    Radio,
    Dropdown
  },
  data () {
    return {
      hashNav,
      hashActive: null,
      showSidebar: true,
      pages: [
        { url: '/test_WS', name: 'WS' },
        { url: '/test_imgCropper', name: 'image Cropper' },
        { url: '/test_notice', name: 'Notice list' },
        { url: '/test_valid', name: 'Валидация форм' },
        { url: '/test_grid', name: 'Grid' }
      ]
    }
  }
}
</script>

<style lang="stylus">


$header = #3c4858
$header_text= #C7CEDE


#sidebar .hashActive
  color #FFF
  background cornflowerblue
//=============



$zIndex = 10

.slideSidebar-enter-active, .slideSidebar-leave-active
  transition transform .4s

.slideSidebar-enter, .slideSidebar-leave-active
  transform translateX(-100%) // - 24em

.scrollableArea
  height 100%
  overflow-y auto
  // overflow-y: scroll;
  -webkit-overflow-scrolling touch
  // хром, сафари
  &::-webkit-scrollbar
    width 0
  // ie 10+
  &
    -ms-overflow-style none

#layout
  display flex

#sidebar, #main
  height 100vh

#main
  // !!!
  // min-width: 375px;
  flex 1
  width 100%
  overflow hidden
  background #f7f7f7
  // @media (max-width: 800px)

// TopBar
#topNav
  box-shadow 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12)
  position fixed
  top 0
  left 0
  // position: sticky;
  width 100%
  z-index $zIndex + 1
  height 44px
  background #777
  display flex
  justify-content space-between
  align-items center
  padding-right 6px
  // color #FFF

#burger
  display flex
  &:hover
    rect
      fill #3c4858
  svg
    margin auto
    cursor pointer
    user-select none

$sidebar()
  @media (max-width: 800px)
    position absolute
  z-index $zIndex
  width 220px
  padding-top 44px // 3em
  background $header
  color $header_text
  line-height 1
  font-family "Roboto Condensed", sans-serif
  // text-indent 1em
  font-size 1.1rem

#sidebar
  $sidebar()
  .link, a
    color $header_text
    text-decoration none
    display block
    // &:hover
    // color #2196f3
    &:hover
      color #FFF
  a, h3, h4
    padding .5em
    padding-left 1em
  h3, h4
    margin 0 0 .3rem
  nav
    padding 1em 0
  .nuxt-link-exact-active
    background #000 //#173342 // #6843B0 // rgba(#000, .3)
    // text-decoration underline
    color #FFF
    font-weight bold
  svg
    vertical-align bottom // middle
    fill currentColor

</style>
