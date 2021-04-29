import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    email: null,
    ezel: true,
    API: '//localhost:9000'
  },
  mutations: {
    SET_EMAIL(state, data) {
      state.email = data.email
      state.ezel = data.ezel
    }
  },
  actions: {
    kasPostel(context, email) {
      axios.post(`${this.state.API}/api/ezel`, email).then(response => {
        context.commit('SET_EMAIL', response.data)
      })
    },
    enrollañ(context, email, psw) {
      axios.post(`${this.state.API}/api/kevreañ`, email, psw).then(response => {
        context.commit('SET_EMAIL', response.data)
      })
    },
    kevreañ(context, email, psw) {
      axios.post(`${this.state.API}/api/kevreañ`, email, psw).then(response => {
        context.commit('SET_EMAIL', response.data)
      })
    }
  },
  modules: {
  },
  getters: {
  }
})
