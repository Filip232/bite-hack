import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: null,
      username: null,
      token: null,
      id: null,
    }
  },
  mutations: {
    saveUserData(state, { email, username, token, id }) {
      state.user.username = username;
      state.user.email = email;
      state.user.token = token;
      state.user.id = id;
    }
  },
  actions: {
  },
  modules: {
  }
})
