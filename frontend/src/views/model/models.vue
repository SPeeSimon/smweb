<template>
  <div class="row">
    <div class="col-md-2">
      <ul class="nav nav-pills flex-column" :class="{ loading: modelGroupsLoading }">
        <li
          class="nav-item"
          role="presentation"
          v-for="(group, index) in modelgroups"
          :key="index"
          :class="{ active: selectedModelgroup && group.id === selectedModelgroup.id }"
        >
          <a class="nav-link" href="#" v-text="group.name" @click.prevent="selectGroup(group)" :class="{ active: selectedModelgroup && group.id === selectedModelgroup.id }"></a>
        </li>
      </ul>
    </div>

    <div class="col-md-10">
      <div class="panel panel-default" :class="{ loading: modelsLoading }">
        <div class="panel-heading">
          <span>Models</span>
          <span class="btn pull-right fa fa-sync" @click="reload" title="Refresh"></span>
        </div>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <model-short v-for="model in models" :key="model.id" :model="model"></model-short>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ModelService } from "../../services/ModelService";
import { ModelGroup, ModelgroupService } from "../../services/ModelgroupService";
import { Component, Vue } from "vue-property-decorator";
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
  private selectedModelgroup = null;
  private modelGroupsLoading = false;
  private start = 0;
  private length = 20;
  private models = [];
  private modelsLoading = false;

  private created() {
    new ModelgroupService("")
      .getAll()
      .then((d) => (this.modelgroups = d))
      .then(() => this.selectGroup(this.modelgroups[0]))
      .then(() => this.reloadModels(this.modelgroups[0].id, this.start, this.length));
  }

  private selectAll(a, b) {
    this.selectedModelgroup = null;
  }

  private selectGroup(a) {
    this.selectedModelgroup = a;
  }

  private isSelected(modelGroup) {
    if (!modelGroup) return !this.selectedModelgroup;
    if (!this.selectedModelgroup) return false;
    return modelGroup.id === this.selectedModelgroup.id;
  }

  private reloadModels(modelGroup, start, length) {
    this.modelsLoading = true;

    new ModelService("")
      .getByModelgroup(modelGroup, start, length)
      .then((data) => {
        if (!(data && Array.isArray(data))) return;
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

  private reload() {
    this.modelGroupsLoading = true;

    new ModelgroupService("")
      .getAll()
      .then((data) => {
        this.modelgroups = data;
        if (data.length > 0) {
          this.selectGroup(data[0]);
        }
      })
      .catch(function (err) {
        //TODO: notify user
        console.log("error getting modelgroups", err);
      })
      .finally(() => {
        this.modelGroupsLoading = false;
      });
  }

  private computed() {
    var selected = this.selectedModelgroup;
    if (!selected) return;
    this.reloadModels(selected.id, this.start, this.length);
  }
}
</script>
