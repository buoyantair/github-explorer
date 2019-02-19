<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
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

a,
a:hover,
a:active,
a:focus,
a:visited {
  text-decoration: none;
  outline: none;
  color: initial;
}

.card {
  background: white;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
}
</style>
