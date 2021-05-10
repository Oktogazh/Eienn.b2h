<template >
  <div v-if="!(kontDigor || koumanantDigor)">
    <h1>Paramètres</h1>
    <h4 @click="digeriñKoumanant">Abonnement</h4>
    <h4 @click="kontDigor = true">Mon Compte</h4>
    <h4 @click="digevreañ">Déconnexion</h4>
  </div>
  <Kont v-if="kontDigor" @klozañ="kontDigor = false"/>
  <Koumanant v-if="koumanantDigor" @klozañ="koumanantDigor = false"/>
</template>

<script>
import Kont from './kont/Kont.vue'
import Koumanant from './kont/Koumanant.vue'

export default {
  name: 'Perzhioù',
  components: {
    Kont,
    Koumanant
  },
  data() {
    return {
      kontDigor: false,
      koumanantDigor: false
    }
  },
  methods: {
    digeriñKoumanant() {
      //const self = this
      (this.$store.state.user.sub || this.$store.state.user.verified)?
        this.koumanantDigor = true
      :
        this.$store.dispatch({
          type: 'sendEmailVerificationCode'
        })
        .then(() => {
          alert('Allez votre boîte de réception ou dans vos spams pour vérifier votre adresse email.\n\n Pour des raisons de sécurité, seul les comptes vérifiés peuvent accéder à cette section.')
        })
    },
    digevreañ(){
      localStorage.clear();
      this.$store.state.user = {ezel:true};
      this.$store.state.prenestrier.perzhioù.digoret = false;
    }
  }
}
</script>

<style scoped>
* {
  text-align: center;
}
h1 {
  margin: 3vmax;
}

h4 {
  cursor: pointer;
}

</style>
