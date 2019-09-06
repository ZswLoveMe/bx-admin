<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {

  name: 'App',
  mounted() {
  }
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  body,
  html {
    height: 100%;
  }
  #app  {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    height: 100%;
  }
</style>
