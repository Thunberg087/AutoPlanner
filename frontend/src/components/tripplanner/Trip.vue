<template>
  <div>

      <h2>Möjliga resalternativ</h2>
      
    <table v-if="resultsReady == true" class="trip-list">
        <tr>
            <th>Namn:</th>
            <th>Avgång:</th>
            <th>Ankomst:</th>
        </tr>
        <tr v-for="(trip, i) in results.TripList.Trip" :key="i">
            <td>{{ trip.Leg.name }}</td>
            <td>{{ trip.Leg.Origin.time }}</td>
            <td>{{ trip.Leg.Destination.time }}</td>
        </tr>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Trip",
  created() {
    this.getTripData()
  },
  data() {
    return {
        results: null,
        resultsReady: false,
        isOpen: false,
    }
  },
  props: {
      origin: String,
      dest: String
  },
  methods: {
    async getTripData() {

        const token = await this.axios
        .post("http://localhost:3000/vasttrafik/getToken")
        .then(response => response.data)
        .catch(function(err) {
          console.log(err);
        });

        this.axios
        .get("https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=" + this.origin + "&destId=" + this.dest + "&numTrips=10&format=json",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        )
        .then(response => {
            this.results = response.data;
            this.resultsReady = true;
            console.log(this.results.TripList.Trip[0].Leg.name);
        })
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

    .trip-list td, .trip-list th {
        /*border: 2px solid #ddd;*/
        padding: 10px 30px;
    }

    .trip-list tr:nth-child(even){background-color: #f0f0f0;}
    .trip-list tr:nth-child(odd){background-color: #f2f2f2;}

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