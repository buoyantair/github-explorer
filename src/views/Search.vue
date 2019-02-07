<template>
  <div>
    <header>
      <Header size="small"/>
      <SearchForm type="small"/>
    </header>
    <p>search page: {{ $route.query.query }}</p>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import SearchForm from '@/components/SearchForm.vue'

export default {
  name: 'search',
  components: {
    Header,
    SearchForm
  },
  data() {}
}
</script>

<style lang="scss" scoped>
header {
  height: 130px;
  border-bottom: 1px solid #c4c4c4;
  display: grid;
  grid-template-columns: auto 0.15fr 0.6fr auto;
  grid-template-rows: 1fr;
  a {
    grid-column: 2;
  }
  .site-heading {
    text-align: left;
    margin: auto 0;
    display: inline;
    font-size: 36px;
    span {
      font-size: 24px !important;
    }
  }
  .search-form--small {
    grid-column: 3;
  }
}
</style>
