<template>
  <div class="main-wrapper">
    <div class="content">
      <h1>Hej user!</h1>
      <input class="search-input" type="text" v-model="searchQuery" placeholder="Sök adress">
      <ul class="search-list">
        <li :key="location.id" v-for="location in fetchedLocations">{{ location.place_name }} <button @click="addLocation(location)">+</button></li>
      </ul>
      <h2>Mina sparade locations</h2>
      <ul>
        <li :key="i" v-for="(location, i) in userLocations">{{ location.locationName }} <button @click="deleteLocation(location)">X</button></li>
      </ul>
    </div>
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
          `&types=address`+
          `&limit=10`;

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
      
      let newLocation = {
        userId: this.$store.getters.getUser.id,
        locationName: pickedLocation.place_name,
        longitude: pickedLocation.geometry.coordinates[0],
        latitude: pickedLocation.geometry.coordinates[1]
      }

      // check if location already exists in list, if so do not add
      var alreadyAdded = false;
      for (var i = 0; i < this.userLocations.length; i++) {
        if (this.userLocations[i].locationName == newLocation.locationName) {
          alreadyAdded = true;
        }
      }
      if (!alreadyAdded) {
        console.log("addlocation method: " + pickedLocation.place_name);
        let url = process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";
  
  
        this.axios
          .post(url + "usersettings/addLocation", newLocation)
          .then(res => {
            this.getLocationList();
          })
          .catch(err => {
            this.errorMessage = err.response.data.msg;
          });
      } else {
        alert("Platsen är redan sparad!")
      }
    },
    deleteLocation(pickedLocation) {

      console.log("deleteLocation method: " + pickedLocation.locationName);
      let url = process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      this.axios
        .post(url + "usersettings/deleteLocation", pickedLocation)
        .then(res => {
          this.getLocationList();
        })
        .catch(err => {
          this.errorMessage = err.response.data.msg;
      });

    }
  }
};
</script>

<style scoped>
  .main-content {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .content {
    text-align: center;
    width: 500px;
    margin: 0 auto;
  }
  h1, h2 {
    margin: 10px 0;
  }
  ul {
    list-style-type: none;
  }
  .search-input {
    width: 100%;
    height: 30px;
    font-size: 1.2em;
    border-radius: 15px;
    border: none;
    padding: 0 20px;
  }
  .search-list {
    text-align: left;
    background-color: #a5d9ef;
    width: 100%;
    max-height: 130px;
    overflow-y: scroll;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px; 
  }
  .search-list li {
    margin: 10px 0;
  }
</style>