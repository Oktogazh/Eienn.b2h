import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'
import swal from 'sweetalert2'

export default createStore({
  state: {
    API: '//localhost:9000',
    prenestrier: {
      kevreañ: {
        digoret: false,
      },
      perzhioù: {
        digoret: false,
      },
      stripe: {
        digoret: false,
      }
    },
    stripe: {
      stripePK: 'pk_test_51HekNwLl0gLr1Vo6MecpLR03h5PXkxKsxs0O8FGnigvcZp2JlNmmrfB9l7WJOI1ZyyF0Z9RVetD626bne5AF7EYR00jVr6oSkl'
    },
    user: {
      customerId: JSON.parse(localStorage.getItem('userData') || "{}").customerId || null,
      email: JSON.parse(localStorage.getItem('userData') || "{}").email,
      ezel: true,
      sub: JSON.parse(localStorage.getItem('userData') || "{}").sub,
      token: JSON.parse(localStorage.getItem('userData') || "{}").token,
      verified: JSON.parse(localStorage.getItem('userData') || "{}").verified || false,
    }
  },
  mutations: {
    CUSTOMER_ID(state, data) {
      state.user.customerId = data.id
      localStorage.setItem('userData', JSON.stringify(data.id))
    },
    DIGERIÑ_PRENESTR(state, prenestr) {
      state.prenestrier[prenestr].digoret = true
    },
    ENROLLAÑ(state, data) {
      state.user = data
      localStorage.setItem('userData', JSON.stringify(data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
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
    SET_VERIFIED(state, verified) {
        state.user.verified = verified
    },
  },
  actions: {
    enrollañ(context, {email, password}) {
      const self = this
      axios.post(`${this.state.API}/api/enrollañ`, {email, password})
      .then(response => {
        context.commit('ENROLLAÑ', response.data)
      }).then(() => {
        self.dispatch({
          type: 'sendEmailVerificationCode'
        })
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
    gwiriekaat(context, {kod}) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.token}`
      axios.post(`${this.state.API}/api/gwiriekaat`, {kod})
      .then((response) => {
        context.commit('SET_VERIFIED', response.data)
        router.push({name: 'Home'})
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          text: 'Le code que vous venez de rentrer est incorrecte ou bien a expiré. ' +
          'Veuillez réessayer avec le code qui vient de vous être renvoyer.',
          confirmButtonText: 'Réessayer'
        })
        axios.post(`${this.state.API}/api/kas_kod_postel`);
     })
    },
    sendEmailVerificationCode() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.token}`
      axios.post(`${this.state.API}/api/kas_kod_postel`)
      .then(() => {
          return router.push({path: '/gwiriekaat'})
      })
      .catch(function(err) { return alert(`resevet ar gemennadenn: ${err}`)})
    },
    kevreañ(context, {email, password}) {
      axios.post(`${this.state.API}/api/kevreañ`, {email, password})
      .then(response => {
        context.commit('KEVREAÑ', response.data)
      })
    },
    setCustomer(context) {
      if (!this.state.user.customerId) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.token}`
        axios.post(`${this.state.API}/api/customer`)
        .then(response => {
          // result.customer.id is used to map back to the customer object
          console.log(response.data.email, response.data.id);
          context.commit('CUSTOMER_ID', response.data)
        });
      }
    }
  },
  modules: {
  },
  getters: {
  }
})
