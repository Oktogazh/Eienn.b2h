<template>
  <div class="titl">
    <h1 v-html="$store.state.kentel.titl"></h1>
    <div class="kreizDehou">
      <img src="/gwag.svg" id="gwag" @click="gwintañ">
    </div>
  </div>
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


<style scoped>
.titl {
  width: 100vw;
  height: 15vh;
}

h1 {
  position: absolute;
  left: 5%;
  margin: 5vh;
  font-size: 5vh;
}

a {
  color: hsv(144, 80%, 75%);
}
pre {
  position: absolute;
  text-align: left;
}
.kreizDehou {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 15vh;
  width: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#gwag {
  position: relative;
  align-self: center;
  background-image: url(/gwag.svg);
  display: block;
  width: 75%;
  height: 75%;
  max-width: 75px;
  max-height: 75px;
}
#gwag:hover {
  cursor: pointer;
}
</style>
