<template>
  <div class="col panel-model-short mb-3">
    <div class="card h-100">
      <router-link :to="{ name: 'model', params: { id: model.id } }" :alt="model.name">
        <img
          class="card-img-top img-fluid fg-model-thumb img-thumbnail w-100 h-100"
          :src="getThumbUrl"
          :alt="model.name"
          :title="model.name"
          v-on:error="fallbackToDefaultThumbImageUrl"
        />
      </router-link>

      <div class="card-body">
        <h5 class="card-title">
          <router-link :to="{ name: 'model', params: { id: model.id } }">{{ model.name }}</router-link>
        </h5>
        <p class="card-text" v-text="model.notes"></p>
        <p class="card-text">
          <small class="text-muted">
            <p>
              By <router-link :to="{ name: 'author', params: { id: model.authorId } }">{{ model.author }}</router-link>
            </p>
          </small>
        </p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated: {{ getTime() }}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DateTime } from "luxon";
import { ModelService } from "../../services/ModelService";

@Component
export default class ModelShort extends Vue {
  @Prop() public model: any;

  private getTime() {
    return DateTime.fromISO(this.model.modified).toFormat("ff");
  }

  get getThumbUrl() {
    return new ModelService('').getThumbUrl(this.model.id);
  }

  private fallbackToDefaultThumbImageUrl(event: Event) {
    event.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktY2FyZC1pbWFnZSIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBkPSJNNi4wMDIgNS41YTEuNSAxLjUgMCAxIDEtMyAwIDEuNSAxLjUgMCAwIDEgMyAweiIvPgogIDxwYXRoIGQ9Ik0xLjUgMkExLjUgMS41IDAgMCAwIDAgMy41djlBMS41IDEuNSAwIDAgMCAxLjUgMTRoMTNhMS41IDEuNSAwIDAgMCAxLjUtMS41di05QTEuNSAxLjUgMCAwIDAgMTQuNSAyaC0xM3ptMTMgMWEuNS41IDAgMCAxIC41LjV2NmwtMy43NzUtMS45NDdhLjUuNSAwIDAgMC0uNTc3LjA5M2wtMy43MSAzLjcxLTIuNjYtMS43NzJhLjUuNSAwIDAgMC0uNjMuMDYyTDEuMDAyIDEydi41NEEuNTA1LjUwNSAwIDAgMSAxIDEyLjV2LTlhLjUuNSAwIDAgMSAuNS0uNWgxM3oiLz4KPC9zdmc+";
    event.target.style.opacity = 0.2;
  }
}
</script>

<style>
.panel-model-short img.card-img-top {
  height: 240px!important;
  object-fit: contain;
}
</style>
