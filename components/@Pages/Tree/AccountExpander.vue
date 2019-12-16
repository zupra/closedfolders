<template lang="pug">

//- v-click-outside="closesubNav"
//- :class="[{isOpen:isOpen}, level]",
.subExpander(
  :class="[level]",
)
  .subExpander__trigger.ripple(
    @click="isOpen=!isOpen"
    :class="{open:isOpen}"
  )
    .flex.y_center
      //- pre {{subnav}}
      Input_Switch(
        :active="subnav.status"
        @toggle="$emit('switchstatus', {[subnav.switch]:subnav[subnav.switch], status:$event}); subnav.status = $event"
      )
      | &nbsp;
      | {{ subnav.name }}


    svg.subExpander__trigger-Icon(
      :class="{open:isOpen}",
      width='24',
      height='24',
      viewBox='0 0 24 24'
      fill="#FFF"
      stroke='cornflowerblue'
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    )
      circle(cx="12", cy="12", r="10")
      polyline(points="8 12 12 16 16 12", stroke-width='3', fill='none')
      line(x1="12" y1="8" x2="12" y2="16")

  transition(:name="animation")
    //- :class="{ActionList: subnav.townid}"
    .subExpander__list(
      v-show='isOpen'
    )
      template(
        v-for="Item in subnav.list"
      )
        AccountExpander(
          v-if="Object.keys(Item).includes('list')"
          :subnav='Item'
          :level="'level_'+2"
          @switchstatus="$emit('switchstatus', $event)"
        )

        .accountAction(
          v-else
        )
          //- pre {{Item}}
          .accountAction_SwitchNane {{Item.name}}
            small {{Item.address}}
          | &nbsp;

          Input_Switch(
            :active="Item.status"
            @toggle="$emit('switchstatus', {[Item.switch]: Item[Item.switch], status: $event} ); Item.status = $event"
          )



</template>

<script>
import Input_Switch from '~/components/Input/Input_Switch.vue'
export default {
  name: 'AccountExpander',
  components: {
    Input_Switch
  },
  props: {
    subnav: {
      type: Object,
      default: null
    },
    animation: {
      type: String,
      default: 'bounceTop'
    },
    level: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false
    }
  }
  // methods: {}
}
</script>

<style lang="stylus">
@import "~@/components/@Pages/Tree/_recursive_Expander.styl"

// .ActionList
// padding 1em
// @media (min-width: 800px)
// column-count 2
// @media (min-width: 1400px)
// column-count 4
.accountAction
  // display inline-block
  // white-space nowrap
  padding .5em
  display flex
  align-items center
  // &:hover
  // color aliceblue
  &_SwitchNane
    line-height 1
    small
      display block
</style>
