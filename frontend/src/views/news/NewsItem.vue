<template>
  <article class="blog-post">
    <h2 class="blog-post-title">
      {{ news.title || `News of ${news.timestamp.toLocaleString({ year: "numeric", month: "long", day: "numeric" })}` }}
    </h2>
    <p class="blog-post-meta">
      {{
        news.timestamp.toLocaleString({
          weekday: "long",
          month: "long",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      }}
      by <router-link :to="{ name: 'author', params: { id: news.author.id } }">{{ news.author.name }}</router-link>
    </p>
    <div v-html="news.text"></div>
  </article>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class extends Vue {
  @Prop()
  public news: any;
}
</script>

<style>
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
