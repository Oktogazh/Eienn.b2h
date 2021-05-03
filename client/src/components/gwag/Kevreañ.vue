<template>
  <div class="furmenn-flex">
    <Furmenn @klozañ="klozañModal" />
  </div>
  <Teñval @click="klozañModal"/>
</template>

<script>
import Teñval from './Teñval'
import Furmenn from './Furmenn'

export default {
  name: 'Kevreañ',
  components: {
    Teñval,
    Furmenn
  },
  methods: {
    klozañModal() {
      this.$store.dispatch({
        type: 'klozañPrenestr',
        prenestr: 'gwagennigoù'
      })
    }
  }
}
</script>

<style lang="css" scoped>
.furmenn-flex {
  display: flex;
  justify-content: center;
}

</style>
