<template>
  <div class="home">
    <h1 class="site-heading">
      GitHub
      <span>Explorer</span>
    </h1>

    <form>
      <input v-model="query" type="text" placeholder="Search Github...">
      <router-link :to="{ path: 'search', query: { query }}">
        <Button>Search</Button>
      </router-link>
    </form>

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

export default {
  name: 'home',
  components: {
    Button
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
.site-heading {
  margin: 0 auto;
  font-family: 'Open Sans', sans-serif;
  font-size: 72px;
  font-weight: 800;
  letter-spacing: -0.05em;
  span {
    font-size: 64px;
    font-weight: 600;
  }
}

form {
  margin: 20px 0;
  font-weight: normal;
  input[type='text'] {
    height: 30px;
    width: 40%;
    display: block;
    margin: 0 auto;
    border: 1px solid #c6c6c6;
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 10px;
    font-size: 18px;
  }
  input::placeholder {
    color: #d8d8d8;
  }
}
</style>
