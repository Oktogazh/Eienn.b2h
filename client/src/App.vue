<template>
  <div id="nav">
    <Gwagennigoù />
  </div>
  <router-view />
  <pre>{{ $store.state }}
  </pre>
</template>

<script>
// @ is an alias to /src
import Gwagennigoù from '@/components/gwag/Gwagennigoù'

export default {
  components: {
    Gwagennigoù
  }
}
</script>

<style @media="screen">
body {
  background: #eee;
  margin: 4vmin;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
pre {
  text-align: left;
}
</style>
