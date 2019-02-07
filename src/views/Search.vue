<template>
  <div class="search">
    <header>
      <Header size="small"/>
      <SearchForm v-model="query" type="small"/>
    </header>
    <section class="search-results">
      {{ results }}
      <!-- <ApolloQuery
        :query="require('../graphql/search.gql')"
        :variables="{
        query, first, type
      }"
      >
        <template slot-scope="{ result }">
          <div v-if="result">
            <div v-if="result.loading" class="loading apollo">Loading...</div>
            <div v-else-if="result.error" class="error apollo">An error occured</div>
            <div v-else-if="result.data" class="result apollo">{{ result.data }}</div>
            <div v-else class="no-result apollo">No result :(</div>
          </div>
        </template>
      </ApolloQuery>-->
    </section>
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
  apollo: {
    search: {
      query: require('../graphql/search.gql'),
      variables() {
        return {
          first: 10,
          type: 'USER',
          query: this.$data.query
        }
      },
      fetchPolicy: 'cache-and-network',
      result({ data, loading }) {
        if (!loading && data.search && data.search.nodes) {
          if (!this.$data.usersFetched) {
            this.$data.results = [...this.$data.results, data.search.nodes]
            this.$data.usersFetched = true
            this.$apollo.queries.search.refetch({
              type: 'REPOSITORY',
              first: 10,
              query: this.$data.query
            })
          } else if (this.$data.usersFetched) {
            this.$data.results = [...this.$data.results, data.search.nodes]
            this.$data.usersFetched = true
          }
        }
      }
    }
    // searchRepos: {
    //   query: require('../graphql/searchRepos.gql'),
    //   variables() {
    //     return {
    //       first: 10,
    //       type: 'REPOSITORY',
    //       query: this.$data.query
    //     }
    //   },
    //   fetchPolicy: 'cache-and-network'
    // }
  },
  data() {
    return {
      query: this.$route.query.query || '',
      results: [],
      usersFetched: false
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  background: #eeeeee;
  height: 100vh;
  width: 100vw;
}
header {
  background: white;
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

.search-results {
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
}
</style>
