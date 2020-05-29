<template>
  <div>
    <h2>Möjliga resalternativ</h2>
    <table v-if="resultsReady == true" class="trip-list">
      <tr>
        <th>Antal byten:</th>
        <th>Restid:</th>
        <th>Avgång:</th>
        <th>Ankomst:</th>
      </tr>
      <tr v-for="(trip, i) in results" :key="i" @click="tripClicked(trip)">
        <td>{{ trip.Leg.length - 1 }}</td>
        <td>{{ getTravelTime(trip.Leg[0].Origin, trip.Leg[ trip.Leg.length - 1 ].Destination) }} min</td>
        <td>{{ trip.Leg[0].Origin.time }}</td>
        <td>{{ trip.Leg[ trip.Leg.length - 1 ].Destination.time }}</td>
      </tr>
    </table>

    <div v-if="showTripDetails">
      <h2>Resedetaljer:</h2>
      <table class="trip-list">
        <tr>
          <th>Resdel:</th>
          <th>Färdsätt:</th>
          <th>Avgång:</th>
          <th>Ankomst:</th>
        </tr>
        <tr v-for="(leg, i) in clickedTrip.Leg" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ leg.name }}</td>
          <td>{{ leg.Origin.time }}</td>
          <td>{{ leg.Destination.time }}</td>
        </tr>
      </table>
    </div>
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
      isOpen: false,
      clickedTrip: null,
      showTripDetails: false
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
    tripClicked(trip) {
      this.clickedTrip = trip;
      this.showTripDetails = true;
    },
    getTravelTime(origin, dest) {
      let originTime = new Date(origin.date + "T" + origin.time + ":00");
      let destTime = new Date(dest.date + "T" + dest.time + ":00");
      var travelTime = (destTime.getTime() - originTime.getTime()) / 1000;
      travelTime /= 60;
      return Math.abs(Math.round(travelTime));
    },
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
            // Checks if Leg is not an array and if not makes it to an array, to make the data consistent
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
  text-align: center;
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