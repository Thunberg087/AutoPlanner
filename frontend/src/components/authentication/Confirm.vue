<template>
  <div class="form">
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  created() {
    let url = process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";
    
    this.axios
      .post(url + "auth/confirm", {
        token: this.$route.params.token,
      })
      .then(res => {
        this.message = res.data.msg
        setTimeout(() => {
          this.$router.push({ name: "Auth", params: { page: 'login' } })
        }, 1500);
      })
      .catch(err => {
        this.message = err.response.data.msg;
      });
  },
  data() {
    return {
      email: "",
      password: "",
      message: "Laddar..."
    };
  }
};
</script>

<style scoped>
#forgotPasswordWrapper {
  width: 100%;
  text-align: left;
}
</style>