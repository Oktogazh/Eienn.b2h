<template>
  <div class="furmenn-flex">
    <Furmenn @klozañ="$emit('klozañ')" />
  </div>
  <Teñval @click="$emit('klozañ')"/>
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
  props: {
    digoret: Boolean
  }
}
</script>

<style lang="css" scoped>
.furmenn-flex {
  display: flex;
  justify-content: center;
}

</style>
