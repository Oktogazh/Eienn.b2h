<template>
  <div class="endalXer" v-show="$store.getters.niverenn > 5">
    <h3>Lec'hiennoù talvoudus :</h3>
    <Liammoù />
  </div>
  <Spletennoù />
  <Soner ref="soner" v-if="$store.getters.niverenn > 0" />
</template>

<script>
import Spletennoù from '@/components/spletennoù/Spletennoù'
import Soner from '@/components/soner/Soner'
import Liammoù from '@/components/talvoudus/Liammoù'

export default {
  name: 'Home',
  components: {
    Liammoù,
    Spletennoù,
    Soner
  }
}
</script>

<style scoped>
.endalXer {
  position: absolute;
  display: block;
  left: 5vw;
  padding: 1em;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 25px;
  max-width: 150px;
  max-height: 60vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  box-shadow: 0px 10px 25px 0px rgba(0,0,0,0.4);
}

@media only screen and (max-width: 1300px) {
  .endalXer {
    display: none;
  }
}
</style>
