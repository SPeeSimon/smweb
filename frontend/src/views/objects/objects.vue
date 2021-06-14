<template>
  <div id="page-objects">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 ps-3 mb-3 border-bottom">
      <div class="btn-toolbar mb-2 mb-md-0">
        <button type="button" class="btn btn-sm" @click="showFilter()" :class="{ 'btn-secondary': displayFilter, 'btn-outline-secondary': !displayFilter}">
          <i class="bi bi-funnel-fill"></i>
          Filter
        </button>
        <div id="filter-summary" v-if="!displayFilter">
            <filter-summary-item v-for="(filterItem, index) in filterSearchOptions" :key="index" :filterItem="filterItem"></filter-summary-item>
        </div>
      </div>
    </div>
    <!-- sort & filter: Description, Model, Modelgroup, Country, Lon, Lat, Ground elev, Offset, Heading -->
    <object-filter v-if="displayFilter" :searchoptions="searchoptions" @doFilter="reload()"></object-filter>

    <table class="table table-striped">
      <caption>
        <reload-button @reload="reload" />
      </caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Model</th>
          <th>Country</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th>Elevation</th>
          <th>Offset</th>
          <th>Heading</th>
          <th>Map</th>
        </tr>
      </thead>
      <tbody class="table-striped">
        <tr v-for="object in objects" :key="object.id">
          <td>
            <router-link :to="{ name: 'object', params: { id: object.id } }" v-text="object.id"></router-link>
          </td>
          <td v-text="object.title"></td>
          <td>
            <router-link :to="{ name: 'model', params: { id: object.modelId } }" v-text="object.modelName"></router-link>
          </td>
          <td v-text="object.country"></td>
          <td v-text="object.longitude"></td>
          <td v-text="object.latitude"></td>
          <td v-text="object.elevation"></td>
          <td v-text="object.elevOffset"></td>
          <td v-text="object.heading"></td>
          <td>
            <a :href="getMapUrl(object)" target="_blank" title="show on map" alt="show on map">
              <i class="bi bi-geo-alt-fill"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: start === 0 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="prev" alt="Previous Page" title="Previous Page">
            Previous</a
          >
        </li>
        <li class="page-item" :class="{ disabled: objects.length < length }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="next" alt="Next Page" title="Next Page"> Next </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import ReloadButton from "../../components/ReloadButton.vue";
import { FGObject, ObjectService } from "../../services/ObjectService";
import { Component, Inject, Vue, Watch } from "vue-property-decorator";
import FilterSummaryItem from "../../components/filter/filter-summary-item.vue";
import ObjectFilter from "./object-filter.vue";

@Component({
  components: {
    ReloadButton,
    FilterSummaryItem,
    ObjectFilter,
  },
})
export default class extends Vue {
  private start = 0;
  private length = 20;
  private searchoptions = {};
  private objects: FGObject[] = [];
  private displayFilter = false;

  @Inject("ObjectService")
  private objectService!: ObjectService;

  created() {
    // 
  }

  next() {
    this.start = this.start + this.length;
    this.$route.params.start = this.start;
    this.reload();
  }

  prev() {
    this.start = Math.max(0, this.start - this.length);
    this.$route.params.start = this.start;
    this.reload();
  }

  @Watch("$route.params", { immediate: true, deep: true })
  reload() {
    // console.log('reload', this.searchoptions, this.$route.query)
    this.objectService
      .search(Object.assign({}, this.$route.query, this.searchoptions), this.start, this.length)
      .then((data) => {
        this.objects = data;
      })
      .catch((err) => {
        //TODO: notify user
        console.log("error getting models", err);
      });
  }

  getMapUrl(object: any) {
    // return "https://scenery.flightgear.org/map?z=15&lat=" + object.latitude + "&lon=" + object.longitude;
    return "/map?z=15&lat=" + object.latitude + "&lon=" + object.longitude;
  }

  showFilter() {
    this.displayFilter = !this.displayFilter;
  }

  get filterSearchOptions() {
    return Object.keys(this.searchoptions)
      .filter(k => this.searchoptions[k])
      .map(k => {return {name: k, value: this.searchoptions[k]}});
  }
}
</script>

<style></style>
