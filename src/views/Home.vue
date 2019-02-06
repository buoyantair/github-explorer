<template>
  <div class="home">
    <h1 class="site-heading">
      GitHub
      <span>
        Explorer
      </span>
    </h1>

    <form>
      <input type="text" placeholder="Search Github..."/>
      <Button type="submit">Search</Button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button.vue'
export default {
  name: 'home',
  components: {
    Button
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
  input[type="text"] {
    height: 30px;
    width: 40%;
    display: block;
    margin: 0 auto;
    border: 1px solid #C6C6C6;
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 10px;
    font-size: 18px;
  }
  input::placeholder {
    color: #D8D8D8;
  }
}
</style>
