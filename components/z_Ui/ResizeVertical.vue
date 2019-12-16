
<template lang="pug">
.ResizeVertical.Card.my_3(
  :style="{height:height}"
)
  //- div
  slot

</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '6em'
    }
  }
}
</script>

<style lang="stylus">
.ResizeVertical

  overflow-y: auto;
  overflow:auto;
  resize:vertical

  // position relative
  // &:after
  //   content: "";
  //   position: absolute;
  //   right: 0;
  //   bottom: 0;
  //   height: 24px;
  //   width: 24px;
  //   cursor: move;
  //   background url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z'/></svg>"), linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%, #3498db 51%)


</style>
