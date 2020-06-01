<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/plan-a-trip">Plan a trip</router-link>
    <router-link v-if="!isLoggedIn" :to="{ name: 'Auth', params: { page: 'login' } }">Logga in</router-link>
    <a v-if="isLoggedIn" @click="logout">Logga ut</a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
#nav {
  display: inline-flex;
  width: 100%;
  padding-left: 10%;
  position: fixed;
  background: white;
  z-index: 11;
}

#nav a {
  font-weight: bold;
  display: block;
  color: #2c3e50;
  padding: 15px 20px;
  text-decoration: none;
  font-family: "Spartan", sans-serif;
  font-weight: lighter;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #428db9;
}
</style>