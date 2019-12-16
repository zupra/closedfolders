<template lang="pug">
.Calendar_period
  InpDate(
    @setdate="From = $event",
    :propSetDateFrom="dateFrom"
  )
  .for__ERR_start_finish
    //- .ERR_start_finish(
    //-   v-show="ERR_start_finish",
    //-   @click="ERR_start_finish = false"
    //- ) ✖ Конечная дата не может быть меньше начала
    InpDate(
      @setdate="To = $event",
      :propSetDateTo="setTo"
    )


</template>

<script>
import InpDate from '~/components/Calendar/InpDate.vue'

export default {
  components: {
    InpDate
  },
  props: {
    /*
      установка даты
      # для вчера норм
      propSetDateFrom:="( d => new Date(d.setDate(d.getDate()-1)) )(new Date)"
      https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript
    */
    dateFrom: {
      type: Date,
      default: () => ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date())
    }

    // propSetDateTo: {
    //   type: Date,
    //   default: null
    // }
  },
  data() {
    return {
      From: '',
      To: '',
      setTo: null,
      ERR_start_finish: false
    }
  },
  computed: {
    newDate() {
      /*
      get() {
          if (this.From && this.To) return { from: this.From, to: this.To }
      },
      set(newDate) {
          this.$emit('setdate', newDate)
      }
      */
      return this.From && this.To && { from: this.From, to: this.To }
    },
    error() {
      return this.From > this.To
    }
  },
  watch: {
    error(error) {
      if (error) {
        this.setTo = new Date(this.From)
        //this.ERR_start_finish = true
      }
      // else {
      //   this.ERR_start_finish = false
      // }
    },
    newDate(newDate) {
      this.$emit('period', newDate)
    }
  }
}
</script>

<style lang="stylus">
// .Calendar_period .Calendar_Input_inp
// width 11em
.for__ERR_start_finish
  position relative
  display inline-block

.ERR_start_finish
  font-family "Roboto Condensed", sans-serif
  background #ed5565
  color #FFF
  position absolute
  top -1.2rem
  left 0
  width max-content
  font-size .8rem
  padding-right .5em
  padding-left .3em
  cursor pointer
</style>
