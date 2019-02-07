<template>
  <router-link to="/">
    <h1
      class="site-heading"
      v-bind:class="{
      'site-heading--big': size === 'big',
      'site-heading--small': size === 'small',
    }"
    >
      GitHub
      <span>Explorer</span>
    </h1>
  </router-link>
</template>
<script>
export default {
  name: 'Header',
  props: {
    size: String
  }
}
</script>

<style lang="scss" scoped>
a {
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
}
.site-heading {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: -0.05em;
}

.site-heading--big {
  margin: 0 auto;
  font-size: 72px;
  font-weight: 800;
  span {
    font-size: 64px;
    font-weight: 600;
  }
}

.site-heading--small {
  margin: 0;
  font-size: 36px;
  font-weight: 800;
  span {
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
