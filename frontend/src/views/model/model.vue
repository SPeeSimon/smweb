<template>
  <div class="well">
    <div class="card card-default" v-if="notFound">
      <div class="alert alert-danger" role="alert">
        The requested model was not found
      </div>
    </div>
    <div class="card card-default">
      <div class="card-header"><span>Model #</span><span v-text="model.id"></span></div>
      <div class="card-body">
        <div class="row py-5">
          <div class="col-md-4">
            <img
              :src="thumbnail()"
              class="img-responsive img-rounded fg-model-thumb"
              :alt="'Thumbnail of ' + model.name"
              :title="model.name"
              v-on:error="fallbackToDefaultThumbImageUrl"
            />
          </div>
          <div class="col-md-8">
            <div class="form-horizontal">
              <div class="input-group">
                <span class="input-group-text" style="width: 8em">Name</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Short descriptive name of this model"
                  :value="model.name"
                  :readonly="cantWrite"
                />
              </div>
              <div class="input-group">
                <span class="input-group-text" style="width: 8em">Description</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="A bit more text to describe this model"
                  :value="model.description || model.notes"
                  :readonly="cantWrite"
                />
              </div>
              <div class="input-group">
                <span class="input-group-text" style="width: 8em">Type</span>
                <input type="text" class="form-control" placeholder="Fixme" :value="model.modelgroup.name" :readonly="cantWrite" />
                <router-link class="btn btn-secondary" :to="{ name: 'models', query: { type: model.modelgroup.id } }">
                  View <i class="bi bi-chevron-right"></i>
                </router-link>
              </div>
              <div class="input-group">
                <span class="input-group-text" style="width: 8em">Author</span>
                <input type="text" class="form-control" placeholder="fixme" :value="model.author" :readonly="cantWrite" />
                <router-link class="btn btn-secondary" :to="{ name: 'author', params: { author: model.author } }">
                  View <i class="bi bi-chevron-right"></i>
                </router-link>
              </div>
              <div>
                <hr />
                <p class="text-start"><span>The last update of this model was </span><span v-text="lastModified"></span></p>
              </div>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-outline-secondary">Download</button>
                <button class="btn btn-outline-secondary">Update <span class="d-none d-lg-inline">details</span></button>
                <router-link class="btn btn-secondary" :to="{ name: 'objects', query: { model: model.id } }">
                  View <span class="d-none d-lg-inline">objects</span> <i class="bi bi-chevron-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row py-5">
          <ul class="nav nav-tabs nav-fill">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: showTab === 'files' }"
                aria-current="page"
                href="#"
                @click="showTab = 'files'"
              >
                File(s)
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: showTab === 'positions' }" href="#" @click="showTab = 'positions'">
                Positions
              </a>
            </li>
            <li class="nav-item">
              <a
                class="w-100 nav-link"
                :class="{ active: showTab === '3d' }"
                href="#"
                @click="showTab = '3d'; showed3D=true;"
                >3D View</a
              >
            </li>
          </ul>
          <div class="col-md-12 py-5" v-if="showTab === 'files'">
            <h2>Files</h2>
            <table class="table table-striped fgs-model-files">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th class="text-right">Size</th>
                </tr>
              </thead>
              <tbody class="table-striped">
                <tr v-for="(record, index) in model.content" :key="index">
                  <td v-text="record.filename"></td>
                  <td class="text-right"><display-filesize :size="record.filesize"></display-filesize></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-12 py-5" v-if="showTab === 'positions'">
            <h2>Model Positions</h2>
            <table class="table table-striped fgs-model-positions">
              <thead>
                <tr>
                  <th>Longitude</th>
                  <th>Latitude</th>
                  <th>Elevation</th>
                  <th>Country</th>
                  <th>Map</th>
                </tr>
              </thead>
              <tbody class="table-striped">
                <tr v-for="(position, index) in modelPositions" :key="index">
                  <td v-text="position.longitude"></td>
                  <td v-text="position.latitude"></td>
                  <td v-text="position.elevation"></td>
                  <td v-text="position.country"></td>
                  <td>
                    <a
                      :href="'https://scenery.flightgear.org/map?z=15&lat=' + position.latitude + '&lon=' + position.longitude"
                      target="_blank"
                      title="show on map"
                      alt="show on map"
                    >
                      <i class="bi bi-geo-alt-fill"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-12 py-5" v-if="showed3D" v-show="showTab === '3d'">
            <div class="row">
              <div class="col-md-11">
                <h2>3D View of {{ model.name }}</h2>
              </div>
              <div class="col-md-1">
                <button type="button" class="" @click="fullscreen" title="Show fullscreen">
                  <i class="bi bi-fullscreen"></i>
                </button>
              </div>
            </div>
            <div class="container-xl" style="height: 600px" id="Model3DViewBody" ref="Model3DViewBody">
              <iframe
                :src="'https://scenery.flightgear.org/app.php?c=Models&a=modelViewer&id=' + model.id"
                style="width: 100%; height: 100%; border: 0; padding: 0; margin: 0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from "vue-property-decorator";
