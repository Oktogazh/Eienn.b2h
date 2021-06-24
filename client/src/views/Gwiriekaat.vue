<template>
  <div class="center">
    <EmailForm @gwiriekaatPostel="gwiriekaatPostel"/>
  </div>
</template>

<script>
import EmailForm from '@/components/emailForm/EmailForm'

export default {
  name: 'Gwiriekaat',
  components: {
    EmailForm
  },
  methods: {
    gwiriekaatPostel(kod) {
      return this.$store.dispatch({
        type: 'gwiriekaat',
        kod: kod
      })
    }
  },
  mounted() {
    this.$store.state.digor.perzhioù = true;
    this.$store.state.kentel.titl = "Vérification de l'adresse mail";
  }
}
</script>

<style media="screen">
.center {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
