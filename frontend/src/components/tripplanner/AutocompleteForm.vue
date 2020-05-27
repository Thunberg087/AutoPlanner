<template>
  <div class="autocompleteForm">
    <input type="text" v-model="search" @input="onChange" :placeholder="defaultValue" />
    <ul v-show="isOpen" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
      >{{result}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AutocompleteForm",
  created() {
    this.axios
      .post("http://localhost:3000/vasttrafik/getToken")
      .then(response => {
        this.accessToken = response.data;
        console.log(this.accessToken);
      })
      .catch(function(err) {
        console.log(err);
      });
    this.isOpen = true;
  },
  data() {
    return {
      search: "",
      results: {},
      isOpen: false,
      accessToken: null
    };
  },
  methods: {
    onChange() {
      this.axios.get(
        "https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=" +
          search +
          "&format=json",
        {
          headers: {
            Authorization: "Bearer " + this.accessToken
          }
        }
      );
    },
    filterResults() {}
    /*setResult(result) {
      this.search = result;
      this.isOpen = false;
    }*/
  },
  props: {
    defaultValue: String
  }
};
</script>

<style scoped>
.autocompleteForm input {
  display: block;
  border: none;
  border-radius: 15px;
  padding: 15px 10px;
  margin: 15px 0px;
  width: 100%;
  font-family: "Spartan", sans-serif;
}
</style>