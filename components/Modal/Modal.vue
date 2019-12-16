<template lang="pug">
.Modal-rootOverlay(v-show='show', @click.self='close')
  .Modal-Card(:class='[mod, position]')
    .title(v-if='title') {{ title }}
    .slot_Title(v-if='$slots.title')
      slot(name='title')
    .body
      slot
    .actions
      slot(name='actions')
        button.btn(
          v-show="!freezing"
          @click='close'
        ) Закрыть

</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    freezing: {
      type: Boolean,
      default: false
    },
    mod: {
      type: String,
      default: null
      // ['XL','SM','toCenter']
    },
    title: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: 'Y_center',
      validator: prop => ['Y_center', 'rModal', 'lModal'].includes(prop)
    }
  },
  // watch: {
  //   show(isShow) {
  //     document.body.style.cssText = isShow
  //       ? 'height:100vh;overflow:hidden;'
  //       : ''
  //   }
  // },
  methods: {
    close() {
      !this.freezing && this.$emit('update:show', false)
      // document.body.style = ''
    }
  }
}
</script>

<style lang="stylus">
$bg = #f1f1f1

.slot_Title
  padding 1rem
  // reset
  *
    margin 0 4px

.rModal, .lModal
  .slot_Title *
    margin 1rem 0

.Modal
  &-rootOverlay
    z-index 100
    position fixed
    left 0
    top 0
    width 100% // 100vw
    height 100vh
    display flex
    cursor pointer
    background rgba(#444 .7)
    overflow hidden
    overflow-y overlay // auto
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
  &-Card
    // reset rootOverlay
    cursor auto
    background #FFF

.Modal-Card
  .title
    font-size 1.4rem
    line-height 1.3
    padding .75rem 1.5rem
    // border-radius .2em 0 0
  .body
    background #f7f7f7
    padding 1rem 1.5rem
    // line-height 1.2rem
  .actions
    // padding: .75rem 1.5rem 1.2rem
    text-align right
    padding 1rem 1.2rem
  // props:mod
  &.XL
    max-width 1340px
    margin auto
  &.SM
    max-width 460px
  &.toCenter
    margin auto

// props:position
.Y_center
  // max-height 70vh
  margin 10% auto auto
  border-radius .2em
  width 90%
  max-width 780px
  transform scale(.5)
  opacity 0
  animation Y_center .3s cubic-bezier(.25, .46, .45, .94) forwards // ease-in

@keyframes Y_center
  to
    transform scale(1)
    opacity 1

.lModal, .rModal
  // overflow overlay
  // padding 0 1em 1em
  max-width 400px
  // FIX
  align-self start
  min-height 100%
  animation translateX .3s cubic-bezier(.25, .46, .45, .94) forwards // ease-in

.rModal
  margin-left auto
  transform translateX(100%)

.lModal
  margin-right auto
  transform translateX(-100%)

@keyframes translateX
  to
    transform translateX(0)
</style>
