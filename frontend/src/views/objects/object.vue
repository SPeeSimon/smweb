<template>
  <div class="well">
    <div class="card card-default">
      <div class="card-header"><h1 v-text="object.properties.title">Object</h1></div>
      <div class="card-body">
        <div class="row py-5">
          <div class="col-md-4">
            <img
              src="app.php?c=Models&amp;a=thumbnail&amp;id={object.id}"
              class="img-responsive img-rounded fg-model-thumb"
              alt="Thumbnail"
            />
          </div>
          <div class="col-md-8">
            <div class="form-horizontal">
              <div class="input-group">
                <span class="input-group-text col-md-3">Unique ID</span>
                <input type="text" class="form-control" placeholder="id of this Object" :value="object.id" readonly="true" />
              </div>
              <div class="input-group">
                <span class="input-group-text col-md-3">Longitude</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="A bit more text to describe this model"
                  :value="longitude"
                  readonly="true"
                />
              </div>
              <div class="input-group">
                <span class="input-group-text col-md-3">Latitude</span>
                <input type="text" class="form-control" placeholder="fixme" :value="latitude" :readonly="true" />
              </div>
              <div class="input-group">
                <span class="input-group-text col-md-3">Country</span>
                <input type="text" class="form-control" placeholder="fixme" :value="object.properties.country" :readonly="true" />
                <router-link :to="{ name: 'objects', query: {country: object.properties.country} }"
                  class="btn btn-secondary"
                  v-if="hasCountryCode"
                  >
                  View <span class="d-none d-lg-inline">all objects for counry</span> <i class="bi bi-chevron-right"></i>
                </router-link>
              </div>
              <div class="input-group">
                <span class="input-group-text col-md-3">Ground elevation</span>
                <input type="text" class="form-control" placeholder="fixme" :value="groundElevation" :readonly="true" />
                <span class="input-group-text">m</span>
              </div>
              <div class="input-group">
                <span class="input-group-text col-md-3">Elevation offset</span>
                <input type="text" class="form-control" placeholder="fixme" :value="elevationOffset" :readonly="true" />
                <span class="input-group-text">m</span>
              </div>
              <div class="input-group">
                <span class="input-group-text col-md-3">Heading</span>
                <input type="text" class="form-control" placeholder="fixme" :value="orientationNorth" :readonly="true" />
                <span class="input-group-text">&deg; (STG)</span>
                <input type="text" class="form-control" placeholder="fixme" :value="orientationDegree" :readonly="true" />
                <span class="input-group-text">&deg; (true)</span>
              </div>
              <div class="input-group">
                <span class="input-group-text col-md-3">Group</span>
                <input type="text" class="form-control" placeholder="fixme" :value="object.properties.shared" :readonly="true" />
                {{ object.groupId }}
                <!-- <?php echo "<a href=\"app.php?c=Objects&amp;a=search&amp;group=".$object->getGroupId()."\">".$group->getName()."</a>"; ?> -->
              </div>
              <div class="input-group">
                <span class="input-group-text col-md-3">Model</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="fixme"
                  :value="object.properties.model_name"
                  :readonly="true"
                />
                <router-link class="btn btn-secondary" :to="{ name: 'model', params: { id: object.properties.model_id } }">
                  View model <i class="bi bi-chevron-right"></i>
                </router-link>
                <!-- <?php
                    print "<a href=\"app.php?c=Models&a=view&id=".$object->getModelId()."\">".$modelMetadata->getFilename()."</a>";
                ?> -->
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="button"
              class="btn btn-outline-secondary"
              click="app.php?c=UpdateObjects&a=updateForm&id_to_update=<?=$object->getId()?>"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              if="model.group.isstatic"
              click="app.php?c=DeleteObjects&a=confirmDeleteForm&delete_choice=<?=$object->getId()?>"
            >
              Delete
            </button>
            <button type="button" class="btn btn-primary btn-lg" @click="showMap" title="Show location on map">
              <i class="bi bi-map-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ReloadButton from "../../components/ReloadButton.vue";
import { ObjectService } from "../../services/ObjectService";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  private country = {};
  private object: any = {};
  // private position;
  private cantWrite = true;

  public created() {
    // watch the params of the route to fetch the data again
    // this.$watch(
    //   () => this.$route.params,
    //   () => this.reload(),
    //   { immediate: true }
    // );
  }

  @Watch("$route.params", { immediate: true, deep: true })
  private reload() {
    const objectId = this.$route.params.id;
    const objectService = new ObjectService("");
    objectService
      .getById(objectId)
      .then((d) => {
        console.log("object", d);
        return d;
      })
      .then((d) => {
        this.object = d;
      });
  }

  private hasCountryCode() {
    this.object.properties.country !== "zz" && "" !== this.object.properties.country;
  }

  get longitude() {
    return this.object.geometry.coordinates[0];
  }
  get latitude() {
    return this.object.geometry.coordinates[1];
  }
  get groundElevation() {
    return this.object.properties.gndelev || 0;
  }
  get elevationOffset() {
    return this.object.properties.elevoffset || 0;
  }

  get orientationNorth() {
    return this.headingTrue2STG(this.object.properties.heading);
  }
  get orientationDegree() {
    return this.object.properties.heading;
  }

  private showMap() {
    //
  }

  /**
   * Computes the true heading into a STG heading.
   * @param float trueHeading true heading to convert
   * @return float STG heading
   */
  private headingTrue2STG(trueHeading: number) {
    if (trueHeading > 180) {
      return 540 - trueHeading;
    }
    return 180 - trueHeading;
  }
}
</script>
