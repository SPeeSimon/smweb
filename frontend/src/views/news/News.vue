<template>
  <div id="page-news">
    <h3 class="pb-3 ms-2 mb-4 font-italic border-bottom">FlightGear Scenery Database Latest News</h3>
    <article v-for="newsItem in news" :key="newsItem.id" class="blog-post">
      <h2 class="blog-post-title">
        {{ newsItem.title || `News of ${newsItem.timestamp.toLocaleString({ year: "numeric", month: "long", day: "numeric" })}` }}
      </h2>
      <p class="blog-post-meta">
        {{
          newsItem.timestamp.toLocaleString({
            weekday: "long",
            month: "long",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
        by <router-link :to="{ name: 'author', params: { id: newsItem.author.id } }">{{ newsItem.author.name }}</router-link>
      </p>
      <div v-html="newsItem.text"></div>
    </article>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DateTime } from "luxon";

@Component({
  components: {},
})
export default class Home extends Vue {
  private news: [] = [];

  public created() {
    fetch("http://192.168.1.152:3001/news/list")
      .then((r) => r.json())
      .then((r) => {
        [...r].forEach((item) => {
          item.timestamp = DateTime.fromISO(item.timestamp);
          item.text = item.text.replace(/\\n/g, "<br>");
        });
        return r;
      })
      .then((news) => {
        this.news = news;
      });
  }
}
</script>

<style scoped>
.blog-post {
  margin-bottom: 4rem;
  margin-left: 1rem;
}
.blog-post-title {
  margin-bottom: 0.25rem;
  font-size: 2.5rem;
}
.blog-post-meta {
  margin-bottom: 1.25rem;
  color: #999;
}
</style>
