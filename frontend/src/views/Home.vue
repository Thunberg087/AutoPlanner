<template>
  <div class="home">
    <h1>Welcome</h1>
    <Calendar />
  </div>
</template>

<script>
  import axios from 'axios'
  import Calendar from './../components/Calendar/Calendar.vue'

  export default {
    name: 'Home',
    created() {},
    components: { Calendar }
  }
</script>
