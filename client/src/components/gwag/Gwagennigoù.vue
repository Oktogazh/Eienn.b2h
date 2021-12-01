<template>
  <div class="titl">
    <div class="kleiz">
      <h1 v-html="$store.state.titl || $store.state.kentel.titl"></h1>
    </div>
    <div class="kreizDehou">
      <div class="gwagig"  @click="gwintañ">
        <img src="/gwag.svg">
        <span class="kemmennadennig"
          v-if="$store.state.user.past_due && !$store.state.digor.perzhioù">
        </span>
      </div>
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
      this.$store.state.titl = null;
      this.$router.push({name:'Home'});
      if (this.$store.state.digor.perzhioù) {
        this.$store.dispatch({
          type: 'gwintañPrenestr',
          prenestr: 'perzhioù',
          boolean: false
        })
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
.kleiz {
  position: absolute;
  left: 0px;
  width: calc(100vw - 15vh);
  height: 15vh;
  white-space: nowrap;
  display:flex;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
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

.gwagig {
  position: relative;
  align-self: center;
  display: block;
  width: 75%;
  height: 75%;
  max-width: 75px;
  max-height: 75px;
}
img {
  width: 100%;
  height: 100%;
  max-width: 75px;
  max-height: 75px;
}
.gwagig:hover {
  cursor: pointer;
}
.kemmennadennig {
  position: absolute;
  left: 10%;
  top: 10%;
  background-color: rgb(255, 141, 84);
  padding: .5em;
  border-radius: 50%;
}
</style>
