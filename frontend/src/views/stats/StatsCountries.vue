<template>
  <div class="card card-default" :class="{ loading: countryLoading }">
    <div class="card-header"><span>Most populated Countries</span><reload-button @reload="reload" /></div>
    <div class="card-body">
      <canvas ref="statsMpc" id="stats-model-per-country" width="200" height="200"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { ModelsByCountryStat, StatsService } from "../../services/StatsService";
import { ArcElement, Chart, ChartData, ChartItem, ChartTypeRegistry, Legend, PieController, Tooltip } from "chart.js";

Chart.register(PieController, Legend, ArcElement, Tooltip);

// from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau.js";
const Tableau20 = [
  "#4E79A7",
  "#A0CBE8",
  "#F28E2B",
  "#FFBE7D",
  "#59A14F",
  "#8CD17D",
  "#B6992D",
  "#F1CE63",
  "#499894",
  "#86BCB6",
  "#E15759",
  "#FF9D9A",
  "#79706E",
  "#BAB0AC",
  "#D37295",
  "#FABFD2",
  "#B07AA1",
  "#D4A6C8",
  "#9D7660",
  "#D7B5A6",
];


@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  private countryLoading = false;
  private myChart: Chart | undefined = undefined;
  private chartData: ChartData | undefined;

  @Inject('StatsService')
  private statsService!: StatsService;

  created() {
    this.reloadModelsByCountry();
  }

  private createChart() {
    var ctx = this.$refs.statsMpc as ChartItem;
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
      options: {
        plugins: {
          title: {
            text: "Models and density per country",
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (models, tooltipItems): string | string[] => {
                return models.map((m: any) => m.label).find((m: string) => m !== "")
              },
              label: (model, tooltipItem) : string => {
                return `${model.dataset.label}: ${model.formattedValue}`;
              }
            },
          }
        },
        interaction: {
          mode: "index",
        },
      },
    });
  }

  reload() {
    this.reloadModelsByCountry();
  }

  generateColors = function* (count: number) {
    const colors = Tableau20;
    for (let i = 0; i <= count; i++) {
      yield colors[i % colors.length];
    }
  };

  reloadModelsByCountry() {
    this.countryLoading = true;
    if (this.myChart) {
      this.myChart.destroy();
      this.myChart = undefined;
    }

    this.statsService.getModelsByCountry()
      .then((data) => this.convertToChartdata(data))
      .then((data) => {
        this.chartData = data;
      })
      .finally(() => {
        this.createChart();
        this.countryLoading = false;
      });
  }

  private convertToChartdata(data: ModelsByCountryStat[]): ChartData {
    const countryLabels: string[] = [];
    const modelsPerCountry: number[] = [];
    const densityPerCountry: number[] = [];

    data.forEach((entry) => {
      countryLabels.push(entry.name);
      modelsPerCountry.push(entry.count);
      densityPerCountry.push(entry.density);
    });

    return {
      labels: countryLabels,
      datasets: [
        {
          label: "Models",
          data: modelsPerCountry,
          backgroundColor: [...this.generateColors(data.length)],
        },
        {
          label: "Density",
          data: densityPerCountry,
          backgroundColor: [...this.generateColors(data.length)],
        },
      ],
    };
  }
}
</script>


<style>
#hst-tooltip {
  position: "absolute";
  display: "none";
  border: "1px solid #fdd";
  padding: "2px";
  background-color: "#fee";
  opacity: 0.8;
}
</style>
