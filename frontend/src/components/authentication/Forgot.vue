<template>
  <div class="form">
    <input type="text" v-model="email" placeholder="E-post">
    <input type="button" value="Skicka">
    <router-link :to="{ params: { page: 'login' }}">Tillbaka</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>

</style>