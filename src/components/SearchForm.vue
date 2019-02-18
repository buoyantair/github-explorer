<template>
  <form
    class="search-form"
    v-bind:class="{
      'search-form--big': type === 'big',
      'search-form--small': type === 'small',
    }"
  >
    <div class="input-group">
      <input
        :value="search.query"
        v-on:input="$emit('search', {
          ...search,
          query: $event.target.value
        }); $route.path === '/search' && $router.push({
          name: 'search',
          query: {
            ...search,
            query: $event.target.value
          }
        })"
        type="text"
        placeholder="Search Github..."
      >
      <select
        :value="search.type"
        v-on:change="$emit('search', {
          ...search,
          type: $event.target.value
        }); $route.path === '/search' && $router.push({
          name: 'search',
          query: {
            ...search,
            type: $event.target.value
          }
        })"
      >
        <option value="USER">Users</option>
        <option value="REPOSITORY">Repositories</option>
      </select>
    </div>
    <router-link :to="{ path: '/search', query: { query: search.query, type: search.type }}">
      <Button>Search</Button>
    </router-link>
  </form>
</template>
<script>
import Button from './Button'

export default {
  name: 'SearchForm',
  components: {
    Button
  },
  model: {
    prop: 'search',
    event: 'search'
  },
  props: {
    type: String,
    search: Object
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  font-weight: normal;
  input[type='text'],
  select {
    border: 1px solid #c6c6c6;
    border-radius: 10px;
    padding: 10px;
    font-size: 18px;
  }
  input::placeholder {
    color: #d8d8d8;
  }
}

.search-form--big {
  margin: 20px 0;
  font-weight: normal;
  .input-group {
    display: flex;
    flex-flow: row;
    justify-content: center;
    margin: 0 auto;
  }
  input[type='text'] {
    display: block;
    height: 30px;
    width: 40%;
  }

  input,
  select {
    margin: 10px;
  }
}

.search-form--small {
  margin: auto 0;
  font-weight: normal;
  display: grid;
  grid-template-columns: auto 0.2fr;
  grid-template-rows: 60px;
  grid-gap: 15px;
  .input-group {
    grid-column: 1;
    display: grid;
    grid-template-columns: 0.8fr 0.2fr;
    input {
      grid-column: 1;
    }
    select {
      grid-column: 2;
      margin-left: 15px;
    }
  }

  button {
    grid-column: 2;
    height: 100%;
    margin: 0;
  }
}

@media (max-width: 800px) {
  .search-form--small {
    grid-template-columns: 1fr;
    grid-template-rows: 40px 40px;
  }
}
</style>
