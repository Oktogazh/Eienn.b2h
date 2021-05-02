import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    API: '//localhost:9000',
    user: {
      email: JSON.parse(localStorage.getItem('userData')).email,
      ezel: true,
      sub: JSON.parse(localStorage.getItem('userData')).sub,
      token: JSON.parse(localStorage.getItem('userData')).token,
    }
  },
  mutations: {
    SET_EMAIL(state, data) {
      state.user.email = data.email
      state.user.ezel = data.ezel
    },
    KEVREAÑ(state, data) {
      console.log(data)
      localStorage.setItem('userData', JSON.stringify(data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
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
