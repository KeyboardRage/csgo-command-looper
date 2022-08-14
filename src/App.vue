<template>
  <div>
<!--    <nav>-->
<!--      <router-link to="/">Home</router-link>-->
<!--      <router-link to="/rebind">Rebinder</router-link>-->
<!--    </nav>-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body {
  background: #f4f4f4;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
}
nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.router-link-active {
  background: rgba(0, 0, 0, 0.23);
}
</style>
