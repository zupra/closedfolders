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
    .subExpander__list(
      v-show='isOpen'
    )
      template(
        v-for="Item in subnav.list"
      )
        RolesExpander(
          v-if="Object.keys(Item).includes('list')"
          :subnav='Item'
          :level="'level_'+2"
          @checkaccess="$emit('checkaccess', $event)"
        )

        //- pre(
        //-   v-else
        //- ) {{Item}}


        //- div(
        //-   v-else
        //- )
        //-   slot(
        //-     name="Tree_Item"
        //-     :model="Item"
        //-   ) HERE не список
        dl.accessAction(
          v-else
        )
          dt {{Item.name}}
          dd.checked-block
            label(v-for="access in accessTypes")
              input(
                type='radio'
                :name="Item.actionid"
                :value='access.typeid'
                :checked="access.typeid === Item.typeid"
                @change="$emit('checkaccess', {actionid:Item.actionid,typeid:access.typeid})"
              )
              span.ripple {{access.name}}

</template>

<script>
export default {
  name: 'RolesExpander',
  inject: ['accessTypes'],
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
  // methods: {closesubNav() {}}
}
</script>

<style lang="stylus">
@import "~@/components/@Pages/Tree/_recursive_Expander.styl"

.accessAction
  & + &
    margin-top -1em
</style>
