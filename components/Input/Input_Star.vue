<template lang="pug">
svg.Input_Star(
  @click="toggle"
  xmlns='http://www.w3.org/2000/svg',
  :width='size',
  :height='size',
  viewBox='0 0 24 24',
  :fill="!isOn ? 'none' : '#ff9800'",
  :stroke="!isOn ? 'currentColor': 'gold'",
  stroke-width='2',
  stroke-linecap='round',
  stroke-linejoin='round'
)
  polygon(points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2')
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '32'
    },
    active: {
      type: [Boolean, Number],
      default: false
    }
  },
  data() {
    return {
      isOn: Boolean(this.active)
    }
  },
  watch: {
    active(val) {
      this.isOn = Boolean(val)
    }
  },
  methods: {
    toggle() {
      this.isOn = !this.isOn
      this.$emit('toggle', Number(this.isOn))
    }
  }
}
</script>

<style lang="stylus">
.Input_Star
  cursor pointer
</style>
