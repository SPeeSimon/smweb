<template>
  <div id="page-home">
    <div class="panel panel-default">
      <div class="panel-body">
        <h1>Welcome to the <a href="http://www.flightgear.org">FlightGear</a> <span>scenery website!</span></h1>
        <p>This is the central point for maintaining FlightGear scenery models and
        their positions. All data on this site (and the site's source code itself) is
        available under the GNU General Public License 2. Everybody is welcome to
        contribute.</p>
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
        <div style="vertical-align: top; display: inline-block" v-for="model in models" :key="model.id">
          <model-short :model="model"></model-short>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReloadButton from "../components/ReloadButton.vue";
import { ModelService } from "../services/ModelService";
import ModelShort from "./model/model-short.vue";


@Component({
  components: {
    ReloadButton, ModelShort
  },
})
export default class Home extends Vue {
  private models = [];
  private modelsLoading = false;

  public created() {
    this.reload();
  }

  public reload() {
    this.modelsLoading = true;
    new ModelService('').getLatest(20).then(data => {
      if (!(data && Array.isArray(data))) return;
      this.models = data;
    }).finally(() =>{
      this.modelsLoading = false;
    })
  }
}
</script>

<style>
#page-home {
  text-align: left;
}
</style>