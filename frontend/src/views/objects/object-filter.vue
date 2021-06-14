<template>
  <div id="filter-container" class="container shadow p-3 mb-5 bg-body">
    <div class="row align-items-start">
      <div class="col-12 col-md-4">
        <!-- model -->
        <div class="row g-3 align-items-center">
          <div class="col-12">
            <input
              type="input"
              id="filter-input-description"
              placeholder="Description"
              class="form-control"
              aria-label="Object description"
              v-model="searchoptions.description"
            />
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-12">
            <input
              type="input"
              id="filter-input-model"
              placeholder="Model"
              class="form-control"
              aria-label="Model"
              v-model="searchoptions.modelname"
            />
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-12">
            <select class="form-select" aria-label="Select a Modelgroup" v-model="searchoptions.modelgroup">
              <option selected>Modelgroup to filter</option>
              <option v-for="mg in modelgroups" :key="mg.id" :value="mg.id">
                {{ mg.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <!-- location -->
        <div class="row g-3 align-items-center">
          <div class="col-3">
            <label for="country" class="col-form-label">Country</label>
          </div>
          <div class="col-auto">
            <select class="form-select" aria-label="Default select example">
              <option selected>Country to filter</option>
            </select>
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-3">
            <label for="filter-input-longitude" class="col-form-label">Longitude</label>
          </div>
          <div class="col-auto">
            <input type="input" id="filter-input-longitude" class="form-control" v-model="searchoptions.lon" />
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-3">
            <label for="filter-input-latitude" class="col-form-label">Latitude</label>
          </div>
          <div class="col-auto">
            <input type="input" id="filter-input-latitude" class="form-control" v-model="searchoptions.lat" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <!-- position -->
        <div class="row g-3 align-items-center">
          <div class="col-3">
            <label for="filter-input-groundelevation" class="col-form-label"
              ><span class="visually-hidden">Ground</span> Elevation</label
            >
          </div>
          <div class="col-auto">
            <input type="input" id="filter-input-groundelevation" class="form-control" v-model="searchoptions.elevation" />
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-3">
            <label for="filter-ionput-offset" class="col-form-label">Offset</label>
          </div>
          <div class="col-auto">
            <input type="input" id="filter-ionput-offset" class="form-control" v-model="searchoptions.elevoffset" />
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-3">
            <label for="filter-input-heading" class="col-form-label">Heading</label>
          </div>
          <div class="col-auto">
            <input type="input" id="filter-input-heading" class="form-control" v-model="searchoptions.heading" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="btn-toolbar mb-2 mb-md-0">
        <button type="button" class="btn mt-4 btn-outline-secondary" @click="doFilter(searchoptions)">Apply</button>
        <button type="button" class="btn mt-4 btn-outline-secondary" @click="clearfilterOptions()">Clear filter</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Vue } from "vue-property-decorator";
import { ModelgroupService } from "../../services/ModelgroupService";
import { ObjectService } from "../../services/ObjectService";

@Component({})
export default class extends Vue {
  @Model("doFilter", { required: true, default: {} }) private searchoptions;
  private modelgroups = [];
  private countries = [];

  @Inject("ObjectService")
  private objectService!: ObjectService;
  @Inject("ModelgroupService")
  private modelgroupService!: ModelgroupService;

  private created() {
    if (this.modelgroups.length == 0) {
      this.modelgroupService.getAll().then((mg) => (this.modelgroups = mg));
    }
    if (this.countries.length == 0) {
      this.objectService.getCountries().then((country) => (this.countries = country));
    }
  }

  @Emit("doFilter")
  public doFilter(options) {
    // emit
  }

  clearfilterOptions() {
    Object.keys(this.searchoptions).forEach((k) => (this.$props.searchoptions[k] = null));
  }
}
</script>
