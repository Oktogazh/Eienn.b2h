<template>
    <h1 @click="gwintañ">Ξ</h1>
    <Kevreañ v-if="$store.state.prenestrier.kevreañ.digoret"/>
<!--    <pre>{{ pajenn }}
    </pre>
-->
</template>

<script>
import Kevreañ from './Kevreañ'

export default {
  name: 'Gwagennigoù',
  components: {
    Kevreañ
  },
  methods: {
    gwintañ() {
      const self = this
      if (this.$store.state.prenestrier.perzhioù.digoret) {
        this.$store.dispatch({
          type: 'gwintañPrenestr',
          prenestr: 'perzhioù',
          boolean: false
        }).then(function() {
          return self.$store.state.lastSelected %=  2
        })
      } else if (JSON.parse(localStorage.getItem('userData') || "{}").token) {
        this.$store.dispatch({
          type: 'gwintañPrenestr',
          prenestr: 'perzhioù',
          boolean: true
        }).then(function() {})
      } else {
        this.$store.dispatch({
          type: 'gwintañPrenestr',
          prenestr: 'kevreañ',
          boolean: true
        })
      }
    }
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
  margin-bottom: 1vmin;
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
}
</style>
