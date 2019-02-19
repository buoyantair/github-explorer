<template>
  <Layout>
    <div v-if="results">
          <div v-if="results.loading" class="loading apollo">Loading...</div>
          <div v-else-if="results.error" class="error apollo">An error occured</div>
          <div v-else-if="results.data && results.data.user" class="result apollo">
            {{
              pageInfo = results.data.user.repositories.pageInfo && ''
            }}
            <div class="user">
              <div class="card user-detail">
                <h1>{{ $route.params.id }}</h1>
                <p>{{ results.data.user.bio }}</p>
              </div>
              <div class="repo-detail">
                <h1>Repositories</h1>
                <div class="repos">
                  <SearchResult
                    v-for="r in results.data.user.repositories.nodes"
                    :key="r.id"
                    :result="r"
                  />
                </div>
                <div class="pagination">
                  <button @click="loadMore" :disabled="!results.data.user.repositories.pageInfo.hasNextPage">loadmore</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-result apollo">No result :(</div>
        </div>
  </Layout>
</template>
<script>
import Layout from '@/components/Layout.vue'
import SearchResult from '@/components/SearchResult.vue'

export default {
  name: 'User',
  components: {
    Layout,
    SearchResult
  },
  apollo: {
    user: {
      query: require('../graphql/user.gql'),
      variables() {
        return this.$data.variables
      },
      result (results) {
        this.$data.results =  results
      },
    }
  },
  data() {
    return {
      variables: {
        login: this.$route.params.id,
        first: 10
      },
      results: {}
    }
  },
  methods: {
    loadMore() {
      const { data: { user: { repositories: { pageInfo } } } } = this.$data.results;
      if (pageInfo.hasNextPage) {
        this.$apollo.queries.user.fetchMore({
          variables: {
            ...this.$data.variables,
            after: pageInfo.endCursor
          },
          updateQuery(previousResult, { fetchMoreResult }) {
            const newUser = fetchMoreResult.user;
            const repositories = {
              ...previousResult.user.repositories,
              nodes: [...previousResult.user.repositories.nodes, ...fetchMoreResult.user.repositories.nodes],
              pageInfo: {
                ...fetchMoreResult.user.repositories.pageInfo,
                startCursor: previousResult.user.repositories.pageInfo.startCursor,
              }
            }
            return {
              user: {
                __typename: previousResult.user.__typename,
                ...newUser,
                repositories
              }
            }
          }
        })
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.user {
  display: grid;
  grid-template-columns: auto 20% 60% auto;
  padding: 50px 0;
  grid-gap: 15px;
  .user-detail {
    grid-column: 2;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: left;
    height: 150px;
    h1 {
      color: #22181c;
      font-size: 24;
      font-weight: bold;
      margin: 0 0 15px 0;
    }
    p {
      font-weight: lighter;
      color: #747474;
      font-size: 20px;
      margin: 0;
    }
  }
  .repo-detail {
    grid-column: 3;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px minmax(600px, auto) 60px;
    grid-gap: 15px;
    h1 {
      color: #22181c;
      text-align: left;
      margin: 0;
      padding: 0;
      font-weight: lighter;
      display: flex;
      flex-flow: column;
    }

    .repos {
      display: grid;
      grid-auto-rows: minmax(150px, auto);
      height: 100%;
      grid-gap: 15px;
    }
  }
}
</style>

