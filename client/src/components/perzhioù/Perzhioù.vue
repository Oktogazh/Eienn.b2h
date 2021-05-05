<template >
  <h2>Paramètres</h2>
  <h4 @click="digevreañ">Déconnexion</h4>
</template>

<script>
export default {
  name: 'Perzhioù',
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
h4 {
  text-align: center;
  cursor: pointer;
}

</style>
