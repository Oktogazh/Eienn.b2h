<template>
  <div class="furmenn">
    <form class="signin-up" name="signin-up" @submit.prevent="register">
      <h3>Connexion</h3><br>
      <label for="postel"><h4>Email</h4></label>
      <input v-model="postel" type="email" name="email">
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
    password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch({
        type: 'kasPostel',
        email: this.postel
      })
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
  margin-top: 5rem;
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
