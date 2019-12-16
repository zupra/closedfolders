<template lang="pug">
.Ui-select(v-click-outside="close")
  input.Ui-select_input(:class="[size]", :value="!selectedOption ? placeholder : selectedOption.label", readonly, @click.stop="isOpen=!isOpen")

  transition(v-if="ripple" name="rippleEffect")
    ul.Ui-select_list.Card_list(v-show="isOpen")
      li(v-for="(option,i) in options", @click="setOption(option,i)", :class="{selected: i == selected}")
        | {{ option.label }}
  ul.Ui-select_list.Card_list(
    v-else
    v-show="isOpen"
  )
    li(
      v-for="option,i in options",
      @click="setOption(option)",
      :class="{selected: i == selected}"
    ) {{ option.label }}
</template>

<script>
export default {
  props: {
    options: {
      required: true,
      type: Array // { label: String, value: Any}
    },
    selected: {
      type: [Number, String], //Object,
      default: null
    },
    size: {
      type: String,
      default: '' //xl,lg,sm
    },
    placeholder: {
      type: String,
      default: 'Выберите элемент'
    },
    ripple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedOption: this.options[this.selected],
      isOpen: false
    }
  },
  methods: {
    setOption(option) {
      this.selectedOption = option
      this.$emit('option', option.value)
      this.isOpen = false
    },
    close() {
      this.isOpen = false
    }
  }
}
</script>

<style lang="stylus">
// delay for rippleEffect
.rippleEffect-leave-active
  transition opacity .3s

.Ui-select
  user-select none
  display inline-block
  position relative
  &_input
    background #fff url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='12'><polygon points='0,0 12,0 6,12' fill='orange'/></svg>") 100% no-repeat
    cursor pointer
    padding-right 22px !important
  &_list
    position absolute
    z-index 1
    width 100%
</style>
