<template>
  <div class="autocompleteForm">
    <input type="text" v-model="search" @input="onChange" :placeholder="defaultValue" />
    <ul v-show="isOpen" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
      >{{result.name}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AutocompleteForm",
  created() {
    this.isOpen = false;
  },
  data() {
    return {
      search: "",
      destID: null,
      results: {},
      isOpen: false
    };
  },
  methods: {
    async onChange() {
      if (this.search === "") {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }

      const token = await this.axios
        .post("http://localhost:3000/vasttrafik/getToken")
        .then(response => response.data)
        .catch(function(err) {
          console.log(err);
        });

      this.axios
        .get(
          "https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=" +
            this.search +
            "&format=json",
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        )
        .then(response => {
          this.results = response.data.LocationList.StopLocation;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setResult(result) {
      this.search = result.name;
      this.destID = result.id;

      if (this.defaultValue === "Från") {
        this.$emit("originUpdated", result.id);
      } else if (this.defaultValue === "Till") {
        this.$emit("destUpdated", result.id);
      }
      this.isOpen = false;
    }
  },
  props: {
    defaultValue: String,
    origin: String,
    dest: String
  }
};
</script>

<style scoped>
.autocompleteForm input {
  display: block;
  position: relative;
  z-index: 1;
  width: calc(100% - 30px);
  margin: 15px auto;
  padding: 15px 15px;
  border: none;
  border-radius: 15px;
  font-family: "Spartan", sans-serif;
}
.autocompleteForm input:focus {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}
.autocomplete-results {
  position: relative;
  z-index: 0;
  top: -40px;
  padding: 30px 0;
  background-color: #a5d9ef;
  border-radius: 15px;
  height: auto;
  width: 100%;
  max-height: 200px;
  overflow: hidden;
  overflow-y: scroll;
  list-style: none;
  text-align: left;
}
.autocomplete-result {
  padding: 5px;
  margin: 5px 10px;
  font-family: "Spartan", sans-serif;
  cursor: pointer;
}
</style>