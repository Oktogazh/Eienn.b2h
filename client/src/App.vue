<template>
  <Modal/>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    Modal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(13, 38, 64);
  margin-top: 10px;
}
#colorChart {
  color: hsv(144, 80%, 75%);
}
</style>
