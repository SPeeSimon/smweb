<template>
  <div class="row">
    <div class="col-md-2 col-sm-12 g-0">
      <ul class="nav nav-pills flex-column" :class="{ loading: modelGroupsLoading }">
        <li
          class="nav-item"
          role="presentation"
          v-for="(group, index) in modelgroups"
          :key="index"
          :class="{ active: selectedModelgroup && group.id === selectedModelgroup.id }"
        >
          <a
            class="nav-link"
            href="#"
            v-text="group.name"
            @click.prevent="selectGroup(group)"
            :class="{ active: selectedModelgroup && group.id === selectedModelgroup.id }"
          ></a>
        </li>
      </ul>
    </div>

    <div class="col-md-10 col-sm-12">
      <div class="card card-default" :class="{ loading: modelsLoading }">
        <div class="card-header">
          <span>Models</span>
          <span class="btn pull-right fa fa-sync" @click="reload" title="Refresh"></span>
        </div>
        <div class="card-body row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
          <model-short v-for="model in models" :key="model.id" :model="model"></model-short>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ModelService } from "../../services/ModelService";
import { ModelGroup, ModelgroupService } from "../../services/ModelgroupService";
import { Component, Inject, Vue, Watch } from "vue-property-decorator";
import ModelShort from "./model-short.vue";
import ReloadButton from "../../components/ReloadButton.vue";

@Component({
  components: {
    ReloadButton,
    ModelShort,
  },
})
export default class extends Vue {
  private modelgroups: ModelGroup[] = [];
  private selectedModelgroup: any = null;
  private start = 0;
  private length = 20;
  private models: any[] = [];
  private modelGroupsLoading = false;
  private modelsLoading = false;

  @Inject("ModelService")
  private modelService!: ModelService;
  @Inject("ModelgroupService")
  private modelgroupService!: ModelgroupService;

  private created() {
    this.reload();
  }

  private selectAll(a: any, b: any) {
    this.selectedModelgroup = null;
  }

  private selectGroup(a: any) {
    this.selectedModelgroup = a;
  }

  private isSelected(modelGroup: any) {
    if (!modelGroup){ return !this.selectedModelgroup;}
    if (!this.selectedModelgroup){ return false;}
    return modelGroup.id === this.selectedModelgroup.id;
  }

  @Watch("selectedModelgroup")
  private updateSelectedModelgroup() {
    this.reloadModels(this.selectedModelgroup, this.start, this.length);
  }

  private reloadModels(modelGroup: any, start: number, length: number) {
    this.modelsLoading = true;

    this.modelService
      .search(Object.assign({}, {modelgroup: this.selectedModelgroup.id}, this.$route.query), start, length)
      .then((data) => {
        if (!(data && Array.isArray(data))) {
          return;
        }
        this.models = data;
      })
      .catch((err) => {
        //TODO: notify user
        console.log("error getting models", err);
      })
      .finally(() => {
        this.modelsLoading = false;
      });
  }

  private reloadModelGroups() {
    this.modelGroupsLoading = true;
    this.modelgroupService
      .getAll()
      .then((data) => {
        this.modelgroups = data;
        this.selectedModelgroup = this.modelgroups.find(mg => mg.id == this.$route.query.type) || this.modelgroups[0];
      })
      .catch(function (err) {
        //TODO: notify user
        console.log("error getting modelgroups", err);
      })
      .finally(() => {
        this.modelGroupsLoading = false;
      });
  }

  // @Watch("$route.params", { immediate: true, deep: true })
  private reload() {
    this.reloadModelGroups();
  }
}
</script>
