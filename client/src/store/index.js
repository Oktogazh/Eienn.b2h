import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'

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
    SET_VERIFIED(state, data) {
        state.user.verified = data.verified
    },
  },
  actions: {
    enrollañ(context, {email, password}) {
      axios.post(`${this.state.API}/api/enrollañ`, {email, password}).then(response => {
        context.commit('ENROLLAÑ', response.data)
      })
      this.gwiriekaat()
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
    gwiriekaat(context, {kod}) {
      axios.post(`${this.state.API}/api/gwiriekaat`, {kod})
      .then( (response) => {
        context.commit('SET_VERIFIED', response.data)
      })
      .catch( () => {
        axios.post(`${this.state.API}/api/kas_kod_postel`)
        alert(`Le code que vous venez de rentrer est incorrecte ou bien a expiré.\n` +
       `Veuillez réessayer avec le code qui vient de vous être renvoyer.`)
     })
    },
    sendEmailVerificationCode() {
      axios.post(`${this.state.API}/api/kas_kod_postel`)
      .then( () => {
         return router.push({path: '/gwiriekaat'})
      })
      .catch(function(err) { return alert(`resevet ar gemennadenn: ${err}`)})
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
