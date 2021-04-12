<template>
  <div id="page-objects">
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
      <tbody class="table-striped" v-for="object in objects" :key="object.id">
        <tr>
          <td v-text="object.id"></td>
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
              <span class="glyphicon glyphicon-map-marker"></span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <a href="#" aria-label="Previous" @click.prevent="prev" alt="Previous Page" title="Previous Page">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li>
          <a href="#" aria-label="Next" @click.prevent="next" alt="Next Page" title="Next Page">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import ReloadButton from "../../components/ReloadButton.vue";
import { ObjectService } from "../../services/ObjectService";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  private start = 0;
  private length = 20;
  private objects = [];

  created() {
    this.reload();
  }

  next() {
    this.start = this.start + this.length;
    this.reload();
  }

  prev() {
    this.start = Math.max(0, this.start - this.length);
    this.reload();
  }

  reload() {
    new ObjectService("")
      .getAll(this.start, this.length)
      .then((data) => {
        if (data && data.type === "FeatureCollection" && data.features && Array.isArray(data.features)) {
          return data;
        }
      })
      .then((data) => {
        this.objects = data.features.map((f) =>
          Object.assign(
            {},
            {
              id: f.id,
              modelId: f.properties.model_id,
              modelName: f.properties.model_name,
              elevation: f.properties.gndelev,
              elevOffset: f.properties.elevoffset,
              heading: f.properties.heading,
              shared: f.properties.shared,
              stg: f.properties.stg,
              country: f.properties.country,
              title: f.properties.title,
              longitude: f.geometry.coordinates[0],
              latitude: f.geometry.coordinates[1],
            }
          )
        );
      })
      .catch((err) => {
        //TODO: notify user
        console.log("error getting models", err);
      });
  }

  getMapUrl(object) {
    return "https://scenery.flightgear.org/map?z=15&lat=" + object.latitude + "&lon=" + object.longitude;
  }
}
</script>

<style></style>
