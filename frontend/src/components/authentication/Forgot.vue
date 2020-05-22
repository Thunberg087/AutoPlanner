<template>
  <div class="form">
    <fragment v-if="!hasToken">
      <input type="text" v-model="email" placeholder="E-post" />
      <input type="button" value="Skicka" @click="forgot" />
      <router-link :to="{ params: { page: 'login' }}">Tillbaka</router-link>
    </fragment>
    <fragment v-if="hasToken">
      <input type="password" placeholder="Nytt lösenord" v-model="newPass" />
      <input type="password" placeholder="Repetera lösenord" v-model="repeatPass"/>
      <input type="button" @click="createNewPass" value="Skicka"/>
    </fragment>
    <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="successMessage" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      repeatPass: '',
      newPass: '',
      errorMessage: "",
      successMessage: "",
    };
  },
  computed: {
    hasToken() {
      if (this.$route.params.token) {
        return true
      }
      return false
    }
  },
  methods: {
    forgot() {
      this.errorMessage = null;
      let url = process.env.VUE_APP_HOST+":"+process.env.VUE_APP_SERVER_PORT+"/"

      this.axios.post(url+'auth/forgot', {
        email: this.email,
      })
      .then(res => {
        this.successMessage = res.data.msg
      })
      .catch(err => {
        console.log(err.response);
        this.errorMessage = err.response.data.msg
      })
     
    },
    createNewPass() {
      this.errorMessage = null;
      let url = process.env.VUE_APP_HOST+":"+process.env.VUE_APP_SERVER_PORT+"/"

      this.axios.post(url+'auth/forgot', {
        token: this.$route.params.token,
        changingPass: true,
        repeatPass: this.repeatPass,
        newPass: this.newPass
      })
      .then(res => {
        this.successMessage = res.data.msg
        setTimeout(() => {
          this.$router.push({ name: "Auth", params: { page: 'login' } })
        }, 1500);
      })
      .catch(err => {
        console.log(err.response);
        this.errorMessage = err.response.data.msg
      })
    }
  }
};
</script>

<style scoped>
</style>