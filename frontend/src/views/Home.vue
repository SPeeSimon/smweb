<template>
  <div id="page-home">
    <div class="px-4 py-5 my-5 text-center">
      <img class="d-block mx-auto mb-4" src="/FlightGear_logo.svg" alt="" width="72" height="57" />
      <h1 class="display-5 fw-bold">Welcome to the FlightGear scenery website!</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          This is the central point for maintaining FlightGear scenery models and their positions. Everybody is welcome to contribute.
        </p>
        <p class="lead mb-4 fs-6">
          All data on this site is available under the GNU General Public License 2.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a class="btn btn-outline-primary btn-lg px-4" href="http://www.flightgear.org" target="_blank">Go to the FlightGear website</a>
          <router-link class="btn btn-outline-secondary btn-lg px-4" to="/models">Find Model</router-link>
          <router-link class="btn btn-outline-secondary btn-lg px-4" to="/objects">Find Object</router-link>
        </div>
        <!--
        <div class="text-center alert alert-danger alert-dismissible" role="alert">
          <button type="button" title="Got it!" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <p class="lead">
              <strong>This page is under heavy development and should be considered unstable. <br />Please use the original version at <a href="https://scenery.flightgear.org/">scenery.flightgear.org</a> for production use.</strong><br />
              You can't change anything from this page, anyway :)
              </p>
        -->
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <span>These are the latest updates to our model database</span>
        <reload-button @reload="reload" />
      </div>

      <div class="panel-body" data-bind="foreach: latestModels">
        <div class="card-body row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <model-short v-for="model in models" :key="model.id" :model="model"></model-short>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import ReloadButton from "../components/ReloadButton.vue";
import { FGModel, ModelService } from "../services/ModelService";
import ModelShort from "./model/model-short.vue";

@Component({
  components: {
    ReloadButton,
    ModelShort,
  },
})
export default class Home extends Vue {
  private models: FGModel[] = [];
  private modelsLoading = false;
  @Inject('ModelService')
  private modelService!: ModelService;

  public created() {
    this.reload();
    console.log(process.env.VUE_APP_LOCATION)
    console.log(process.env.NODE_ENV)
  }

  public reload() {
    this.modelsLoading = true;
    this.modelService.getLatest(6)
      .then((data) => {
        if (!(data && Array.isArray(data))) return;
        this.models = data;
      })
      .finally(() => {
        this.modelsLoading = false;
      });
  }
}
</script>

<style>
#page-home {
  text-align: left;
}
</style>
