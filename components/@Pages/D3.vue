<template lang="pug">
.D3
  .flex
    label.field Поиск…
      input.lg(type='text', v-model='search')
    | &emsp; &emsp; &emsp; &emsp;
    //- button(@click='add') Add node

    label.field.center Ширина холста
      input(type='range', v-model='settings.width', min='200', max='1200')
    | &emsp; &emsp;
    label.field.center Цвет линий
      input(type='color', v-model='settings.strokeColor')


  .D3_clickResult(
    v-if="selected"
  )
    p User id:
      b {{selected.value}}
    NLink.btn.outline.blue(
      :to="`/guests/${selected.value}`"
    ) перейти в профиль

    pre(
    ) Selected: {{ selected }}

  //- SVG that renders the chart based on the "width" and "height" setting from the Vue instance’s data object
  svg(
    :width='settings.width',
    :height='settings.height'
  )
    //- In contrast to D3’s "select" methods, we define the graphical elements explicitely here and use the template syntax to loop through collections and bind properties such as "d" or "r" to those elements.
    transition-group(tag='g', name='D3_line')
      //- Links are represented as paths
      path.link(
        v-for='link in links',
        :key='link.id',
        :d='link.d',
        :style='link.style'
      )
    //- We can now also use events to elements that will call respective methods on the Vue instance
    transition-group(tag='g', name='D3_list')
      g.node(
        @click='select(index, node)',
        v-for='(node, index) in nodes',
        :key='node.id',
        :style='node.style',
        :class="[node.className, {'highlight': node.highlight}]"
      )
        //- Circles for each node
        //- :style="{'fill': index == selected ? '#ff0000' : '#bfbfbf'}"
        circle(
          :r='node.r',
          :class="[node.className, {'highlight': node.highlight}]"
        )
        //- Finally, text labels
        text(
          :dx='node.textpos.x',
          :dy='node.textpos.y',
          :style='node.textStyle'
        ) {{ node.text }}
          tspan(
            :x='node.textpos.x',
            :y='node.textpos.y+10',
          ) ({{ node.tmp.sum }})


</template>

<script>
import * as d3 from 'd3'
export default {
  data() {
    return {
      csv: null,
      selected: null,
      search: '512',
      settings: {
        strokeColor: '#19B5FF',
        width: 920,
        height: 900
      }
    }
  },

  computed: {
    // once we have the CSV loaded, the "root" will be calculated

    root() {
      var that = this

      // if (this.csv) {}
      var stratify = d3.stratify().parentId(function(d) {
        return d.id.substring(0, d.id.lastIndexOf('.'))
      })

      // attach the tree to the Vue data object
      return (
        this.csv &&
        this.tree(
          stratify(that.csv).sort(function(a, b) {
            return a.height - b.height || a.id.localeCompare(b.id)
          })
        )
      )
    },

    // the "tree" is also a computed property so that it is always up to date when the width and height settings change

    tree() {
      return d3
        .cluster()
        .size([this.settings.height, this.settings.width - 120])
    },

    // Instead of enter, update, exit, we mainly use computed properties and instead of "d3.data()" we can use array.map to create objects that hold class names, styles, and other attributes for each datum

    nodes() {
      var that = this

      return (
        this.root &&
        this.root.descendants().map(function(d) {
          return {
            id: d.id,
            value: d.data.value,
            tmp: d.data.tmp,
            r: 4,
            className:
              'node' + (d.children ? ' node--internal' : ' node--leaf'),
            text: d.id.substring(d.id.lastIndexOf('.') + 1),
            highlight:
              d.id.toLowerCase().indexOf(that.search.toLowerCase()) != -1 &&
              that.search != '',
            style: {
              transform: 'translate(' + d.y + 'px,' + d.x + 'px)'
            },
            textpos: {
              x: d.children ? -8 : 8,
              y: 3
            },
            textStyle: {
              textAnchor: d.children ? 'end' : 'start'
            }
          }
        })
      )
    },

    // Instead of enter, update, exit, we mainly use computed properties and instead of "d3.data()" we can use array.map to create objects that hold class names, styles, and other attributes for each datum

    links() {
      var that = this

      return (
        this.root &&
        this.root
          .descendants()
          .slice(1)
          .map(function(d) {
            return {
              id: d.id,
              d:
                'M' +
                d.y +
                ',' +
                d.x +
                'C' +
                (d.parent.y + 100) +
                ',' +
                d.x +
                ' ' +
                (d.parent.y + 100) +
                ',' +
                d.parent.x +
                ' ' +
                d.parent.y +
                ',' +
                d.parent.x,

              // here we could of course calculate colors depending on data but for now all links share the same color from the settings object that we can manipulate using UI controls and v-model

              style: {
                stroke: that.settings.strokeColor
              }
            }
          })
      )
    }
  },
  async created() {
    const { data } = await this.$axios.$post('/referrals/graph/getD3Tree')
    this.csv = data
    this.settings.height = data.length * 40
  },

  methods: {
    add() {
      this.csv.push({
        id: 'flare.physics.Dummy',
        value: 0
      })
    },
    select(index, node) {
      this.selected = node //`idx:${index}`;
    }
  }
}
</script>

<style lang="stylus">
.D3
  position relative
  // font-family monospace
  &_clickResult
    position absolute
    right 0
    top 0
    width 220px
    padding 1em
    background #EEE

.node
  // opacity 1
  circle
    fill yellowgreen // #999
    cursor pointer
  text
    // font 10px sans-serif
    font-size 12px
    cursor pointer
  tspan
    font-size 8px
  &.highlight
    fill red // red
  &:hover
    pointer-events all
    fill blue // blueviolet #2196f3
    text-decoration underline
    circle
      stroke blue // red
      fill blueviolet

.node--internal
  circle
    fill #2196f3 // yellowgreen

.link
  fill none
  stroke #555
  stroke-opacity .4
  // stroke-width 1.5px
  // stroke-dasharray 1000

.D3_list-enter-active, .D3_list-leave-active
  transition all 1s

.D3_list-enter, .D3_list-leave-to
  opacity 0
  transform translateY(30px)

.D3_line-enter-active, .D3_line-leave-active
  transition all 2s
  stroke-dashoffset 0

.D3_line-enter, .D3_line-leave-to
  stroke-dashoffset 1000
</style>
