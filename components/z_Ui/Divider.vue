<template lang="pug">
.Divider(:id="title")
  .Divider_el.flex.x_center
    .Divider_title # {{title}}


</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Divider'
    }
  }
}
</script>
<style lang="stylus">
.Divider
  margin-top 1em
  padding 4em 4em 3em
  //background url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23252525' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")
  background linear-gradient(to bottom, #CDD9ED, #C7CEDE 50%, rgba(#CCC,.1)), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+")
  &_el
    // background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+")
    background linear-gradient(to right, rgba(0,0,0,0), #FFF, rgba(0,0,0,0))
  &_title
    font-size 2em
    font-weight 600
    position relative
    &:before
      content ''
      position absolute
      top -30px
      left -30px
      width 100px
      height 100px
      border solid 4px #b9f //rgba(#ff1493, .3)
      clip-path polygon(0 0, 0 110px, 40px 110px, 40px 10px, 110px 20px, 110px 0)




</style>
