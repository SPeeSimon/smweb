<template>
  <div class="col">
    <div class="card mb-3 panel-model-short col">
      <router-link :to="{ name: 'model', params: { id: model.id } }" :alt="model.name">
        <img
          class="card-img-top img-fluid img-thumbnail w-100 h-100"
          :src="model.thumbUrl"
          :alt="model.name"
          :title="model.name"
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

@Component
export default class ModelShort extends Vue {
  @Prop() public model: any;

  private getTime() {
    return DateTime.fromISO(this.model.modified).toFormat("ff");
  }
}
</script>

<style>
.panel-model-short {
  max-width: 320px;
  display: block;
}
</style>
