<template>
  <div class="form">
    <input type="text" v-model="email" placeholder="E-post">
    <input type="password" v-model="password" placeholder="Lösenord">
    <div id="forgotPasswordWrapper">
     <router-link id="forgotPassword" :to="{ params: { page: 'forgot' }}">Glömt ditt lösenord?</router-link>
    </div>
    <input type="button" value="Logga in" @click="login">
    <router-link :to="{ params: { page: 'register' }}">Har du inget konto? <span>Skapa konto</span></router-link>
    <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
export default {
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ name: "Home" })
    }
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null
    }
  },
  methods: {
    login() {
      this.errorMessage = null;
      let url = process.env.VUE_APP_HOST+":"+process.env.VUE_APP_SERVER_PORT+"/"

      this.axios.post(url+'auth/login', {
        email: this.email,
        password: this.password
      })
      .then(res => {
        let user = res.data.user
        let token = res.data.token
        this.$store.dispatch('login', { user, token })
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
 #forgotPasswordWrapper {
   width: 100%;
   text-align: left;
 }

</style>