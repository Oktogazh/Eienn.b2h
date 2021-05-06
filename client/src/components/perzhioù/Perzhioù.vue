<template >
  <div v-if="! (kontDigor ||false)">
    <h1>Paramètres</h1>
    <h4 @click="kontDigor = true">Mon Compte</h4>
    <h4 @click="digevreañ">Déconnexion</h4>
  </div>
  <Kont v-if="kontDigor" @klozañ="kontDigor = false"/>
</template>

<script>
import Kont from './kont/Kont.vue'

export default {
  name: 'Perzhioù',
  components: {
    Kont
  },
  data() {
    return {
      kontDigor: false
    }
  },
  methods: {
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
