<template>
  <div class="center">
    <EmailForm v-if="!kadarnaet" @gwiriekaatPostel="gwiriekaatPostel"/>
    <GerKuzhNevez :kod="kod" v-if="kadarnaet"/>
  </div>
</template>

<script>
import EmailForm from '@/components/emailForm/EmailForm'
import GerKuzhNevez from '@/components/emailForm/GerKuzhNevez'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Gwiriekaat',
  data() {
    return {
      kadarnaet: false,
      kod: null
    }
  },
  components: {
    EmailForm,
    GerKuzhNevez
  },
  methods: {
    gwiriekaatPostel(kod) {
      const self = this;
      const email = this.$store.state.user.email;
      this.kod = kod.toUpperCase();

      axios.post(`${this.$store.state.API}/api/gwiriekaat_ar_ger-kuzh`, {kod: this.kod, email})
        .then((res) => {
          self.kadarnaet = res.data
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            text: 'Le code que vous venez de rentrer est incorrecte ou bien a expiré. ' +
            'Veuillez réessayer ou bien vous connecter avec une autre adresse.',
            confirmButtonText: 'Ok'
          })
          self.$store.state.titl = null;
          self.$router.push({name: 'Home'});
        })
    }
  },
  mounted() {
    this.$store.state.titl = 'Nouveau mot de passe';
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
