<template lang="pug">
//- @mouseover="isOpen = true"
//- @mouseout="isOpen = false"
.Popover(
  @mouseenter="isOpen = true"
  @mouseleave="isOpen = false"
)
  .Popover__label
    svg(
      width='16', height='16', viewBox="0 0 16 16", fill='currentColor'
    )
      path(d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z")
    //- | &#x202F;
    | &nbsp;
    span {{label}}

  //- transition(:name="animation")
  .Card.Popover__body(
    v-show='isOpen'
    :class="{openAnim:isOpen}"
  )
    slot
</template>

<script>
export default {
  props: {
    label: {
      type: [String, Number],
      default: 'info'
    }
    /*
    animation: {
      type: String,
      default: 'rightToLeft'
      // validator: prop => ['leftToRight', 'bounceIn', 'bottomToTop'].includes(prop)
    }
    */
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="stylus">
.Popover
  display inline-block
  position relative
  &:hover .Popover__label
    // text-decoration underline
    // background #FFF // #dee2e6
    // border-radius .3em .3em 0 0
    // box-shadow 0 0 .3rem rgba(#000, .3)
    color #477dca // #26a69a
    // border-bottom-color #477dca
  &__label
    padding 0 .5rem
    cursor pointer
    color #3498db
    display flex
    align-items center
    border-bottom 1px solid transparent
  &__body
    padding .5rem
    position absolute
    // top 100%
    z-index 1
    // border 1px solid #3498db
    width min-content
    pre
      width 300px
      margin 0
      white-space normal
      word-break break-all
      // hyphens: none


// FIX!
table .Popover__body
  right 0

.openAnim
  transform-origin top
  animation openAnim .3s cubic-bezier(.175, .885, .32, 1.275)

@keyframes openAnim
  0%
    transform rotateX(-100deg)
    opacity 0
  100%
    transform rotateX(0deg)
    opacity 1
</style>
