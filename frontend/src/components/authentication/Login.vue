<template>
  <div class="form">
    <input type="text" v-model="email" placeholder="E-post">
    <input type="password" v-model="password" placeholder="Lösenord">
    <div id="forgotPasswordWrapper">
     <router-link id="forgotPassword" :to="{ params: { page: 'forgot' }}">Glömt ditt lösenord?</router-link>
    </div>
    <input type="button" value="Logga in">
    <router-link :to="{ params: { page: 'register' }}">Har du inget konto? <span>Skapa konto</span></router-link>
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
 #forgotPasswordWrapper {
   width: 100%;
   text-align: left;
 }
</style>