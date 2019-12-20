<template lang="pug">
.Page
  h1 Billing

  hr
  pre(
    style="height:12em; overflow-y: auto;resize: vertical;"
  ) {{socket}}
  hr


  //- pre {{account}}

  //- .flex_col
  //-   label.field(
  //-       v-for="(V,K) in account"
  //-   ) 
  //-     | {{K}}
  //-     input.lg(:value="V")  

</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      /*       account: {
        uid: '16',
        email: 'dima5447298@mail.ru',
        user_name: 'Zupra',
        plan_id: null,
        candownload: '0',
        canshare: '0',
        lastrenewdate: null,
        lastrenewfail: null
      } */
    }
  },
  computed: {
    ...mapState(['socket'])
  }
}
</script>

<style lang="stylus" scoped></style>
