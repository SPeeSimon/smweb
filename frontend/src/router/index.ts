import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    alias: [""],
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/contribute",
    name: "contribute",
    // component: () => import(/* webpackChunkName: "contribute" */ "../views/contribute/contribute-notpossible.vue"),
    component: () => import(/* webpackChunkName: "contribute" */ "../views/contribute/contribute-intro.vue"),
  },
  {
    path: "/models",
    name: "models",
    component: () => import(/* webpackChunkName: "models" */ "../views/model/models.vue"),
  },
  {
    path: "/model/:id",
    name: "model",
    component: () => import(/* webpackChunkName: "models" */ "../views/model/model.vue"),
  },
  {
    path: "/news",
    name: "news",
    component: () => import(/* webpackChunkName: "news" */ "../views/news/News.vue"),
  },
  {
    path: "/objects",
    name: "objects",
    component: () => import(/* webpackChunkName: "objects" */ "../views/objects/objects.vue"),
  },
  {
    path: "/object/:id",
    name: "object",
    component: () => import(/* webpackChunkName: "objects" */ "../views/objects/object.vue"),
  },
  {
    path: "/authors",
    name: "authors",
    component: () => import(/* webpackChunkName: "authors" */ "../views/author/authors.vue"),
  },
  {
    path: "/author/:id",
    name: "author",
    component: () => import(/* webpackChunkName: "authors" */ "../views/author/author.vue"),
  },
  {
    path: "/stats",
    name: "Stats",
    component: () => import(/* webpackChunkName: "stats" */ "../views/Stats.vue"),
  },
  {
    path: "/tsstatus",
    name: "TS-Status",
    component: () => import(/* webpackChunkName: "tsstatus" */ "../views/TsStatus.vue"),
  },
  {
    path: "/static/:page(.*)",
    component: () => import(/* webpackChunkName: "tsstatus" */ "../views/Static.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
