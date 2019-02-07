<template>
  <Layout>
    <ApolloQuery
      :query="require('../graphql/user.gql')"
      :variables="{
        login: $route.params.id,
        first: 10
      }"
    >
      <template slot-scope="{ result }">
        <div v-if="result">
          <div v-if="result.loading" class="loading apollo">Loading...</div>
          <div v-else-if="result.error" class="error apollo">An error occured</div>
          <div v-else-if="result.data && result.data.user" class="result apollo">
            <div class="user">
              <div class="user-detail">
                <h1>{{ $route.params.id }}</h1>
                <p>{{ result.data.user.bio }}</p>
              </div>
              <div class="repo-detail">
                <h1>Repositories</h1>
                <div class="repos">
                  <SearchResult
                    v-for="r in result.data.user.repositories.nodes"
                    :key="r.id"
                    :result="r"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-result apollo">No result :(</div>
        </div>
      </template>
    </ApolloQuery>
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
  }
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
    background: white;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: left;
    padding: 0 15px;
    height: 150px;
    border-radius: 10px;
    border: 1px solid #c4c4c4;
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
    grid-template-rows: 40px 600px 60px;
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

