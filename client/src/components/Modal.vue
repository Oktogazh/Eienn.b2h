<template>
    <h1 @click="digoret = !digoret">Ξ</h1>
    <Kevreañ class="centered" v-if="digoret" :digoret="digoret" @klozañ="digoret = false"/>
    <pre>
    </pre>
</template>

<script>
import Kevreañ from './Kevreañ'

export default {
  name: 'Modal',
  components: {
    Kevreañ
  },
  data() {
    return {
      digoret: false
    };
  },
  methods: {

  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: right;
  margin: 5vmin;
}
h1:hover {
  cursor: pointer;
  color: rgb(38, 130, 191)
}
</style>
