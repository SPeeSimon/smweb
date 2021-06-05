<template>
  <div id="page-news">
    <h3 class="pb-3 ms-2 mb-4 font-italic border-bottom">FlightGear Scenery Database Latest News</h3>
    <news-item v-for="newsItem in news" :key="newsItem.id" :news="newsItem"></news-item>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { NewsService } from "../../services/NewsService";
import NewsItem from "./NewsItem.vue";

@Component({
  components: { NewsItem },
})
export default class extends Vue {
  private news = [];
  @Inject("NewsService")
  private newsService: NewsService;

  public created() {
    this.newsService.getAll().then((news) => {
      this.news = news;
    });
  }
}
</script>
