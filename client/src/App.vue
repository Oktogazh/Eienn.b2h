<template>
  <div id="nav">
    <Gwagennigoù />
  </div>
  <router-view />
  <pre v-if="true">{{ $store.state.user }}
  </pre>
  <pre v-if="true">{{ $store.state.kentel.ouzhpenn }}
  </pre>
</template>

<script>
import Gwagennigoù from '@/components/gwag/Gwagennigoù'

export default {
  components: {
    Gwagennigoù
  },
  mounted() {
    this.$store.state.stripe.dibabet = this.$store.state.stripe.prices[0];
    this.$store.dispatch({
      type: 'kargañ',
      live: this.$store.state.user.live,
      ouzhpenn: false
    })
  }
}
</script>

<style >
body, html {
  height: 100%;
  width: 100%;
  margin: 0;
}

body {
  z-index: -1;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 70%, rgba(0,0,0,0.1) 100%),
    repeating-linear-gradient(148deg, rgba(139, 255, 217, 1) -10%, rgba(103, 123, 255, 1) 110%);
  width: 100vw;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1b2b3c;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
pre {
  position: absolute;
  z-index: -1;
  top: 30px;
  left: 30px;
  text-align: left;
}
</style>
