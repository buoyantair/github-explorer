<template>
  <div class="home">
    <Header size="big"/>
    <SearchForm type="big" v-model="query"/>
  </div>
</template>
<script>
// @ is an alias to /src
import Button from '@/components/Button.vue'
import Header from '@/components/Header.vue'
import SearchForm from '@/components/SearchForm.vue'

export default {
  name: 'home',
  components: {
    Header,
    SearchForm
  },
  data() {
    return {
      query: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
</style>
