<template>
  <div class="well" v-if="author">
    <div class="panel panel-default">
      <div class="panel-heading"><span>Author #</span><span v-text="author.id"></span></div>
      <div class="panel-body">
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
        </div>
        <div class="row">
          <model-short v-for="model in models" :key="model.id" :model="model" />
        </div>
      </div>
      <div class="panel-footer">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { AuthorInfo, AuthorService } from "../../services/AuthorService";
import { ModelService } from "../../services/ModelService";
import ModelShort from "../model/model-short.vue";

@Component({
  components: {
    ReloadButton, ModelShort
  },
})
export default class extends Vue {
  protected author: AuthorInfo;
  protected models: any[] = [];
  protected cantWrite = true;

  created() {
    this.reload();
  }

  public reload() {
    this.getAuthor();
    this.getAuthorModels();
  }

  getAuthor() {
    new AuthorService("").get(this.$router.id)
      .then((data) => {
        this.author = data;
      });
  }

  getAuthorModels() {
    // TODO add pagination for models
    new ModelService('').getByAuthor(this.$router.id)
      .then(data => {
        this.models = Array.from(data);
      })
      .catch(function(err){
        //TODO: notify user
      })
  }

}
</script>
