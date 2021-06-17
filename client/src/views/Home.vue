<template>
  <Spletennoù />
  <Soner ref="soner" />
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
