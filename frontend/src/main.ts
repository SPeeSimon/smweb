import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { CRUDRestService } from "./services/CRUDRestService";
import { AuthorService } from "./services/AuthorService";
import { ModelgroupService } from "./services/ModelgroupService";
import { ModelService } from "./services/ModelService";
import { NewsService } from "./services/NewsService";
import { ObjectService } from "./services/ObjectService";
import { ScenemodelsService } from "./services/ScenemodelsService";
import { StatsService } from "./services/StatsService";
import { TerrasyncService } from "./services/TerrasyncService";
import { VersionService } from "./services/VersionService";

Vue.config.productionTip = false;

const ServiceProviders = {
  AuthorService: new AuthorService(process.env.VUE_APP_API_LOCATION),
  CRUDRestService: new CRUDRestService(process.env.VUE_APP_API_LOCATION),
  ModelgroupService: new ModelgroupService(process.env.VUE_APP_API_LOCATION),
  ModelService: new ModelService(process.env.VUE_APP_API_LOCATION),
  NewsService: new NewsService(process.env.VUE_APP_API_LOCATION+ '/..'),
  ObjectService: new ObjectService(process.env.VUE_APP_API_LOCATION),
  ScenemodelsService: new ScenemodelsService(process.env.VUE_APP_API_LOCATION),
  StatsService: new StatsService(process.env.VUE_APP_API_LOCATION),
  TerrasyncService: new TerrasyncService(process.env.VUE_APP_API_LOCATION),
  VersionService: new VersionService(),
};

new Vue({
  router,
  render: (h) => h(App),
  provide: ServiceProviders,
}).$mount("#app");
