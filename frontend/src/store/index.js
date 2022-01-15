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
      imagePath: null
    }
  },
  mutations: {
    saveUserData(state, { email, username, token, id, imagePath }) {
      state.user.username = username;
      state.user.email = email;
      state.user.token = token;
      state.user.id = id;
      state.user.imagePath = imagePath
    }
  },
  actions: {
  },
  modules: {
  }
})
