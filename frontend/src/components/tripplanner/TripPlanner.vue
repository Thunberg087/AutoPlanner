<template>
  <div class="tripPlanner">
    <h1>Plan your trip</h1>
    <div class="form">
      <autocomplete-form
        default-value="Start adress"
        :origin="origin"
        @originUpdated="origin = $event"
      ></autocomplete-form>
      <autocomplete-form
        default-value="Destination adress"
        :dest="dest"
        @destUpdated="dest = $event"
      ></autocomplete-form>
    </div>
    <trip v-show="origin != '' && dest != ''" :origin="origin" :dest="dest"></trip>
  </div>
</template>

<script>
import Trip from "./../components/tripplanner/Trip";
import AutocompleteForm from "./../components/tripplanner/AutocompleteForm";

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
    Trip,
    AutocompleteForm
  }
};
</script>

<style scoped>
.tripPlanner {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
}
h1 {
  padding: 16px;
  font-family: "Spartan", sans-serif;
  font-weight: 500;
}
.form {
  width: 20%;
}
</style>