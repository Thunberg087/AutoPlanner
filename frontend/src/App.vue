<template>
  <div id="app">
    <Navbar/>
    <div id="routerView">
      <router-view/>
    </div>
  </div>
</template>


<script>
import Navbar from './components/general/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style>


@import url('https://fonts.googleapis.com/css2?family=Assistant:wght@600&family=Spartan:wght@300;500;600;900&display=swap');




* {
  margin: 0;
  font-family: sans-serif;
}

#app {
  min-height: 100vh;
  background: #71c7ec;
}

#routerView {
  padding-top: 50px;
}

</style>
