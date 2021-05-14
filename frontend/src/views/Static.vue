<template>
    <div v-html="rawPage"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class Static extends Vue {
  private rawPage = '';

  @Watch("$route.params", { immediate: true, deep: true })
  public fetchPage() {
      const page = this.$route.params.page;
      fetch(page)
        .then(r => r.text())
        .then(c => this.rawPage = c)
        .catch(err => {
            console.log('error retrieving page', page, err);
            this.rawPage = 'Error retrieving content';
        })
  }
}
</script>
