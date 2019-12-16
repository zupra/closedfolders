import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Bar,
  mixins: [reactiveProp],
  // props: ['data', 'options'],
  props: ['options'],
  mounted() {
    // this.renderChart(this.data, this.options, {
    //   maintainAspectRatio: false
    // })
    this.renderChart(this.chartData, this.options)
  }
}
