import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    API: '//localhost:9000',
    prenestrier: {
      gwagennigoù: {
        digoret: false,
      }
    },
    user: {
      email: JSON.parse(localStorage.getItem('userData')).email,
      ezel: true,
      sub: JSON.parse(localStorage.getItem('userData')).sub,
      token: JSON.parse(localStorage.getItem('userData')).token,
    }
  },
  mutations: {
    DIGERIÑ_PRENESTR(state, prenestr) {
      state.prenestrier[prenestr].digoret = true
    },
    KEVREAÑ(state, data) {
      localStorage.setItem('userData', JSON.stringify(data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },
    KLOZAÑ_PRENESTR(state, prenestr) {
      state.prenestrier[prenestr].digoret = false
    },
    SET_EMAIL(state, data) {
        state.user.email = data.email
        state.user.ezel = data.ezel
    },
  },
  actions: {
    kasPostel(context, {email}) {
      console.log(email)
      axios.post(`${this.state.API}/api/ezel`, {email}).then(response => {
        context.commit('SET_EMAIL', response.data)
      })
    },
    enrollañ(context, {email, psw}) {
      axios.post(`${this.state.API}/api/enrollañ`, {email, psw}).then(response => {
        context.commit('SET_EMAIL', response.data)
      })
    },
    kevreañ(context, {email, psw}) {
      axios.post(`${this.state.API}/api/kevreañ`, {email, psw}).then(response => {
        context.commit('KEVREAÑ', response.data)
      })
    },
    klozañPrenestr(context, {prenestr}) {
      context.commit('KLOZAÑ_PRENESTR', prenestr)
    }
  },
  modules: {
  },
  getters: {
  }
})
