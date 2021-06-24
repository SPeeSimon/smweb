<template>
  <div>
    <table class="table table-striped table-hover table-small tsstatus" :class="{ loading: loading }" v-if="mirrors.length > 0">
      <caption>
        <reload-button @reload="fetchData" />
      </caption>
      <thead>
        <tr>
          <th>Mirror</th>
          <th>Service</th>
          <th>Preference</th>
          <th>Timestamp</th>
          <th v-for="(dataItem, index) in dataItems" v-text="dataItem" :key="index"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mirror, index) in mirrors" :key="index">
          <td>
            <a v-text="mirror.url" :href="mirror.url" target="_blank"></a>
          </td>
          <td><span v-text="mirror.dns.service">unknown</span></td>
          <td><span v-text="mirror.dns.preference">unknown</span></td>
          <td><span v-text="mirror.dirindex.time">off</span></td>
          <td
            v-for="(dataItem, index) in dataItems"
            v-text="(mirror.dirindex.d[dataItem] || '').substring(0, 8)"
            :key="index"
          ></td>
        </tr>
      </tbody>
    </table>
    <div v-if="mirrors.length == 0">No entries</div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import ReloadButton from "../components/ReloadButton.vue";
import { TerrasyncContainer, TerrasyncData, TerrasyncRoot, TerrasyncService } from "../services/TerrasyncService";

@Component({
  components: {
    ReloadButton,
  },
})
export default class extends Vue {
  private loading = true;
  private mirrors: TerrasyncRoot[] = [];
  private dataItems: string[] = [];
  private error = null;

  @Inject("TerrasyncService")
  private terrasyncService!: TerrasyncService;

  private created() {
    this.fetchData();
  }

  private fetchData() {
    this.error = null;
    this.loading = true;
    this.dataItems = [];

    this.terrasyncService.getStatus()
      .then((json) => {
        this.mirrors = json.sort((a, b) => a.url.localeCompare(b.url));
        this.dataItems = this.prepareHashes(this.mirrors);
      })
      .catch((err) => {
        this.error = err;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private prepareHashes(data: TerrasyncRoot[]): string[] {
    const dirs = new Set<string>();
    data
      .filter((di) => di.dirindex && di.dirindex.d)
      .map((di) => di.dirindex.d)
      .forEach((di: TerrasyncData) => {
        for (const d in di) {
          dirs.add(d);
        }
      });
    return Array.from(dirs).sort();
  }
}
</script>

<style>
table.tsstatus > tbody > tr > td:nth-child(1) {
  text-align: left;
}
</style>
