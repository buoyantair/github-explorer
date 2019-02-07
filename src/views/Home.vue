<template>
  <div class="home">
    <Header size="big"/>
    <SearchForm type="big" v-model="search"/>
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
      search: {
        query: '',
        type: 'USER'
      }
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
