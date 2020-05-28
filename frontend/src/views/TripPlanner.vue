<template>
  <div class="tripPlanner">
    <h1>Plan your trip</h1>
    <div class="form">
      <autocomplete-form default-value="Start adress"></autocomplete-form>
      <autocomplete-form default-value="Destination adress"></autocomplete-form>
    </div>
  </div>
</template>

<script>
import Trip from "./../components/tripplanner/Trip";
import AutocompleteForm from "./../components/tripplanner/AutocompleteForm";

export default {
  name: "TripPlanner",
  created() {},
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