<template>
  <h1>Abonnement</h1>
  <h2 @click="$emit('klozañ')">←</h2>
  <h4 v-if="!$store.state.user.verified" @click="sendEmailVerificationCode">Vérifier mon adresse email</h4>
  <h4 @click="dilemelKont">Supprimer mon compte</h4>

</template>

<script>
export default {
  name: 'Kont',
  methods: {
    dilemelKont() {
      if (JSON.parse(localStorage.getItem('userData')).sub) {
        alert('Vous devez résilier votre abbonement avant de supprimer votre compte !')
        return
      }
      else {
        return // TODO: ask for the password confirmation
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
