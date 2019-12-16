<template lang="pug">

li
  //- первый LI
  .startTreeItem(v-if="model.startItem")
    svg.TreeItem_icon(
      xmlns='http://www.w3.org/2000/svg',
      width='32', height='32', viewBox='0 0 24 24',
      fill="currentColor"
    )
      path(
        d='M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18C2,19.1 2.9,20 4,20H20C21.1,20 22,19.1 22,18V8C22,6.89 21.1,6 20,6Z'
      )
    | &nbsp; {{ model.name }}


  .TreeItem(
      v-else
      :class='{isFolder: isFolder}'
    )
    b.TreeItem_title(@click='toggle')
      svg.isFolder_icon(
        v-if='isFolder'
        xmlns='http://www.w3.org/2000/svg',
        width='24', height='24', viewBox='0 0 24 24',
        fill="#3498db"
        )
        path(
          v-if="open"
          key="close"
          d='M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19C20.1,6 21,6.9 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z'
        )
        path(
          v-else
          key="open"
          d='M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18C2,19.1 2.9,20 4,20H20C21.1,20 22,19.1 22,18V8C22,6.89 21.1,6 20,6Z'
        )
      | {{ model.name }}
      //- | &#x202F;
      .TreeItem_id ({{ model.groupid }})
    | &nbsp;

    .flex.y_center

      Input_Switch(
        :active="model.pickable"
        @toggle="EDIT({groupid: model.groupid, pickable: $event})"
      )
      | &nbsp;
      template(v-if='!isFolder')
        Dropdown
          .btn_icon.red(
            slot="btn"
          )
            img(src="~static/icon/del.svg")
          .Dropdown_body
            p Удалить ?
            .sm.btn.fill.red(
              @click="EDIT({groupid: model.groupid}, 'delete'); $el.click()"
            ) Удалить
        | &nbsp;
        Dropdown
          .sm.btn.outline.blue(
            slot="btn"
            slot-scope="{open}"
            :class="{green:open}"
          ) + роль
          .Dropdown_body
            //- pre {{model}}
            p
              input.lg(
                v-model="addChildName"
              )
            .flex.x_end
              .sm.btn.fill.green(@click="addList_addChild({parentid: model.groupid, name: addChildName }); $el.click()") Добавить

      | &emsp;
      nuxt-link.btn.sm(
        :to="`/access/groups/${model.groupid}`",
      ) редактировать
      | &emsp;
      .btn.sm.outline(
        @click="$emit('copy', { groupid: model.groupid, name: model.name })"
      ) для копии

  ul.subFolder(
    v-show='model.startItem || open',
    v-if='isFolder'
  )
    RolesTree(
      v-for='(model, index) in model.list',
      :key='index',
      :model='model'
      @tree="$emit('tree', $event)"
      @copy="$emit('copy', $event)"
    )
    li
      Dropdown
        .sm.btn.outline.blue(
          slot="btn"
          slot-scope="{open}"
          :class="{green:open}"
        ) + роль
        .Dropdown_body
          //- pre {{model}}
          p
            input.lg(
              v-model="addChildName"
            )
          .flex.x_end
            .sm.btn.fill.green(@click="addChild({parentid: model.groupid, name: addChildName }); $el.click()") Добавить

</template>

<script>
import Input_Switch from '~/components/Input/Input_Switch.vue'
import Dropdown from '~/components/Dropdown/Dropdown.vue'

export default {
  name: 'RolesTree',
  components: {
    Input_Switch,
    Dropdown
  },
  props: {
    model: {
      type: [Array, Object],
      default: null // requared: true
    }
  },
  data() {
    return {
      addChildName: '',
      open: false
    }
  },
  computed: {
    isFolder() {
      return this.model.list && this.model.list.length
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    addList_addChild(postData) {
      if (!this.isFolder) {
        this.$set(this.model, 'list', [])
        this.addChild(postData)
        this.open = true
      }
    },
    async addChild(postData) {
      await this.$axios.$post('/access/groups/add', postData)
      this.$emit('tree', postData)
      this.addChildName = ''
      // this.model.list.push({
      //   name: postData.name
      // })
    },
    // delete
    async EDIT(postData, action = 'edit') {
      try {
        await this.$axios.$post(`access/groups/${action}`, postData)
        this.$emit('tree', postData)
      } catch ({ response }) {
        alert(response.data.message)
      }
    }
  }
}
</script>

<style lang="stylus">
$LH = 3em

#Tree
  user-select none

.startTreeItem
  padding-bottom 1em
  font-size 1.3em

.TreeItem
  line-height initial
  height $LH
  &_id
    font-weight normal
    font-size small
    margin 0 .4em

.startTreeItem, .TreeItem, .TreeItem_title
  display flex // inline-flex
  align-items center

.isFolder
  .TreeItem_title
    cursor pointer
  &:hover
    color #477dca
  &_icon
    margin-right .2em

.subFolder
  margin-left .8em
  position relative
  &:before
    content ""
    position absolute
    top -($LH / 3)
    bottom ($LH / 2)
    left -1px
    border-left 1px solid #C7CEDE
  li
    padding 0 $LH - 40%
    line-height $LH
    position relative
    &:hover
      background #f9f0e2
    &:before
      content ""
      position absolute
      top ($LH / 2)
      left 0
      width ($LH / 2)
      border-top 1px solid #C7CEDE
      margin-top -1px
</style>
