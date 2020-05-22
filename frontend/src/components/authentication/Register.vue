<template>
  <div class="form">
    <input type="text" v-model="email" placeholder="E-post">
    <input type="password" v-model="password" placeholder="Lösenord">
    <input type="password" v-model="repeatPassword" placeholder="Repetera lösenord">
    <input type="button" value="Skapa konto" @click="register">
    <router-link :to="{ params: { page: 'login' }}">Jag har redan ett konto</router-link>
    <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
    <p class="successMessage" v-if="successMessage">{{successMessage}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      errorMessage: null,
      successMessage: null,
    }
  }, 
  methods: {
    register() {
      this.errorMessage = null;
      let url = process.env.VUE_APP_HOST+":"+process.env.VUE_APP_SERVER_PORT+"/"

      this.axios.post(url+'auth/register', {
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      })
      .then(res => {
        this.successMessage = res.data.msg
      })
      .catch(err => {
        console.log(err.response);
        this.errorMessage = err.response.data.msg
      })
    }
  }
}
</script>

<style scoped>

</style>