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
      const payload = { name: result.name, id: result.id };

      if (this.defaultValue === "Start adress") {
        this.$store.commit("SET_ORIGIN", payload);
      } else if (this.defaultValue === "Destination adress") {
        this.$store.commit("SET_DEST", payload);
      }
      this.isOpen = false;
    }
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
.autocomplete-results {
  background: white;
  border-radius: 15px;
  height: auto;
  width: 93%;
  max-height: 200px;
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
}
.autocomplete-results::-webkit-scrollbar {
  display: none;
}
.autocomplete-result {
  padding: 5px;
  margin: 5px 0px;
  font-family: "Spartan", sans-serif;
}
</style>