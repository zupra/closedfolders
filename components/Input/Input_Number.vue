<doc>
https://github.com/JayeshLab/vue-numeric-input/blob/master/src/vue-numeric-input.vue
</doc>

<template lang="pug">
.Input_Number.button-group(
  :class="[size]"
)
  .btn(
    @click="(value - step >= min) && minus(step)"
  ) -
  input.Input_Number_Field(
    :class="[size]"
    :size="em"
    :maxlength="maxlength"
    @keypress="isNumberKey"
    @keyup.up.right="(value + step <= max) && plus(step)"
    @keyup.down.left="(value - step >= min) && minus(step)"
    v-model="value"
  )
  .btn(
    @click="(value + step <= max) && plus(step)"
  ) +

</template>
<script>
export default {
  props: {
    // int: {
    //   type: Boolean,
    //   default: false
    // },
    size: {
      type: String,
      default: '' // lg, xl
    },
    start: {
      type: [Number, String],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER || 9007199254740991
    },
    step: {
      type: Number,
      default: 1
    },
    maxlength: {
      type: [Number, String],
      default: 12
    },
    em: {
      type: [Number, String],
      default: 6
    }
  },
  data () {
    return {
      // value: Number(this.start)
      value: this.start
    }
  },
  watch: {
    start (val) {
      this.value = val
    },
    value (newVal, oldVal) {
      this.value = String(newVal).replace(/(\..*)\./g, '$1')
      this.$emit('number', this.value)
    }
  },
  methods: {
    plus (step) {
      // this.value -= step
      this.value = +this.value + step
    },
    minus (step) {
      // this.value += step
      this.value = +this.value - step
    },
    isNumberKey (e) {
      const charCode = e.which ? e.which : event.keyCode
      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return e.preventDefault()
      }
    }
  }
}
</script>

<style lang="stylus">
.Input_Number
  // display inline-flex
  &_Field
    // height: inherit;
    font-size: inherit;
    height: auto !important
    border-radius 0 !important
    border-left 0 !important
    border-right 0 !important
    box-shadow none !important
    padding 0 !important
    text-align center
    // &.sm
    //   font-size 1em
</style>
