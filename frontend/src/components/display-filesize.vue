<template>
  <span>{{ bytes }} {{ unit }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class extends Vue {
  @Prop() size!: number;

  private calculateMetricSize(bytes: number) {
    const metric = BYTE_METRICS.find((m) => m.valueWithinBounds(Math.abs(bytes)));
    if (metric) {
      return { value: metric.unitValue(bytes), unit: metric.unit };
    }
    return { value: bytes, unit: "?B" };
  }

  get bytes() {
    return this.calculateMetricSize(this.size).value;
  }

  get unit() {
    return this.calculateMetricSize(this.size).unit;
  }
}

class Metric {
  constructor(public from: number, public to: number, public unit: string, public long: string) {}

  valueWithinBounds(bytes: number) {
    return bytes >= this.from && bytes < this.to;
  }

  unitValue(bytes: number, precision = 2) {
    if (this.from == 0) {
      return bytes.toFixed(precision);
    }
    return (bytes / this.from).toFixed(precision);
  }
}

const BYTE_METRICS = [
  new Metric(0, 1e3, "B", "bytes"),
  new Metric(1e3, 1e6, "kB", "kilobytes"),
  new Metric(1e6, 1e9, "MB", "megabytes"),
  new Metric(1e9, 1e12, "GB", "gigabytes"),
  new Metric(1e12, 1e15, "TB", "terabytes"),
  new Metric(1e15, 1e18, "PB", "petabytes"),
  new Metric(1e18, 1e21, "EB", "exabytes"),
  new Metric(1e21, 1e24, "ZB", "zettabytes"),
  new Metric(1e24, Number.POSITIVE_INFINITY, "YB", "yottabytes"),
];
</script>
