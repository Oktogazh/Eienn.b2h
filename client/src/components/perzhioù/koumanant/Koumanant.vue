<template>
  <h1>Abonnement</h1>
  <h2 @click="$emit('klozañ')">←</h2>
  <h4 v-if="!$store.state.user.sub" @click="darStal">M'abonner!</h4>
  <h4 v-if="$store.state.user.sub" @click="digoumanantiñ">Me désabonner!</h4>
  <Modal v-if="$store.state.digor.stripe" />
</template>

<script>
import Modal from '@/components/stripe/Modal'
import axios from 'axios'

export default {
  name: 'Kont',
  components: {
    Modal
  },
  methods: {
    darStal() {
      const self = this
      this.$store.dispatch({
        type: 'setCustomer'
      })
        .then(() => {
          self.$store.dispatch({
            type: 'gwintañPrenestr',
            prenestr: 'stripe',
            boolean: true
          })
        })
    },
    digoumanantiñ() {
      const self = this;
      axios.delete(`${this.$store.state.API}/api/digoumanantiñ/${this.$store.state.user.subscriptionId}`)
        .then(() => {
          return  self.$store.commit('SET_SUB',  {boolean: false, id: null}),
                  self.$swal.fire({
                    icon: 'success',
                    text: 'Vous vous êtes désabonné avec succès !'
                  });
        })
        .catch(error => {
          self.$swal.fire({
            icon: 'error',
            text: `Une erreur vient de se produire, veuillez réessayer de vous désabonné. ` +
            `Si le problème persiste, n'hésitez pas à nous contacter par email. (${error})`
          })
        })
    }
  }
}
</script>

<style scoped>
h1 {
  display: block;
  float: left;
  margin-bottom: 4vmax;
}

h2 {
  display: block;
  float: right;
}

h2:hover,
h4:hover {
  cursor: pointer;
}

h4 {
  clear: both;
  text-align: center;
}

</style>
