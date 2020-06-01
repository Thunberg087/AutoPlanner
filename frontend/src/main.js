import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import Fragment from 'vue-fragment'

axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

Vue.use(Fragment.Plugin)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

let vueApp = new Vue({
  store,
  router,
  render: h => h(App)
})

function securityCheck() {

  let url = process.env.VUE_APP_HOST+":"+process.env.VUE_APP_SERVER_PORT+"/"


  if (store.state.token) {
    axios
    .post(url + 'auth/checkIfValidSession/')
    .then(response => {
      const user = {
        email: response.data.email,
        id: response.data.userId
      }
      let tempUser = JSON.parse(JSON.stringify(store.getters.getUser))
      store.commit('SET_IS_LOGGED_IN', true)
      store.commit('SET_USER', Object.assign(tempUser, user))
      vueApp.$mount('#app')
    })
    .catch(err => {
      console.log(err);
      
      console.log(err.response.data.msg);
      store.commit('SET_IS_LOGGED_IN', false)
      store.dispatch('logout')
      vueApp.$mount('#app')
    }) 
  } else {
    store.commit('RESET')
    vueApp.$mount('#app')
  }

}

securityCheck()