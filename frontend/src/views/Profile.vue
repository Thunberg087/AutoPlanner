<template>
  <div class="main-wrapper">
    <div class="content">
      <h1>Hej user!</h1>
      <input class="search-input" type="text" v-model="searchQuery" placeholder="Sök adress" />
      <ul class="search-list">
        <li :key="location.id" v-for="location in fetchedLocations">
          {{ location.place_name }}
          <button @click="pickLocation(location); openForm()">+</button>
        </li>
      </ul>
      <h2>Mina sparade locations</h2>
      <ul class="saved-locations">
        <li :key="i" v-for="(location, i) in userLocations">
          <h3>{{location.altLocationName}}</h3>
          {{ location.locationName }}
          <button @click="deleteLocation(location)">X</button>
        </li>
      </ul>
      <div class="form-popup" id="name-location-form">
        <form action="javascript:void(0)" class="form-container">
          <label for="name">
            <b>Ge platsen ett smeknamnnamn</b>
          </label>
          <input
            type="text"
            placeholder="Lämna tomt för att endast spara adressen"
            name="name"
            v-model="locationNick"
          />
          <button type="submit" class="btn" @click="addLocation(); closeForm()">Spara</button>
          <button type="submit" class="btn-cancel" @click="closeForm">Avbryt</button>
        </form>
      </div>
      <h2>Hur mycket tid behöver du på morgonen?</h2>
      <select
        name="time-margin"
        id="time-margin"
        v-model="pickedTimeMargin"
        @change="pickTimeMargin()"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="55">55</option>
        <option value="60">60</option>
      </select>
      <p id="time-margin-minutes">min</p>
      <change-password></change-password>
    </div>
  </div>
</template>

<script>
import ChangePassword from "./../components/usersettings/ChangePassword";
export default {
  components: {
    ChangePassword
  },
  data() {
    return {
      searchQuery: "",
      fetchedLocations: [],
      userLocations: [],
      pickedLocation: {},
      locationNick: "",
      pickedTimeMargin: ""
    };
  },
  watch: {
    async searchQuery() {
      if (this.searchQuery === "") {
        this.fetchedLocations = [];
      } else {
        let url =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
          `${this.searchQuery}.json` +
          `?access_token=${require("../../../tokens").mapboxToken}` +
          `&autocomplete=true` +
          `&country=se` +
          `&types=address` +
          `&limit=10`;

        this.axios
          .get(url)
          .then(response => {
            this.fetchedLocations = response.data.features;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    this.getLocationList();

    console.log("created");

    let url =
      process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

    this.axios
      .post(url + "usersettings/getTimeMargin", {
        userId: this.$store.getters.getUser.id
      })
      .then(res => {
        console.log("hej");
        console.log(res.data[0].timeMargin);
        this.pickedTimeMargin = res.data[0].timeMargin;
        console.log(this.pickedTimeMargin);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getLocationList() {
      let url =
        process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      this.axios
        .post(url + "usersettings/getLocationList", {
          userId: this.$store.getters.getUser.id
        })
        .then(res => {
          this.userLocations = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openForm() {
      document.getElementById("name-location-form").style.display = "block";
    },
    closeForm() {
      document.getElementById("name-location-form").style.display = "none";
    },
    pickLocation(location) {
      this.pickedLocation = {
        locationName: location.place_name,
        longitude: location.geometry.coordinates[0],
        latitude: location.geometry.coordinates[1]
      };
    },
    addLocation() {
      console.log(this.pickedLocation);
      console.log(this.locationNick);

      let newLocation = {
        userId: this.$store.getters.getUser.id,
        altLocationName: this.locationNick,
        locationName: this.pickedLocation.locationName,
        longitude: this.pickedLocation.longitude,
        latitude: this.pickedLocation.latitude
      };

      // check if location already exists in list, if so do not add
      var alreadyAdded = false;
      for (var i = 0; i < this.userLocations.length; i++) {
        if (this.userLocations[i].locationName == newLocation.locationName) {
          alreadyAdded = true;
        }
      }
      if (!alreadyAdded) {
        let url =
          process.env.VUE_APP_HOST +
          ":" +
          process.env.VUE_APP_SERVER_PORT +
          "/";

        this.axios
          .post(url + "usersettings/addLocation", newLocation)
          .then(res => {
            this.getLocationList();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("Platsen är redan sparad!");
      }
    },
    deleteLocation(pickedLocation) {
      console.log("deleteLocation method: " + pickedLocation.locationName);
      let url =
        process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      this.axios
        .post(url + "usersettings/deleteLocation", pickedLocation)
        .then(res => {
          this.getLocationList();
        })
        .catch(err => {
          this.errorMessage = err.response.data.msg;
        });
    },
    pickTimeMargin() {
      console.log("pickedTimeMargin");

      let url =
        process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_SERVER_PORT + "/";

      this.axios
        .post(url + "usersettings/setTimeMargin", {
          userId: this.$store.getters.getUser.id,
          timeMargin: this.pickedTimeMargin
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
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
h1,
h2 {
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
.saved-locations h3 {
  font-family: "Spartan", sans-serif;
  font-weight: 500;
  text-align: left;
  margin-bottom: 5px;
}
.saved-locations button {
  display: block;
  height: 20px;
  border-radius: 45%;
  border: none;
  background-color: red;
  color: white;
  text-align: center;
  opacity: 0.8;
  margin-top: 5px;
}
.saved-locations button:hover {
  opacity: 1;
}
.saved-locations li {
  background-color: #a5d9ef;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  margin: 10px;
  display: block;
}
.form-popup {
  display: none;
  position: fixed;
  width: 300px;
  top: calc(50% - 100px);
  left: calc(50% - 150px);
  z-index: 9;
  background-color: white;
  border-radius: 5px;
}
.form-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.form-container label {
  font-size: 1.2em;
  margin: 5px auto;
}
.form-container input {
  border: none;
  height: 30px;
  font-size: 0.8em;
  width: 100%;
  margin: 5px auto;
}
.btn {
  height: 30px;
  width: 100%;
  border: none;
  background-color: #4caf50;
  opacity: 0.8;
  color: white;
  margin: 5px auto;
}
.btn:hover {
  opacity: 1;
}
.btn-cancel {
  height: 30px;
  width: 100%;
  border: none;
  background-color: red;
  opacity: 0.8;
  color: white;
  margin: 5px auto;
}
.btn-cancel:hover {
  opacity: 1;
}
#time-margin-minutes {
  display: inline;
  margin-left: 5px;
}
</style>