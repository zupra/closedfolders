<template lang="pug">
.Input_ReadonlyTgl


  .ReadonlyTgl(
    @click="readonly = !readonly"
    :class="{readonly : readonly}"
  )
    svg.ReadonlyTgl_icon(
      xmlns='http://www.w3.org/2000/svg',
      width='1em',
      height='1em',
      viewBox='0 0 24 24',
      fill='none',
      stroke='currentColor',
      stroke-width='2',
      stroke-linecap='round',
      stroke-linejoin='round'
    )
      rect(x='3', y='11', width='18', height='11', rx='2', ry='2')
      path(
        v-if="readonly"
        key="lock"
        d='M7 11V7a5 5 0 0 1 10 0v4'
      )
      path(
        v-else
        key="unlock"
        d='M7 11V7a5 5 0 0 1 9.9-1'
      )
  input(
    @dblclick="readonly = !readonly"
    :class="[size, {Attention: !readonly}]",
    :readonly="readonly"
    :value="value"
    @change="updateInput"
  )

</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'lg'
    },
    edit: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      readonly: this.edit
    }
  },
  methods: {
    updateInput(e) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style lang="stylus">
.Input_ReadonlyTgl
  display inline-block
  position relative

.ReadonlyTgl
  cursor pointer
  position absolute
  right -.2em
  top -.2em
  width 1.4em
  height 1.4em
  border-radius 50%
  background #ed5565
  color #FFF
  display flex
  &_icon
    margin auto
  &.readonly
    background #568da6

.Attention
  box-shadow 0 0 8px #ed5565 !important
  border-color #ed5565 !important
</style>
