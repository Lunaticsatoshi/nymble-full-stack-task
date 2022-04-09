<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  color: #2c3e50;
}
</style>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/header/Navbar.vue";
export default Vue.extend({
  name: "App",
  components: {
    Navbar,
  },
});
</script>
