<template lang="pug">
.Page


  h1 Plans
  //- pre {{socket}}
  pre(
    style="height:12em; overflow-y: auto;resize: vertical;"
  ) {{socket.message}}
  //- pre {{plans}}
  //- .Flex_wr.x_center
  //-   .Card.m_2.p_3.center(
  //-     v-for="plan in socket.message"
  //-   )
  //-     .text_x2 {{plan.plan_name}}
  //-     div you can use
  //-     div {{plan.storage}} Gb
  //-     .text_x3
  //-       b {{plan.price}}&nbsp;
  //-       | $
  //-     //- pre {{plan}}


</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      plans: []
      /*

      plans: [
        {
          plan_id: '1',
          plan_name: 'Basic',
          canshare: '0',
          candownload: '0',
          created: '2019-09-21 22:48:45',
          graceperiod: '0',
          storage: '1000000',
          price: '0',
          term: '1',
          termunit: 'months',
          active: '1'
        }
      */
    }
  },

  beforeMount() {
    this.socket.isConnected &&
      this.$socket.sendObj({
        cmd: 'plans'
      })
    // this.$options.sockets.onmessage = (msg) => {
    //   let o = JSON.parse(msg.data)
    //   this.plans = o.clicks
    // }
  },
  computed: {
    ...mapState(['socket'])
  },
  methods: {}
}
</script>

<style lang="stylus" scoped></style>
