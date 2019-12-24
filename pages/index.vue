<template lang="pug">
.Page

  //- pre(
  //-   style="height:10em; overflow-y: auto;resize: vertical;"
  //- ) {{folders}}
  pre(
    style="height:10em; overflow-y: auto;resize: vertical;"
  ) {{socket.message}}
  //- pre {{folders}}
  hr
  //- .btn(@click="get_folder") get_folder



  .flex.y_center
    .flex.y_center
      b sort by &emsp;
      .button-group
        .btn.fill.lite(
          v-for="order in ['name','size','created','type']"
          @click="order_folder(order)"
        ) {{order}}
    | &emsp;
    .flex.y_center
      b order by &emsp;
      .button-group
        .btn.fill.lite(
          v-for="sort in ['desc','asc']"
           @click="sort_folder(sort)"
        ) {{sort}}



  //- socket.message.folders
  //- folders.folders
  //- template(
  //-   v-if="folders"
  //- )
  .file_list(
    v-for="It in socket.message.folders"
  )
    .It.flex.x_sb.mb_3.p_2
      .flex.y_start
        //- :src="require(`../static/color-svg/${It.icon}.svg`)"
        img(
          width="39px"
          :src="`../color-svg/${It.icon}.svg`"
        )
        .ml_2
          N-link.text_x2(
            :to="{path:`/${It.foldername}`, query:{id:It.folder_id}}"

          ) {{It.foldername}}
          .text_s1 {{It.created}}

      Dropdown(openTo="toLeft")
        .btn.outline(slot="btn") btns
        .p_3.flex_col

          //- .btn.mb_1(
          //-     v-for="btn in It.btns"
          //-   ) {{btn}}

          //- hr
          .btn.mb_1(
            v-if="It.btns.includes('delete')"
            @click="delete_folder(It.folder_id)"
          ) delete
          .btn.mb_1(
            v-if="It.btns.includes('rename')"
            @click="rename_folder(It.folder_id)"
          ) rename
          .btn.mb_1(
            v-if="It.btns.includes('move')"
            @click="move_folder(It.folder_id)"
          ) move
          .btn.mb_1(
            v-if="It.btns.includes('copy')"
            @click="copy_folder()"
          ) copy
          .btn.mb_1(
            v-if="It.btns.includes('share')"
            @click="share_folder(It.folder_id)"
          ) share


  hr

  //-
    h1 Files

    .file_list(
      v-for="file in files"
    )
      .file.flex.y_start.mb_3
        img(
          src="https://icongr.am/clarity/file.svg?size=48px"
        )
        div
          .text_x2 {{file.filename}}
          .text_s1 {{file.size}} - {{file.created}}
          .flex
            .badge(v-for="tag in file.tags") {{tag.tagname}}




</template>

<script>
import { mapState } from 'vuex'

import Dropdown from '~/components/Dropdown/Dropdown.vue'

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      folders: null
    }
  },
  computed: {
    ...mapState(['socket'])
  },

  beforeMount() {
    this.socket.isConnected &&
      this.$socket.sendObj({
        cmd: 'folders'
      })

    // this.$options.sockets.onmessage = (data) =>
    //   (this.folders = JSON.parse(data.data))
  },

  methods: {
    order_folder(order) {
      this.$socket.sendObj({
        cmd: 'folders',
        order: order
      })
      // this.$options.sockets.onmessage = (data) =>
      //   (this.folders = JSON.parse(data.data))
    },

    sort_folder(sort) {
      this.$socket.sendObj({
        cmd: 'folders',
        sort: sort,
        order: 'type'
      })
      // this.$options.sockets.onmessage = (data) =>
      //   (this.folders = JSON.parse(data.data))
    },

    delete_folder(id) {
      this.$socket.sendObj({
        cmd: 'folders_delete',
        folder_id: id
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
// .file_list

.It
  cursor: pointer
  &:hover
    background: #f3f3f3;

.badge
  color: #212529;
  background-color: #c5efd2;
  padding: .3em .5em;

  font-size: 67%;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  // vertical-align: baseline;
  border-radius: .2rem;
  display: inline-block;
  cursor pointer
  & + &
    margin-left: .15rem;
  &:hover
    background #42ac63
</style>
