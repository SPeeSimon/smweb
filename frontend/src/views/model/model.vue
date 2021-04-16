<template>
  <div class="well">
    <div class="panel panel-default">
      <div class="panel-heading"><span>Model #</span><span v-text="model.id"></span></div>
      <div class="panel-body">
        <div class="row py-5">
          <div class="col-md-4">
            <img :src="model.thumbnail" class="img-responsive img-rounded fg-model-thumb" style="float: left" />
          </div>
          <div class="col-md-8">
            <div class="form-horizontal">
              <!-- <div class="input-group">
                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" @click="showModel3DView">3D View</button>
              </div> -->
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
                <input type="text" class="form-control" placeholder="fixme" :value="model.type" :readonly="cantWrite" />
              </div>
              <div class="input-group">
                <span class="input-group-text" style="width: 8em">Author</span>
                <input type="text" class="form-control" placeholder="fixme" :value="model.author" :readonly="cantWrite" />
                <button type="button" class="btn btn-secondary">View <i class="bi bi-chevron-right"></i></button>
              </div>
              <div>
                <hr />
                <p class="text-start"><span>The last update of this model was </span><span v-text="model.modified"></span></p>
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
                class="w-100 btn btn-lg btn-outline-primary"
                :class="{ active: showTab === '3d' }"
                href="#"
                @click="showTab = '3d'"
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
              <tbody class="table-striped" v-for="(record, index) in model.content" :key="index">
                <tr>
                  <td v-text="record.filename"></td>
                  <td class="text-right"><span v-text="record.filesize"></span><span> Bytes</span></td>
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
              <tbody class="table-striped" v-for="(position, index) in positions" :key="index">
                <tr>
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
          <div class="col-md-12 py-5" v-if="showTab === '3d'">
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
      <div id="Model3DView" ref="Model3DView" class="modal modal-lg fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="fullscreen">
                <span class="glyphicon glyphicon-fullscreen"></span>
              </button>
              <h4 class="modal-title"><span>3D View of </span><span v-text="model.name"></span></h4>
            </div>
            <div class="modal-body" style="height: 300px" id="Model3DViewBody" ref="Model3DViewBody">
              <iframe
                :src="'https://scenery.flightgear.org/app.php?c=Models&a=modelViewer&id=' + model.id"
                style="width: 100%; height: 100%; border: 0; padding: 0; margin: 0"
              ></iframe>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="hideModel3DView">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReloadButton from "../../components/ReloadButton.vue";
import { ScenemodelsService } from "../../services/ScenemodelsService";

@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  private model = {};
  private positions = [];
  private cantWrite = true;
  private showTab = "files";

  public created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => this.reload(),
      { immediate: true }
    );
  }

  private fullscreen() {
    const i = this.$refs.Model3DViewBody as HTMLElement;

    if (i.requestFullscreen) {
      i.requestFullscreen();
      // } else if (i.webkitRequestFullscreen) {
      //   i.webkitRequestFullscreen();
      // } else if (i.mozRequestFullScreen) {
      //   i.mozRequestFullScreen();
      // } else if (i.msRequestFullscreen) {
      //   i.msRequestFullscreen();
    }
  }

  private reload() {
    const modelId = this.$route.params.id;
    const scenemodelService = new ScenemodelsService("");
    scenemodelService.getModelById(modelId).then((d) => (this.model = d));
    scenemodelService.getPositionsById(modelId).then((data) => (this.positions = data));
  }

  private showModel3DView() {
    (this.$refs.Model3DView as HTMLElement).classList.add("show", "in");
  }

  private hideModel3DView() {
    (this.$refs.Model3DView as HTMLElement).classList.remove("show", "in");
  }

  //     createViewModel: function(params, componentInfo) {
  //       $(componentInfo.element).find('.modal-content').resizable({
  //         //alsoResize: ".modal-dialog",
  //         minHeight: 300,
  //         minWidth: 300
  //       });
  //       $(componentInfo.element).find('.modal-dialog').draggable();
  //     }

  private thumbnail() {
    return ""; // 'https://scenery.flightgear.org/scenemodels/model/' + id + '/thumb'
  }
}
</script>
