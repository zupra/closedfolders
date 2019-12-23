<template lang="pug">
.Page
  pre(
    style="height:16em; overflow-y: auto;resize: vertical;"
  ) {{socket.message}}


  //- .btn(@click="go") go



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
            v-if="It.folders"
            :to="{path:`/${It.foldername}`, query:{id:It.folder_id}}"

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
    ...mapState(['socket'])
  },
  created() {
    this.socket.isConnected &&
      this.$socket.sendObj({
        cmd: 'folders',
        folder_id: this.$route.query.id
      })
  },
  methods: {
    go() {
      this.$socket.sendObj({
        cmd: 'folders',
        folder_id: this.$route.query.id
      })
    }
  }
}
</script>

<style>
</style>
