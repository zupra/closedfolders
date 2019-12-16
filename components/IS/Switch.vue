<template lang="pug">
.Input_Switch(
  @click.stop="toggle",
  :class="{off: !isOn}"
)
  .Input_Switch__label {{ isOn ? 'ON':'OFF'}}
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        active: true
      })
    }
  },

  data() {
    return {
      boolState: Boolean(this.data.active)
    }
  },
  computed: {
    isOn: {
      get() {
        return this.boolState
      },
      set(v) {
        return (this.boolState = v)
      }
    }
  },

  /*
  watch: {
    'data.active'(val) {
      this.isOn = Boolean(val)
      //immediate: true
    }
  },
  */
  methods: {
    toggle() {
      this.isOn = !this.isOn
      this.$emit('input', Number(this.isOn))
    }
  }
}
</script>

<style lang="stylus">
$blue = #3498db
$red = #ed5565
$size = 1.5rem

.Input_Switch
  // box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  box-shadow 0 2px 10px -2px rgba(0, 0, 0, .3)
  margin-right 4px
  cursor pointer
  user-select none
  background $blue + 80%
  // height $size
  width $size * 2
  border 2px solid $blue + 70% // transparent
  border-radius $size
  display inline-flex
  text-align left // reset center from parent
  flex-direction column
  justify-content center
  &.off
    background-color $red + 85%
    border-color $red + 80%
    .Input_Switch__label
      background $red
      align-self flex-end
  &__label
    width $size
    height $size
    font-size .6rem
    background $blue
    color #FFF
    border-radius 50%
    // display: flex;
    // align-items: center;
    // justify-content: center;
    line-height $size
    text-align center
</style>
