<template>
  <div>
    <h2>Möjliga resalternativ</h2>
    <table v-if="resultsReady == true" class="trip-list">
      <tr>
        <th>Namn:</th>
        <th>Avgång:</th>
        <th>Ankomst:</th>
      </tr>
      <tr v-for="(trip, i) in results" :key="i">
        <td>
          <div v-for="(leg, i) in trip.Leg" :key="i">{{ leg.name }}</div>
        </td>
        <!-- <td>{{ trip.Leg.Origin.time }}</td>
        <td>{{ trip.Leg.Destination.time }}</td>-->
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Trip",
  created() {
    this.getTripData();
  },
  data() {
    return {
      results: null,
      resultsReady: false,
      isOpen: false
    };
  },
  props: {
    origin: String,
    dest: String
  },
  watch: {
    origin: function(newOrigin, oldOrigin) {
      this.getTripData();
    },
    dest: function(newDest, oldOrigin) {
      this.getTripData();
    }
  },
  methods: {
    async getTripData() {
      if (this.origin != "" && this.dest != "") {
        const token = await this.axios
          .post("http://localhost:3000/vasttrafik/getToken")
          .then(response => response.data)
          .catch(function(err) {
            console.log(err);
          });
        console.log(token);
        console.log(this.origin);
        console.log(this.dest);
        this.axios
          .get(
            "https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=" +
              this.origin +
              "&destId=" +
              this.dest +
              "&numTrips=10&format=json",
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          )
          .then(response => {
            let tripList = response.data.TripList.Trip.map(trip => {
              console.log(trip);
              let fixedTrip = trip;
              if (!Array.isArray(trip.Leg)) {
                fixedTrip.Leg = [trip.Leg];
                return fixedTrip;
              } else {
                return fixedTrip;
              }
            });
            console.log(JSON.stringify(tripList));
            this.results = tripList;
            this.resultsReady = true;
          });
      }
    }
  }
};
</script>

<style scoped>
.trip-list {
  font-family: "Spartan", sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 30px;
  padding: 50px;
  border-radius: 1em;
  overflow: hidden;
}

.trip-list td,
.trip-list th {
  /*border: 2px solid #ddd;*/
  padding: 10px 30px;
}

.trip-list tr:nth-child(even) {
  background-color: #f0f0f0;
}
.trip-list tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.trip-list tr:hover {
  background-color: #ddd;
  cursor: pointer;
}

.trip-list th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4c86aa;
  color: white;
}
</style>