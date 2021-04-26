<template>
    <h1 @click="pajenn.digoret = true">Ξ</h1>
    <Kevreañ v-if="pajenn.digoret" :digoret="pajenn.digoret" @klozañ="pajenn.digoret = false"/>
    <pre>{{ pajenn }}
    </pre>
</template>

<script>
import Kevreañ from './Kevreañ'

export default {
  name: 'Gwagennigoù',
  components: {
    Kevreañ
  },
  data() {
    return {
      pajenn: {
        digoret: false
      }
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
  color: rgb(38, 130, 191);
}
a {
  color: hsv(144, 80%, 75%);
}
pre {
  position: absolute;
  text-align: left;
  padding: 5rem
}
</style>
