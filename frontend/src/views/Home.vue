<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  created() {
      axios
      .post('http://localhost:3000/login')
      .then(response => {
        console.log(response.data);
      });
  }
}
</script>
