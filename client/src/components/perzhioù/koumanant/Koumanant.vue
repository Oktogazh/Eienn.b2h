<template>
  <h1>Abonnement</h1>
  <h2 @click="$emit('klozañ')">←</h2>

  <div  v-if="!$store.state.user.sub">
    <p>
      Abonnez-vous en un clique pour accéder à tout le contenu de la méthode.
      Et désabonnez-vous au même endroit dès que vous le souhaiterez.
    </p>
    <Dibab @click="darStal" />
  </div>
  <span  v-if="$store.state.user.sub">
    <div v-if="$store.state.user.past_due">
      <p>La dernière tentative de paiement a échoué.
        Cela se produit le plus souvent lorsque la carte utilisée pour vous abonner arrive à expiration.
        Durant les sept jours suivant, trois nouvelles tentatives seront effectuées.
        A la fin de cette semaine de relance, votre abonnement sera résilié.
        Vous devrez vous réabonner afin de continuer votre apprentissage.
      </p>
      <p class="past-due">

      </p>
    </div>
    <h4 @click="digoumanantiñ">Me désabonner!</h4>
  </span>
  <Modal v-if="$store.state.digor.stripe" />
</template>

<script>
import Modal from '@/components/stripe/Modal'
import axios from 'axios'
import Swal from 'sweetalert2'
import Dibab from '../../stripe/Dibab'

export default {
  name: 'Kont',
  components: {
    Dibab,
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
      console.log('called!');
      const self = this;
      axios.delete(`${this.$store.state.API}/api/digoumanantiñ/${this.$store.state.user.subscriptionId}`)
        .then(() => {
          return  self.$store.commit('SET_SUB',  {boolean: false, id: null}),
                  self.$emit('klozañ'),
                  Swal.fire({
                    icon: 'success',
                    text: 'Vous vous êtes désabonné avec succès !'
                  })
        })
        .catch(error => {
          Swal.fire({
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
}

h2 {
  display: block;
  float: right;
}

h2:hover,
h4:hover {
  cursor: pointer;
}
p {
  clear: both;
}
h4 {
  clear: both;
  text-align: center;
  margin-top: 4vmax;
}
.past-due {
  color: rgb(255, 141, 84);
}
</style>
