<template lang="pug">
.Carousel

  .Carousel_lightbox(
    v-show="lightboxActive"
    @click.self="lightboxActive=false; currLightboxImg = currImgIdx"
  )
    img.currImg(:src="imgSize(imgList[currLightboxImg].preview, '_w1200_h800')")
    .prev.ripple(@click="goToImg(currLightboxImg-1)")
    .next.ripple(@click="goToImg(currLightboxImg+1)")

  //-
  .currImg(
    :class="{OBLOZHKA: currImgIdx == 0}"
  )
    img(
      :src="imgSize(imgList[currImgIdx].preview, '_w480_h320')"
      @click="lightboxActive=true"
    )


  //- imgsChunk
  transition-group.CROP_imgsChunk(
    :name="transition_name"
    tag="div"
  )
    .Carousel_chunk(
      v-for="(chunk,i) in arrChunk"
      v-show="currSlide == i"
      :key="chunk[0].fileid"
    )
      //- :style=`width:${(100/chunkSize).toFixed(1)}%;`
      .chunk_item(
        v-for="(item,j) in chunk"
        :key="item.fileid"
        @click="currImgIdx = j+(i*chunkSize)"
        :class="{CURR: item.preview == imgList[currImgIdx].preview}"
      )
        img(:src="imgSize(item.preview, '_w480_h320')")

  .Carousel-Controls(
    v-show="imgList.length > chunkSize"
  )
    svg(
      @click="prev",
      width='48', height='48', viewBox='0 0 24 24',
      fill='#dee2e6', stroke='currentColor',
      stroke-width='2', stroke-linecap='round', stroke-linejoin='round'
    )
      circle(cx='12', cy='12', r='10')
      polyline(points='12 8 8 12 12 16')
      line(x1='16', y1='12', x2='8', y2='12')
    .Carousel-Controls_dot(
      v-for="(dot, i) in arrChunk"
      :class="{CURR : currSlide == i}"
      @click="goToChunk(i)"
    ) {{i+1}}
    svg(
      @click="next",
      width='48', height='48', viewBox='0 0 24 24',
      fill='#dee2e6', stroke='currentColor',
      stroke-width='2', stroke-linecap='round', stroke-linejoin='round'
    )
      circle(cx='12', cy='12', r='10')
      polyline(points='12 16 16 12 12 8')
      line(x1='8', y1='12', x2='16', y2='12')

</template>
<script>
export default {
  name: 'Carousel',
  props: {
    chunkSize: {
      type: Number,
      default: 4
    },
    imgList: {
      type: Array,
      default: () => [{ preview: 'https://imgplaceholder.com/640x360' }]
      // validator: prop => (prop.length ? prop[0].preview : [])
    },
    currChunk: {
      type: Number,
      default: 0
    },
    imgIdx: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // showModal: false,
      transition_name: 'slide_next',
      currSlide: this.currChunk,
      currImgIdx: this.imgIdx,
      lightboxActive: false,
      currLightboxImg: this.imgIdx
    }
  },
  computed: {
    arrChunk() {
      return Array.from(
        { length: Math.ceil(this.imgList.length / this.chunkSize) },
        (v, i) =>
          this.imgList.slice(
            i * this.chunkSize,
            i * this.chunkSize + this.chunkSize
          )
      )
    }
  },
  watch: {
    currImgIdx(newVal) {
      this.currLightboxImg = newVal
    }
  },
  methods: {
    imgSize(SRC, param = '') {
      if (SRC) {
        const splitSrc = SRC.split(/\.(?=[^\\.]+$)/)
        return `${splitSrc[0]}${param}.${splitSrc[1]}`
      } else return null
    },
    prev() {
      this.transition_name = 'slide_prev'
      this.currSlide =
        this.currSlide == 0 ? this.arrChunk.length - 1 : this.currSlide - 1
    },
    next() {
      this.transition_name = 'slide_next'
      this.currSlide =
        this.currSlide == this.arrChunk.length - 1 ? 0 : this.currSlide + 1
    },
    goToChunk(idx) {
      this.transition_name = idx < this.currSlide ? 'slide_prev' : 'slide_next'
      this.currSlide = idx
    },
    goToImg(n) {
      this.currLightboxImg =
        n < 0 ? this.imgList.length - 1 : n % this.imgList.length
    }
  }
}
</script>

<style lang="stylus">
// .ModalImgList
// img
// width 100%
// &_Item
// position relative
// .btn_icon
// position absolute
// right 2px
// top 2px
.CROP_imgsChunk
  height 96px
  overflow hidden
  width 100%
  padding 8px 0

.currImg img
  display block

.Carousel
  width 480px
  .currImg
    cursor pointer
    // width 100%
    // object-fit contain
    position relative
  &_chunk
    display flex
    // justify-content center
    justify-content space-around
    align-items center

.chunk_item
  // flex 1
  height 80px
  margin 2px
  padding 2px
  border 1px solid transparent
  cursor pointer
  &:hover
    border 1px solid #2196f3
  &.CURR
    // outline 3px solid #ed5565
    border-color transparent
    background #fc0 // #477dca
    outline 1px solid
  img
    display inline-block
    height 100%

$W = 2rem
$H = 2rem

.Carousel-Controls
  user-select none
  text-align center
  display flex
  justify-content space-between
  align-items center
  svg:hover
    fill yellow
  &_dot, svg
    cursor pointer

.Carousel-Controls_dot
  border-radius 50%
  width $W
  height $H
  line-height $H
  background-color #477dca
  color #FFF
  font-weight 900
  font-size 1em
  transition transform .3s
  box-shadow 0 3px 10px 1px rgba(0, 0, 0, .3)
  &:hover
    transform scale(1.2, 1.2)
  &.CURR
    cursor default
    color #000
    background-color #dee2e6 // #fc0
    transform scale(.8, .8)

.slide_next-enter-active, .slide_prev-enter-active
  transition transform .2s // cubic-bezier(0.47, 0, 1,-0.96); //ease-out
  // opacity .5

.slide_next-enter
  transform translateX(100%)

// .slide_next-leave-to,
.slide_prev-enter
  transform translateX(-100%)

.Carousel_lightbox
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
  background rgba(#616574, .95) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 10 10' fill='none' stroke-linecap='round' stroke-linejoin='round' stroke='gold'><line x1='4' y1='4' x2='6' y2='6' /><line x1='6' y1='4' x2='4' y2='6' /></svg>") top right no-repeat
  img
    cursor default
    margin auto
    // width: auto
    max-width 90%
    max-height 100%
  .prev, .next
    position absolute
    top 50%
    width 40px
    height 60px
    margin -30px 4% 0
    background #444 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='gold' d='M6,2 L4,5 L6,8'/></svg>") center / cover no-repeat
  .next
    right 0
    background-image url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='gold' d='M4,2 L6,5 L4,8'/></svg>")
</style>
