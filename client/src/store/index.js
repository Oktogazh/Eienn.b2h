import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    email: 'null',
  },
  mutations: {
    SET_EMAIL(state, email) {
      state.email = email
    }
  },
  actions: {
    kasPostel(context, email) {
      axios.post('//localhost:9000/api/kevreañ', email).then(response => {
        context.commit('SET_EMAIL', response.data.email)
      })
    }
  },
  modules: {
  },
  getters: {
  }
})
