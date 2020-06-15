<template>
  <div class="wrapper">
    <h2>Ändra lösenord</h2>
    <div class="reset-password">
      <form autocomplete="off">
        <input type="password" v-model="oldPass" placeholder="Nuvarande lösenord" required />
        <input type="password" v-model="newPass" placeholder="Nytt lösenord" required />
        <input type="password" v-model="repeatedPass" placeholder="Upprepa lösenord" required />
        <button @click="savePassword()">Spara</button>
      </form>
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
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
}
h2 {
  font-family: "Spartan", sans-serif;
  font-weight: 500;
  margin: 20px 0 10px 0;
}
form input {
  display: block;
  height: 20px;
  width: 10vw;
  padding: 10px;
  margin: 10px 0;
  border-radius: 15px;
  border: none;
}
form button {
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background-color: #ffffff;
  opacity: 0.9;
  border-radius: 15px;
  border: none;
  display: inline-block;
  cursor: pointer;
  font-family: Arial;
  font-size: 0.9em;
  padding: 6px 15px;
  margin-bottom: 20px;
}
form button:hover {
  opacity: 1;
}
</style>