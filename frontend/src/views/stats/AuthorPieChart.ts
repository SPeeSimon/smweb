import { Component, Mixins } from "vue-property-decorator";
import VueCharts, { Bar, Pie, mixins } from "vue-chartjs";
import { Chart, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  extends: Bar, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp],
})
export default class AuthorPieChart extends Mixins(mixins.reactiveProp, Bar) {

  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: "#f87979",
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        },
      ],
    });
  }
  private plotChart(): void {
    // $.plot($("#stats-mba"), data, {
    //   series: {
    //     pie: {
    //       show: true,
    //     }
    //   },
    //   legend: {
    //     show: true
    //   },
    //   grid: {
    //     hoverable: true,
    //   },
    // })
    // $("#stats-mba").bind("plothover", function(event,pos, item) {
    //   if( item ) $("#stats-mba").attr("title",item.series.label)
    //   else $("#stats-mba").attr("title","")
    // })
  }
}
