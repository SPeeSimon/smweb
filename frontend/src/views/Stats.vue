<template>
  <div class="panel-group">
    <stats-total />
    <stats-history />
    <stats-authors />
    <stats-most-active-authors />
    <stats-countries />
  </div>
</template>

<script lang="ts">
import StatsAuthors from "./stats/StatsAuthors.vue";
import StatsCountries from "./stats/StatsCountries.vue";
import StatsHistory from "./stats/StatsHistory.vue";
import StatsMostActiveAuthors from "./stats/StatsMostActiveAuthors.vue";
import StatsTotal from "./stats/StatsTotal.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    StatsTotal,
    StatsAuthors,
    StatsMostActiveAuthors,
    StatsHistory,
    StatsCountries,
  },
})
export default class extends Vue {

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
