<template>
  <div id="app">

    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <!-- <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
      </a> -->
      <router-link to="/" class="navbar-brand" title="FlightGear SceneModels Database">
        <img width="50px" src="./assets/FlightGear_logo.svg"/>
      </router-link>

      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><router-link :class="{active: isActivePage('Home')}" class="nav-link px-2 link-dark" to="/">Home</router-link></li>
        <li><router-link :class="{active: isActivePage('news')}" class="nav-link px-2 link-dark" to="/news">News</router-link></li>
        <li><router-link :class="{active: isActivePage('contribute')}" class="nav-link px-2 link-dark" to="/contribute">Contribute</router-link></li>
        <li><router-link :class="{active: isActivePage('models')}" class="nav-link px-2 link-dark" to="/models">Models</router-link></li>
        <li><router-link :class="{active: isActivePage('objects')}" class="nav-link px-2 link-dark" to="/objects">Objects</router-link></li>
        <li><router-link :class="{active: isActivePage('authors')}" class="nav-link px-2 link-dark" to="/authors">Authors</router-link></li>
        <li><router-link :class="{active: isActivePage('Stats')}" class="nav-link px-2 link-dark" to="/stats">Stats</router-link></li>
        <li><router-link :class="{active: isActivePage('TS-Status')}" class="nav-link px-2 link-dark" to="/tsstatus">TS-Status</router-link></li>
      </ul>

      <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
        <input type="search" class="form-control" placeholder="Search (not available yet)...">
      </form>

      <div class="text-end">
        <check-client-version />
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>

        <!-- <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="glyphicon glyphicon-user"></span>
        </a>
        <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul> -->
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-xxl-9 well g-0" id="leftWidget">
          <router-view />
        </div>
        <div class="d-none d-xxl-block col-xxl-3 well g-0" id="rightWidget">
          <stats />
        </div>
      </div>
    </div>

    <footer class="container-fluid text-center">
      <small class="text-muted"
        >Models &copy; by their respective author. This website &copy; Torsten Dreyer 2017. If in doubt, ask at
        <a href="https://sourceforge.net/p/flightgear/mailman/flightgear-devel/">the flightgear-devel mailing list.</a></small
      >
      <!--
      Version info
      Volunteer?
      Readme
      License
      History
      -->
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CheckClientVersion from "./components/CheckClientVersion.vue";
import Stats from "./views/Stats.vue";

@Component({
  components: {
    CheckClientVersion,
    Stats
  },
})
export default class Home extends Vue {

  isActivePage(page: string) {
    return page === this.$route.name;
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
