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
      .post(
        "https://api.vasttrafik.se/token",
        {
          headers: {
            "Authorization": "Basic U3ZFYm80S0pReEZ0dUpMUEExN3JLSllocFJnYTpwRWRmTTNkSWhHblNqa2NQb3JDZE1JVTdOVmdh"
          }
        }
      )
      .then(response => {
        console.log(response.data);
      });


      axios({
        method: 'post',
        url: baseUrl + 'applications/' + appName + '/dataexport/plantypes' + plan,
        headers: {
          "Authorization": "Basic U3ZFYm80S0pReEZ0dUpMUEExN3JLSllocFJnYTpwRWRmTTNkSWhHblNqa2NQb3JDZE1JVTdOVmdh"
        }, 
        data: {
          grant_type: 'client_credentials',
        }
      })
      .then(response => {
        console.log(response.data);
      });

  }
};
</script>
