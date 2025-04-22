<template>
  <div id="app">
    <h1>동물병원 상담 시스템</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
