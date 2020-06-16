<template>
  <div class="home">
    <Calendar />
  </div>
</template>

<script>
import axios from "axios";
import Calendar from "./../components/calendar/Calendar";

export default {
  name: "Home",
  created() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {

        this.axios
          .post("http://localhost:3000/vasttrafik/getNearbyStops", {
            // lat: position.coords.latitude,
            // lng: position.coords.longitude
              lat: 57.733560,
              lng: 11.770180
          })
          .then(response => {
            console.log(response);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    } else {
      /* geolocation IS NOT available */
    }
  },
  components: { Calendar }
};
</script>
