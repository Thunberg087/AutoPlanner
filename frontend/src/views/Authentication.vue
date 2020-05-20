<template>
  <div class="pageWrapper">
    <Login v-if="page === 'login'"/>
  </div>
</template>

<script>
import Login from './../components/authentication/Login'

export default {
  components: {
    Login
  },
  computed: {
    page() {
      return this.$route.params.page
    }
  }
}
</script>

<style scoped>
  .pageWrapper {
    display: flex;
    height: calc(100vh - 50px);
  }

  /deep/ .form {
    width: 20%;
    margin: auto;

  }

  /deep/ .form input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 10px;
    margin: 15px 0;
    border: none;
    font-family: 'Spartan', sans-serif;
    border-bottom: 1px solid #dadada;
    outline: none;
  }


  /deep/ .form input[type="button"] {
    background: rgb(41, 145, 187);
    color: white;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: .1s;
  }

  /deep/ .form input[type="button"]:hover {
    background: rgb(36, 125, 160);
  }

  /deep/ .form input[type="button"]:active {
    background: rgb(27, 114, 148);
  }

  /* Change the white to any color ;) */
  /deep/ input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
</style>