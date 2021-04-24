<template>
  <div class="kreiz">
    <Furmenn />
  </div>
  <Teñval @click="$emit('klozañ')"/>
</template>

<script>
import Teñval from './Teñval'
import Furmenn from './Furmenn'

export default {
  name: 'modal',
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
.kreiz {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
