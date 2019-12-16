<template lang="pug">
.Calendar_Input(
  v-click-outside="closeCalendar"
)
  input.Calendar_Input_inp(
    @click.self="isOpen = !isOpen"
    :class="size"
    :value="output.str",
    readonly
  )
  .Calendar(v-show="isOpen")
    .Cr-Head
      .Cr-Head_ltMonth.ripple(@click="ltMonth()") «
      .Cr-Head_current {{months[currMonth]}} {{currYear}}
      .Cr-Head_gtMonth.ripple(@click="gtMonth()") »
    .Cr-Week
      .Cr-Week_day(v-for="day in days") {{day}}
    .Cr-Days
      .Cr-Days_blank(v-for="blank in daysOfPrevMonth") {{blank}}
      .Cr-Days_day(
        v-for="d in daysInMonth",
        :class="{Today: d == Today, clickedDay: d == clickedDay}",
        @click.stop.prevent="setDate(d)"
      ) {{d}}
      .Cr-Days_blank(v-for="_,i in qtyDaysNextMonth") {{i+1}}
</template>

<script>
const NOW = new Date()
export default {
  props: {
    /*
      установка даты
      # для вчера норм
      propSetDateFrom:="( d => new Date(d.setDate(d.getDate()-1)) )(new Date)"
      https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript
    */
    size: {
      type: String,
      default: null
    },
    propSetDateFrom: {
      type: Date,
      default: null
    },
    propSetDateTo: {
      type: Date,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      inst_date: this.propSetDateFrom ? this.propSetDateFrom : NOW,
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
      ],
      clickedDay: null,
      output: {
        str: '', //1 Апр 2018
        format: '' //2018-04-01
      }
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
      return new Date(this.currYear, this.currMonth + 1, 0).getDate()
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
      )
    },
    qtyDaysNextMonth() {
      return 42 - (this.daysInMonth + this._qtyDaysPrevMonth)
    }
  },
  watch: {
    propSetDateTo(newVal) {
      this.inst_date = this.propSetDateTo
      const setDate = this.propSetDateTo.getDate()
      this.setDate(setDate)
    }
  },
  //первый старт
  created() {
    // console.dir(this.inst_date)

    this.setDate(this.inst_date.getDate())
  },
  methods: {
    closeCalendar() {
      this.isOpen = false
    },
    ltMonth() {
      this.clickedDay = null
      this.inst_date = new Date(this.currYear, this.currMonth - 1)
    },
    gtMonth() {
      this.clickedDay = null
      this.inst_date = new Date(this.currYear, this.currMonth + 1)
    },
    setDate(day) {
      this.clickedDay = day
      /**готовим output
        output: {
          str: "1 Апреля 2018"
          format: "2018-04-01"
        }
      */
      const fixDay = day < 10 ? '0' + day : day
      const { output, months, currMonth, currYear } = this
      const fixMonth =
        currMonth + 1 < 10 ? '0' + (currMonth + 1) : currMonth + 1
      output.str = `${day} ${months[currMonth]} ${currYear}`
      output.format = `${currYear}-${fixMonth}-${fixDay}`

      this.$emit('setdate', this.output.format)
      this.isOpen = false
    }
  }
}
</script>

<style lang="stylus">
@import "~@/components/Calendar/_calendar.styl"

.Calendar_Input_inp
  width 10em
</style>
