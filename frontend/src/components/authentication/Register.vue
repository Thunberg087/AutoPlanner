<template>
  <div class="form">
    <input type="text" v-model="email" placeholder="E-post">
    <input type="password" v-model="password" placeholder="Lösenord">
    <input type="password" v-model="password" placeholder="Repetera lösenord">
    <input type="button" value="Skapa konto">
    <router-link :to="{ params: { page: 'login' }}">Jag har redan ett konto</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: ''
    }
  }
}
</script>

<style scoped>

</style>