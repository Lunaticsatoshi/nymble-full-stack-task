<template>
  <b-navbar class="nav">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        JMovies
      </b-navbar-item>
    </template>
    <template #start>
      <router-link to="/">
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
      </router-link>
      <router-link to="/about">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
      </router-link>
    </template>
  </b-navbar>
</template>

<style scoped lang="scss">
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
