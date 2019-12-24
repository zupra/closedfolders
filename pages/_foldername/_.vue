<template lang="pug">
.Page
  pre(
    style="height:10em; overflow-y: auto;resize: vertical;"
  ) {{socket.message}}

  h1 LAST

  .breadcrumbs.flex
    
    .breadcrumb_It(
      v-for="(It, idx) in breadcrumbs"
    )
      //- ${path.split('/').splice(0,idx).join('/')}
      N-link.mr_1(        
        :to="{ path: !It.folder_id ? '/':`/.../${It.foldername}`, ...It.folder_id && {query:{id:It.folder_id}}   }"
        @click="go(It.folder_id)"
      ) {{!It.folder_id ? 'home' : It.foldername}}
      | » &nbsp;




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
          //- :to="{path:`/1/2/3/4/5/6/${It.foldername}`, query:{id:It.folder_id}}"
          N-link.text_x2(
            :to="{path:`/${path}/${It.foldername}`, query:{id:It.folder_id}}"
          ) {{It.foldername}}
          .text_s1 {{It.created}}

      //- Dropdown(openTo="toLeft")
      //-   .btn.outline(slot="btn") btns
      //-   .p_3

          //- .btn.mb_1(
          //-     v-for="btn in It.btns"
          //-   ) {{btn}}

      //- hr
      .flex
        .btn.ml_1(
          v-if="It.btns.includes('delete')"
          @click="delete_folder(It.folder_id)"
        ) delete
        .btn.ml_1(
          v-if="It.btns.includes('rename')"
          @click="rename_folder(It.folder_id)"
        ) rename
        .btn.ml_1(
          v-if="It.btns.includes('move')"
          @click="move_folder(It.folder_id)"
        ) move
        .btn.ml_1(
          v-if="It.btns.includes('copy')"
          @click="copy_folder()"
        ) copy
        .btn.ml_1(
          v-if="It.btns.includes('share')"
          @click="share_folder(It.folder_id)"
        ) share



</template>

<script>
import { mapState } from 'vuex'

import Dropdown from '~/components/Dropdown/Dropdown.vue'

export default {
  data() {
    return {}
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
      })
  },
  methods: {
    go(id) {
      console.log('go folder_id: ', id)
      this.$socket.sendObj({
        cmd: 'folders',
        folder_id: id
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
