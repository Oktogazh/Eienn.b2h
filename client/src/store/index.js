import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    API: '//localhost:9000',
    email: null,
    ezel: true,
    jwt: '',
  },
  mutations: {
    SET_EMAIL(state, data) {
      state.email = data.email
      state.ezel = data.ezel
    },
    KEVREAÑ(state, data) {
      state.jwt = data.jwt
    },
  },
  actions: {
    kasPostel(context, email) {
      axios.post(`${this.state.API}/api/ezel`, email).then(response => {
        context.commit('SET_EMAIL', response.data)
      })
    },
    enrollañ(context, email, psw) {
      axios.post(`${this.state.API}/api/enrollañ`, email, psw).then(response => {
        context.commit('SET_EMAIL', response.data)
      })
    },
    kevreañ(context, email, psw) {
      axios.post(`${this.state.API}/api/kevreañ`, email, psw).then(response => {
        context.commit('KEVREAÑ', response.data)
      })
    }
  },
  modules: {
  },
  getters: {
  }
})
