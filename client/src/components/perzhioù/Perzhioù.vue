<template >
  <div v-if="!(kontDigor || koumanantDigor || munudoùDigor)">
    <h1>Paramètres</h1>
    <h4 @click="digeriñKoumanant" :class="{ 'past-due': $store.state.user.past_due }">Abonnement</h4>
    <h4 @click="kontDigor = true">Mon Compte</h4>
    <h4 @click="munudoùDigor = true">Détails</h4>
    <h4 @click="digevreañ">Déconnexion</h4>
  </div>
  <Koumanant v-if="koumanantDigor" @klozañ="koumanantDigor = false"/>
  <Kont v-if="kontDigor" @klozañ="kontDigor = false"/>
  <Munudoù v-if="munudoùDigor" @klozañ="munudoùDigor = false"/>
</template>

<script>
import Koumanant from './koumanant/Koumanant.vue'
import Munudoù from './munudoù/Munudoù.vue'
import Kont from './kont/Kont.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Perzhioù',
  components: {
    Kont,
    Koumanant,
    Munudoù
  },
  data() {
    return {
      kontDigor: false,
      koumanantDigor: false,
      munudoùDigor: false
    }
  },
  methods: {
    digeriñKoumanant() {
      (this.$store.state.user.sub || this.$store.state.user.verified)?
        this.koumanantDigor = true
      :
        this.$store.dispatch({
          type: 'sendEmailVerificationCode'
        })
        .then(() => {
          Swal.fire({
            title: 'Vérification requise',
            text: 'Allez votre boite de réception ou dans vos spams pour vérifier votre adresse email avant de pouvoir vous abonner.'
          })
        })
    },
    digevreañ(){
      localStorage.clear();
      this.$store.state.user = {
        ezel:true,
        live: '0@br42_fr.1'
      };
      this.$store.dispatch({
        type: 'kargañ',
        live: this.$store.state.user.live
      })
      .then(this.$store.state.digor.perzhioù = false);
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

.past-due {
  color: rgb(255, 141, 84);
  text-decoration: underline;
}
</style>
