<template>
  <h1>Mon compte</h1>
  <h2 @click="$emit('klozañ')">←</h2>

  <h4 @click="daveDigor = !daveDigor">Contact</h4>
    <h5 v-show="daveDigor">emgav@eienn.bzh</h5>
  <h4 @click="hentennDigor = !hentennDigor">Methode</h4>
    <p v-show="hentennDigor">
      Si la méthode vous plait,
      sachez qu'elle s'inspire d'une méthode similaire que vous pouvez retrouver à
      <a href="https://www.saysomethingin.com/">cette adresse</a>.
    </p>
  <h4 @click="kudennDigor = !kudennDigor">Problème ?</h4>
    <p v-show="kudennDigor">
      Si, pour une raison défiant les lois de la physique,
      vous préféreriez la version précédente du site, vous pouvez toujours y accéder via
      <a href="https://v1.eienn.bzh/">ce lien</a>.
    </p>
    <p v-show="kudennDigor">
      Si vous trouvez un bug, merci de le signaler sur
      <a href="https://github.com/Oktogazh/Eienn.b2h/issues">GitHub</a>.
    </p>
</template>

<script>
//import Swal from 'sweetalert2'

export default {
  name: 'Munudoù',
  data() {
    return {
      daveDigor: false,
      hentennDigor: false,
      kudennDigor: false
    };
  },
  methods: {
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
h5 {
  clear: both;
  text-align: center;
}
p {
  clear: both;
  text-align: center;
}

</style>
