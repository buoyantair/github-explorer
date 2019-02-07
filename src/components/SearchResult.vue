<template>
  <router-link :to="link">
    <div
      v-if="result.__typename === 'User' || result.__typename === 'Organization'"
      class="search-result"
      :class="{
          'user-type': result.__typename === 'User',
          'org-type': result.__typename === 'Organization'
        }"
    >
      <div class="avatar"/>
      <div class="user-detail">
        <h1>{{ result.name || result.login }}</h1>
        <p>{{ result.bio }}</p>
      </div>
    </div>
    <div v-else-if="result.__typename === 'Repository'" class="search-result repo-type">
      <h1>{{ result.owner.login }}/{{ result.name }}</h1>
      <p>{{ result.description }}</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'SearchResult',
  props: {
    result: {
      type: Object
    }
  },
  computed: {
    link: function() {
      if (
        this.result.__typename === 'User' ||
        this.result.__typename === 'Organization'
      ) {
        return `/${this.result.login}`
      } else if (this.result.__typename === 'Repository') {
        return `/${this.result.owner.login}/${this.result.name}`
      } else {
        return '/'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.search-result {
  min-height: 150px;
  display: block;
  background: white;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  .user-type,
  .org-type,
  .repo-type {
    display: none;
  }
}

.search-result.user-type,
.search-result.org-type {
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: 1fr;

  .avatar {
    grid-column: 1;
    height: 120px;
    width: 120px;
    margin: 15px;
    background: #c4c4c4;
    border-radius: 10px;
  }

  .user-detail {
    grid-column: 2;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 1fr;
    margin: 15px 15px 15px 0;
    text-align: left;
    h1,
    p {
      margin: 0;
    }
    h1 {
      color: #22181c;
      font-size: 24;
      font-weight: bold;
    }
    p {
      font-weight: lighter;
      color: #747474;
      font-size: 20px;
    }
  }
}

.search-result.repo-type {
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: left;
  padding: 0 15px;
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
</style>

