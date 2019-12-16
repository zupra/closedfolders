<template lang="pug">

.Dropdown(
  v-click-outside='closeDropDown',
  aria-haspopup="true"
)
  .Dropdown_dt(@click="toggleDropDown")
    slot(
      name="btn"
      :open="isOpen"
    )
  .Dropdown_dd(
    v-show="isOpen"
    :class="openTo"
  )
    slot


</template>

<script>
export default {
  props: {
    openTo: {
      type: String,
      default: null,
      validator: prop => ['toLeft', 'toTop'].includes(prop)
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen
    },
    closeDropDown() {
      this.isOpen = false
    }
  }
}
</script>

<style lang="stylus">
.Dropdown
  margin 0 .3rem
  position relative
  display inline-block
  &_dt
    line-height initial
  &_dd
    margin-top .3em
    position absolute
    display flex
    z-index 100
    // asCard
    background #fff
    // box-shadow: 0 1px 8px rgba(0,0,0,0.25);
    box-shadow 0 1px 1rem 1px rgba(0, 0, 0, .3)
    &.toLeft
      right 0
    &.toTop
      bottom 2em

// .Dropdown_dd > *
// margin 0
.Dropdown_body
  padding 1em
  white-space nowrap
  font-weight normal
</style>
