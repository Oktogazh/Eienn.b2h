<template>
  <h1>Abonnement</h1>
  <h2 @click="$emit('klozañ')">←</h2>
  <h4 v-if="!$store.state.user.sub" @click="darStal">M'abonner!</h4>
  <h4 v-if="$store.state.user.sub" @click="digevreañ">Me désabonner!</h4>
  <Modal v-if="$store.state.digor.stripe" />
</template>

<script>
import Modal from '@/components/stripe/Modal'

export default {
  name: 'Kont',
  components: {
    Modal
  },
  methods: {
    darStal() {
      this.$store.dispatch({
        type: 'setCustomer'
      })
      this.$store.dispatch({
        type: 'gwintañPrenestr',
        prenestr: 'stripe',
        boolean: true
      })
    },
    digevreañ() {
      return this.$store.state.user.sub = false; // TODO: Digevreañ evit gwir!!
    }
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

</style>
