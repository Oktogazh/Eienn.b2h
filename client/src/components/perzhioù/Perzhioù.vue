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
import Koumanant from './koumanant/Koumanant.vue'
import Swal from 'sweetalert2'

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
        live: '1@br-42.fr'
      };
      this.$store.state.kentel.live = '1@br-42.fr'
      this.$store.state.digor.perzhioù = false;
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
