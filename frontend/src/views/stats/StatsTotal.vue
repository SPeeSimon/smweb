<template>
    <div class="panel panel-default" id="stats-totals" :class="{loading: statsLoading}">
      <div class="panel-heading"><span>Totals</span><reload-button @reload="reloadStats"/></div>
      <div class="panel-body">
        <ul class="list-group">
          <li class="list-group-item"><span class="badge" v-text="numObjects"></span><router-link to="/objects">Objects</router-link></li>
          <li class="list-group-item"><span class="badge" v-text="numModels"></span><router-link to="/models">Models</router-link></li>
          <li class="list-group-item"><span class="badge" v-text="numAuthors"></span><router-link to="/authors">Authors</router-link></li>
          <li class="list-group-item">
            <span class="badge" title="Accepted but not yet exported objects" v-text="numElev"></span>
            <span class="badge" title="Pending requests not yet validated" v-text="numPending"></span>Pending/Accepted
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import ReloadButton from '../../components/ReloadButton.vue';
import { StatsService } from '../../services/StatsService';

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
      statsLoading: false
    }
  },
  methods: {
    reloadStats() {
        this.statsLoading = true;
        new StatsService('').getTotals()
              .then( data => {
                this.numObjects = data.objects || 0
                this.numModels = data.models || 0
                this.numAuthors = data.authors || 0
                this.numPending = data.pending || 0
                this.numElev = data.elev || 0
              })
              .finally(() => {
                this.statsLoading = false;
              })
    },
  },
}
</script>

<style>
div#stats-totals > .panel-body > .list-group > .list-group-item {
   text-align: left;
}
</style>
