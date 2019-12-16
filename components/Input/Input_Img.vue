<template lang="pug">
label.Input_Img(
  title="Загрузить изображение"
) {{label}}
  input(
    style="display: none;"
    type="file"
    ref="fileInput"
    @change="handleFileUpload"
  )
  figure
    img(
      v-if="preview || previewImg"
      style="width: 100%;"
      :src="previewImg ? previewImg.src : preview"
    )
    .Input_Img_background(
      v-else
    )
      svg(
        :viewBox="`0 0 ${width} ${height}`"
        style="background: #e5e5e5"
      )
        text(
          text-anchor="middle"
          alignment-baseline="middle"
          x="50%" y="46%"
          font-weight="bold"
          fill="currentColor"
        ) выбрать
          tspan(
            x="50%"
            dy="1.4em"
          ) IMG

    figcaption.center.Input_Img_figcaption(
      v-if="previewImg"
    )
      | {{previewImg.size}} &nbsp;
      .sm.btn.outline.red(
        @click.prevent="resetUploadImg"
      ) RESET
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    preview: {
      type: [Boolean, String],
      default: null
    },
    width: {
      type: [String, Number],
      default: 480
    },
    height: {
      type: [String, Number],
      default: 360
    }
  },
  data() {
    return {
      previewImg: null
    }
  },
  watch: {
    // preview(needImg) {
    //   //if (hasImg)
    //   // this.resetUploadImg()
    //   if (needImg == null) {
    //     this.previewImg = null
    //     this.resetUploadImg()
    //   }
    // }
    preview(newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        // this.previewImg = null
        this.resetUploadImg()
      } else if (newVal == null) {
        this.previewImg = null
      }
    }
  },
  methods: {
    handleFileUpload(e) {
      /*
      this.file = this.$refs.fileInput.files[0]
      console.log(e, this.$refs)
      */
      const files = e.target.files || e.dataTransfer.files
      if (!files) return
      // MIME
      if (files[0].type.match('image.*')) {
        this.createImage(files[0])
        this.file = files[0]
      }
    },
    createImage(file) {
      const reader = new FileReader()
      reader.onload = e => {
        this.previewImg = {
          src: e.target.result,
          // name: file.name,
          // type: file.type,
          size: ~~(file.size / 1024) + 'кб'
        }
      }
      reader.readAsDataURL(file)
      this.$emit('file', file)
    },
    resetUploadImg() {
      this.$refs.fileInput.value = ''
      this.previewImg = null
      this.preview = null
    }
  }
}
</script>

<style lang="stylus">
.Input_Img
  cursor pointer
  &_figcaption
    font-size .8rem
    padding-top .5rem
</style>
