<template>
  <h1>Mon compte</h1>
  <h2 @click="$emit('klozañ')">←</h2>
  <h4 v-if="!$store.state.user.verified" @click="sendEmailVerificationCode">Vérifier mon adresse email</h4>
  <h4 @click="dilemelKont">Supprimer mon compte</h4>

</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Kont',
  methods: {
    dilemelKont() {
      if (JSON.parse(localStorage.getItem('userData') || "{}").sub) {
        Swal.fire({text: 'Vous devez résilier votre abonnement avant de supprimer votre compte !'});
      }
      else {
        const self = this;
        this.$store.dispatch({
          type: 'dilemelKont'
        })
        .then(localStorage.clear())
        .then(
          self.$store.state.user = {
            ezel:true,
            live: '0@br42_fr.1'
          }
        )
        .then(
          self.$store.dispatch({
            type: 'kargañ',
            live: self.$store.state.user.live
          })
        )
        .then(self.$store.state.digor.perzhioù = false)
      }
    },
    sendEmailVerificationCode() {
      this.$store.dispatch({
        type: 'sendEmailVerificationCode'
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
