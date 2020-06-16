<template>
  <div class="main-wrapper">
    <div class="content">
      <h1>Hej user!</h1>
      <input class="search-input" type="text" v-model="searchQuery" placeholder="Sök adress" />
      <ul class="search-list" v-show="searchQuery">
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
          <button @click="deleteLocation(location)">x</button>
        </li>
      </ul>
      <div class="form-popup" id="name-location-form">
        <form action="javascript:void(0)" class="form-container">
          <label for="name">
            <b>Ge platsen ett smeknamn</b>
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
        class="time-margin-picker"
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
      this.searchQuery = "";
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
.content {
  text-align: center;
  width: 50%;
  margin: 0 auto;
}
h1,
h2 {
  margin: 20px 0;
  font-family: "Spartan", sans-serif;
  font-weight: 500;
}
ul {
  list-style-type: none;
}
.search-input {
  position: relative;
  width: 50%;
  height: 30px;
  z-index: 1;
  font-size: 1.2em;
  border-radius: 15px;
  border: none;
  padding: 0.6em 1.4em 0.5em 0.8em;
}
.search-input:focus {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.search-list {
  position: relative;
  top: -15px;
  width: 50%;
  max-height: 130px;
  margin: 0 auto;
  z-index: 0;
  text-align: left;
  background-color: #a5d9ef;
  padding-top: 15px;
  overflow-y: scroll;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.search-list li {
  margin: 10px -20px;
}
.search-list li button {
  vertical-align: middle;
  float: right;
  height: 20px;
  margin-left: 5px;
  margin-right: 40px;
  font-weight: bold;
  color: #4caf50;
  opacity: 0.9;
  border-radius: 15px;
  border: none;
  cursor: pointer;
}
.search-list li button:hover {
  opacity: 1;
}
.saved-locations {
  margin: 0;
  padding: 0;
}
.saved-locations button {
  display: block;
  height: 20px;
  border-radius: 15px;
  border: none;
  background-color: red;
  opacity: 0.7;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 5px;
}
.saved-locations button:hover {
  opacity: 1;
}
.saved-locations li {
  position: relative;
  width: 50%;
  padding: 10px;
  margin: 10px auto;
  background-color: #a5d9ef;
  border-radius: 10px;
  text-align: left;
  font-size: 0.8em;
  font-weight: bold;
  display: block;
}
.saved-locations li h3 {
  font-family: "Spartan", sans-serif;
  font-size: 1.4em;
  font-weight: 400;
  text-align: left;
  margin-bottom: 5px;
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
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
}
.form-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.form-container label b {
  font-size: 1em;
  font-family: "Spartan", sans-serif;
  font-weight: 500;
  margin: 5px auto;
}
.form-container input {
  border: none;
  height: 30px;
  font-size: 0.8em;
  width: 100%;
  margin: 5px auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
.btn,
.btn-cancel {
  height: 30px;
  width: 100%;
  border: none;
  background-color: #4caf50;
  opacity: 0.8;
  color: white;
  cursor: pointer;
  margin: 5px auto;
}
.btn:hover,
.btn-cancel:hover {
  opacity: 1;
}
.btn-cancel {
  background-color: red;
}
.time-margin-picker {
  display: inline;
  font-size: 0.9em;
  font-family: sans-serif;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  box-sizing: border-box;
  margin: 0;
  border: none;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  cursor: pointer;
}
#time-margin-minutes {
  display: inline;
  margin-left: 5px;
  font-size: 0.8em;
}
</style>