import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    saldo: 0
  },
  mutations: {
    initialiseStore(state) {
      let token = localStorage.getItem('token');
      if (token) {
        state.token = token;
      }
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setSaldo(state, saldo) {
      state.saldo = saldo;
    }
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getSaldo: state => {
      return state.saldo;
    }
  },
  actions: {
  },
  modules: {
  }
});
