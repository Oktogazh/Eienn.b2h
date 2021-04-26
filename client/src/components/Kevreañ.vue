<template>
  <div class="furmenn">
    <Furmenn />
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
.furmenn {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
