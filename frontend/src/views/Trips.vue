<template>
  <div class="trips">
    <div id="wrapper">
      <div class="dbContainer">
        <departure-board></departure-board>
      </div>
      <div class="tpContainer">
        <trip-planner></trip-planner>
      </div>
    </div>
  </div>
</template>

<script>
import TripPlanner from "./../components/tripplanner/TripPlanner";
import DepartureBoard from "./../components/tripplanner/DepartureBoard";

export default {
  components: {
    TripPlanner,
    DepartureBoard
  }
};
</script>

<style scoped>
.trips {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#wrapper {
  display: flex;
  width: 100%;
}
.dbContainer {
  width: 50%;
}
.tpContainer {
  width: 50%;
}
</style>