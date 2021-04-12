<template>
  <div class="panel panel-default panel-model-short">
    <div class="panel-heading">
      <router-link :to="{ name: 'model', params: {id: model.id}}" >{{model.name}}</router-link>
      <span>&nbsp;(</span>
      <router-link :to="{ name: 'author', params: {id: model.authorId}}">{{model.author}}</router-link>
      <span>)</span>
    </div>

    <div class="panel-body">
      <router-link :to="{ name: 'model', params: {id: model.id}}" :alt="model.name">
        <img class="img-responsive img-rounded fg-model-thumb" :src="model.thumbUrl" :alt="model.name" :title="model.name"/>
      </router-link>
    </div>

    <div class="panel-footer">
      <div v-text="model.notes"></div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ModelShort extends Vue {
  @Prop() model;
}
</script>

<style>
.panel-model-short {
  max-width: 320px;
  display: block;
}
</style>