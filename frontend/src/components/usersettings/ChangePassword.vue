<template>
  <div class="wrapper">
    <h2>Ändra lösenord</h2>
    <div class="reset-password">
      <input type="text" v-model="oldPass" placeholder="Nuvarande lösenord" />
      <input type="text" v-model="newPass" placeholder="Nytt lösenord" />
      <input type="text" v-model="repeatedPass" placeholder="Upprepa lösenord" />
      <button @click="savePassword()">Spara</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPass: "",
      newPass: "",
      repeatedPass: ""
    };
  },
  methods: {
    savePassword() {
      let url =
        process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      console.log(this.$store.getters.getUser.id);

      this.axios
        .post(url + "auth/reset", {
          userId: this.$store.getters.getUser.id,
          oldHashedPass: this.$store.getters.getUser.passwordHash,
          oldPass: this.oldPass,
          newPass: this.newPass,
          repeatedPass: this.repeatedPass
        })
        .then(res => {
          alert(res.data.msg);
        })
        .catch(err => {
          alert(err.response.data.msg);
        });
    }
  }
};
</script>

<style scoped>
</style>