<template>
  <div class="furmenn">
    <form class="signin-up" name="signin-up" @submit.prevent="kevreañ">
      <h3>{{ $store.state.user.ezel? 'Connexion':'Créez un compte'}}</h3><br>
      <h4>Email</h4>
      <input v-model="postel" type="email" name="email">
      <h4>Mot de passe</h4>
      <input v-model="gerKuzh" @focus="emezelet" type="password" name="ger-kuzh">
      <h4 v-show="!$store.state.user.ezel">Confirmez votre mot de passe</h4>
      <input v-model="kadarnaat" v-show="!$store.state.user.ezel" type="password"><br>
      <button type="submit">Connexion
      </button>
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
  background-image: url(/Beg_ar_Vann.jpg);
  background-size: 190%;
  background-origin: border-box;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 25%;
  padding: 5%;
  align-self: auto;
  z-index: 2;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.furmenn input {
  background-color: rgba(247, 247, 202, 0.9);
  border-radius: 10rem;
  border: 0;
  padding: 1rem;
}
.furmenn button {
  margin-top: 1rem;
  display: inline-block;
  font-weight: 400;
  color: rgb(255, 255, 255);
  text-align: center;
  vertical-align: middle;
  background-color: rgba(67, 207, 88, 0.7);
  border-color: rgba(67, 207, 88, 0.7);
  border: 1px solid transparent;
    border-top-color: transparent;
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: transparent;
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: transparent;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: transparent;
    border-left-style: solid;
    border-left-width: 1px;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  line-height: 1.2;
  border-radius: 2rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
button:hover {
  cursor: pointer;
  color: #fff;
  background-color: rgba(89, 166, 210, 0.6);
  border-color: rgba(0, 77, 179, 0.6);
      border-top-color: rgba(0, 77, 179, 0.6);
      border-right-color: rgba(0, 77, 179, 0.6);
      border-bottom-color: rgba(0, 77, 179, 0.6);
      border-left-color: rgba(0, 77, 179, 0.6);
}
button:focus {
  color: #fff;
  background-color: rgba(89, 166, 210, 0.6);
  border-color: rgba(89, 166, 210, 0.9);
  box-shadow: 0 0 0 0.2rem rgba(0, 77, 179, 0.0);
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
