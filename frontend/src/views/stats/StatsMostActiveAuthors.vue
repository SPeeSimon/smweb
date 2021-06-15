<template>
  <div class="card card-default" :class="{ loading: authorsLoading }">
    <div class="card-header"><span>Most active Authors</span><reload-button @reload="reloadAuthors" /></div>
    <div class="card-body">
      <canvas ref="statsMba" id="stats-mba" width="200" height="200"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { StatsService, Tableau20 } from "../../services/StatsService";
import { ArcElement, Chart, ChartData, ChartItem, Legend, PieController, Tooltip } from "chart.js";
import { Author } from "../../services/AuthorService";

Chart.register(PieController, Legend, ArcElement, Tooltip);

@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  private authorsLoading = false;
  private myChart: Chart | undefined = undefined;
  private chartData: ChartData | undefined;

  @Inject('StatsService')
  private statsService!: StatsService;

  created() {
    this.reloadAuthors();
  }

  private createChart() {
    var ctx = this.$refs.statsMba as ChartItem;
    if (!ctx) {
      console.log("ERROR", "Chart container does not exist");
      return;
    }
    if (this.myChart) {
      console.log("ERROR", "Chart already exist", this.myChart);
      return;
    }

    this.myChart = new Chart(ctx, {
      type: "pie",
      data: this.chartData!,
    });
  }

  reload() {
    this.reloadAuthors();
  }

  generateColors = function* (count: number) {
    const colors = Tableau20;
    for (let i = 0; i <= count; i++) {
      yield colors[i % colors.length];
    }
  };

  reloadAuthors() {
    this.authorsLoading = true;
    if (this.myChart) {
      this.myChart.destroy();
      this.myChart = undefined;
    }

    this.statsService.getTop10Authors()
      .then((data) => this.convertToChartdata(data))
      .then((data) => {
        this.chartData = data;
      })
      .finally(() => {
        this.authorsLoading = false;
        this.createChart();
      });
  }

  private convertToChartdata(data: Author[]): ChartData {
    const newLabels: any[] = [];
    const newData: any[] = [];

    data.forEach((entry) => {
      newLabels.push(entry.author);
      newData.push(entry.count);
    });

    return {
      labels: newLabels,
      datasets: [
        {
          label: "Authors",
          data: newData,
          backgroundColor: [...this.generateColors(data.length)],
        },
      ],
    };
  }
}
</script>
