<template lang="pug">
.Page


  Modal(
    :show.sync="showModal_foldersRename",
    mod="SM toCenter",
    title="Rename"
  )
    //- p Rename Folder {{foldername}}
    .flex_col
      input.xl(
        v-model="foldername"
        placeholder="foldername"
      )
    .flex.x_end.y_center(slot="actions")
      .btn.lg(
        @click="folders_rename(); showModal_folderCreate = false"
      ) Rename


  pre(
    style="height:10em; overflow-y: auto;resize: vertical;"
  ) {{socket.message}}
  //- pre {{folders}}
  hr



  //- >>>>>
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
  //- .flex.mt_2
  //-   input(
  //-     v-model="foldername"
  //-     :placeholder="$route.query.id"
  //-   )

  //-   .btn.ml_1(
  //-     @click="folders_rename()"
  //-   ) rename folder


  //- pre {{target_folder_id }}
  //- .flex.y_center.mt_2
  //-   b move to &emsp;
  //-   select.lg(
  //-     @change="folders_move()"
  //-     v-model="target_folder_id"
  //-   )
  //-     option(
  //-       v-for="It in breadcrumbs"
  //-       :value="It.folder_id"
  //-     ) {{It.foldername}}
  //- <<<<

  //- FOLDERS
  .file_list.mt_3(
    v-for="(It,idx) in socket.message.folders"
    :key="It.folder_id"
  )
    .It.flex.x_sb.mb_3.p_2
      .flex.y_start
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
          .btn.fill.red.mb_1(
            v-if="It.btns.includes('delete')"
            @click="folders_delete(It.folder_id)"
          ) delete
          .btn.mb_1(
            v-if="It.btns.includes('rename')"
            @click="startRename(It.foldername)"
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
import Modal from '~/components/Modal/Modal.vue'

export default {
  components: {
    Dropdown,
    Modal
  },
  data() {
    return {
      target_folder_id: null,
      folders: null,
      foldername: '',
      showModal_foldersRename: false
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

    folders_move() {
      this.$socket.sendObj({
        cmd: 'folders_move'
        // folder_id: this.$route.query.id,
        // target_folder_id: this.target_folder_id
      })
    },

    startRename(oldName) {
      this.showModal_foldersRename = true
      this.foldername = oldName
    },
    folders_rename() {
      this.$socket.sendObj({
        cmd: 'folders_rename',
        foldername: this.foldername,
        folder_id: this.$route.query.id
      })
    },

    folders_delete(id) {
      this.$socket.sendObj({
        cmd: 'folders_delete',
        folder_id: id
      })
    }
  }
}
</script>

<style lang="stylus">
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


.breadcrumbs
  padding .5em 1em
  background #dee2e6
</style>
