<template>
  <div class="home">
    <h1>Welcome</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  created() {
    axios
      .get(
        "https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=torslanda&format=json",
        {
          headers: {
            "Authorization": "Bearer 1e7b22a7-5278-3c81-a7f7-bde307cc7994"
          }
        }
      )
      .then(response => {
        console.log(response.data);
      });
  }
};
</script>
