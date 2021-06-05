<template>
  <div v-if="author">
    <div class="well">
      <div class="card card-default">
        <div class="card-header"><span>Author #</span><span v-text="author.id"></span></div>
        <div class="card-body">
          <div class="row py-2">
            <div class="form-horizontal">
              <div class="input-group">
                <span class="input-group-addon" style="width: 8em">Name</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="How (s)he is called"
                  :value="author.name"
                  :readonly="cantWrite"
                />
              </div>
              <div class="input-group">
                <span class="input-group-addon" style="width: 8em">Notes</span>
                <textarea
                  class="form-control"
                  rows="3"
                  :value="author.notes"
                  :readonly="cantWrite"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="well py-5">
      <div class="card card-default">
        <div class="card-header">
          <span>Models created by {{author.name}}</span>
          <span class="btn pull-right fa fa-sync" @click="reload" title="Refresh"></span>
        </div>
        <div class="card-body">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
            <model-short v-for="model in models" :key="model.id" :model="model"></model-short>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { AuthorInfo, AuthorService } from "../../services/AuthorService";
import { ModelService } from "../../services/ModelService";
import ModelShort from "../model/model-short.vue";

@Component({
  components: {
    ReloadButton,
    ModelShort,
  },
})
export default class extends Vue {
  protected author: AuthorInfo = null;
  protected models: any[] = [];
  protected cantWrite = true;
  @Inject('AuthorService')
  private authorService!: AuthorService;
  @Inject('ModelService')
  private modelService!: ModelService;

  @Watch("$route.params", { immediate: true, deep: true })
  public reload() {
    this.getAuthor();
    this.getAuthorModels();
  }

  getAuthor() {
    this.authorService.get(this.$route.params.id).then((data) => {
      this.author = data;
    });
  }

  getAuthorModels() {
    // TODO add pagination for models
    this.modelService.getByAuthor(this.$route.params.id)
      .then((data) => {
        this.models = Array.from(data);
      })
      .catch(function (err) {
        //TODO: notify user
      });
  }
}
</script>
