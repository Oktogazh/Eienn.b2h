import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

export default createStore({
  state: {
    API: process.env.VUE_APP_API,
    digor: {
      kevreañ: false,
      perzhioù: false,
      stripe: false,
    },
    kentel: {
      _id: '0',
      ouzhpenn: false,
      live: null,
      titl: null,
      geriaoueg: {
        titl: '',
        danvez: []
      },
      notennoù: {
        titl: '',
        danvez: []
      }
    },
    stripe: {
      dibabet: null,
      prices: ['price_1IuzLuLl0gLr1Vo6IIfbmXqI']
    },
    user: {
      customerId: JSON.parse(localStorage.getItem('userData') || "{}").customerId || null,
      email: JSON.parse(localStorage.getItem('userData') || "{}").email,
      ezel: true,
      hentenn: null,
      live: JSON.parse(localStorage.getItem('userData') || "{}").live || '0@br42_fr.1',
      past_due: false,
      subscriptionId: null,
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
      state.digor[prenestr] = true
    },
    ENROLLAÑ(state, data) {
      const user = {...state.user, ...data}
      state.user = user
      state.kentel.live = user.live
      localStorage.setItem('userData', JSON.stringify(data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },
    KARGAÑ(state, {live, kentel, ouzhpenn}) {
      state.kentel = {live, ouzhpenn, ...kentel};
    },
    KEVREAÑ(state, data) {
      const user = {...state.user, ...data}
      state.user = user
      state.kentel.live = user.live
      localStorage.setItem('userData', JSON.stringify(data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },
    KLOZAÑ_PRENESTR(state, prenestr) {
      state.digor[prenestr] = false
    },
    KOUNAAT(state, live) {
      state.user.live = live;
      localStorage.setItem('userData', JSON.stringify(state.user))
    },
    OUZHPENN(state, ouzhpenn) {
      state.kentel.ouzhpenn = ouzhpenn;
    },
    PAST_DUE(state, past_due) {
      past_due? state.user.past_due = true : state.user.past_due = false;
    },
    SET_EMAIL(state, data) {
      state.user.email = data.email
      state.user.ezel = data.ezel
    },
    SET_SUB(state, {boolean, id}) {
      state.user.sub = boolean;
      state.user.subscriptionId = id;
      localStorage.setItem('userData', JSON.stringify(state.user));
    },
    SET_VERIFIED(state, verified) {
      state.user.verified = verified
    },
    SUB(state, sub) {
      state.user.sub = sub
    },
  },
  actions: {
    dilemelKont() {
      axios.delete(`${this.state.API}/api/kont`).then(console.log('called'))
    },
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
        Swal.fire({
          icon: 'error',
          text: 'Le code que vous venez de rentrer est incorrecte ou bien a expiré. ' +
          'Veuillez réessayer avec le code qui vient de vous être renvoyer. ' +
          'Assurez-vous également d\'être bien connecté avant d\'entrer votre code.',
          confirmButtonText: 'Réessayer'
        })
        axios.post(`${this.state.API}/api/kas_kod_postel`);
      })
    },
    async kargañ(context, {live, ouzhpenn}) {
      const klot = /(^\d+)(@\S+$)/g.exec(live);
      const muiUnan = Number(klot[1]) + 1;
      const pelloX = `${muiUnan}${klot[2]}`;
      const self = this;

      const cheñchet = await Promise.resolve()
      .then(() => {
        const token = JSON.parse(localStorage.getItem('userData') || "{}").token;
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      })
      .then(() => {
        return axios.get(`${self.state.API}/api/lenn/${live}`);
      })
      .then(resp => {
        context.commit('PAST_DUE', resp.data.payment_failed );
        context.commit('SUB', resp.data.subscriptionActive );
        context.commit('KARGAÑ', { live, kentel: resp.data.kentel, ouzhpenn });
      })
      .then(() => {
        return axios.get(`${self.state.API}/api/lenn/${pelloX}`)
          .then(resp => {
            if (!!resp.data.kentel._id && !self.state.kentel.ouzhpenn) {
              context.commit('OUZHPENN', true)
              return true;
            } else {
              return false;
            }
          })
          .catch(() => {
            return false;
          })
      })
      return cheñchet;
    },
    kevreañ(context, {email, password}) {
      axios.post(`${this.state.API}/api/kevreañ`, {email, password})
      .then(response => {
        context.commit('KEVREAÑ', response.data)
        return response.data.live;
      })
      .then((live) => {
        context.dispatch({
          type: 'kargañ',
          live: live
        })
      });
    },
    kounaat(context, {live}) {
      context.commit('KOUNAAT', live);
    },
    sendEmailVerificationCode() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.token}`
      axios.post(`${this.state.API}/api/kas_kod_postel`)
      .then(() => {
          return router.push({path: '/gwiriekaat'})
      })
      .catch(function(err) { return alert(`resevet ar gemennadenn: ${err}`)})
    },
    setCustomer(context) {
      if (!this.state.user.customerId) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.token}`
        axios.post(`${this.state.API}/api/customer`)
        .then(response => {
          // response.data.customer.id is used to map back to the customer object
          context.commit('CUSTOMER_ID', response.data)
        });
      }
    }
  },
  modules: {
  },
  getters: {
    danvezN: state => {
      return state.kentel.notennoù? state.kentel.notennoù.danvez.join('  '): null;
    },
    niverenn: state => {
      return Number(state.kentel._id);
    }
  }
})
