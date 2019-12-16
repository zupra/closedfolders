<template lang="pug">
  Carousel(
    :imgList="imgList"
    :imgIdx="15"
  )
</template>

<script>
import Carousel from '~/components/Slider/Carousel.vue'

const imgList = Array.from({ length: 33 }, (v, i) => ({
  src: `//raw.githubusercontent.com/codrops/HoverEffectIdeas/master/img/${i +
    1}.jpg`,
  fileid: i
}))

export default {
  components: {
    Carousel
  },
  data() {
    return {
      imgList: imgList
    }
  }
}
</script>
