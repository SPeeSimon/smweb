<template>
  <div class="card card-default" id="stats-totals" :class="{ loading: statsLoading }">
    <div class="card-header"><span>Totals</span><reload-button @reload="reloadStats" /></div>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <router-link to="/objects">Objects</router-link>
        <span class="badge bg-secondary rounded-pill" v-text="numObjects"></span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <router-link to="/models">Models</router-link>
        <span class="badge bg-secondary rounded-pill" v-text="numModels"></span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <router-link to="/authors">Authors</router-link>
        <span class="badge bg-secondary rounded-pill" v-text="numAuthors"></span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Pending
        <span class="badge bg-secondary rounded-pill" title="Pending requests not yet validated" v-text="numPending"></span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Accepted
        <span class="badge bg-secondary rounded-pill" title="Accepted but not yet exported objects" v-text="numElev"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import ReloadButton from "../../components/ReloadButton.vue";
import { StatsService } from "../../services/StatsService";

export default {
  components: { ReloadButton },
  created() {
    this.reloadStats();
  },
  data() {
    return {
      params: 0,
      numObjects: 0,
      numModels: 0,
      numAuthors: 0,
      numPending: 0,
      numElev: 0,
      statsLoading: false,
    };
  },
  methods: {
    reloadStats() {
      this.statsLoading = true;
      new StatsService("")
        .getTotals()
        .then((data) => {
          this.numObjects = data.objects || 0;
          this.numModels = data.models || 0;
          this.numAuthors = data.authors || 0;
          this.numPending = data.pending || 0;
          this.numElev = data.elev || 0;
        })
        .finally(() => {
          this.statsLoading = false;
        });
    },
  },
};
</script>

<style>
div#stats-totals > .panel-body > .list-group > .list-group-item {
  text-align: left;
}
</style>