import DisplayFilesize from "../../components/display-filesize.vue";
import ReloadButton from "../../components/ReloadButton.vue";
import { FGModel, ModelService } from "../../services/ModelService";
import { ModelPosition, ScenemodelsService } from "../../services/ScenemodelsService";
import { DateTime } from 'luxon';

@Component({
  components: {
    ReloadButton,
    DisplayFilesize,
  },
})
export default class extends Vue {
  private model: FGModel = null;
  private modelPositions: ModelPosition[] = [];
  private cantWrite = true;
  private showTab = "files";
  private showed3D = false;
  private notFound = false;
  @Inject('ScenemodelsService')
  private scenemodelService!: ScenemodelsService;
  @Inject('ModelService')
  private modelService!: ModelService;

  public created() {
    // watch the params of the route to fetch the data again
    // this.$watch(
    //   () => this.$route.params,
    //   () => this.reload(),
    //   { immediate: true }
    // );
  }

  private fullscreen() {
    const i = this.$refs.Model3DViewBody as HTMLElement;
    if (i.requestFullscreen) {
      i.requestFullscreen();
    }
  }

  @Watch("$route.params", { immediate: true })
  private reload() {
    this.notFound = false;
    const modelId = this.$route.params.id;
    this.scenemodelService.getModelById(modelId).then((d) => (this.model = d)).catch(error => this.notFound = true);
    this.scenemodelService.getPositionsById(modelId).then((data) => (this.modelPositions = data));
  }

  private showModel3DView() {
    (this.$refs.Model3DView as HTMLElement).classList.add("show", "in");
  }

  private hideModel3DView() {
    (this.$refs.Model3DView as HTMLElement).classList.remove("show", "in");
  }

  private thumbnail() {
    if (this.model) {
      return this.modelService.getThumbUrl(this.model.id);
    }
  }

  get lastModified() {
    const modifiedDateTime = DateTime.fromISO(this.model.modified);
    const modifiedAgo = modifiedDateTime.diffNow('days')
    if (modifiedAgo.days > -7 && modifiedAgo.days < 7) {
      return modifiedDateTime.toRelative({locale: 'en'}) // updated in the last week, show nice
    }
    return modifiedDateTime.toFormat("ff"); // updated long ago, show exact
  }

  private fallbackToDefaultThumbImageUrl(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktY2FyZC1pbWFnZSIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBkPSJNNi4wMDIgNS41YTEuNSAxLjUgMCAxIDEtMyAwIDEuNSAxLjUgMCAwIDEgMyAweiIvPgogIDxwYXRoIGQ9Ik0xLjUgMkExLjUgMS41IDAgMCAwIDAgMy41djlBMS41IDEuNSAwIDAgMCAxLjUgMTRoMTNhMS41IDEuNSAwIDAgMCAxLjUtMS41di05QTEuNSAxLjUgMCAwIDAgMTQuNSAyaC0xM3ptMTMgMWEuNS41IDAgMCAxIC41LjV2NmwtMy43NzUtMS45NDdhLjUuNSAwIDAgMC0uNTc3LjA5M2wtMy43MSAzLjcxLTIuNjYtMS43NzJhLjUuNSAwIDAgMC0uNjMuMDYyTDEuMDAyIDEydi41NEEuNTA1LjUwNSAwIDAgMSAxIDEyLjV2LTlhLjUuNSAwIDAgMSAuNS0uNWgxM3oiLz4KPC9zdmc+";
    target.style.opacity = '0.2';
  }

  private downloadUrl(){
    return ''
    // <a href="app.php?c=Models&amp;a=getPackage&amp;id=<?php echo $id; ?>">Download model</a>
  }

}
</script>
<style scoped>
img.fg-model-thumb {
  max-width: 100%;
}
</style>