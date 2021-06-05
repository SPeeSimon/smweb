<template>
  <div>
    <table class="table table-striped table-hover table-small">
      <caption>
        <reload-button @reload="reload" />
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Notes</th>
          <th class="text-right">Models</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author.id" click="selectAuthor(author)">
          <td>
            <router-link :to="{ name: 'author', params: {id: author.id}}" :text="author.name">{{ author.name }}</router-link>
          </td>
          <td v-text="author.notes"></td>
          <td class="text-right">
            <span class="badge bg-secondary" v-text="author.models">0</span>
          </td>
        </tr>
      </tbody>
    </table>
    
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{disabled: start === 0}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="prev" alt="Previous Page" title="Previous Page">
            Previous</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="next" alt="Next Page" title="Next Page">
            Next
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { AuthorService } from "../../services/AuthorService";

@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  protected authors: any[] = [];
  protected start = 0;
  protected length = 20;
  @Inject('AuthorService')
  private authorService!: AuthorService;

  created() {
    this.reload();
  }
  public reload() {
    this.authorService.getAll(this.start, this.length).then((data) => {
      if (data && Array.isArray(data)) {
        this.authors = Array.from(data);
      }
    });
  }

  protected next() {
    this.start += this.length;
    this.reload();
  }

  protected prev() {
    this.start = Math.max(0, this.start - this.length);
    this.reload();
  }
}
</script>
