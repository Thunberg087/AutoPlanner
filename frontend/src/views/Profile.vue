<template>
  <div>
    <h1>Hej user!</h1>
    <input type="text" list="fetchedLocations" v-model="searchQuery" placeholder="Sök adress">
    <datalist id="fetchedLocations">
      <option :value="location.place_name" :key="location.id" v-for="location in fetchedLocations"></option>
    </datalist>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: "",
      fetchedLocations: []
    }
  },
  watch: {
    async searchQuery() {
      
      if (this.searchQuery === "") {
        this.fetchedLocations = []
      } else {
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/`+
          `${this.searchQuery}.json`+
          `?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw`+
          `&autocomplete=true`+
          `&country=se`+
          `&types=address`;

        this.axios.get(url)
          .then(response => {
            console.log(response);
            
            this.fetchedLocations = response.data.features
          })
          .catch(err => {
            console.log(err);
          });
      }

 
    },
  }
};
</script>

<style scoped>

</style>