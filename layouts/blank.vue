<template lang="pug">
.layouts_blank
  NOTICE
  <nuxt />
</template>



<script>
import NOTICE from '~/components/NOTICE.vue'
export default {
  components: {
    NOTICE
  },
  data() {
    return {}
  }
}
</script>


<style lang="stylus" scoped>

.layouts_blank
  background #354052
  height 100vh
  display flex

</style>
