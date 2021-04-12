<template>
  <div class="panel panel-default" :class="{ loading: historyLoading }">
    <div class="panel-heading"><span>History</span><reload-button @reload="reload" /></div>
    <div class="panel-body">
      <canvas ref="statsHst" id="stats-hst" width="200" height="200"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { HistoryItem, StatsService } from "../../services/StatsService";
import { Chart, ChartData, ChartItem, Legend, LinearScale, LineController, LineElement, PointElement, registerables, TimeSeriesScale, Title } from "chart.js";
import "chartjs-adapter-luxon";

Chart.register(LineController, LinearScale, LineElement, Title, Legend, TimeSeriesScale, PointElement);

@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  protected historyLoading = false;
  private myChart: Chart | undefined = undefined;
  private chartData: ChartData | undefined;

  constructor() {
    super();
  }

  created() {
    this.reload();
  }

  private createChart() {
    var ctx = this.$refs.statsHst as ChartItem;
    if (!ctx) {
      console.log("ERROR", "Chart container does not exist");
      return;
    }
    if (this.myChart) {
      console.log("ERROR", "Chart already exist", this.myChart);
      return;
    }

    this.myChart = new Chart(ctx, {
      type: "line",
      data: this.chartData!,
      options: {
        plugins: {
          title: {
            text: "History",
            display: false,
          },
          legend: {
            position: "chartArea",
            align: "start",
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          x: {
            type: "time",
            time: {
              tooltipFormat: "DDD",
              // unit: "year",
            },
            title: {
              display: false,
              text: "Date",
            },
          },
          y: {
            display: true,
            position: "left",
            title: {
              display: false,
              text: "# Models",
            },
            ticks: {
              callback: (v: string|number, axis) => (v as number / 1e3).toFixed(0) + "k",
            },
          },
          y1: {
            display: true,
            position: "right",
            title: {
              display: false,
              text: "# Objects",
            },
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: (v: string|number, axis) => (v as number / 1e6).toFixed(2) + "M",
            },
          },
        },
      },
    });
  }

  private convertToChartdata(data: HistoryItem[]): ChartData {
    const timeLabels: Date[] = [];
    const modelsInTime: number[] = [];
    const objectInTime: number[] = [];

    data.forEach((entry) => {
      timeLabels.push(entry.date);
      modelsInTime.push(entry.models);
      objectInTime.push(entry.objects);
    });

    return {
      labels: timeLabels,
      datasets: [
        {
          type: "line",
          label: "Models",
          data: modelsInTime,
          borderColor: "red",
          backgroundColor: "red",
          fill: false,
          yAxisID: "y",
        },
        {
          type: "line",
          label: "Objects",
          data: objectInTime,
          borderColor: "blue",
          backgroundColor: "blue",
          fill: false,
          yAxisID: "y1",
        },
      ],
    };
  }

  public reload(): void {
    this.historyLoading = true;
    if (this.myChart) {
      this.myChart.destroy();
      this.myChart = undefined;
    }

    new StatsService("")
      .getAllStats()
      .then((data) => this.convertToChartdata(data))
      .then((data) => {
        this.chartData = data;
      })
      .finally(() => {
        this.historyLoading = false;
        this.createChart();
      });
  }
}
</script>
