<template lang="pug">
.Input_Prepend
  ._prepend {{prepend}}
  input(
    :class="[size]",
    :value="value"
    @change="updateInput"
  )
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: '' //xl
    },
    prepend: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  // data() {
  //   return {}
  // },
  methods: {
    updateInput(e) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style lang="stylus">
.Input_Prepend
  box-shadow 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)
  display inline-flex
  border 1px solid #bdc3c7
  border-radius .3em
  // align-items center
  background #f5f7fa

  input
    box-shadow none !important
    border 0 !important
    border-radius 0 .3em .3em 0 !important

  ._prepend
    flex 1
    display flex
    flex-direction column
    justify-content center
    padding 0 .7em
    border-right 1px solid #bdc3c7
    text-align center
</style>
