<template lang="pug">

.BigSelect
  .BigSelect_search
    .Search-hasReset
      .Search_Reset(
        v-show="keyword",
        @click="keyword=''"
      )
      input.Search.lg(
        v-model="keyword",
        placeholder="Искать по [номер клуба]"
      )

  .BigSelect_list
    label(
      v-for="item in filteredData",
      :key="item.id"
    )
      input(
        type="checkbox",
        name="checkboxGroup",
        :value="item",
        v-model="self_selected"
      )
      span(v-html="mark(item.name)")

      small(
        v-if="item.name"
      )  ({{item.info}})

    .ifNull(
      v-show="filteredData.length == 0",
      @click="keyword=''"
    ) не найдено
  .BigSelect_footer
    //- pre {{self_selected}}
    .Selected
      i(
        v-for="item,idx in self_selected"
        @click.stop.prevent="self_selected.splice(idx,1)"
      ) {{' '+item.name}}
    // :disabled="!self_selected.length"
    .flex.x_sb
      .btn(
        @click="tgl_ALL()"
        v-text="!all ? 'Все' : 'Сброс'"
      )
      .btn(
        @click="emitSelected(); $root.$el.click()"
      ) подтвердить выбор

</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    /*
      ITEM: {
        id
        name: String
        info
      }
    */
    selected: {
      type: [Array, String],
      default: () => [] // или str:'all'
    }
  },
  data() {
    return {
      keyword: '',
      self_selected: Array.isArray(this.selected)
        ? this.options.filter((EL) => this.selected.includes(EL.id))
        : this.options
    }
  },
  computed: {
    all() {
      return (this.self_selected.length &&
        this.self_selected.length === this.options.length) ||
        this.self_selected === 'all'
        ? true
        : false
    },
    filteredData() {
      return this.options.filter((item) => {
        return item.name.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }
  },
  methods: {
    tgl_ALL() {
      if (!this.all) {
        this.self_selected = this.options
      } else {
        this.self_selected = []
      }
    },
    mark(word) {
      const regex = new RegExp('(' + this.keyword + ')', 'gi')
      return this.keyword ? word.replace(regex, '<mark>$1</mark>') : word
    },
    emitSelected() {
      this.$emit('selected', this.all ? 'all' : this.self_selected)
    }
  }
}
</script>

<style lang="stylus">
.BigSelect
  background #FFF
  box-shadow 0 1px 8px rgba(0, 0, 0, .25)
  width 240px
  &_search, &_footer
    padding .7em
  &_search
    input
      width 100%
  &_list
    padding .5em 0
    border-top 1px solid #EEE
    border-bottom 1px solid #EEE
    max-height 240px
    overflow-y scroll
    line-height 1.8em
    &:before
      content ""
    // !TODO
    label
      display block
      cursor pointer
      &:hover
        color #477dca
        background #efefef

.BigSelect
  &_footer
    padding-top 5px
  .ifNull
    cursor pointer
    text-align center
    color blueviolet
    text-decoration underline
  .Selected
    margin-bottom .7em
    font-size 10px
    display flex
    flex-wrap wrap
    i
      border 2px solid #dee2e6
      // background #dee2e6
      // display inline-block
      padding 0 3px
      line-height 1.6em
      border-radius 4px
      cursor pointer
      margin-right 3px
      margin-top 3px
      position relative
      &:before
        content ""
        position absolute
        right -5px
        top -6px
        width 10px
        height 10px
        // background red
        // border-radius 50%
        background #FFF url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><g stroke='red' stroke-width='4' stroke-linecap='round'><line x1='3' y1='3' x2='17' y2='17'/><line x1='3' y1='17' x2='17' y2='3'/></g></svg>") center / 60% no-repeat
      &:hover
        background #EEE
</style>
