<template>
  <div class="pageWrapper">
    <Login v-if="page === 'login'"/>
    <Register v-if="page === 'register'"/>
    <Forgot v-if="page === 'forgot'"/>
    <Confirm v-if="page === 'confirm'"/>
  </div>
</template>

<script>
import Login from './../components/authentication/Login'
import Register from './../components/authentication/Register'
import Forgot from './../components/authentication/Forgot'
import Confirm from './../components/authentication/Confirm'

export default {
  components: {
    Login,
    Register,
    Forgot,
    Confirm
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
    text-align: center;
    background: white;
    padding: 30px;
    border-radius: 15px;
  }

  /deep/ .form  h2 {
    font-family: 'Spartan', sans-serif;
    font-weight: lighter;
  }


  /deep/ .form .errorMessage {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid rgba(255, 0, 0, 0.24);
    border-radius: 5px;
    font-size: 9pt;
    background: rgba(231, 161, 161, 0.308);
    color: #b14747;
  }
  
  /deep/ .form .successMessage {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid rgba(43, 255, 0, 0.24);
    border-radius: 5px;
    font-size: 9pt;
    background: rgba(177, 231, 161, 0.308);
    color: #488e40;
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
    background: #189ad3;
    color: white;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: .1s;
  }

  /deep/ .form input[type="button"]:hover {
    background: rgb(41, 145, 187);
  }

  /deep/ .form input[type="button"]:active {
    background: rgb(27, 114, 148);
  }

  /deep/ .form a {
    color: #999;
    font-size: 9pt;
    text-decoration: none;
    font-family: 'Spartan', sans-serif;
    transition: .1s;
  }

  /deep/ .form a:hover {
    color: #666;
  }


  /deep/ .form a span{
    color: rgb(36, 125, 160);
    font-family: 'Spartan', sans-serif;
    transition: .1s; 
  }

  /deep/ .form a span:hover{
    color: rgb(43, 113, 141);
  }

  /* Change the white to any color ;) */
  /deep/ input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
</style>