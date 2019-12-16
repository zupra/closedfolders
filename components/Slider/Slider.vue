<template lang="pug">
.center.Slider
  .Slider_slide(
    v-for='(slide, idx) in slides'
    :key="idx"
    v-show='idx == active'
  )
    img(
      :src="imgSize(slide.preview)"
    )

  //- :disabled="slides.length <= 1"
  .Slider_nav(
    v-show="slides.length && slides.length > 1"
  )
    .btn_icon(@click="move(active-1)")
      svg(xmlns='http://www.w3.org/2000/svg', width='24', height='24', viewBox='0 0 24 24', fill='none', stroke='currentColor', stroke-width='2', stroke-linecap='round', stroke-linejoin='round')
        circle(cx='12', cy='12', r='10')
        polyline(points='12 8 8 12 12 16')
        line(x1='16', y1='12', x2='8', y2='12')
    b {{ active + 1}}/{{ slides.length + ' '}}
    .btn_icon(@click="move(active+1)")
      svg(xmlns='http://www.w3.org/2000/svg', width='24', height='24', viewBox='0 0 24 24', fill='none', stroke='currentColor', stroke-width='2', stroke-linecap='round', stroke-linejoin='round')
        circle(cx='12', cy='12', r='10')
        polyline(points='12 16 16 12 12 8')
        line(x1='8', y1='12', x2='16', y2='12')
</template>
<script>
export default {
  name: 'Slider',
  props: {
    slides: {
      type: Array,
      default: () => []
      // validator: prop => (prop.length ? prop[0].preview : [])
    },
    height: {
      type: String,
      default: ''
    },
    imgSizeParam: {
      type: String,
      default: '_w295_h295'
    }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    imgSize (SRC) {
      if (SRC) {
        const splitSrc = SRC.split(/\.(?=[^\\.]+$)/)
        return `${splitSrc[0]}${this.imgSizeParam}.${splitSrc[1]}`
      } else {return null}
    },
    move (amount) {
      this.active = (amount + this.slides.length) % this.slides.length
    }
  }
}
</script>

<style lang="stylus">
.Slider
  position relative
  &_slide
    height 100%
    img
      display block
      width 100%
  &_nav
    position absolute
    top 0
    right 0
    color #FFF
    background rgba(#000, .7)
    padding .5rem
    // b
    // display inline-block
    // width 4em
</style>
