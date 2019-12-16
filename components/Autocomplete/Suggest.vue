<template lang="pug">
.Suggest(
  v-click-outside='closeDropDown',
)
  input.Search(
    :class="[size]"
    :placeholder="`${by} min${min}`"
    v-model="searchTxt"
  )

  .btn(
    :class="[size]"
    :disabled="searchTxt.length < min"
    @click="goSearch(searchTxt)"
  ) Go
  ul.Suggest_UL.Card.condensed(
    v-show='isOpen'
  )
    li(v-if="listOut.length == 0")
      b(
        @click="isOpen = false"
      ) No results. Try again
    //- :class="{'hl_el': idx === hl_el}"
    li(
      v-for="EL,K,idx in listOut"
      @click="Out(K)"
    ) {{EL}}

</template>

<script>
export default {
  props: {
    api: {
      type: String,
      required: true
    },
    by: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '' // lg, xl
    },
    min: {
      type: [Number, String],
      default: 4
    }
  },
  data() {
    return {
      searchTxt: '',
      isOpen: false,
      hl_el: 0,
      listOut: []
    }
  },
  methods: {
    closeDropDown() {
      this.isOpen = false
    },
    Out(Id) {
      //console.log(Id)
      this.$emit('id', Id)
      this.isOpen = false
    },
    async goSearch(searchTxt) {
      // /guests/guest/search
      const { data, message } = await this.$axios.$post(`${this.api}`, {
        [this.by]: searchTxt
      })
      this.listOut = data
      this.isOpen = true
      // this.searchTxt = ''
    }
  }
}
</script>

<style lang="stylus">
.Suggest
  display inline-block
  position relative
  &_UL
    position absolute
    max-height 12rem
    overflow overlay
    // z-index 2
  li
    padding 0 1em
    line-height 2.4rem
    border-top 1px solid #cccccc4d // hsla(0, 0%, 80%, .3)
    // white-space nowrap
    // overflow hidden
    // text-overflow ellipsis
    cursor pointer
    &:hover
      color #03a9f4
  .hl_el
    background #CCC
</style>
