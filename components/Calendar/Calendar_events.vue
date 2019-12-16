<template lang="pug">
.flex.y_start
  .Calendar
    .Cr-Head
      .Cr-Head_ltMonth.ripple(@click="ltMonth") «
      .Cr-Head_current {{months[currMonth]}} {{currYear}}
      .Cr-Head_gtMonth.ripple(@click="gtMonth") »
    .Cr-Week
      .Cr-Week_day(v-for="day in days") {{day}}
    .Cr-Days
      .Cr-Days_blank(v-for="blank in daysOfPrevMonth") {{blank}}

      .Cr-Days_day.eventDay(
        v-for="D in daysInMonthWithEvents"
        :class="[{Today: D.day == Today}, {hasEvent: D.events.length}]"
      )
        .D_day {{D.day}}
        .events_forThisDay(
          v-if="D.events.length"
        )
          .events_forThisDay_ITEM(
            v-for="eventid in D.events"
          ) {{'#'+eventid}}

      .Cr-Days_blank(v-for="_,i in qtyDaysNextMonth") {{i+1}}

  //- pre {{curr_events}}

</template>

<script>
const NOW = new Date()

/*
  {
    date: '2019-01-31',
    eventid: 1
  }

 */
export default {
  name: 'CalendarEvents',
  //components: {},
  props: {
    events: {
      type: Array,
      default: () => [] //[{ date: NOW.getDate(), eventid: 1 }]
    }
  },
  data() {
    return {
      inst_date: NOW,
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек'
      ]
    }
  },

  computed: {
    currYear() {
      return this.inst_date.getFullYear()
    },
    currMonth() {
      return this.inst_date.getMonth()
    },
    currWD() {
      return this.inst_date.getDay()
    },
    Today() {
      return this.inst_date.getMonth() === NOW.getMonth() &&
        this.inst_date.getFullYear() === NOW.getFullYear()
        ? NOW.getDate()
        : false
    },
    daysInMonth() {
      // return new Date(this.currYear, this.currMonth + 1, 0).getDate()
      let daysInMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate()
      return Array.from({ length: daysInMonth }, (v, k) => ({
        day: k + 1,
        events: []
      }))
    },
    //
    curr_events() {
      return this.events.filter((el) => {
        return (
          new Date(el.date).getFullYear() == this.currYear &&
          new Date(el.date).getMonth() == this.currMonth
        )
      })
    },
    daysInMonthWithEvents() {
      return this.daysInMonth.map((DAY) => {
        // return this.events.reduce(
        //   // .push(v.eventid)
        //   (DAY, v) => (v.date === DAY.day ? (DAY.eventid = [1, 2]) : DAY),
        //   DAY
        // )

        const eventsArr = this.curr_events.reduce((events, evt) => {
          if (new Date(evt.date).getDate() === DAY.day) events.push(evt.eventid)
          return events
        }, [])

        return Object.assign(DAY, { events: eventsArr })
      })
    },
    _lastDateOfPrevMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDate()
    },
    _qtyDaysPrevMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDay()
    },
    daysOfPrevMonth() {
      return (
        this._qtyDaysPrevMonth &&
        Array.from(
          { length: this._qtyDaysPrevMonth },
          (v, k) => this._lastDateOfPrevMonth - this._qtyDaysPrevMonth + (k + 1)
        )
        /*
        Array.from(
          { length: this._qtyDaysPrevMonth },
          (v, k) => this._lastDateOfPrevMonth - k
        ).reverse()
        */
      )
    },
    qtyDaysNextMonth() {
      // return 42 - (this.daysInMonth + this._qtyDaysPrevMonth)
      return 42 - (this.daysInMonth.length + this._qtyDaysPrevMonth)
    }
  },
  methods: {
    ltMonth() {
      this.inst_date = new Date(this.currYear, this.currMonth - 1)
    },
    gtMonth() {
      this.inst_date = new Date(this.currYear, this.currMonth + 1)
    }
  }
}
</script>

<style lang="stylus">
@import "~@/components/Calendar/_calendar.styl"

// .Cr-Days_day
.eventDay
  position relative

.hasEvent
  background mistyrose
  font-weight bold
  // color #000

// .D_day
// // position relative
// // z-index 1
// &:hover
// // position static
// opacity .3
.events_forThisDay
  position absolute
  bottom 0
  display flex
  flex-wrap wrap
  &:hover
    z-index 2
    &_ITEM
      background #000
  &_ITEM
    // height 1rem
    // width 1rem
    padding 0 .3rem
    line-height 1rem
    background rgba(#ed5565, .7)
    color #FFF
    border-radius 1rem // 50%
    // font-weight bold
    margin auto
    font-size .6rem
</style>
