<template>
  <div class="teuz">
  </div>
  <img src="/gwag.svg" id="gwag" @click="gwintañ">
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

.teuz {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 70%, rgba(0,0,0,0.1) 100%),
    repeating-linear-gradient(148deg, rgba(139, 255, 217, 1) -10%, rgba(103, 123, 255, 1) 110%);
  display: flex;
}

#gwag {
  background-image: url(/gwag.svg);
  position: absolute;
  display: block;
  width: 45px;
  height: 45px;
  right: 1.5rem;
  top: 1.5rem;
  transform: scale(1.5);
}
#gwag:hover {
  cursor: pointer;
}

</style>
