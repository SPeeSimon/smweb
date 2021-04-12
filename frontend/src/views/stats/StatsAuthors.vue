<template>
  <div class="panel-group">
    <div class="panel panel-default" :class="{ loading: authorsLoading }">
      <div class="panel-heading"><span>Top Authors</span><reload-button @reload="reloadTopAuthors" /></div>
      <div class="panel-body">
        <div v-if="topAuthor.length !== 0">
          <h5>all time</h5>
          <ol class="list-group">
            <li class="list-group-item" v-for="author in topAuthor" :key="author.author_id">
              <router-link :to="{ name: 'author', params: { id: author.author_id } }" v-text="author.author"></router-link>
              <span class="badge" v-text="author.count">0</span>
            </li>
          </ol>
        </div>
        <div v-if="topAuthor90.length !== 0">
          <h5>last 90 days</h5>
          <ol class="list-group">
            <li class="list-group-item" v-for="author in topAuthor90" :key="author.author_id">
              <router-link :to="{ name: 'author', params: { id: author.author_id } }" v-text="author.author"></router-link>
              <span class="badge" v-text="author.count">0</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { AuthorService } from "../../services/AuthorService";
import { ModelgroupService } from "../../services/ModelgroupService";
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

  created() {
    this.reloadTopAuthors();
  }

  reloadTopAuthors() {
    new StatsService("").getTopAuthors().then((data) => this.topAuthor = data);
    new StatsService("").getTopAuthors90().then((data) => this.topAuthor90 = data);
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
