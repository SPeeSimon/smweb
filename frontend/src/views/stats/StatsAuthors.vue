<template>
  <div class="card-group">
    <div class="card card-default" :class="{ loading: authorsLoading }">
      <div class="card-header"><span>Top Authors</span><reload-button @reload="reloadTopAuthors" /></div>
      <div class="card-body">
        <div v-if="topAuthor.length !== 0">
          <h5>all time</h5>
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="author in topAuthor" :key="author.author_id">
              <router-link :to="{ name: 'author', params: { id: author.author_id } }" v-text="author.author"></router-link>
              <span class="badge bg-secondary rounded-pill" v-text="author.count">0</span>
            </li>
          </ul>
        </div>
        <div v-if="topAuthor90.length !== 0">
          <h5>last 90 days</h5>
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="author in topAuthor90" :key="author.author_id">
              <router-link :to="{ name: 'author', params: { id: author.author_id } }" v-text="author.author"></router-link>
              <span class="badge bg-secondary rounded-pill" v-text="author.count">0</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { StatsService } from "../../services/StatsService";

@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  private topAuthor: any[] = [];
  private topAuthor90: any[] = [];
  private authorsLoading = false;

  @Inject('StatsService')
  private statsService!: StatsService;

  created() {
    this.reloadTopAuthors();
  }

  reloadTopAuthors() {
    this.statsService.getTopAuthors().then((data) => this.topAuthor = data);
    this.statsService.getTopAuthors90().then((data) => this.topAuthor90 = data);
  }

  reload() {
    this.reloadTopAuthors();
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
