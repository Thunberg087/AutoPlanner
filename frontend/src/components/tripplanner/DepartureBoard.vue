<template>
  <div class="departureBoard">
    <h1>Avgångstavla</h1>
    <select class="stopSelector" v-model="selectedStopId">
      <option :key="stop.name" v-for="stop in stops" :value="stop.id">{{stop.name}}</option>
    </select>
    <div class="linesWrapper">
      <fragment v-if="selectedStopId">
        <div class="line" :key="line.unique" v-for="line in currentStopLines">
          <div class="lineInfo">
            <p
              class="bussName"
              :style="{background: line.fgColor, color: line.bgColor }"
            >{{line.sname}}</p>
            <p> mot {{line.direction}}</p>
            <p>{{line.time}}</p>
            <!-- <p>{{line.track}}</p> -->
          </div>
          <div class="timeWrapper">
              <span class="timeBox" :key="departure.id" v-for="departure in line.departures">{{departure.time}}</span>
          </div>
        </div>
      </fragment>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stops: null,
      selectedStopId: undefined,
      currentStopLines: undefined
    };
  },
  watch: {
    selectedStopId(newId) {
      this.axios
        .post("http://localhost:3000/vasttrafik/getDepartures", {
          id: newId
        })
        .then(response => {
          let stops = response.data;

          stops = stops.map(stop => {
            stop.uniqueName =
              stop.name + " " + stop.direction + " " + stop.track;
            return stop;
          });

          stops = _.groupBy(stops, function(stop) {
            return stop.uniqueName;
          });

          stops = Object.keys(stops).map(stop => {
            let temp = {};
            temp.departures = stops[stop];
            temp.sname = stops[stop][0].sname;
            temp.bgColor = stops[stop][0].bgColor;
            temp.fgColor = stops[stop][0].fgColor;
            temp.track = stops[stop][0].track;
            temp.type = stops[stop][0].type;
            temp.direction = stops[stop][0].direction;
            temp.uniuqe = stops[stop][0].uniqueName;

            return temp;
          });

          this.currentStopLines = stops;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.axios
          .post("http://localhost:3000/vasttrafik/getNearbyStops", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          .then(response => {
            this.stops = response.data;
            this.selectedStopId = this.stops[0].id;
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    } else {
      /* geolocation IS NOT available */
    }
  }
};
</script>

<style scoped>


.departureBoard {
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: auto;
  text-align: center;
}

.stopSelector {
  padding: 5px 10px;
  border-radius: 5px;
}

.linesWrapper {
  background: white;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
}

.line {
  text-align: left;
  margin: 10px;
}

.lineInfo {
  display: inline-flex;
}

.bussName {
  padding: 2px 5px;
  border-radius: 3px;
  margin-right: 6px;
}

.timeWrapper {
  margin-top: 7px;
display:flex;
  flex-wrap:wrap;
}

.timeBox {
  margin: 5px;

}

h1 {
  padding: 16px;
  font-family: "Spartan", sans-serif;
  font-weight: 500;
}
</style>