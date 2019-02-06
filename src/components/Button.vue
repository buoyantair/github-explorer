<template>
  <button>
    <slot>
    </slot>
  </button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style scoped lang="scss">
button {
  height: 40px;
  width: 150px;
  border-radius: 10px;
  margin: 20px auto;
  border: none;
  background: #6197FF;
  color: #fff;
  font-weight: normal;
  display: flex;
  flex-flow: column;
  justify-content: center;
  font-size: 18px;
}
</style>
