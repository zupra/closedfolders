<template lang="pug">
.Page
  h1 Plans

  .Flex_wr.x_center
    .Card.m_2.p_3.center(
      v-for="plan in plans"
    )
      .text_x2 {{plan.plan_name}}
      div you can use 
      div {{plan.storage}} Gb
      .text_x3 
        b {{plan.price}}&nbsp;
        | $
      //- pre {{plan}}


</template>

<script>
export default {
  data() {
    return {
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
        },
        {
          plan_id: '2',
          plan_name: 'Silver',
          canshare: '1',
          candownload: '1',
          created: '2019-09-21 22:49:55',
          graceperiod: '7',
          storage: '99999999',
          price: '499',
          term: '1',
          termunit: 'months',
          active: '1'
        },
        {
          plan_id: '3',
          plan_name: 'Gold',
          canshare: '1',
          candownload: '1',
          created: '2019-09-21 22:50:31',
          graceperiod: '7',
          storage: '999999999',
          price: '999',
          term: '1',
          termunit: 'months',
          active: '1'
        },
        {
          plan_id: '4',
          plan_name: 'Platinum',
          canshare: '1',
          candownload: '1',
          created: '2019-09-21 22:51:12',
          graceperiod: '7',
          storage: '999999999',
          price: '1999',
          term: '1',
          termunit: 'months',
          active: '1'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped></style>