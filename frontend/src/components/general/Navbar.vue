<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link :to="{ name: 'Auth', params: { page: 'login' } }">Logga in</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#nav {
  display: inline-flex;
  width: 100%;
  padding-left: 10%;
  position: fixed;
}

#nav a {
  font-weight: bold;
  display: block;
  color: #2c3e50;
  padding: 15px 20px;
  text-decoration: none;
  font-family: 'Spartan', sans-serif;
  font-weight: lighter;
}

#nav a.router-link-exact-active {
  color: #428db9;
}
</style>