<template>
    <form  class="emailForm" @submit.prevent="nevesaat(gerKuzh, kadarnaat)">
      <h1>Entrez votre nouveau mot de passe :</h1>
      <input type="password" v-model="gerKuzh">
      <input type="password" v-model="kadarnaat">
      <button type="submit">
        <h4>Réinitialiser</h4>
      </button>
    </form>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'GerKuzhNevez',
  props: {
    kod: String
  },
  methods: {
    nevesaat(gerKuzh, kadarnaat) {
      const kod = this.kod;
      const email = this.$store.state.user.email;
      const self = this;

      (gerKuzh === kadarnaat)?
        axios.post(`${this.$store.state.API}/api/ger-kuzh_nevez`, {gerKuzh, kod})
          .then(self.$store.state.titl = null)
          .then(self.$router.push({name: 'Home'}))
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: "Votre demande de réinitialisation n'a pas abouti.",
              text:"Cette erreur peut être causé par une expiration de votre demande de réinitialisation.\n "
              +
              "Veuillez réessayer avec le nouveau code qui vient de vous être envoyé."
              +
              "Notez que vous n'avez qu'une heure pour valider votre nouveau mot passe."
            })
            axios.post(`${self.$store.state.API}/api/goulenn_ger-kuzh`, {email})
            self.$parent.kadarnaet = false;
          })
        : Swal.fire({
          text: "Les mots de passe ne correspondent pas, \n veuillez réessayer."
        })
    }
  }
}
</script>

<style scoped>
.emailForm {
  padding: 1vmax;
  margin: auto;
  margin-top: 5vmax;
  background: #fff;
  border-radius: 1vmax;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 15px rgba(65, 85, 144, 0.65);
}
h1 {
  margin: 3vmax;
  margin-bottom: 1vmax;
}
h4 {
  margin: 1em 2em;
}

input {
  display: block;
  margin: auto;
  margin-bottom: 1em;
  padding: 0 1em;
  width: 50%;
  font-size: 200%;
  text-align: center;
  letter-spacing: .2em;
  border-radius: inherit;
  border: none;
  box-sizing: border-box;
  background: rgb(0,255,27);
  background: linear-gradient(340deg, rgba(0,255,27,0.5) 0%, rgba(86,255,252,0.5) 100%);
}

button {
  margin: auto;
  color: rgba(48, 48, 48, 0.65);
  background-color: rgba(237, 237, 237, 0.8);
  margin-top: 2vmax;
  margin-bottom: 3vmax;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}
button:active {
  color: rgba(50, 50, 50, 0.8);
  background-color: rgba(200, 200, 200, 0.8);
}
</style>
