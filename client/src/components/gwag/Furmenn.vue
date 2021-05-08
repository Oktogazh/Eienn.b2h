<template>
  <div class="furmenn">
    <form class="signin-up" name="signin-up" @submit.prevent="kevreañ">
      <h3>{{ $store.state.user.ezel? 'Connexion':'Créez un compte'}}</h3><br>
      <h4>Email</h4>
      <input v-model="postel" type="email" name="email">
      <h4>Mot de passe</h4>
      <input v-model="gerKuzh" @focus="emezelet" type="password" name="ger-kuzh">
      <h4 v-show="!$store.state.user.ezel">Confirmez votre mot de passe</h4>
      <input v-model="kadarnaat" v-show="!$store.state.user.ezel" type="password">
      <button type="submit">Kas
      </button>
      <pre>{{ $store.state.user }}</pre>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Furmenn',
  data() {
    return {
    postel: '',
    gerKuzh: '',
    kadarnaat: ''
    }
  },
  methods: {
    emezelet() {
      if (this.postel != '') {
        this.$store.dispatch({
          type: 'ezel',
          email: this.postel
        })
      }
    },
    kevreañ() {
      const self = this;
      if (this.$store.state.user.ezel) {
        this.$store.dispatch({
          type: 'kevreañ',
          email: this.postel,
          password: this.gerKuzh
        })
          .then(function() {
             self.$store.dispatch({
               type: 'gwintañPrenestr',
               prenestr: 'kevreañ',
               boolean: false
             })
           })
      }
      if (this.gerKuzh === this.kadarnaat) { //TODO: check if password is valide
        this.$store.dispatch({
          type: 'enrollañ',
          email: this.postel,
          password: this.gerKuzh
        })
          .then(function() {
             self.$store.dispatch({
               type: 'gwintañPrenestr',
               prenestr: 'kevreañ',
               boolean: false
             })
           })
      }
    }
  }
}
</script>

<style scoped>
.furmenn {
  position: absolute;
  z-index: 2;
  background: rgb(255, 255, 255);
  padding: 30px;
  width: 250px;
}
.signin-up {
  display: block;
  width: inherit;
}
input {
  margin: 2vmin;
}
h4 {
  margin: 0px;
}
</style>
