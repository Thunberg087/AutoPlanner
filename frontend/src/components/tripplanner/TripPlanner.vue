<template>
  <div class="tripPlanner">
    <h1>Sök resa</h1>
    <div id="wrapper">
      <div class="form">
        <autocomplete-form default-value="Från" :origin="origin" @originUpdated="origin = $event"></autocomplete-form>
        <autocomplete-form default-value="Till" :dest="dest" @destUpdated="dest = $event"></autocomplete-form>
      </div>
      <trip-list v-show="origin != '' && dest != ''" :origin="origin" :dest="dest"></trip-list>
    </div>
  </div>
</template>

<script>
import TripList from "./TripList";
import AutocompleteForm from "./AutocompleteForm";

export default {
  name: "TripPlanner",
  created() {},
  data() {
    return {
      origin: "",
      dest: ""
    };
  },
  components: {
    TripList,
    AutocompleteForm
  }
};
</script>

<style scoped>
.tripPlanner {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  display: block;
  padding: 16px;
  font-family: "Spartan", sans-serif;
  font-weight: 500;
}
.form {
  display: block;
  width: 20vw;
}
</style>