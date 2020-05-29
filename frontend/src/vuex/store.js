import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from './../router';

import createPersistedState from 'vuex-persistedstate';
import SecureLS from "secure-ls";
var ls = new SecureLS({ encodingType: 'rc4', isCompression: false, encryptionSecret: 'r89RnWwJUuudXPSwaJyCdvSv7zVJ5G4ajKwBGbqAZr3mx7JQ4mX' });

Vue.use(Vuex);


let state = {
  token: '',
  user: {},
  isLoggedIn: false,
  origin: {},
  dest: {},
  accessToken: ''
};


// ======================
//        Mutations
// ======================
const mutations = {
  SET_IS_LOGGED_IN(state, payload) {
    state.isLoggedIn = payload
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  RESET: state => {
    Object.assign(state, getDefaultState());
  }
}


const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

// ======================
//        GETTERS
// ======================
const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn;
  },
  getUser: state => {
    return state.user;
  },
}

// ======================
//        ACTIONS
// ======================
const actions = {
  login: ({ commit }, { token, user }) => {
    commit('SET_TOKEN', token);
    commit('SET_USER', user);
    commit('SET_IS_LOGGED_IN', true)
    router.push({ name: 'Home' })
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  logout: ({ commit }) => {
    commit('RESET', '');
    commit('SET_IS_LOGGED_IN', false)
    if (router.currentRoute.name !== 'Home') {
      router.push({ name: 'Home' })
    }
  },
}



const store = new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state,
  mutations,
  getters,
  actions,
});


export default store;

