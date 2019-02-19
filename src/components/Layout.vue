<template>
  <div class="layout">
    <header>
      <Header size="small"/>
      <SearchForm v-model="search" type="small"/>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SearchForm from '@/components/SearchForm.vue'
import SearchResult from '@/components/SearchResult.vue'

export default {
  name: 'Layout',
  components: {
    Header,
    SearchForm,
    SearchResult
  },
  data() {
    return {
      search: {
        query: this.$route.query.query || '',
        type: this.$route.query.type || 'USER'
      },
      results: []
    }
  },
  computed: {
    variables: function() {
      return {
        first: 10,
        query: this.$data.search.query,
        type: this.$data.search.type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  background: #eeeeee;
  width: 100vw;
}



header {
  background: white;
  min-height: 130px;
  border-bottom: 1px solid #c4c4c4;
  display: grid;
  grid-template-columns: auto 20% 60% auto;
  grid-template-rows: 1fr;
  a {
    grid-column: 2;
    .site-heading {
      text-align: left;
      margin: auto 0;
      display: inline;
      font-size: 36px;
      span {
        font-size: 24px !important;
      }
    }
  }

  .search-form--small {
    grid-column: 3;
  }
}

.search-results {
  width: 80%;
  padding: 50px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-rows: minmax(150px, auto);
  height: 100%;
  grid-gap: 15px;
}

@media (max-width: 800px) {
  header {
    grid-template-columns: auto 80% auto;
    grid-template-rows: 80px minmax(40px, auto);
    padding-bottom: 30px;
    a {
      grid-column: 2;
      grid-row: 1;
    }

    .search-form--small {
      grid-column: 2;
      grid-row: 2;
    }
  }
}
</style>
