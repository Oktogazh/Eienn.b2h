<template>
    <form  class="emailForm" @submit.prevent="gwiriekaatPostel">
      <h1>Entrez votre code :</h1>
      <input type="text" v-model="kod" maxlength="6">
      <button type="submit">
        <h4>Valider</h4>
      </button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      kod: ''
    }
  },
  methods: {
    gwiriekaatPostel() {
      return this.$store.dispatch({
        type: 'gwiriekaat',
        kod: this.kod
      })
    }
  }

}
</script>

<style scoped>
.emailForm {
  padding: 1vmax;
  margin: auto;
  margin-top: 5vmax;
  background: #fff;
  border-radius: 1vmax;
  display: flex;
  flex-direction: column;
}
h1 {
  margin: 3vmax;
  margin-bottom: 1vmax;
}
h4 {
  margin: 1em 2em;
}

input {
  display: block;
  margin: auto;
  width: 6em;
  font-size: 200%;
  text-align: center;
  letter-spacing: .3em;
}

button {
  margin: auto;
  margin-top: 2vmax;
  margin-bottom: 3vmax;
}
</style>
