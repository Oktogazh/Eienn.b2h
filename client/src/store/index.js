import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    API: '//localhost:9000',
    prenestrier: {
      kevreañ: {
        digoret: false,
      },
      perzhioù: {
        digoret: false,
      }
    },
    user: {
      email: JSON.parse(localStorage.getItem('userData') || "{}").email,
      ezel: true,
      sub: JSON.parse(localStorage.getItem('userData') || "{}").sub,
      token: JSON.parse(localStorage.getItem('userData') || "{}").token,
      verified: JSON.parse(localStorage.getItem('userData') || "{}").verified || false,
    }
  },
  mutations: {
    DIGERIÑ_PRENESTR(state, prenestr) {
      state.prenestrier[prenestr].digoret = true
    },
    ENROLLAÑ(state, data) {
      state.user = data
      localStorage.setItem('userData', JSON.stringify(data))
    },
    KEVREAÑ(state, data) {
      state.user = data
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
    enrollañ(context, {email, password}) {
      axios.post(`${this.state.API}/api/enrollañ`, {email, password}).then(response => {
        context.commit('ENROLLAÑ', response.data)
      })
    },
    ezel(context, {email}) {
      console.log(email)
      axios.post(`${this.state.API}/api/ezel`, {email}).then(response => {
        context.commit('SET_EMAIL', response.data)
      })
    },
    gwintañPrenestr(context, {prenestr, boolean}) {
      context.commit(boolean? 'DIGERIÑ_PRENESTR':'KLOZAÑ_PRENESTR', prenestr)
    },
    gwiriekaat() {
      const email = this.state.user.email
      axios.post(`${this.state.API}/api/gwiriekaat`, {email: email, /* code : code*/})
      .then(
        function() { return null }
      )
      .catch(function(err) { return alert(`resevet kemennadenn: ${err}`)})
    },
    sendEmailVerificationCode() {
      axios.post(`${this.state.API}/api/kas_kod_postel`).then(
        function() { return alert('Un mail vient de vous être envoyé.\n' +
        'Vérifier dans votre boîte de réception ou vos spams pour valider votre adresse mail.')}
      )
      .catch(function(err) { return alert(`resevet kemennadenn: ${err}`)})
    },
    kevreañ(context, {email, password}) {
      axios.post(`${this.state.API}/api/kevreañ`, {email, password}).then(response => {
        context.commit('KEVREAÑ', response.data)
      })
    },
  },
  modules: {
  },
  getters: {
  }
})
