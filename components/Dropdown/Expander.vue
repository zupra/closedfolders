<template lang="pug">
.Expander

  .Expander__header.flex.y_center.x_sb(
    :class="isOpen?'active':'beforeBorder'"
  )

    .Trigger.fr.flex.y_center(
      @click="isOpen=!isOpen",
    )
      svg.Trigger-Icon(
        :class="{open:isOpen}", width='40', height='12', stroke='cornflowerblue'
      )
        polyline(points='12,2 20,10 28,2', stroke-width='3', fill='none')
      div(
        :class="{bold: isOpen}"
      ) {{ title }}


    slot(
      name="expander_label"
    )

  transition(:name="animation")
    .Expander__body(v-show='isOpen')
      slot
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number],
      default: 'title'
    },
    animation: {
      type: String,
      default: 'rightToLeft'
      // validator: prop => ['leftToRight', 'bounceIn', 'bottomToTop', 'fade'].includes(prop)
    }
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.beforeBorder
  position relative
  &:before
    transition opacity .1s linear, transform .5s ease-in-out
    position absolute
    border-bottom 1px solid currentColor
    content ""
    width 100%
    left 0
    bottom -1px
  &:not(:hover)::before
    transform scaleX(0)
    opacity 0





.Expander
  // overflow hidden
  &__header
    border-bottom 1px solid #efefef
    // padding .7rem .5rem
    height 2.8em
    &.active
      color #333 // tomato
      font-weight bold
      border-bottom-color #477dca

  &__body
    padding 1rem //1.5rem
    background #eff0f2 // #dee2e6 //#f1f1f1
    box-shadow inset 0px 5px 4px -4px #b1b1b1
    border-bottom 2px ridge #e4ecff // #eff0f2 - 20%



.Trigger
  user-select none
  cursor pointer
  padding 0 .5rem
  height 100%
  &:hover
    color #477dca
  &-Icon
    transition transform .2s cubic-bezier(.23, 1, .32, 1)
    &.open
      stroke tomato
      transform rotate(180deg)



.rightToLeft-enter-active
  animation rightToLeft .5s

.rightToLeft-leave-active
  animation rightToLeft .5s reverse

@keyframes rightToLeft
  0%
    transform translateX(100vw)
  50%
    transform translateX(-2em)
  100%
    transform translateX(0)

.leftToRight-enter-active
  animation leftToRight .5s

.leftToRight-leave-active
  animation leftToRight .5s reverse

@keyframes leftToRight
  0%
    transform translateX(-100vw)
  50%
    transform translateX(2em)
  100%
    transform translateX(0)

.bounceIn-enter-active
  animation bounceIn .3s

.bounceIn-leave-active
  animation bottomToTop .2s reverse

@keyframes bounceIn
  from, 20%, 40%, 60%, 80%, to
    animation-timing-function cubic-bezier(.215, .61, .355, 1)
  0%
    opacity 0
    transform scale3d(.3, .3, .3)
  20%
    transform scale3d(1.1, 1.1, 1.1)
  40%
    transform scale3d(.9, .9, .9)
  60%
    opacity 1
    transform scale3d(1.03, 1.03, 1.03)
  80%
    transform scale3d(.97, .97, .97)
  to
    opacity 1
    transform scale3d(1, 1, 1)

.bottomToTop-enter-active
  animation bottomToTop .5s forwards

.bottomToTop-leave-active
  animation bottomToTop .5s reverse

@keyframes bottomToTop
  0%
    opacity 0
    transform translateY(100%)
  100%
    transform translateY(0)


.fade-enter-active
  animation fade .3s forwards
.fade-leave-active
  animation fade .3s reverse

@keyframes fade
  0%
    opacity 0
    transform scale(.5)
  100%
    transform scale(1)
</style>
