<template>
  <div id="app">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand" title="FlightGear SceneModels Database" style="padding: 0">
            <img style="width: 100%; height: 100%" src="./assets/FlightGear_logo.svg"/>
          </router-link>
        </div>

        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/contribute">Contribute</router-link></li>
            <li><router-link to="/models">Models</router-link></li>
            <li><router-link to="/objects">Objects</router-link></li>
            <li><router-link to="/authors">Authors</router-link></li>
            <li><router-link to="/stats">Stats</router-link></li>
            <li><router-link to="/tsstatus">TS-Status</router-link></li>
            <!-- <li data-bind="css: { active: isActiveLeft('home') }"><a href="#home">Home</a></li>
          <li data-bind="css: { active: isActiveLeft('contribute') }"><a href="#contribute">Contribute</a></li>
          <li data-bind="css: { active: isActiveLeft('models') }"><a href="#models">Models</a></li>
          <li data-bind="css: { active: isActiveLeft('objects') }"><a href="#objects">Objects</a></li>
          <li data-bind="css: { active: isActiveLeft('authors') }"><a href="#authors">Authors</a></li>
          <li data-bind="css: { active: isActiveLeft('tsstatus') }"><a href="#tsstatus">TS-Status</a></li> -->
          </ul>

          <form class="navbar-form navbar-right">
            <div class="form-group input-group">
              <input class="form-control" type="text" placeholder="Search (not available yet)" />
            </div>
          </form>

          <ul class="nav navbar-nav navbar-right">
            <check-client-version />
            <li>
              <span class="glyphicon glyphicon-user"></span>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-9 well" id="leftWidget">
          <router-view />
        </div>
        <div class="col-sm-3 well" id="rightWidget">
          <stats />
        </div>
      </div>
    </div>

    <footer class="container-fluid text-center">
      <small class="text-muted"
        >Models &copy; by their respective author. This website &copy; Torsten Dreyer 2017. If in doubt, ask at
        <a href="https://sourceforge.net/p/flightgear/mailman/flightgear-devel/">the flightgear-devel mailing list.</a></small
      >
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
export default class Home extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
