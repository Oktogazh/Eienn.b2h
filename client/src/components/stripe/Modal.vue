<template>
  <div class="kreiz">
    <Stripe />
  </div>
  <Teñval @click="klozañModal"/>
</template>

<script>
import Teñval from '../talvoudus/Teñval'
import Stripe from '../stripe/Stripe'

export default {
  name: 'Modal',
  components: {
    Teñval,
    Stripe
  },
  methods: {
    klozañModal() {
      this.$store.state.stripe.dibabet = this.$store.state.stripe.prices[0];
      this.$store.dispatch({
        type: 'gwintañPrenestr',
        prenestr: 'stripe',
        boolean: false
      })
    }
  }
}
</script>

<style lang="css">
.kreiz {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
</style>
