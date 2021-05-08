<template>
  <div class="card card-default">
    <div class="card-header">Most populated Countries</div>
    <div class="card-body">
      <div id="charts-obc">Loading...(not yet)</div>
    </div>
  </div>
</template>

<script>
import { ModelgroupService } from "../../services/ModelgroupService";

export default {
  data() {
    return {
      params: 0,
      numObjects: 0,
      numAuthors: 0,
      numPending: 0,
      numElev: 0,
      statsLoading: false,
      historyLoading: false,
      authorsLoading: false,
    };
  },
  methods: {
    reload() {
      console.log("reload stats countries");
    },
  },
};
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
