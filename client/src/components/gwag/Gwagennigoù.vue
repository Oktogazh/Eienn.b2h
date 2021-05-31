<template>
  <img src="/gwag.svg" id="gwag" @click="gwintañ">
  <Kevreañ v-if="$store.state.prenestrier.kevreañ.digoret"/>
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
      if (this.$store.state.prenestrier.perzhioù.digoret) {
        this.$store.dispatch({
          type: 'gwintañPrenestr',
          prenestr: 'perzhioù',
          boolean: false
        })
        this.$router.push({name:'Home'})
      } else if (JSON.parse(localStorage.getItem('userData') || "{}").token) {
        this.$store.dispatch({
          type: 'gwintañPrenestr',
          prenestr: 'perzhioù',
          boolean: true
        })
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

#gwag {
  background-image: url(/gwag.svg);
  position: absolute;
  display: block;
  width: 45px;
  height: 45px;
  right: 3vmax;
  top: 3vmax;
  transform: scale(1.5);
}
#gwag:hover {
  cursor: pointer;
}
</style>
