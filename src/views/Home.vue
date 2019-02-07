<template>
  <div class="home">
    <Header size="big"/>

    <SearchForm type="big"/>

    <!-- <ApolloQuery :query="require('@/graphql/search.gql')" :variables="variables">
      <template slot-scope="{ result }">
        <div v-if="result">
          <div v-if="result.loading">Loading...</div>

          <div v-else-if="result.error">An error occured</div>

          <div v-else-if="result.data">
            <p v-for="user of result.data.search.nodes" :key="user.id" class="user">{{ user.name }}</p>
          </div>

          <div v-else>No result :(</div>
        </div>
      </template>
    </ApolloQuery>-->
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
    Button,
    Header,
    SearchForm
  },
  data() {
    return {
      variables: {
        query: 'sean',
        first: 50,
        type: 'USER'
      },
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
