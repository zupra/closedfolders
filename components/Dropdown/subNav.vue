<template lang="pug">

//- v-click-outside="closesubNav"
.subNav(
  :class="{current:isOpen}",
)
  .subNav__trigger.ripple(
    @click="isOpen=!isOpen"
    :class="{open:isOpen}"
  )
    | {{ subnav.name }}

    svg.subNav__trigger-Icon(
      :class="{open:isOpen}",
      width='20',
      height='6',
      viewBox='0 0 40 12'
      stroke='cornflowerblue'
    )
      polyline(points='12,2 20,10 28,2', stroke-width='3', fill='none')
  transition(:name="animation")
    .subNav__list(
      v-show='isOpen'
    )
      template(v-for="navItem in subnav.list")
        //-
          NLink(
            v-if="!Object.keys(navItem).includes('list')"
            :to="'/'+navItem.link",
          ) {{navItem.name}}
          //- level="level_3"
          subNav(
            v-else
            :subnav='navItem'
          )
        subNav(
          v-if="navItem.list"
          :subnav='navItem'
        )
        NLink(
          v-else
          :to="'/'+navItem.link",
        ) {{navItem.name}}


</template>

<script>
export default {
  name: 'SubNav',
  props: {
    subnav: {
      type: Object,
      default: null
    },
    animation: {
      type: String,
      default: 'bounceTop'
      // validator: prop => ['leftToRight', 'bounceTop', 'bottomToTop'].includes(prop)
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  created() {
    // избавляемся от слэшей в начале и конце '/
    const URL = location.pathname.replace(/^\/|\/$/g, '')

    // TODO FIXME вызов в каждой менюхе
    if (this.subnav.list && this.subnav.list.some((El) => El.link == URL))
      this.isOpen = true
  }
  /*
  methods: {
    closesubNav() {
      this.isOpen = false
    }
  }
  */
}
</script>

<style lang="stylus">
// .bottomToTop-enter-active
// animation bottomToTop .5s forwards

// .bottomToTop-leave-active
// animation bottomToTop .5s reverse

// @keyframes bottomToTop
// 0%
// opacity 0
// transform translateX(-100%)

// 100%
// transform translateY(0)
.bounceTop-enter-active
  animation bounceTop .35s both

@keyframes bounceTop
  0%
    transform translateY(-50px)
    animation-timing-function ease-in
    opacity 0
  38%
    transform translateY(2px)
    animation-timing-function ease-out
    opacity 1
  55%
    transform translateY(-12px)
    animation-timing-function ease-in
  81%
    transform translateY(-5px)
    animation-timing-function ease-in
  95%
    transform translateY(-1px)
    animation-timing-function ease-in
  72%, 90%
    transform translateY(1px)
    animation-timing-function ease-out
  100%
    transform translateY(0)
    animation-timing-function ease-out

$activeClr = #4281a4 // #096093 #425862 #1F5E69 #0D5280 #ed5565

.subNav
  background #2e6d90 // #4281a4
  &__trigger
    user-select none
    cursor pointer
    padding .5em .5em .5em 1em
    display flex
    justify-content space-between
    align-items baseline
    z-index 1
    position relative
    &.open
      background $activeClr - 20
      color #f7f7f7
    &:hover
      color #FFF
    &-Icon
      transition transform .2s cubic-bezier(.23, 1, .32, 1)
      &.open
        stroke #FFF // #ed5565 // tomato
        transform rotate(180deg)
  &__list
    // padding .5rem 0 1rem
    // background-color #3c4858 - 10 //#293542
    font-size .9em
    a
      border-left 2px solid $activeClr
      border-bottom 1px solid rgba(#000, .2)
      &:hover
        border-left-color #ec4758 // #ed5565 // red
        // background #673ab780 // #000 //
  &.current
    background inherit // rgba(#000, .2)

.level_3
  font-size .9em
  // color red
</style>
