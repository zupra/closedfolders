<template lang="pug">
.Page
  pre(
    style="height:10em; overflow-y: auto;resize: vertical;"
  ) {{socket.message}}


  //- >>>>>
  .flex
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
  .flex.y_center.mt_2
    b rename &emsp;
    input(
      v-model="foldername"
      placeholder="foldername"
    )

    .btn.ml_1(
      @click="folder_rename()"
    ) rename folder

  //- pre {{target_folder_id }}
  .flex.y_center.mt_2
    b move to &emsp;
    //- @change="folders_move()"
    select.lg(
      v-model="target_folder_id"
    )
      option(
        v-for="It in breadcrumbs"
        :value="It.folder_id"
      ) {{It.foldername}}



  //- <<<<


  hr

  .breadcrumbs.flex.mb_3
    .breadcrumb_It(
      v-for="(It,idx) in breadcrumbs"
    )
      N-link.mr_1(
        :to="{ path: !It.folder_id ? '/':`/${path.split('/').splice(0,idx).join('/')}`, ...It.folder_id && {query:{id:It.folder_id}}   }"
        @click="go(It.folder_id)"
      ) {{!It.folder_id ? 'home' : It.foldername}}
      | » &nbsp;



  //- FOLDERS
  .file_list(
    v-for="It in socket.message.folders"
  )
    .It.flex.x_sb.mb_3.p_2
      .flex.y_start
        img(
          width="39px"
          :src="`/color-svg/${It.icon}.svg`"
        )
        .ml_2
          //- :to="{path:`/1/2/3/4/5/6/${It.foldername}`, query:{id:It.folder_id}}"
          N-link.text_x2(
            :to="{path:`/${path}/${It.foldername}`, query:{id:It.folder_id}}"
          ) {{It.foldername}}
          .text_s1 {{It.created}}

      //- Dropdown(openTo="toLeft")
      //-   .btn.outline(slot="btn") btns
      //-   .p_3

      .flex
        .btn.ml_1(
          v-if="It.btns.includes('delete')"
          @click="folder_delete(It.folder_id)"
        ) delete
        .btn.ml_1(
          v-if="It.btns.includes('rename')"
          @click="folder_rename(It.folder_id)"
        ) rename
        .btn.ml_1(
          v-if="It.btns.includes('move')"
          @click="folder_move(It.folder_id)"
        ) move
        .btn.ml_1(
          v-if="It.btns.includes('copy')"
          @click="folder_copy()"
        ) copy
        .btn.ml_1(
          v-if="It.btns.includes('share')"
          @click="folder_share(It.folder_id)"
        ) share


  //- FILES
  .file_list(
    v-for="file in socket.message.files"
  )
    .It.flex.y_start.mb_3
      img(
        width="39px"
        :src="`/color-svg/${file.icon}.svg`"
      )
      .ml_2
        .text_x2 {{file.filename}}
        .text_s1 {{file.size}} - {{file.created}}
        .flex
          .badge(v-for="tag in file.tags") {{tag.name}}





</template>

<script>
import { mapState } from 'vuex'

import Dropdown from '~/components/Dropdown/Dropdown.vue'

export default {
  data() {
    return {
      foldername: '',
      target_folder_id: null
    }
  },
  computed: {
    ...mapState(['socket']),
    breadcrumbs() {
      return this.socket.message.path
    },
    path() {
      return this.breadcrumbs
        .map((it) => it.foldername)
        .slice(1)
        .join('/')
    }
  },
  created() {
    this.socket.isConnected &&
      this.$socket.sendObj({
        cmd: 'folders',
        folder_id: this.$route.query.id
        // path: this.$route.path.split('/')
      })
  },
  methods: {
    go(id) {
      this.$socket.sendObj({
        cmd: 'folders',
        folder_id: id
      })
    },

    order_folder(order) {
      this.$socket.sendObj({
        cmd: 'folders',
        order: order
      })
    },

    sort_folder(sort) {
      this.$socket.sendObj({
        cmd: 'folders',
        sort: sort,
        order: 'type'
      })
    },

    folders_move() {
      this.$socket.sendObj({
        cmd: 'folders_move',
        target_folder_id: this.target_folder_id,
        folder_id: this.$route.query.id
      })
    },

    folder_rename() {
      this.$socket.sendObj({
        cmd: 'folder_rename',
        foldername: this.foldername,
        folder_id: this.$route.query.id
      })
    }
  }
}
</script>
