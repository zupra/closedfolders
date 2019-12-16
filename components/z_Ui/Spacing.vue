<template lang="pug">
div
  center
    h1 Spacing Scale
  .gridChart
    .gridChart_bar(
      v-for="It in scale"
      :style="`height: ${It.v}px`"
    )
      .bar_val
        b {{It.m}}
        div {{It.v}}px
      .bar_label {{It.k}}
</template>



<script>
/*
'1(4)' :0.25,
'2(8)' :0.5,
'3(12)' :0.75,
'4(16)' :1,
'5(20)' :1.25,
'6(24)' :1.5
'8(32)' :2,
'10(40)' :2.5,
'12(48)' :3,
'16(64)' :4,
'20(80)' :5
*/

/*
  module
  value
  key
*/
export default {
  data: () => ({
    scale: [
      {
        m: 1,
        v: 4,
        k: .25
      },
      {
        m: 2,
        v: 8,
        k: .5
      },
      {
        m: 3,
        v: 12,
        k: .75
      },{
        m: 4,
        v: 16,
        k: 1
      },
      {
        m: 5,
        v: 20,
        k: 1.25
      },
      {
        m: 6,
        v: 24,
        k: 1.5
      },
      {
        m: 7,
        v: 28,
        k: 1.75
      },
      {
        m: 8,
        v: 32,
        k: 2
      },
      {
        m: 10,
        v: 40,
        k: 2.5
      },{
        m: 12,
        v: 48,
        k: 3
      },
      {
        m: 16,
        v: 64,
        k: 4
      },
      {
        m: 20,
        v: 80,
        k: 5
      }
    ]
  })

}
</script>






<style lang="stylus" scoped>
h1
  margin 1em 0 -1em

.gridChart
  display: grid;
  align-items: end;
  justify-content: center;

  grid-template-columns: repeat(12, minmax(1em, 3em));
  grid-column-gap 1em;
  padding 2em

.gridChart_bar
  background #2a6df4
  position relative
.bar_val
.bar_label
  position: absolute;
  width 100%
  text-align: center;
.bar_val
  top: -2.2em;
  font-size .8em
  line-height 1

.bar_label
  bottom: -1.5em;
</style>


