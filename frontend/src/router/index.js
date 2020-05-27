import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TripPlanner from '../views/TripPlanner'

// Component Imports
import Authentication from './../views/Authentication'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/plan-a-trip',
    name: 'TripPlanner',
    component: TripPlanner
  },
  {
    path: '/auth/:page/:token?',
    name: 'Auth',
    component: Authentication
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
