<template>
  <Spletennoù />
  <Soner ref="soner" v-if="$store.getters.niverenn > 0" />
</template>

<script>
import Spletennoù from '@/components/spletennoù/Spletennoù'
import Soner from '@/components/soner/Soner'

export default {
  name: 'Home',
  components: {
    Spletennoù,
    Soner
  }
}
</script>
