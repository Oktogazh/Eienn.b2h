<template>
  <div id="nav">
    <Gwagennigoù />
  </div>
  <pre>{{ this.$store.state }}
  </pre>
  <router-view />
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
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
