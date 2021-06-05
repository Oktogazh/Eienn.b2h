<template>
  <img src="/gwag.svg" id="gwag" @click="gwintañ">
  <Kevreañ v-if="$store.state.digor.kevreañ"/>
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
      if (this.$store.state.digor.perzhioù) {
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
  width: 10vmax;
  max-width: 75px;
  height: 10vmax;
  max-height: 75px;
  right: 3.5vmax;
  top: 3.5vmax;
}
#gwag:hover {
  cursor: pointer;
}
</style>
