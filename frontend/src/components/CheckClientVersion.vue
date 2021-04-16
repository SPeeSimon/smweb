<template>
  <li title="Update available, please reload this page" v-if="updateAvailable">
    <a href="javascript:location.reload(true);" alt="Update available, please reload this page">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
    </a>
  </li>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VersionService } from "../services/VersionService";

const HOUR_IN_MS = 3600*1000;

@Component({ name: "check-client-version" })
export default class CheckClientVersion extends Vue {
  protected updateAvailable = false;
  private clientVersion: string = null;

  constructor() {
    super();
    this.startTimerForVersionCheck();
  }

  private startTimerForVersionCheck() {
    setInterval( () => this.checkClientVersion(), HOUR_IN_MS );
  }

  private checkClientVersion(): void {
    new VersionService()
      .getClientVersion()
      .then((version) => {
        if (this.clientVersion) {
          this.updateAvailable = this.clientVersion !== version.client;
        }
        this.clientVersion = version.client;
      })
      .catch(function (err) {
        console.log("can't get client version", err);
      });
  }
}
</script>

<style></style>
