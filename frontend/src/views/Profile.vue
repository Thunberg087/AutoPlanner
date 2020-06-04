<template>
  <div>
    <h1>Hej user!</h1>
    <input type="text" list="fetchedLocations" v-model="searchQuery" placeholder="Sök adress">
    <datalist id="fetchedLocations">
      <option></option>
    </datalist>
    <ul>
      <li :key="location.id" v-for="location in fetchedLocations" @click="addLocation(location)">{{ location.place_name }}</li>
    </ul>
    <h2>Mina sparade locations</h2>
    <ul>
      <li :key="location" v-for="location in userLocations">{{ location.locationName }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: "",
      fetchedLocations: [],
      userLocations: []
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
  },
  created() {
    this.getLocationList();
  },
  methods: {
    getLocationList() {
      let url = process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      this.axios
        .post(url + "usersettings/getLocationList", { userId: this.$store.getters.getUser.id })
        .then(res => {
          this.userLocations = res.data
        })
        .catch(err => {
          this.errorMessage = err.response.data.msg;
        });
    },
    addLocation(pickedLocation) {

      console.log("addlocation method" + pickedLocation.place_name);
      let url = process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      let newLocation = {
        userId: this.$store.getters.getUser.id,
        locationName: pickedLocation.place_name,
        longitude: pickedLocation.geometry.coordinates[0],
        latitude: pickedLocation.geometry.coordinates[1]
      }

      this.axios
        .post(url + "usersettings/addLocation", newLocation)
        .then(res => {
          getLocationList();
        })
        .catch(err => {
          this.errorMessage = err.response.data.msg;
        });
    }
  }
};
</script>

<style scoped>

</style>