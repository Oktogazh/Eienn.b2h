<template>
  <Spletennoù />
  <Soner />
</template>

<script>
import Spletennoù from '@/components/spletennoù/Spletennoù'
import Soner from '@/components/soner/Soner'

export default {
  name: 'Home',
  components: {
    Spletennoù,
    Soner
  },
  mounted() {
    this.$store.dispatch({
      type: 'kargañ',
      live: this.$store.state.user.live
    });
  }
}
</script>
