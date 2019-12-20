<template lang="pug">
.Page
  pre(
    style="height:16em; overflow-y: auto;resize: vertical;"
  ) {{socket.message}}
  //- pre {{$route.params}}
  //- pre {{$route.query}}
  .btn(@click="go") go



  //- .It.flex.x_sb.mb_3.p_2
  //-   .flex.y_start
  //-     //- :src="require(`../static/color-svg/${It.icon}.svg`)"
  //-     img(
  //-       width="39px"
  //-       :src="`../color-svg/${It.icon}.svg`"
  //-     )
  //-     .ml_2
  //-       N-link.text_x2(
  //-         :to="{path:`/${It.foldername}`, query:{id:It.folder_id}}"

  //-       ) {{It.foldername}}
  //-       .text_s1 {{It.created}}


</template>

<script>
import { mapState } from 'vuex'
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
