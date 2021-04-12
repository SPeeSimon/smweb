<template>
  <li title="Update available, please reload this page" v-if="updateAvailable">
    <a href="javascript:location.reload(true);" alt="Update available, please reload this page">
      <span class="glyphicon glyphicon-warning-sign"></span>
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
