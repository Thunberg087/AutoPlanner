import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Trips from '../views/Trips'
import Profile from '../views/Profile'

// Component Imports
import Authentication from './../views/Authentication'

import store from './../vuex/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/plan-a-trip',
    name: 'Trips',
    component: Trips,
  },
  {
    path: '/auth/:page/:token?',
    name: 'Auth',
    component: Authentication
  },
  {
    path: '/profil',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next({ name: 'Auth', params: { page: 'login' }})
    }
  } else {
    next()
  }
})

export default router
