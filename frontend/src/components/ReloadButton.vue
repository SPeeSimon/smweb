<template>
  <span class="btn pull-right fa fa-sync" @click="reload" title="Refresh"></span>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";

@Component({
  name: 'reload-button'
})
export default class extends Vue {
  @Emit()
  public reload() {
      // nothing
  }
}
</script>
