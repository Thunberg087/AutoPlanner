<template>
  <div class="form">
    <input type="text" v-model="email" placeholder="E-post">
    <input type="password" v-model="password" placeholder="Lösenord">
    <input type="button" value="Logga in">
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

</style>