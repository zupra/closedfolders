<template lang="pug">
.Page
  h1 Security
  hr
  pre(
    style="height:12em; overflow-y: auto;resize: vertical;"
  ) {{socket}}
  hr

</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['socket'])
  }
}
</script>

<style lang="stylus" scoped></style>
