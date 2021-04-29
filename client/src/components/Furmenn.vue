<template>
  <div class="furmenn">
    <form class="signin-up" name="signin-up" @submit.prevent="kevreañ">
      <h3>{{ $store.state.ezel? 'Connexion':'Créez un compte'}}</h3><br>
      <h4>Email</h4>
      <input v-model="postel" type="email" name="email">
      <h4>Mot de passe</h4>
      <input v-model="gerKuzh" @focus="emezelet" type="password" name="ger-kuzh">
      <h4 v-show="!$store.state.ezel">Confirmez votre mot de passe</h4>
      <input v-model="kadarnaat" v-show="!$store.state.ezel" type="password">
      <button type="submit">Kas
      </button>
      <pre>{{ $store.state }}</pre>
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
      if (this.postel != '') { //To do: check if password is valide
        this.$store.dispatch({
          type: 'kasPostel',
          email: this.postel
        })
      }
    },
    kevreañ() {
      if (this.gerKuzh === this.enrollañ) {
        this.$store.dispatch({
          type: 'enrollañ',
          email: this.postel,
          psw: this.gerKuzh
        })
      } if (this.store.state.ezel) {
        this.$store.distpatch({
          type: 'kevreañ',
          email: this.postel,
          psw: this.gerKuzh
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
}
input {
  margin: 2vmin;
}
h4 {
  margin: 0px;
}
</style>
