<template lang="pug">
.LightboxImg(v-show='show', @click.self='close')
  img.LightboxImg_spinner(
    src="~/static/img/LightboxImg_spinner.svg"
  )
  //- :src="imgSize(imgSrc, '_w1080_h1080')"
  img(
    v-show="IMG"
    :src="imgSrc"
  )
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      IMG: ''
    }
  },
  watch: {
    show(show) {
      show === false ? (this.IMG = '') : (this.IMG = this.imgSrc)
    }
  },
  methods: {
    imgSize(SRC, param = '_w1080_h1080') {
      if (SRC) {
        const splitSrc = SRC.split(/\.(?=[^\\.]+$)/)
        return `${splitSrc[0]}${param}.${splitSrc[1]}`
      } else return null
    },
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="stylus">
.LightboxImg
  cursor pointer
  user-select none
  position fixed
  z-index 11
  top 0
  left 0
  width 100%
  height 100%
  display flex
  // background //rgba(#000, .7)
  background rgba(#616574, .7) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 10 10' fill='none' stroke-linecap='round' stroke-linejoin='round' stroke='gold'><line x1='4' y1='4' x2='6' y2='6' /><line x1='6' y1='4' x2='4' y2='6' /></svg>") top right no-repeat
  img
    cursor default
    margin auto
    // width: auto
    max-width 90%
    max-height 100%
  &_spinner
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    z-index -1
</style>
