<template lang="pug">
center.SliderExtend
  .Card.SliderExtend_slideView(
    :class="{noImg:!slides.length}"
    :style="`height: ${h}`"
  )
    .SliderExtend_slide(
      v-for='(slide, idx) in slides'
      :key="idx"
      v-show='idx == CURR'
    )
      img(
        :src="imgSize(slide.preview)"
      )
      //-
        @click="slides.splice(idx, 1)"
        .Slider_slide_DEL.btn_icon.red(
          @click="$emit('delslide', idx)"
        )
          img(src="~static/icon/del.svg")

      .SliderExtend_slide_ACTIONS
        Dropdown
          .sm.btn.red(
            slot="btn"
            slot-scope="{open}"
            :class="open ? 'fill' : 'outline'"
          ) удалить ФОТО
          .Dropdown_body
            p Удалить ?
            .flex.x_end
              .btn.fill.red(@click="$emit('delslide', idx); $el.click()") Удалить

        Dropdown(
          v-if="hasAction && !slide.status"
        )
          .sm.btn.blue(
            slot="btn"
            slot-scope="{open}"
            :class="open ? 'fill' : 'outline'"
          ) {{hasAction}}
          .Dropdown_body
            p {{hasAction}} ?
            .flex.x_end
              .btn.fill(@click="$emit('action', {id:slide.id}); $el.click()") {{hasAction}}



  //- :disabled="slides.length <= 1"
  .SliderExtend_nav(
    v-show="slides.length > 1"
  )
    .btn_icon(@click="move(CURR-1)")
      svg(xmlns='http://www.w3.org/2000/svg', width='32', height='32', viewBox='0 0 24 24', fill='none', stroke='currentColor', stroke-width='2', stroke-linecap='round', stroke-linejoin='round')
        circle(cx='12', cy='12', r='10')
        polyline(points='12 8 8 12 12 16')
        line(x1='16', y1='12', x2='8', y2='12')
    b {{ CURR + 1}}/{{ slides.length }}
    .btn_icon(@click="move(CURR+1)")
      svg(xmlns='http://www.w3.org/2000/svg', width='32', height='32', viewBox='0 0 24 24', fill='none', stroke='currentColor', stroke-width='2', stroke-linecap='round', stroke-linejoin='round')
        circle(cx='12', cy='12', r='10')
        polyline(points='12 16 16 12 12 8')
        line(x1='8', y1='12', x2='16', y2='12')




</template>
<script>
import Dropdown from '~/components/Dropdown/Dropdown.vue'

export default {
  name: 'SliderExtend',
  components: {
    Dropdown
  },
  props: {
    slides: {
      type: Array,
      default: () => []
      // validator: prop => (prop.length ? prop[0].preview : [])
    },
    h: {
      type: String,
      default: null
    },
    active: {
      type: Number,
      default: 0
    },
    hasAction: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      CURR: this.active
    }
  },
  methods: {
    imgSize(SRC, param = '_w480_h360') {
      if (SRC) {
        const splitSrc = SRC.split(/\.(?=[^\\.]+$)/)
        return `${splitSrc[0]}${param}.${splitSrc[1]}`
      } else return null
    },
    move(amount) {
      this.CURR = (amount + this.slides.length) % this.slides.length
    }
  }
}
</script>

<style lang="stylus">
.SliderExtend
  position relative
  // height calc(100% - 3em) // 100%
  &_slideView
    position relative
    overflow auto
    margin-bottom .7rem
    background #EEE url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC")
  &_slide
    // height 500px // calc(100% - 3em)
    img
      display block
      width 100%
  &_slide_ACTIONS
    position absolute
    left 4px
    top 4px
  &_nav
    color #FFF
    bottom 0
    position absolute
    background rgba(#000, .5)
    padding .5rem
    b
      display inline-block
      width 4em

.SliderExtend .noImg
  background url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text text-anchor='middle' alignment-baseline='middle' x='50%' y='50%' font-weight='bold'>no img</text></svg>") center no-repeat
</style>
