<template>
  <div class="kreiz">
    <Furmenn />
  </div>
  <Teñval v-if="true" @click="klozañModal"/>
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
        type: 'gwintañPrenestr',
        prenestr: 'kevreañ',
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
}

</style>
