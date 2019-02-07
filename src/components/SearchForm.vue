<template>
  <form
    class="search-form"
    v-bind:class="{
      'search-form--big': type === 'big',
      'search-form--small': type === 'small',
    }"
  >
    <input v-model="query" type="text" placeholder="Search Github...">
    <router-link :to="{ path: 'search', query: { query }}">
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
  props: {
    type: String
  },
  data() {
    return {
      query: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  font-weight: normal;
  input[type='text'] {
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
  input[type='text'] {
    display: block;
    margin: 0 auto;
    height: 30px;
    width: 40%;
  }
}

.search-form--small {
  width: 600px;
  margin: auto 0;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;

  input {
    display: block;
    height: 30px;
    width: 500px;
  }

  a {
    button {
      margin: auto 20px;
      height: 50px;
    }
  }
}
</style>
