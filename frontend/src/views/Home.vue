<template>
  <div class="home">
    <Calendar />
  </div>
</template>

<script>
import axios from "axios";
import Calendar from "./../components/calendar/Calendar.vue";

export default {
  name: "Home",
  created() {},
  components: { Calendar }
};
</script>
